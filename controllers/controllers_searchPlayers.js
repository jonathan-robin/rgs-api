import {con} from '../config/database.js';
import { connection } from '../index.js';
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
       connection.query(sql, function(err, results){
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
    connection.query(`SELECT IDEDITION from PARTICIPE WHERE IDJOUEUR = ${id_joueur}`, 
   function(err, participation, field){
       if(err) throw err; 
       get_year(participation,function(participation_annee){
           if(err) throw err;
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
    connection.query(`SELECT * FROM score where VAINQ = ${id_joueur}`,function(err, result, field){ 
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
    connection.query(`SELECT tour, idedition from score WHERE VAINQ = ${id_joueur}`, function(err, result, field){
       if (err) throw err;
       return callback(result)
      
   })
}
/**
 * Retourne toutes les défaites
 * @param { number } id_joueur
 * @returns { [object] }
 */
export function get_pire_tour(id_joueur, callback){
    connection.query(`SELECT tour, idedition from score WHERE IDJ1 = ${id_joueur} AND VAINQ != ${id_joueur}
   OR IDJ2 = ${id_joueur} AND VAINQ !=${id_joueur}`, function(err, result, field){
       if(err) throw err;
      return callback(result)
   })
}
/**
 * Modifie les scores en ajoutant les infos de l'adversaire
 * @param { number } id_joueur
 * @param { [object] } scores
 * @returns { [object] }
 */
/**
  * Modifie les scores en ajoutant les infos de l'adversaire
  * @param { number } id_joueur
  * @param { [object] } scores
  * @returns { [object] }
  */
 export function get_scores_filter(id_joueur, scores, players, callback){
    // var sql = '';
    scores.map((score, index) => {
        if (score.IDJ1 === id_joueur){
            players.map((player, index) => {
                if (player.id_joueur === score.IDJ2){
                    score.nat_IDJ1 = player.player_nat; 
                    score.prenom_IDJ1 = player.player_prenom; 
                    score.nom_IDJ1 = player.player_nom
                }
                if (scores.lastIndexOf(score) === scores.length - 1 && players.lastIndexOf(player) === players.length -1){
                    return callback(scores);
                }
            })
        }
        else{
            players.map((player, index) => {
                if (player.id_joueur === score.IDJ1){
                    score.nat_IDJ2 = player.player_nat; 
                    score.prenom_IDJ2 = player.player_prenom; 
                    score.nom_IDJ2 = player.player_nom
                }
                if (scores.lastIndexOf(score) === scores.length - 1 && players.lastIndexOf(player) === players.length -1){
                    return callback(scores);
                }
            })
        }

        // if (v.IDJ1 === id_joueur){ 
        //     sql = `SELECT NOM,PRENOM,NAT,IDJOUEUR from joueur WHERE IDJOUEUR=${v.IDJ2}`;
        //     con.query(sql, function(err,res){
        //         if (err) throw err;
        //         v.nat_IDJ1=res[0].NAT;
        //         v.prenom_IDJ1=res[0].PRENOM;
        //         v.nom_IDJ1=res[0].NOM;
        //         if (scores.lastIndexOf(v) === scores.length - 1 ){
        //             return callback(scores);
        //         } 
        //     })
        // }
        // else{
        //     sql = `SELECT NOM,PRENOM,NAT,IDJOUEUR from joueur WHERE IDJOUEUR=${v.IDJ1}`;
        //     con.query(sql, function(err,res){
        //         v.nat_IDJ2=res[0].NAT;
        //         v.prenom_IDJ2=res[0].PRENOM;
        //         v.nom_IDJ2=res[0].NOM;
        //         if (scores.lastIndexOf(v) === scores.length - 1 ){
        //             return callback(scores);
        //         } 
        //     })
        // }
    })
}