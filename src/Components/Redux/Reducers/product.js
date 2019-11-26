const initialState = {
    listProduct: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    addedItem: [],
    total: 0,
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

    //POST PRODUCT
    case 'POST_PRODUCT_PENDING':
        return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false,
        };
    case 'POST_PRODUCT_REJECTED':
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        };
    case 'POST_PRODUCT_FULFILLED':
        if (action.payload.data.status == 200)
            state.listProduct.push (action.payload.data.result[0])
        return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            listProduct: state.listProduct,
        };

    //EDIT PRODUCT
    case 'PATCH_PRODUCT_PENDING':
        return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false,
        };
    case 'PATCH_PRODUCT_REJECTED':
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        };
    case 'PATCH_PRODUCT_FULFILLED':
        const listProductAfterPatch = state.listProduct.map (products => {
            if (action.payload.data.status == 200) {
                if (products.id == action.payload.data.result[0].id) {
                    return action.payload.data.result[0];
                }
            }
            return products;
        });
         return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            listProduct: listProductAfterPatch
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