const intialState = {
  images: [],
  data: null,
  error: '',
};

const imageReducer = (state = intialState, action) => {
  switch (action.type) {
    case '[Images] Fetch Images':
      return { ...state, images: action.data };
    default:
      return { ...state };
  }
};

export default imageReducer;
