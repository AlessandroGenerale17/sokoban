import React, { useState } from 'react';
import Cell from '../../components/cell';

const cellType = { wall: 'wall', empty: 'empty', player: 'player', box: 'box' };
const initialGrid = [
	[
		{ x: 0, y: 0, cellType: cellType.wall },
		{ x: 0, y: 1, cellType: cellType.wall },
		{ x: 0, y: 2, cellType: cellType.wall },
		{ x: 0, y: 3, cellType: cellType.wall },
		{ x: 0, y: 4, cellType: cellType.wall },
		{ x: 0, y: 5, cellType: cellType.wall },
	],
	[
		{ x: 1, y: 0, cellType: cellType.wall },
		{ x: 1, y: 1, cellType: cellType.empty },
		{ x: 1, y: 2, cellType: cellType.box },
		{ x: 1, y: 3, cellType: cellType.empty },
		{ x: 1, y: 4, cellType: cellType.empty },
		{ x: 1, y: 5, cellType: cellType.wall },
	],
	[
		{ x: 2, y: 0, cellType: cellType.wall },
		{ x: 2, y: 1, cellType: cellType.empty },
		{ x: 2, y: 2, cellType: cellType.box },
		{ x: 2, y: 3, cellType: cellType.empty },
		{ x: 2, y: 4, cellType: cellType.empty },
		{ x: 2, y: 5, cellType: cellType.wall },
	],
	[
		{ x: 3, y: 0, cellType: cellType.wall },
		{ x: 3, y: 1, cellType: cellType.player },
		{ x: 3, y: 2, cellType: cellType.empty },
		{ x: 3, y: 3, cellType: cellType.empty },
		{ x: 3, y: 4, cellType: cellType.empty },
		{ x: 3, y: 5, cellType: cellType.wall },
	],
	[
		{ x: 4, y: 0, cellType: cellType.wall },
		{ x: 4, y: 1, cellType: cellType.empty },
		{ x: 4, y: 2, cellType: cellType.empty },
		{ x: 4, y: 3, cellType: cellType.empty },
		{ x: 4, y: 4, cellType: cellType.empty },
		{ x: 4, y: 5, cellType: cellType.wall },
	],
	[
		{ x: 5, y: 0, cellType: cellType.wall },
		{ x: 5, y: 1, cellType: cellType.wall },
		{ x: 5, y: 2, cellType: cellType.wall },
		{ x: 5, y: 3, cellType: cellType.wall },
		{ x: 5, y: 4, cellType: cellType.wall },
		{ x: 5, y: 5, cellType: cellType.wall },
	],
];

const initalPlayerPos = { x: 3, y: 1 };

export default function Game() {
	const N = 3;
	// sprites [wall, player, ball]

	const [gridState, setGridState] = useState(initialGrid);
	const [playerPos, setPlayerPos] = useState(initalPlayerPos);

	// // from
	const moveLeft = (playerPos) => {
		// to playerPos => x - 1
		const from = { x: playerPos.x, y: playerPos.y };
		const to = { x: playerPos.x, y: playerPos.y - 1 };

		const box = isBox(to);
		const grid = [...gridState];

		if (box && canMove({ x: to.x, y: to.y - 1 })) {
			grid[from.x][from.y].cellType = cellType.empty;
			grid[to.x][to.y].cellType = cellType.player;
			grid[to.x][to.y - 1].cellType = cellType.box;

			setPlayerPos(to);
			setGridState(grid);
		} else if (canMove(to)) {
			grid[from.x][from.y].cellType = cellType.empty;
			grid[to.x][to.y].cellType = cellType.player;
			setPlayerPos(to);
			setGridState(grid);
		}
	};

	const moveRight = (playerPos) => {
		const from = { x: playerPos.x, y: playerPos.y };
		const to = { x: playerPos.x, y: playerPos.y + 1 };
		const box = isBox(to);
		const grid = [...gridState];
		if (box && canMove({ x: to.x, y: to.y + 1 })) {
			grid[from.x][from.y].cellType = cellType.empty;
			grid[to.x][to.y].cellType = cellType.player;
			grid[to.x][to.y + 1].cellType = cellType.box;

			setPlayerPos(to);
			setGridState(grid);
		} else if (canMove(to)) {
			grid[from.x][from.y].cellType = cellType.empty;
			grid[to.x][to.y].cellType = cellType.player;
			setPlayerPos(to);
			setGridState(grid);
		}
	};

	const moveUp = (playerPos) => {
		const from = { x: playerPos.x, y: playerPos.y };
		const to = { x: playerPos.x - 1, y: playerPos.y };

		const box = isBox(to);
		const grid = [...gridState];

		if (box && canMove({ x: to.x - 1, y: to.y })) {
			grid[from.x][from.y].cellType = cellType.empty;
			grid[to.x][to.y].cellType = cellType.player;
			grid[to.x - 1][to.y].cellType = cellType.box;

			setPlayerPos(to);
			setGridState(grid);
		} else if (canMove(to)) {
			grid[from.x][from.y].cellType = cellType.empty;
			grid[to.x][to.y].cellType = cellType.player;
			setPlayerPos(to);
			setGridState(grid);
		}
	};

	const moveDown = (playerPos) => {
		const from = { x: playerPos.x, y: playerPos.y };
		const to = { x: playerPos.x + 1, y: playerPos.y };
		const box = isBox(to);
		const grid = [...gridState];
		if (box && canMove({ x: to.x + 1, y: to.y })) {
			grid[from.x][from.y].cellType = cellType.empty;
			grid[to.x][to.y].cellType = cellType.player;
			grid[to.x + 1][to.y].cellType = cellType.box;

			setPlayerPos(to);
			setGridState(grid);
		} else if (canMove(to)) {
			grid[from.x][from.y].cellType = cellType.empty;
			grid[to.x][to.y].cellType = cellType.player;
			setPlayerPos(to);
			setGridState(grid);
		}
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

	// TODO maybe use this
	// const move = (direction, playerPos) => {
	// 	switch (direction) {
	// 		case 'LEFT':
	// 		case 'RIGHT':
	// 		case 'UP':
	// 		case 'DOWN':
	// 	}
	// };

	const handleKeyPressed = (e) => {
		switch (e.key) {
			case 'ArrowLeft':
				moveLeft(playerPos, 'LEFT');
				break;
			case 'ArrowRight':
				moveRight(playerPos, 'RIGHT');
				break;
			case 'ArrowUp':
				moveUp(playerPos, 'UP');
				break;
			case 'ArrowDown':
				moveDown(playerPos, 'DOWN');
				break;
			default:
				return;
		}
	};

	console.log(gridState);

	return (
		<div className='grid' tabIndex={0} onKeyDown={handleKeyPressed}>
			{/* ROW 0 */}
			{/* ROW 1 */}
			{/* ROW 2 */}
			{/* grid.map((row) => ) */}
			{gridState.map((row, i) => (
				<div key={i} style={{ display: 'flex' }}>
					{row.map((cell, j) => (
						<Cell key={j} cellType={cell.cellType} />
					))}
				</div>
			))}
			<button onClick={() => moveLeft(playerPos)}>MoveLeft</button>
		</div>
	);
}
