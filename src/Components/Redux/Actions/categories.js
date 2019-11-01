import axios from 'axios';

export const getCategories = (item, page) => {
    const token = localStorage.getItem("jwt");
    return {
        type: 'GET_CATEGORIES',
        payload: axios.get ('http://localhost:4000/api/category/',{ 
            params: {
                item,
                page
            },
            headers: {"x-access-token":token},
        })
  };
};

export const postCategories = (input) => {
    const token = localStorage.getItem("jwt");
    return {
        type: 'POST_CATEGORIES',
        payload: axios.post ('http://localhost:4000/api/category/', input, { headers: {"x-access-token":token} } )
  };
};

export const patchCategories = (input) => {
    const token = localStorage.getItem("jwt");
    const id = input.id;
    return {
        type: 'PATCH_CATEGORIES',
        payload: axios.put ('http://localhost:4000/api/category/'+id, input, { headers: {"x-access-token":token} })
    };
};

export const deleteCategories = (input) => {
    const token = localStorage.getItem("jwt");
    const id = input.id;
    return {
        type: 'DELETE_CATEGORIES',
        payload: axios.delete ('http://localhost:4000/api/category/'+id, { headers: {"x-access-token":token} })
    };
};
