import React from 'react';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Sections from '../components/Sections';
import endPoints from '../endPoints';

const Home = () => {
	return (
		<>
			<Hero />
			<Sections title='Movies' fetchURL={endPoints.requestMovieNowPlaying} />
			<Sections title='TV Shows' fetchURL={endPoints.requestTvAiringToday} />
		</>
	);
};

export default Home;
