import React from 'react';

export default function Cell(props) {
	const { cellType, target, active, theme } = props;

	const displayCellAs = (cellType, target) => {
		switch (cellType) {
			case 'wall':
				return theme.wall;
			case 'player':
				return active ? theme.character_1 : theme.character_2;
			// case "empty":
			//   return target ? theme.placeholder : null;
			case 'box':
				return target ? theme.placed_box : theme.box;
			default:
				return;
		}
	};

	const spriteSrc = displayCellAs(cellType, target);

	return (
		<div
			style={{
				width: '100%',
				backgroundImage: `url(${
					target ? theme.placeholder : theme.floor
				})`,
				backgroundSize: '100%',
			}}
		>
			{/* reacts */}
			{spriteSrc && (
				<img
					src={spriteSrc}
					style={{ width: '100%', height: '100%' }}
					alt=''
				/>
			)}
		</div>
	);
}
