import * as types from "./actionTypes.js";

const initialState = {
  technologies: [],
  technology: {},
  loading: true,
};

const techReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TECHNOLOGIES:
      return {
        ...state,
        technologies: action.payload,
        loading: false,
      };
    case types.GET_TECHNOLOGY:
      return{
        ...state,
        technology: action.payload,
        loading:false
      }
    case types.UPDATE_TECHNOLOGY:
      return{
        ...state,
        loading:false
      }
    case types.DELETE_TECHNOLOGY:
      return{
        ...state,
        loading: false
      }
    default:
      return state;
  }
};

export default techReducers;
