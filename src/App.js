import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './pages/Game/';
import Menu from './pages/Menu/';
import ThemeSong from './assets/sounds/song.ogg';

import './App.css';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/game/:id' element={<Game />} />
				<Route path='/' element={<Menu />} />
			</Routes>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: '3.5rem',
				}}
			>
				By Miguel Ferraris and Alessandro Generale
				<br />
				<br />
				Credits to:
				<ul>
					<li>
						<a href={'https://www.kenney.nl/assets?q=2d'}>
							Kenney Assets (Graphics)
						</a>
					</li>
					<li>
						<a href={'https://patrickdearteaga.com/arcade-music/'}>
							Patrick De Arteaga (Music)
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
