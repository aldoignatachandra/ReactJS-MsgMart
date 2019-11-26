const initialState = {
    addedItem: [],
    total: 0,
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
};

const order = (state = initialState, action) => {
    switch (action.type) {
    //Add Selected Product To Cart
    case 'ADD_TO_CART':
        let existed_item = state.addedItem.find( product => action.item.id === product.id )
        
        state.addedItem.push ({
            id: action.item.id,
            product_name: action.item.product_name,
            image: action.item.image,
            price: action.item.price,
            quantity: action.item.quantity,
            totalQty: 1
        });    

        if(existed_item)
        {
            state.addedItem.quantity += 1
            return {
                ...state,
                // total: state.total + state.addedItem.price 
            }
        } else {
            // state.addedItem.quantity = 1;
            return {
                 ...state,
                addedItem: state.addedItem,
                // total : state.total + state.addedItem.price
            }
        }
    case 'ADD_QUANTITY':
        let addeQuantity = state.addedItems.find(item=> item.id_product === action.id)
        addeQuantity.quantity += 1 
        let Totaladd = state.total + addeQuantity.price
        return{
            ...state,
            total: Totaladd
        }
    case 'SUB_QUANTITY':
        let subQuantity = state.addedItems.find(item=> item.id_product === action.id)
        subQuantity.quantity -= 1 
        let Totalsub = state.total - subQuantity.price
        return { 
            ...state,
            total: Totalsub
        }
    case 'REMOVE_ITEM':
        let itemToRemove= state.addedItems.find(item=> action.id === item.id_product)
        let new_items = state.addedItems.filter(item=> action.id !== item.id_product)
            
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }

    default:
        return state;
    }
};

export default order;