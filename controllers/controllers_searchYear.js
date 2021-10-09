import {con} from '../config/database.js'; 

/**
 * Rajoute détails pour J1
 * @param { [object] } string
 * @returns { [object] }
 */
export function get_infoJ1(match, players, callback){
    if (match.length === 0){
        return callback([])
    }
    console.log('match function get_infoJ1', match);
   match.map(element => {
       players.map((player, index) => { 
           if(player.player_id === element.IDJ1){
               element.nom_IDJ1 = player.player_nom
               element.prenom_IDJ1 = player.player_prenom
               element.nat_IDJ1 = player.player_nat
           }
           if (match.lastIndexOf(element) === match.length - 1 && players.lastIndexOf(player) === players.length -1){
               return callback(match);;
           } 
       })
   //     var sql = `SELECT NOM,PRENOM,NAT from joueur WHERE IDJOUEUR=${element.IDJ1}`;
   //     con.query(sql, function(err,results){ 
   //         if (err) throw err;
   //         element.nom_IDJ1 = results[0].NOM;
   //         element.prenom_IDJ1 = results[0].PRENOM;
   //         element.nat_IDJ1 = results[0].NAT;
   //         // if(match[126] === element){
   //         //     callback(match);
   //         // }
   //         if (match.lastIndexOf(element) === match.length - 1 ){
   //             return callback(match);;
   //         } 
   //     })
   // })
})

}
/**
 * Rajoute détails pour J2
 * @param { [object] } string
 * @returns { [object] }
 */
export function get_infoJ2(match, players, callback){
    if (match.length === 0){
        return callback([])
    }
    console.log('match function get_infoJ1', match);
   match.map(element => {
       players.map((player, index) => { 
           if(player.player_id === element.IDJ2){
               element.nom_IDJ2 = player.player_nom
               element.prenom_IDJ2 = player.player_prenom
               element.nat_IDJ2 = player.player_nat
           }
           if (match.lastIndexOf(element) === match.length - 1 && players.lastIndexOf(player) === players.length -1){
               return callback(match);;
           } 
       })
       // var sql = `SELECT NOM,PRENOM,NAT from joueur WHERE IDJOUEUR=${element.IDJ2}`;
       // con.query(sql, function(err,results){ 
       //     if (err) throw err;
       //     element.nom_IDJ2 = results[0].NOM;
       //     element.prenom_IDJ2 = results[0].PRENOM;
       //     element.nat_IDJ2 = results[0].NAT;
       //     // if(match[126] === element){
       //     //     callback(match);
       //     // }
       //     if (match.lastIndexOf(element) === match.length - 1 ){
       //         return callback(match);;
       //     } 
       // })
   })

}