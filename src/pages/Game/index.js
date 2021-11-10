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
	const [gridState, setGridState] = useState(initialGrid);
	const [playerPos, setPlayerPos] = useState(initalPlayerPos);

	const move = (playerPos, move) => {
		const from = { x: playerPos.x, y: playerPos.y };
		const to = { x: playerPos.x + move.x, y: playerPos.y + move.y };
		const box = isBox(to);
		const grid = [...gridState];
		if (box && canMove({ x: to.x + move.x, y: to.y + move.y })) {
			grid[from.x][from.y].cellType = cellType.empty;
			grid[to.x][to.y].cellType = cellType.player;
			grid[to.x + move.x][to.y + move.y].cellType = cellType.box;

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
		</div>
	);
}
