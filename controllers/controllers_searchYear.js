 import {con} from '../config/database.js'; 

 /**
  * Rajoute détails pour J1
  * @param { [object] } string
  * @returns { [object] }
  */
export function get_infoJ1(match, callback){
    match.map(element => {
        var sql = `SELECT NOM,PRENOM,NAT from joueur WHERE IDJOUEUR=${element.IDJ1}`;
        con.query(sql, function(err,results){ 
            if (err) throw err;
            element.nom_IDJ1 = results[0].NOM;
            element.prenom_IDJ1 = results[0].PRENOM;
            element.nat_IDJ1 = results[0].NAT;
            // if(match[126] === element){
            //     callback(match);
            // }
            if (match.lastIndexOf(element) === match.length - 1 ){
                return callback(match);;
            } 
        })
    })
}
 /**
  * Rajoute détails pour J2
  * @param { [object] } string
  * @returns { [object] }
  */
export function get_infoJ2(match, callback){
    match.map(element => {
        var sql = `SELECT NOM,PRENOM,NAT from joueur WHERE IDJOUEUR=${element.IDJ2}`;
        con.query(sql, function(err,results){ 
            if (err) throw err;
            element.nom_IDJ2 = results[0].NOM;
            element.prenom_IDJ2 = results[0].PRENOM;
            element.nat_IDJ2 = results[0].NAT;
            // if(match[126] === element){
            //     callback(match);
            // }
            if (match.lastIndexOf(element) === match.length - 1 ){
                return callback(match);;
            } 
        })
    })
}