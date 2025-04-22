const initialState = {
    offers: [], // Array to hold placement offers
    nextId: 1 // Initialize the counter for IDs
};


export default function reducer(store = initialState, action) {
    switch (action.type) {
        case 'ADD_PLACEMENT_OFFER':
            const newOffer = {
                ...action.payload,
                id: store.nextId // Use the current counter value as the ID
            }
            return {
                ...store,
                offers: [...store.offers, newOffer],
                nextId: store.nextId + 1 // Increment the counter
            };
        case 'REMOVE_PLACEMENT_OFFER':
            return {
                ...store,
                offers: store.offers.filter(offer => offer.id !== action.payload.id)
            };
        default:
            return store;
    }
}





