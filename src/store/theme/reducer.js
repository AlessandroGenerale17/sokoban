import themes from "../../assets/themes/themes";

const initialState = {
  allThemes: themes,
  selectedTheme: themes[0],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_SELECTED_THEME":
      return {
        ...state,
        selectedTheme: action.payload,
      };
    default: {
      return state;
    }
  }
}
