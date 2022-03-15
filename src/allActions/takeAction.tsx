
const initialState = {
  nasaData: [],
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action:any) => {
  switch (action.type) {
    case 'GET_NASADATA':
      return {
        ...state,
        nasaData: [action.payload]
      };
    default:
      return state;
  }
};
