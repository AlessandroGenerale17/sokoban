import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Overlay(props) {
	const { level, resetGame, playSound, audioOn } = props;
	return (
		<div className='overlay'>
			<div className='overlay-content'>
				<p>You passed level {level}!!</p>
				<div className='overlay-commands'>
					<button onClick={resetGame}>Play Again</button>
					<button
						onClick={() => {
							if (audioOn) playSound('click');
						}}
					>
						<Link
							style={{ textDecoration: 'none', color: 'black' }}
							to='/'
						>
							Menu
						</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
