import express from 'express'; 
import {con} from '../config/database.js';
import {get_scores, get_loose} from '../utils/utils.js';
import {get_participe, get_nb_win, get_meilleur_tour, get_pire_tour, get_scores_filter} from '../controllers/controllers_searchPlayers.js';
import { get_infoJ1, get_infoJ2} from '../controllers/controllers_searchYear.js';

const router = express.Router();

//Renvoi un tableau avec les infos des joueurs pour les options input
router.get('/players', (req, res) =>{
    con.query('SELECT * FROM joueur', function(err, result, field){
        if (err) throw err; 
        res.send(result)
    })
})

 /**
  * Retourne object pour le profil 
  * @param { number } id_edition
  * @param { string } nom_joueur
  * @param { string } prenom_joueur
  * @param { string } nat_joueur
  * @returns { [object] }
  * [{IDEDITION:X, ANNEE:YYYY},{IDEDITION:X, ANNEE:YYYY}]
  */ 
router.post('/players', (req, res) => { 
    var id_joueur = req.body.id
    var nom_joueur = req.body.nom;
    var prenom_joueur = req.body.prenom;
    var nat_joueur = req.body.nat;

    var participation = [];
    let premiere_participation = 2021;
    let derniere_participation = 0;
    let nb_win = 0;
    let nb_loose = 0;
    let ratio = 0;
    let meilleur_tour = {tour:0, idedition:0};
    let pire_tour = {tour:7, idedition:0}; 
    var name;


    get_participe(id_joueur, function(result){
        participation = result;

        result.map((v,i)=>{ 
            derniere_participation = Math.max(derniere_participation, v[0].ANNEE)
            premiere_participation = Math.min(premiere_participation, v[0].ANNEE)
        })

        get_nb_win(id_joueur, function(result){
            nb_win = result;
        })
        get_loose(id_joueur, function(result){
            nb_loose = result.length;
            ratio = parseInt(nb_win / (nb_loose + nb_win)* 100);
        })
        get_meilleur_tour(id_joueur, function(result){
            if (result.length === 0) return
            result.map((v,i) => {
                if (v.tour > meilleur_tour.tour){
                    meilleur_tour.tour = v.tour;
                    meilleur_tour.idedition = v.idedition;
                }
            })
        })
        get_pire_tour(id_joueur, function(result){
            if (result.length === 0) return
            result.map((v,i) => {
                if (v.tour < pire_tour.tour){
                    pire_tour.tour = v.tour;
                    pire_tour.idedition = v.idedition;
                }
            })
        })

        var sql = `SELECT * FROM score WHERE IDJ1 = ${id_joueur} OR IDJ2 = ${id_joueur}`;
        get_scores(sql, function(result){
            get_infoJ1(result, function(result){
                get_infoJ2(result, function(result){
                    get_scores_filter(id_joueur, result, function(result){
                        res.send({
                            id_joueur,
                            nom_joueur,
                            prenom_joueur,
                            nat_joueur,
                            participation,
                            premiere_participation,
                            derniere_participation,
                            nb_win,
                            nb_loose,
                            ratio,
                            meilleur_tour,
                            pire_tour, 
                            matchs:result
                        })
                    })
                })
            })
        })
    })
})

export default router;