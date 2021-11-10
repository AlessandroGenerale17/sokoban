import React, { useState } from 'react';
const grid = [
	[
		{ x: 0, y: 1, val: false },
		{ x: 0, y: 1, val: false },
		{ x: 0, y: 2, val: false },
	],
	[
		{ x: 1, y: 0, val: false },
		{ x: 1, y: 1, val: false },
		{ x: 1, y: 2, val: false },
	],
	[
		{ x: 2, y: 0, val: false },
		{ x: 2, y: 1, val: false },
		{ x: 2, y: 2, val: true },
	],
];

const initalPlayerPos = { x: 2, y: 2 };

export default function Game() {
	const N = 3;
	// sprites [wall, player, ball]

	const [gridState, setGridState] = useState(grid);
	const [playerPos, setPlayerPos] = useState(initalPlayerPos);

	// // from
	const moveLeft = (playerPos) => {
		// to playerPos => x - 1
		const from = { x: playerPos.x, y: playerPos.y };
		const to = { x: playerPos.x, y: playerPos.y - 1 };
		// if the player can move
		/* grid[playerPos[0]] => selects row  */
		// players was
		// grid[2][2].val = false;
		// player is
		// grid[2][1].val = true;
		const gridy = [...gridState];
		gridy[from.x][from.y].val = false;
		gridy[to.x][to.y].val = true;
		setPlayerPos(to);
		setGridState(gridy);
	};

	const moveRight = (playerPos) => {
		const from = { x: playerPos.x, y: playerPos.y };
		const to = { x: playerPos.x, y: playerPos.y + 1 };
		const gridy = [...gridState];
		gridy[from.x][from.y].val = false;
		gridy[to.x][to.y].val = true;
		setPlayerPos(to);
		setGridState(gridy);
	};

	const handleKeyPressed = (e) => {
		if (e.key === 'ArrowLeft') moveLeft(playerPos);
		else if (e.key === 'ArrowRight') moveRight(playerPos);
	};

	return (
		<div className='grid' tabIndex={0} onKeyDown={handleKeyPressed}>
			{/* ROW 0 */}
			{/* ROW 1 */}
			{/* ROW 2 */}
			{/* grid.map((row) => ) */}
			{gridState.map((row, i) => (
				<div key={i} style={{ display: 'flex' }}>
					{row.map((cell, j) => (
						<div
							key={j}
							style={{
								width: '10vw',
								height: '10vw',
								border: '1px solid black',
								backgroundColor: cell.val ? 'red' : 'white',
							}}
						>
							{/* <img
								// src='https://cdnb.artstation.com/p/assets/images/images/035/877/165/large/gregory-ligman-brick-wall-tile.jpg?1616129544'
								//style={{ height: '100%' }}
								//alt=''
							/> */}
						</div>
					))}
				</div>
			))}
			<button onClick={() => moveLeft(playerPos)}>MoveLeft</button>
		</div>
	);
}
