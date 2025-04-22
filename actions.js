import * as actions from "./actionTypes.js";


export const addOffer = (title, company, location, description) => ({
 
    type: actions.ADD_PLACEMENT_OFFER,
    payload: {
      title: title,
      company: company,
      location: location,
      description: description,
    }
});



//* traditional function : 
// export function addOffer(title, company, location, description) {
//   return {
//     type: actions.ADD_PLACEMENT_OFFER,
//     payload: {
//       title: title,
//       company: company,
//       location: location,
//       description: description,
//     }
//   };
// }