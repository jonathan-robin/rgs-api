import { con } from '../config/database.js';
import {get_filtered_set} from '../utils/utils.js';

/**
  * Renvoi parmi un tableau d'id, l'id du joueur avec la victoire la plus écrasante
  * @param { __matchs } matchs_lost
  * @param { [number] } bull_id
  * @param { function } callback
  * @returns { number }
  */
 export function get_bullier_id(matchs_lost, bull_id, id_joueur, callback){
    var pire_set = 5,
      pire_jeu = 30,
      bully;
    // On map les id des bull
    bull_id.map((id, index) => { 
      // On map les matchs perdus du joueur
      matchs_lost.map((match,idx) => {
        var jeux;
        // Si le vainqueur du match mappé a l'id du bull mappé
        if (match.VAINQ === id){
          // On choisit par rapport a IDJ quel pool de jeux gardés
          if (match.IDJ1 === id_joueur)jeux = [match.set1w, match.set2w, match.set3w, match.set4w, match.set5w];
          else jeux = [match.set1l, match.set2l, match.set3l, match.set4l, match.set5l];
          var filterSet = get_filtered_set(jeux)

          // // On retourne les sets non vides
          // var filterSet = jeux.filter(function(set){ return set != "" && set != " " && set != "ab";});
          // // Si le set est supérieure à 60(64 = 6/4 au tie break), on retourne 6;
          // filterSet.map((set, index) => {if (parseInt(set) > 60){filterSet[index] = 6}})
          // On calcule le nb de sets
          var nbSet = filterSet.length,
            nbJeux = 0;
          // On calcule le nb de jeux
          filterSet.map(set =>  nbJeux += parseInt(set))
          // Si le nb de sets est < à var pire_set on attribue l'id mappé à bully, on attribut a pire_set la valeur de nbset et on réinitialise pire_jeu
          if (nbSet < pire_set){
            bully = id;
            pire_set = nbSet;
            pire_jeu = 30;
          }
          // Si le nb de sets est =, et si nbJeux est < à pire_jeu on attribut l'id mappé à bully, on attribut à pire_jeu la valeur nbJeux
          else if(nbSet === pire_set){
            if(nbJeux < pire_jeu){
              bully = id; 
              pire_jeu = nbJeux;
            }
          }
        }
      })
    })
    return callback(bully)
  }

  export default get_bullier_id;