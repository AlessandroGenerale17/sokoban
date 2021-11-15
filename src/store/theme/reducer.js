import themes from '../../assets/themes/themes';
import themeSong from '../../assets/sounds/song.ogg';
import walk from '../../assets/sounds/footstep_concrete_003.ogg';
import push from '../../assets/sounds/push.mp3';
import nope from '../../assets/sounds/nope.mp3';
import clickSound from '../../assets/sounds/switch33.ogg';

const initialState = {
	allThemes: themes,
	selectedTheme: themes[0],
	audio: {
		themeSong: new Audio(themeSong),
		push: new Audio(push),
		walk: new Audio(walk),
		nope: new Audio(nope),
		click: new Audio(clickSound),
		isOn: false,
	},
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_SELECTED_THEME':
			return {
				...state,
				selectedTheme: action.payload,
			};
		case 'TOGGLE_AUDIO':
			return {
				...state,
				audio: {
					...state.audio,
					isOn: !state.audio.isOn,
				},
			};
		default: {
			return state;
		}
	}
}
