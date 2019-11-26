export const addToCart = (item) => {
    return {
        type: 'ADD_TO_CART',
        item
    }
}

//remove item action
export const removeItem = (item) =>{
    return{
        type: 'REMOVE_ITEM',
        item
    }
}

//subtract qt action
export const subtractQuantity = (item) => {
    return{
        type: 'SUB_QUANTITY',
        item
    }
}

//add qt action
export const addQuantity = (item) => {
    return{
        type: 'ADD_QUANTITY',
        item
    }
}