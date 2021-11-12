import { Routes, Route } from 'react-router-dom';
import Game from './pages/Game/';
import Menu from './pages/Menu/';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/game/:level' element={<Game />} />
				<Route path='/' element={<Menu />} />
			</Routes>
		</div>
	);
}

export default App;
