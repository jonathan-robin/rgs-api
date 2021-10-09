import {con} from '../config/database.js';
import { connection } from '../index.js';
 
/**
 * Retourne tableau des matchs
 * @param { sql } string
 * @returns { [object] }
 */
 export function get_scores(sql, callback){
    connection.query(sql, function(err, results){
       if (err) throw err
       return callback(results);
   })
}

/**
 * Reformate les scores et retourne sans champ vide
 * @param { score } []string
 * @returns { []string }
 */
export function get_filtered_set(score){
   // On retourne les sets non vides
   var filterSet = score.filter(function(set){ return set != "" && set != " " && set != "ab";});
   // Si le set est supérieure à 60(64 = 6/4 au tie break), on retourne 6;
   filterSet.map((set, index) => {if (parseInt(set) > 60){filterSet[index] = "6"}})
   console.log(filterSet);
   return filterSet;
}

/**
 * Retourne l'id_edition
 * @param { [string] } year
 * @returns { [{number, number}] }
 * [{EDITION:X, ANNEE:YYYY}]
 */
 export function get_idEdition(year, callback){
   console.log(year)
   var editions = [];
   year.map((v,i) => {
       var sql = `SELECT IDEDITION, ANNEE FROM edition WHERE ANNEE = ${v}`;
       connection.query(sql, function(err, results){
           if (err) throw err;
           editions.push(results);
           if (year.lastIndexOf(v) === year.length - 1 ){
               return callback(editions);
           } 
       })
   })
}
 /**
 * Renvoi les infos d'un joueur avec l'id
 * @param { number } id
 * @returns { string }
 */
export function get_info_joueur(id, callback){ 
    connection.query(`SELECT nom, prenom, nat, idjoueur from joueur where idjoueur = ${id}`, function(err, res, field) {
       if (err) throw err; 
       return callback(res);
   })
}

/**
 * Retourne les défaites d'un joueur 
 * @param { number } id_joueur
 * @returns {number}
 */
 export function get_loose(id_joueur, callback){
    connection.query(`SELECT * FROM score where IDJ1 = ${id_joueur} AND VAINQ != ${id_joueur} OR IDJ2 = ${id_joueur} AND VAINQ != ${id_joueur}`, function(err, result, field){
       if (err) throw err;
       return callback(result)
   })
}

/**
 * Retourne les défaites d'un joueur face à un autre joueur
 * @param { number } id_joueur
 * @returns {number}
 */
 export function get_specific_loose(currentId, mappedId ,callback){
    connection.query(`SELECT * FROM score where IDJ1 = ${currentId} AND IDJ2 = ${mappedId} AND VAINQ != ${currentId} OR IDJ2 = ${currentId} AND IDJ1 = ${mappedId} AND VAINQ != ${currentId}`, function(err, result, field){
       if (err) throw err;
       return callback(result)
   })
}


