const initialState = {
    listProduct: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
};

const product = (state = initialState, action) => {
    switch (action.type) {
    // GET PRODUCT
    case 'GET_PRODUCT_PENDING':
        return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false,
    };
    case 'GET_PRODUCT_REJECTED':
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        };
    case 'GET_PRODUCT_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            listProduct: action.payload.data.result.response,
        };
    
    //DELETE PRODUCT
    case 'DELETE_PRODUCT_PENDING':
        return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false,
        };
    case 'DELETE_PRODUCT_REJECTED':
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        };
    case 'DELETE_PRODUCT_FULFILLED':
        const dataAfterDelete = state.listProduct.filter((value) => {
            return value.id != action.payload.data.id });
        return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            listProduct: dataAfterDelete,
        };

    default:
        return state;
    }
};

export default product;