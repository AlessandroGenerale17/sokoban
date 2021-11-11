import React from 'react';
import character from '../../assets/sprites/character_0004.png';
import character2 from '../../assets/sprites/character_0005.png';
import empty from '../../assets/sprites/mapTile_022.png';
import wall from '../../assets/sprites/block_06.png';
import box from '../../assets/sprites/crate_42.png';

export default function Cell(props) {
	const { cellType, target, active } = props;

	const displayCellAs = (cellType, target) => {
		switch (cellType) {
			case 'wall':
				return wall;
			case 'player':
				return active ? character : character2;
			case 'empty':
				return target ? 'pink' : empty;
			case 'box':
				return box;
			default:
				return;
		}
	};

	const spriteSrc = displayCellAs(cellType, target);

	return (
		<div
			style={{
				width: '10vw',
				height: '10vw',
				backgroundImage: `url(${empty})`,
				backgroundSize: '100%',
			}}
		>
			{/* reacts */}
			<img src={spriteSrc} style={{ width: '100%' }} alt='' />
		</div>
	);
}
