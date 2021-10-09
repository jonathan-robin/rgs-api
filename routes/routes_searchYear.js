import express from 'express'; 
import {get_infoJ1, get_infoJ2} from '../controllers/controllers_searchYear.js';
import {get_scores, get_idEdition, get_filtered_set} from '../utils/utils.js';

const router = express.Router();

 /**
  * Retourne object pour searchYear 
  * @param { number } req.body.year
  * @returns { object }
  * [{tour1:{matchs}, tour2:{matchs}, ...}]
  */ 
router.post('/year', async (req, res) => {
    let draw = {tour1:[], tour2:[], tour3:[], tour4:[], tour5:[], tour6:[], tour7:[]};
    var match = '';
    var name = '';
    // On reçoit un array des joueurs pour effectuer moins de query
    var players = req.body.players

    get_idEdition(req.body.year, function(edition){
        var sql = `SELECT * FROM score WHERE IDEDITION = ${edition[0][0].IDEDITION}`;
        get_scores(sql, function(result){
            match = result;
            get_infoJ1(match, players, function(result){
                name = result;
                get_infoJ2(name, players, function(result){
                    result.map(element => { 
                        switch (element.Tour){ 
                            case 7 : draw.tour7.push(element); break;  
                            case 6 : draw.tour6.push(element); break;
                            case 5 : draw.tour5.push(element); break;
                            case 4 : draw.tour4.push(element); break;
                            case 3 : draw.tour3.push(element); break;
                            case 2 : draw.tour2.push(element); break;
                            case 1 : draw.tour1.push(element); break;
                        }
                    })
                    res.send(draw);
                })
            });
        })

    });
});

export default router;