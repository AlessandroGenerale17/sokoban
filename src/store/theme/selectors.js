export const selectAllThemes = () => (reduxState) => {
	return reduxState.themes.allThemes;
};

export const selectTheme = () => (reduxState) =>
	reduxState.themes.selectedTheme;

export const selectAudio = () => (reduxState) => reduxState.themes.audio;
