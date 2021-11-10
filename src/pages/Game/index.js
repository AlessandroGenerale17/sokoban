import React, { useState, useEffect } from 'react';
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

	// console.log(grid[2]);
	// console.log(grid[2][2]);
	// n * m
	/*
        [
         0 [
              [0, 0], [0, 1], [0, 2]
          ]
         1 [
              [1, 0], [1, 1], [1, 2]
          ]
        2 [
            [2, 0], [2, 1], [2, 2]
          ]
        ]
    */
	/* Current player 0, 0*/

	/* EVENT LISTENER for key right */
	/* moveRight()*/
	return (
		<div className='grid'>
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
								border: '1px solid black',
								width: '20vw',
								height: '20vw',
								backgroundColor: `${
									cell.val ? 'red' : 'white'
								}`,
							}}
						></div>
					))}
				</div>
			))}
			<button onClick={() => moveLeft(playerPos)}>MoveLeft</button>
		</div>
	);
}
