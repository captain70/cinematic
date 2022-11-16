import React, { useEffect, useState } from 'react';

import { TbMovie } from 'react-icons/tb';
import { MdMonitor } from 'react-icons/md';
import axios from 'axios';
import MovieSection from './MovieSection';
import TvSection from './TvSection';

const Sections = ({ title, fetchURL }) => {
	const [movies, setMovies] = useState([]);
	const [tvShows, setTvShows] = useState([]);

	useEffect(() => {
		title === 'Movies'
			? axios.get(fetchURL).then((response) => {
					setMovies(response.data.results);
			  })
			: axios.get(fetchURL).then((response) => {
					setTvShows(response.data.results);
			  });
	}, [fetchURL, title]);

	return (
		<>
			{title === 'Movies' ? (
				<div>
					<button className='flex justify-center items-center bg-themeBlue px-4 py-2 rounded-md text-xl text-white mx-auto my-10 gap-x-2'>
						<TbMovie className='text-3xl' />
						{title}
					</button>
					<div className=' grid grid-cols-5 ml-20 gap-y-5 min-h-screen'>
						{movies.map((movie, id) => {
							return <MovieSection key={id} movie={movie} />;
						})}
					</div>
				</div>
			) : (
				<div>
					<button className='flex justify-center items-center bg-themeBlue px-4 py-2 rounded-md text-xl text-white mx-auto my-10 gap-x-2'>
						<MdMonitor className='text-2xl' />
						{title}
					</button>
					<div className=' grid grid-cols-5 ml-20 gap-y-5 min-h-screen'>
						{tvShows.map((tvShow, id) => {
							return <TvSection key={id} tvShow={tvShow} />;
						})}
					</div>
				</div>
			)}
		</>
	);
};

export default Sections;
