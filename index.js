import store from "./store.js";
import * as actions  from "./actionTypes.js";
import {addOffer}  from "./actions.js";


const unsubscribe = store.subscribe(() => {
    console.log("State updated:", store.getState());
});


store.dispatch( 
    addOffer(
        "Software Engineer Intern",
        "Tech Company",
        "New York",
        "Looking for a software engineer intern for summer 2024."
    )
);

unsubscribe(); // Unsubscribe from the store updates

// action to remove a placement offer
store.dispatch({
    type: actions.REMOVE_PLACEMENT_OFFER,
    payload: {
        id: 1 // Assuming the ID of the offer to be removed is 1
    }
})

unsubscribe(); //! this one won't work as unsubscribe has already been called and unsubscribed 


