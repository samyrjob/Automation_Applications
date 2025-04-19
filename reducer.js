function reducer(store, action) {
    switch (action.type) {
        case 'ADD_PLACEMENT_OFFER':
            return {
                ...store,
                descriptions: [...store.descriptions, action.payload]
            };
        case 'REMOVE_PLACEMENT_OFFER':
            return {
                ...store,
                descriptions: store.descriptions.filter(offer => offer.id !== action.payload.id)
            };
        default:
            return store;
    }
}

// Example usage:
// Initial store
const store = {
    descriptions: []
};

// Action to add a new placement offer
const action = {
    type: 'ADD_PLACEMENT_OFFER',
    payload: {
        id: 1,
        title: 'Software Engineer Intern',
        company: 'Tech Corp',
        location: 'Remote',
        description: 'An exciting opportunity to work with cutting-edge technologies.'
    }
};

// Updated store after reducer is called
const updatedStore = reducer(store, action);
console.log(updatedStore);