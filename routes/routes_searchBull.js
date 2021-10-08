import express from 'express'; 
import { get_bullier_id } from '../controllers/controllers_searchBull.js';
import {get_info_joueur, get_scores, get_specific_loose} from '../utils/utils.js';

const router = express.Router();

//Renvoi l'id du joueur contre qui le joueur passé dans le body a le plus de défaite
router.post('/bull', (req, res) =>{
    var id_joueur = req.body.id_joueur;
    var matchs = req.body.matchs;
    // Filtre les matchs et renvoit les défaites
    var matchs_lost = matchs.filter(function(match){ 
      return match.VAINQ != id_joueur
    })
    // map les défaites et renvoit un tableau avec les id
    var lost_match_id_player = matchs_lost.map((match, index) => {
      return match.VAINQ;
    })
    // Si pas de défaite on return null
    if (lost_match_id_player.length == 0) return null;
    var loose_map = {},
        loose_count = 1,
        bull_id = [];

    for (var i = 0; i < lost_match_id_player.length; i++) {
      var current_id = lost_match_id_player[i];
      //Si loose_map[current_id] n'existe pas (nouvel id) on rajoute l'entrée dans loose_map
      if (loose_map[current_id] == null) loose_map[current_id] = 1;
      //Sinon on incrémente la valeur de loose_map[current_id]
      else loose_map[current_id]++;
      //Si loose_map[current_id] (nombre d'occurence de current_id) est > à loose_count
      if (loose_map[current_id] > loose_count) {
      // le tableau return = l'id
        bull_id = [current_id];
        // loose_count est égal au nombre d'occurence de current_id
        loose_count = loose_map[current_id];
      } 
      // Si nombre d'occurence de current_id est égal à loose_count (current_id avec le plus d'occurence)
      else if (loose_map[current_id] == loose_count) {
        // on push dans le tableau return current_id
        bull_id.push(current_id);
        // bullcount égal nombre d'occurence de current_id
        loose_count = loose_map[current_id];
      }
    }
    var id = 0;
    // Si bull_id ne compte qu'un id on retourne
    if (bull_id.length === 1){ 
      id = bull_id
      get_info_joueur(id, function(infos){ 
        var joueur = infos;
        // Ainsi que ses défaites pour renvoyer en obj
        get_specific_loose(id_joueur, id, function(matchs){
          res.send({
            id, 
            joueur, 
            matchs,
          })
        })
      })
    }
    //Sinon on va chercher le score le plus éclaté
    else{
      get_bullier_id(matchs_lost, bull_id, id_joueur, function(bull_id){
        id = bull_id
        console.log
        // On récupère les infos du joueur passé dans le body 
        get_info_joueur(id, function(infos){ 
          var joueur = infos;
          // Ainsi que ses défaites pour renvoyer en obj
          get_specific_loose(id_joueur, id, function(matchs){
            res.send({
              id, 
              joueur, 
              matchs,
            })
          })
        })
      })
    }
})

export default router;