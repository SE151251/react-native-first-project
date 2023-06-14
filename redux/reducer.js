const initialState = {
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
      case "ADD_DATA":
      return {
        ...state,
        data: action.payload,
      };
      case "REMOVE_DATA":   
      return {
        ...state,
        data: action.payload,
      };
      case "REMOVE_ALL_DATA":   
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};

export default reducer;
