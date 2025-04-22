import store from "./store.js";



console.log(store.getState()); // Initial state of the store
store.dispatch({
    type: 'ADD_PLACEMENT_OFFER',
    payload: {
        title: 'Software Engineer Intern',
        company: 'Tech Corp',
        location: 'Remote',
        description: 'An exciting opportunity to work with cutting-edge technologies.'
    }
});

console.log(store.getState()); // Updated state of the store