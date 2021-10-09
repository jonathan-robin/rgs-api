import express from 'express'; 
import {filter_year, get_intermediate_filter} from '../controllers/controllers_searchCross.js';
import {get_infoJ1, get_infoJ2} from '../controllers/controllers_searchYear.js';

const router = express.Router();

//Renvoi une liste de match avec un filtre tour
router.post('/cross', (req, res) =>{
    var tour = req.body.tour;
    var year = req.body.year;
    var id_joueur = req.body.id_joueur

    var players = req.body.players;
    
    if(year != null && year != undefined && year != 'unselected' && year != 0){ 
        filter_year(id_joueur, year, function(resu){ 
            get_intermediate_filter(id_joueur, tour, resu[0].IDEDITION, function(result){ 
                get_infoJ1(result, players, function(result){
                    get_infoJ2(result, players, function(result){
                        res.send(result)
                    })
                })
            })
        })
    }
    else{
        get_intermediate_filter(id_joueur, tour, null, function(result){ 
            get_infoJ1(result, players, function(result){
                get_infoJ2(result, players, function(result){
                    res.send(result)
                })
            })
        })
    }
})



export default router;