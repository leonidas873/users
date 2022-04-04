import * as actionTypes from "./actionTypes";

export const initialState = {
  users: [],
  searchQuery: "",
  pagination: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: payload,
      };
    case actionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: payload,
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        users: payload,
      };
      case actionTypes.ADD_USER:
        return {
          ...state,
          users: payload,
        };  
        case actionTypes.UPDATE_USER:
          return {
            ...state,
            users: payload,
          };  
    default:
      return state;
  }
};

export default reducer;
