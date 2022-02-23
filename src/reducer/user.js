const userReducer = (initialState, action) => {
  console.log("in to do reducer", action);

  switch (action.type) {
    case "Get":
      return {
        users: action.users.results,
      };
    //  break;
    case "List":
      if (action.data.status === 1) {
        
        return {
          ...initialState,
          users: action.data.results,
          totalResults: action.data.totalResults,
        };
      } else {
        return {
          ...initialState,
          error: action.data.message,
        };
      }

    case "Add":
      return {
        ...initialState,
        success: action.payload.message,
        // todo: action.results,
      };
    case "Delete":
      return {
        ...initialState,
        success: action.data.message,
        // todo: action.results,
      };
    case "Update":
      return {
        ...initialState,
        user:action.data
      }  
    default:
      break;
  }
};

export default userReducer;
