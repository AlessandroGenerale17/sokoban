import React, { useState, useEffect } from 'react';
import Cell from '../../components/cell';
import walk from '../../assets/sounds/footstep_concrete_003.ogg';
import push from '../../assets/sounds/push.mp3';
import nope from '../../assets/sounds/nope.mp3';
import './index.css';
const cellType = {
	wall: 'wall',
	empty: 'empty',
	player: 'player',
	box: 'box',
};
const initialGrid = [
	[
		{ x: 0, y: 0, cellType: cellType.empty, target: false },
		{ x: 0, y: 1, cellType: cellType.empty, target: false },
		{ x: 0, y: 2, cellType: cellType.wall, target: false },
		{ x: 0, y: 3, cellType: cellType.wall, target: false },
		{ x: 0, y: 4, cellType: cellType.wall, target: false },
		{ x: 0, y: 5, cellType: cellType.wall, target: false },
		{ x: 0, y: 6, cellType: cellType.wall, target: false },
		{ x: 0, y: 7, cellType: cellType.empty, target: false },
	],
	[
		{ x: 1, y: 0, cellType: cellType.wall, target: false },
		{ x: 1, y: 1, cellType: cellType.wall, target: false },
		{ x: 1, y: 2, cellType: cellType.wall, target: false },
		{ x: 1, y: 3, cellType: cellType.empty, target: false },
		{ x: 1, y: 4, cellType: cellType.empty, target: false },
		{ x: 1, y: 5, cellType: cellType.empty, target: false },
		{ x: 1, y: 6, cellType: cellType.wall, target: false },
		{ x: 1, y: 7, cellType: cellType.empty, target: false },
	],
	[
		{ x: 2, y: 0, cellType: cellType.wall, target: false },
		{ x: 2, y: 1, cellType: cellType.empty, target: true },
		{ x: 2, y: 2, cellType: cellType.player, target: false },
		{ x: 2, y: 3, cellType: cellType.box, target: false },
		{ x: 2, y: 4, cellType: cellType.empty, target: false },
		{ x: 2, y: 5, cellType: cellType.empty, target: false },
		{ x: 2, y: 6, cellType: cellType.wall, target: false },
		{ x: 2, y: 7, cellType: cellType.empty, target: false },
	],
	[
		{ x: 3, y: 0, cellType: cellType.wall, target: false },
		{ x: 3, y: 1, cellType: cellType.wall, target: false },
		{ x: 3, y: 2, cellType: cellType.wall, target: false },
		{ x: 3, y: 3, cellType: cellType.empty, target: false },
		{ x: 3, y: 4, cellType: cellType.box, target: false },
		{ x: 3, y: 5, cellType: cellType.empty, target: true },
		{ x: 3, y: 6, cellType: cellType.wall, target: false },
		{ x: 3, y: 7, cellType: cellType.empty, target: false },
	],
	[
		{ x: 4, y: 0, cellType: cellType.wall, target: false },
		{ x: 4, y: 1, cellType: cellType.empty, target: true },
		{ x: 4, y: 2, cellType: cellType.wall, target: false },
		{ x: 4, y: 3, cellType: cellType.wall, target: false },
		{ x: 4, y: 4, cellType: cellType.box, target: false },
		{ x: 4, y: 5, cellType: cellType.empty, target: false },
		{ x: 4, y: 6, cellType: cellType.wall, target: false },
		{ x: 4, y: 7, cellType: cellType.empty, target: false },
	],
	[
		{ x: 5, y: 0, cellType: cellType.wall, target: false },
		{ x: 5, y: 1, cellType: cellType.empty, target: false },
		{ x: 5, y: 2, cellType: cellType.wall, target: false },
		{ x: 5, y: 3, cellType: cellType.empty, target: false },
		{ x: 5, y: 4, cellType: cellType.empty, target: true },
		{ x: 5, y: 5, cellType: cellType.empty, target: false },
		{ x: 5, y: 6, cellType: cellType.wall, target: false },
		{ x: 5, y: 7, cellType: cellType.wall, target: false },
	],
	[
		{ x: 6, y: 0, cellType: cellType.wall, target: false },
		{ x: 6, y: 1, cellType: cellType.box, target: false },
		{ x: 6, y: 2, cellType: cellType.empty, target: false },
		{ x: 6, y: 3, cellType: cellType.box, target: true },
		{ x: 6, y: 4, cellType: cellType.box, target: false },
		{ x: 6, y: 5, cellType: cellType.box, target: false },
		{ x: 6, y: 6, cellType: cellType.empty, target: true },
		{ x: 6, y: 7, cellType: cellType.wall, target: false },
	],
	[
		{ x: 7, y: 0, cellType: cellType.wall, target: false },
		{ x: 7, y: 1, cellType: cellType.empty, target: false },
		{ x: 7, y: 2, cellType: cellType.empty, target: false },
		{ x: 7, y: 3, cellType: cellType.empty, target: false },
		{ x: 7, y: 4, cellType: cellType.empty, target: true },
		{ x: 7, y: 5, cellType: cellType.empty, target: false },
		{ x: 7, y: 6, cellType: cellType.empty, target: false },
		{ x: 7, y: 7, cellType: cellType.wall, target: false },
	],
	[
		{ x: 8, y: 0, cellType: cellType.wall, target: false },
		{ x: 8, y: 1, cellType: cellType.wall, target: false },
		{ x: 8, y: 2, cellType: cellType.wall, target: false },
		{ x: 8, y: 3, cellType: cellType.wall, target: false },
		{ x: 8, y: 4, cellType: cellType.wall, target: false },
		{ x: 8, y: 5, cellType: cellType.wall, target: false },
		{ x: 8, y: 6, cellType: cellType.wall, target: false },
		{ x: 8, y: 7, cellType: cellType.wall, target: false },
	],
];

const targets = 7;
const initalPlayerPos = { x: 2, y: 2, active: false };

export default function Game() {
	const [gridState, setGridState] = useState(initialGrid);
	const [playerPos, setPlayerPos] = useState(initalPlayerPos);
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
				{gameOver && <p>Game Over</p>}
			</div>
		</div>
	);
}
