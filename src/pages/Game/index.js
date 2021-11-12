import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Cell from '../../components/cell';
import walk from '../../assets/sounds/footstep_concrete_003.ogg';
import push from '../../assets/sounds/push.mp3';
import nope from '../../assets/sounds/nope.mp3';
import { cellType } from '../../assets/levels/cellTypes';

import './index.css';

export default function Game() {
	const { level } = useParams();
	
	// automatically loads the correct level
	const {
		level1,
		initialPlayerPos,
		targets,
	} = require(`../../assets/levels/level${level}`);

	// TODO similarly the theme selected etc
	// TODO perhaps reducer? (easier than props)
	const [gridState, setGridState] = useState(level1);
	const [playerPos, setPlayerPos] = useState(initialPlayerPos);
	const [gameOver, setGameOver] = useState(false);
	const [audioPlaying, setAudioPlaying] = useState({});

	useEffect(() => {
		setAudioPlaying({
			push: new Audio(push),
			walk: new Audio(walk),
			nope: new Audio(nope),
		});
	}, []);

	const move = (playerPos, move) => {
		const from = { x: playerPos.x, y: playerPos.y };
		const to = { x: playerPos.x + move.x, y: playerPos.y + move.y };
		const box = isBox(to);
		const grid = [...gridState];
		if (box && canMove({ x: to.x + move.x, y: to.y + move.y })) {
			grid[from.x][from.y].cellType = cellType.empty;
			grid[to.x][to.y].cellType = cellType.player;
			grid[to.x + move.x][to.y + move.y].cellType = cellType.box;

			setPlayerPos({ ...to, active: !playerPos.active });
			setGridState(grid);
			playSound('push');
		} else if (canMove(to)) {
			grid[from.x][from.y].cellType = cellType.empty;
			grid[to.x][to.y].cellType = cellType.player;
			setPlayerPos({ ...to, active: !playerPos.active });
			setGridState(grid);
			playSound('walk');
		} else {
			playSound('nope');
		}

		setGameOver(isGameOver());
	};

	const playSound = (key) => {
		if (audioPlaying[key]) {
			audioPlaying[key].pause();
			audioPlaying[key].currentTime = 0;
		}
		audioPlaying[key].play();
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
			default:
				return;
		}
	};

	const isGameOver = () =>
		gridState
			.flat()
			.filter((cell) => cell.cellType === 'box' && cell.target).length ===
		targets;

	return (
		<div className='game-wrapper'>
			<div className='grid' tabIndex={0} onKeyDown={handleKeyPressed}>
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
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
