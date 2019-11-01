const initialState = {
    listCategory: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
};

const categories = (state = initialState, action) => {
    switch (action.type) {
        // GET CATEGORIES
        case 'GET_CATEGORIES_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
        };
    case 'GET_CATEGORIES_REJECTED':
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        };
    case 'GET_CATEGORIES_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            listCategory: action.payload.data.result.response,
        };
    
    // POST CATEGORIES
    case 'POST_CATEGORIES_PENDING':
        return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false,
        };
    case 'POST_CATEGORIES_REJECTED':
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        };
    case 'POST_CATEGORIES_FULFILLED':
        if (action.payload.data.status == 200)
            state.listCategory.push (action.payload.data.result[0])
        return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            listCategory: state.listCategory,
        };

    // EDIT CATEGORIES
    case 'PATCH_CATEGORIES_PENDING':
        return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false,
        };
    case 'PATCH_CATEGORIES_REJECTED':
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        };
    case 'PATCH_CATEGORIES_FULFILLED':
        const listCategoryAfterPatch = state.listCategory.map (categories => {
            if (action.payload.data.status == 200) {
                if (categories.id == action.payload.data.response.id) {
                    return action.payload.data.response;
                }
            }
            return categories;
        });
        return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            listCategory: listCategoryAfterPatch
        };

    // DELETE CATEGORIES
    case 'DELETE_CATEGORIES_PENDING':
        return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false,
        };
    case 'DELETE_CATEGORIES_REJECTED':
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        };
    case 'DELETE_CATEGORIES_FULFILLED':
        const dataAfterDelete = state.listCategory.filter((value) => {
            return value.id != action.payload.data.id });
        return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            listCategory: dataAfterDelete,
        };
     
      default:
        return state;
    }
};

export default categories;