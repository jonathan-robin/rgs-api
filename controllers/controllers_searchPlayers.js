 import {con} from '../config/database.js';
 
 /**
  * Retourne le tableau des participations 
  * @param { [number] } id_edition
  * @returns { [{number, number}] }
  * [{IDEDITION:X, ANNEE:YYYY},{IDEDITION:X, ANNEE:YYYY}]
  */ 
  export function get_year(id_edition, callback){
    var dataToReturn = [];
    id_edition.map((v,i) => {
        var sql = `SELECT IDEDITION, ANNEE FROM edition WHERE IDEDITION = ${v.IDEDITION}`;
        con.query(sql, function(err, results){
            if (err) throw err;
                dataToReturn.push(results);
            if (id_edition.lastIndexOf(v) === id_edition.length - 1 ){
                return callback(dataToReturn);
            } 
        })
    })
}
 /**
  * Retourne les idEdition des editions participéEs
  * @param { number } id_joueur
  * @returns { [{number}] }
  * [{IDEDITION:X}, {IDEDITION:X}]
  */
export function get_participe(id_joueur, callback){
    con.query(`SELECT IDEDITION from PARTICIPE WHERE IDJOUEUR = ${id_joueur}`, 
    function(err, participation, field){
        if(err) throw err; 
        get_year(participation,function(participation_annee){
            return callback(participation_annee)
        });
    })
}
 /**
  * Retourne le nombre de victoire
  * @param { number } id_joueur
  * @returns {number}
  */
export function get_nb_win(id_joueur, callback){ 
    con.query(`SELECT * FROM score where VAINQ = ${id_joueur}`,function(err, result, field){ 
        if (err) throw err; 
        return callback(result.length)
    })
}

/**
  * Retourne toutes les victoires
  * @param { number } id_joueur
  * @returns { [object] }
  */
export function get_meilleur_tour(id_joueur, callback){
    con.query(`SELECT tour, idedition from score WHERE VAINQ = ${id_joueur}`, function(err, result, field){
       console.log(result)
        return callback(result)
       
    })
}
/**
  * Retourne toutes les défaites
  * @param { number } id_joueur
  * @returns { [object] }
  */
export function get_pire_tour(id_joueur, callback){
    con.query(`SELECT tour, idedition from score WHERE IDJ1 = ${id_joueur} AND VAINQ != ${id_joueur}
    OR IDJ2 = ${id_joueur} AND VAINQ !=${id_joueur}`, function(err, result, field){
       console.log(result)
       return callback(result)
    })
}
/**
  * Modifie les scores en ajoutant les infos de l'adversaire
  * @param { number } id_joueur
  * @param { [object] } scores
  * @returns { [object] }
  */
export function get_scores_filter(id_joueur, scores, callback){
    var sql = '';
    scores.map((v,i) => {
        if (v.IDJ1 === id_joueur){ 
            sql = `SELECT NOM,PRENOM,NAT,IDJOUEUR from joueur WHERE IDJOUEUR=${v.IDJ2}`;
            con.query(sql, function(err,res){
                v.nat_IDJ1=res[0].NAT;
                v.prenom_IDJ1=res[0].PRENOM;
                v.nom_IDJ1=res[0].NOM;
                if (scores.lastIndexOf(v) === scores.length - 1 ){
                    return callback(scores);
                } 
            })
        }
        else{
            sql = `SELECT NOM,PRENOM,NAT,IDJOUEUR from joueur WHERE IDJOUEUR=${v.IDJ1}`;
            con.query(sql, function(err,res){
                v.nat_IDJ2=res[0].NAT;
                v.prenom_IDJ2=res[0].PRENOM;
                v.nom_IDJ2=res[0].NOM;
                if (scores.lastIndexOf(v) === scores.length - 1 ){
                    return callback(scores);
                } 
            })
        }
    })
}