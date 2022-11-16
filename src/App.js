import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import Movies from './pages/Movies';
import Series from './pages/Series';
import SearchedShows from './pages/SearchedShows';

function App() {
	return (
		<>
			<AuthContextProvider>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/movies' element={<Movies />} />
					<Route path='/series' element={<Series />} />
					<Route path='/searched/:name' element={<SearchedShows />} />

					<Route
						path='/account'
						element={
							<ProtectedRoute>
								<Account />
							</ProtectedRoute>
						}
					/>
				</Routes>
				<Footer />
			</AuthContextProvider>
		</>
	);
}

export default App;
