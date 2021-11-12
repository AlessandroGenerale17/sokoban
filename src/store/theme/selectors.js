export const selectAllThemes = () => (reduxState) => {
  return reduxState.themes.allThemes;
};

export const selectTheme = () => (reduxState) =>
  reduxState.themes.selectedTheme;
