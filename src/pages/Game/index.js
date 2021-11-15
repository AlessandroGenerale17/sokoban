import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Cell from '../../components/cell';
import { cellType } from '../../assets/levels/cellTypes';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, selectAudio } from '../../store/theme/selectors';
import { toggleAudio } from '../../store/theme/actions';
import AudioOff from '../../assets/sprites/audioOffBlack.png';
import AudioOn from '../../assets/sprites/audioOnBlack.png';
import BackToMenu from '../../assets/sprites/backToMenu.png';
import Overlay from '../../components/overlay';

import './index.css';

export default function Game() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		level,
		initialPlayerPos,
		targets,
	} = require(`../../assets/levels/level${id}`);

	const [gridState, setGridState] = useState(level);
	const [playerPos, setPlayerPos] = useState(initialPlayerPos);
	const [moves, setMoves] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const theme = useSelector(selectTheme());
	const audio = useSelector(selectAudio());

	const move = (playerPos, move) => {
		const from = { x: playerPos.x, y: playerPos.y };
		const to = { x: playerPos.x + move.x, y: playerPos.y + move.y };
		const box = isBox(to);
		const grid = JSON.parse(JSON.stringify(gridState));
		if (box && canMove({ x: to.x + move.x, y: to.y + move.y })) {
			grid[from.x][from.y].cellType = cellType.empty;
			grid[to.x][to.y].cellType = cellType.player;
			grid[to.x + move.x][to.y + move.y].cellType = cellType.box;

			setPlayerPos({ ...to, active: !playerPos.active });
			setGridState(grid);
			setMoves((prev) => prev + 1);
			if (audio.isOn) playSound('push');
		} else if (canMove(to)) {
			grid[from.x][from.y].cellType = cellType.empty;
			grid[to.x][to.y].cellType = cellType.player;
			setPlayerPos({ ...to, active: !playerPos.active });
			setGridState(grid);
			setMoves((prev) => prev + 1);
			if (audio.isOn) playSound('walk');
		} else {
			if (audio.isOn) playSound('nope');
		}

		setGameOver(isGameOver(grid));
	};

	const playSound = (key) => {
		if (audio[key]) {
			audio[key].pause();
			audio[key].currentTime = 0;
		}
		audio[key].play();
	};

	const canMove = (to) =>
		!gridState
			.flat()
			.filter(
				(cell) =>
					(cell.cellType === 'wall' || cell.cellType === 'box') &&
					cell.x === to.x &&
					cell.y === to.y
			).length;

	const isBox = (to) =>
		gridState
			.flat()
			.filter(
				(cell) =>
					cell.cellType === 'box' &&
					cell.x === to.x &&
					cell.y === to.y
			).length;

	const handleKeyPressed = (e) => {
		if (!gameOver)
			switch (e.key) {
				case 'ArrowLeft':
					move(playerPos, { x: 0, y: -1 });
					break;
				case 'ArrowRight':
					move(playerPos, { x: 0, y: 1 });
					break;
				case 'ArrowUp':
					move(playerPos, { x: -1, y: 0 });
					break;
				case 'ArrowDown':
					move(playerPos, { x: 1, y: 0 });
					break;
				case ' ':
					resetGame();
					break;
				default:
					return;
			}
	};

	const resetGame = () => {
		if (audio.isOn) playSound('click');
		setGridState(level);
		setPlayerPos(initialPlayerPos);
		setGameOver(false);
		setMoves(0);
	};

	const isGameOver = (grid) =>
		grid.flat().filter((cell) => cell.cellType === 'box' && cell.target)
			.length === targets;

	console.log(gameOver);
	console.log(
		gridState
			.flat()
			.filter((cell) => cell.cellType === 'box' && cell.target)
	);
	return (
		<div className='container'>
			<div
				className='game-wrapper'
				tabIndex={0}
				onKeyDown={handleKeyPressed}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<div>
						<h2 style={{ textAlign: 'center' }}>Level {id}</h2>
						<p>Press the space bar to reset</p>
					</div>
					<div style={{ alignSelf: 'center' }}>
						<img
							style={{ width: '4.0vw', marginLeft: '0.8rem' }}
							src={BackToMenu}
							alt=''
							onClick={() => {
								if (audio.isOn) playSound('click');
								navigate('/');
							}}
						/>
					</div>
				</div>
				<div className='grid'>
					{gameOver && (
						<Overlay
							level={id}
							resetGame={resetGame}
							playSound={playSound}
							audioOn={audio.isOn}
						/>
					)}
					{gridState.map((row, i) => (
						<div key={i} style={{ display: 'flex' }}>
							{row.map((cell, j) => (
								<Cell
									key={j}
									cellType={cell.cellType}
									target={cell.target}
									active={
										cell.cellType === 'player' &&
										playerPos.active
									}
									theme={theme}
								/>
							))}
						</div>
					))}
				</div>
				<div className='game-stats'>
					<img
						style={{ width: '1.5vw' }}
						src={audio.isOn ? AudioOn : AudioOff}
						alt=''
						onClick={() => {
							dispatch(toggleAudio());
							if (!audio.isOn) {
								audio.themeSong.loop = true;
								playSound('click');
								playSound('themeSong');
							} else audio['themeSong'].pause();
						}}
					/>
					<span>Moves: {moves} </span>
				</div>
			</div>
		</div>
	);
}
