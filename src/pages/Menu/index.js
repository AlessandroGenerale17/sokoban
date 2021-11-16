import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	selectAllThemes,
	selectTheme,
	selectAudio,
} from '../../store/theme/selectors';
import { setSelectedTheme, toggleAudio } from '../../store/theme/actions';
import AudioOn from '../../assets/sprites/audioOn.png';
import AudioOff from '../../assets/sprites/audioOff.png';
import './menu.css';

export default function Menu() {
	const navigate = useNavigate();
	const [themeIndex, setThemeIndex] = useState(0);

	const allThemes = useSelector(selectAllThemes());
	const theme = useSelector(selectTheme());
	const audio = useSelector(selectAudio());
	const dispatch = useDispatch();

	const playSound = (key) => {
		if (audio[key]) {
			audio[key].pause();
			audio[key].currentTime = 0;
		}
		audio[key].play();
	};

	const handleClick = (i) => {
		const index = themeIndex + i;
		if (index === allThemes.length) {
			setThemeIndex(0);
			dispatch(setSelectedTheme(allThemes[0]));
		} else if (index < 0) {
			setThemeIndex(allThemes.length - 1);
			dispatch(setSelectedTheme(allThemes[allThemes.length - 1]));
		} else {
			setThemeIndex(index);
			dispatch(setSelectedTheme(allThemes[index]));
		}
		if (audio.isOn) playSound('click');
	};

	return (
		<div
			className='menuBox'
			style={{
				background: `url(${theme.floor})`,
				position: 'relative',
			}}
		>
			<h1>Sokoban</h1>

			<h3>Select level:</h3>
			<select
				name='level'
				id='level'
				onChange={(event) => {
					if (audio.isOn) playSound('click');
					navigate(`/game/${event.target.value}`);
				}}
			>
				<option>...</option>
				<option value='1'>level 1</option>
				<option value='2'>level 2</option>
				<option value='3'>level 3</option>
			</select>

			<h3>Select theme:</h3>

			<div className='themeSelector'>
				<p>{theme.theme}</p>
				<div className='themes'>
					<button onClick={() => handleClick(-1)}>&lt;</button>
					<img src={theme.character_1} alt={theme.name}></img>
					<button onClick={() => handleClick(1)}>&gt;</button>
				</div>
			</div>
			<img
				src={audio.isOn ? AudioOn : AudioOff}
				alt=''
				style={{ width: '2.5vw', position: 'absolute', right: '1vw' }}
				onClick={() => {
					dispatch(toggleAudio());
					if (!audio.isOn) {
						audio.themeSong.loop = true;
						playSound('click');
						playSound('themeSong');
					} else audio['themeSong'].pause();
				}}
			></img>
			<h3>Top scores:</h3>
		</div>
	);
}
