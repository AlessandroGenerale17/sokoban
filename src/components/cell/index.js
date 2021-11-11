import React from 'react';

export default function Cell(props) {
	const { cellType, target } = props;

	const displayCellAs = (cellType, target) => {
		switch (cellType) {
			case 'wall':
				return 'black';
			case 'player':
				return 'red';
			case 'empty':
				return target ? 'pink' : 'white';
			case 'box':
				return 'brown';
			default:
				return;
		}
	};

	const background = displayCellAs(cellType, target);

	return (
		<div
			style={{
				width: '10vw',
				height: '10vw',
				border: '1px solid black',
				backgroundColor: background,
			}}
		></div>
	);
}
