import React from 'react';
import character from '../../assets/sprites/character-legs-together.png';
import character2 from '../../assets/sprites/character-legs-apart.png';
import empty from '../../assets/sprites/empty-grass-tile.png';
import wall from '../../assets/sprites/brick-wall.png';
import box from '../../assets/sprites/box.png';
import placeholder from '../../assets/sprites/placeholder-box.png';
import boxPlaced from '../../assets/sprites/placed-box.png';

export default function Cell(props) {
	const { cellType, target, active } = props;

	const displayCellAs = (cellType, target) => {
		switch (cellType) {
			case 'wall':
				return wall;
			case 'player':
				return active ? character : character2;
			case 'empty':
				return target ? placeholder : empty;
			case 'box':
				return target ? boxPlaced : box;
			default:
				return;
		}
	};

	const spriteSrc = displayCellAs(cellType, target);

	return (
		<div
			style={{
				width: '2.5vw',
				height: '2.5vw',
				backgroundImage: `url(${empty})`,
				backgroundSize: '100%',
			}}
		>
			{/* reacts */}
			<img src={spriteSrc} style={{ width: '100%' }} alt='' />
		</div>
	);
}
