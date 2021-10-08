import {con} from '../config/database.js';

export function get_intermediate_filter(id_joueur, tour, year, callback){ 

    if ((year === null || year === 'unselected' || year === undefined) && tour != 'unselected'){ 
        let sql = `SELECT * FROM score WHERE IDJ1 =${id_joueur} AND TOUR = ${tour} OR IDJ2 = ${id_joueur} AND TOUR =${tour}`;
        get_filter(sql, function(res, err, field){ 
            if (err) throw err; 
            return callback(res)
        })
    }

    else if ((tour === null || tour === 'unselected' || tour === undefined) && year != 'unselected'){
        let sql = `SELECT * FROM SCORE WHERE IDJ1=${id_joueur} AND IDEDITION = ${year} OR IDJ2=${id_joueur} AND IDEDITION=${year}`;
        get_filter(sql, function(res, err, field){ 
            if (err) throw err; 
            return callback(res)
        })
    }

    else if((tour != null && tour != 'unselected') && (year != null && year != 'unselected')){
        let sql = `SELECT * FROM SCORE WHERE IDJ1=${id_joueur} AND IDEDITION = ${year} AND TOUR = ${tour} OR IDJ2=${id_joueur} AND IDEDITION=${year} AND TOUR = ${tour}`;
        get_filter(sql, function(res, err, field){ 
            if(err) throw err; 
            return callback(res)
        })
    }
}

export function get_filter(sql, callback){
    con.query(sql, function(err, res, field){
        if (err) throw err; 
        return callback(res);
   })
}

//Renvoi une liste de match filtrée par année 
export function filter_year(id_joueur, year, callback){ 
    con.query(`SELECT IDEDITION from edition WHERE ANNEE = ${year}`, function(err, res, field){ 
        if (err) throw err;
        return callback(res)
    })
}