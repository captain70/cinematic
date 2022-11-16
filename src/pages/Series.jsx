import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { FaDownload, FaPlay } from 'react-icons/fa';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { IoInformationCircleSharp } from 'react-icons/io5';
import endPoints from '../endPoints';
import { MdMonitor } from 'react-icons/md';
import TvGenre from '../components/TvGenre';

const Series = () => {
	const [like, setLike] = useState(false);
	const [saved, setSaved] = useState(false);
	const [series, setSeries] = useState([]);

	useEffect(() => {
		axios.get(endPoints.requestTvAiringToday).then((response) => {
			setSeries(response.data.results);
		});
	}, []);

	const fetchSubData = useCallback((text) => {
		let url = `https://api.themoviedb.org/3/tv/${text}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2`;
		axios.get(url).then((response) => {
			setSeries(response.data.results);
		});
	}, []);

	const sliceString = (str, num) => {
		return str.slice(0, num);
	};
	return (
		<>
			<div>
				<button className='flex justify-center items-center bg-themeBlue px-3 py-1 rounded-md text-xl text-white mx-auto mt-6 mb-3 gap-x-2 '>
					<MdMonitor className='text-2xl' />
					Series
				</button>
				<div className='flex items-center justify-center space-x-7 my-7'>
					<button
						onClick={() => fetchSubData('airing_today')}
						value
						className='text-themeBlue border border-themeBlue bg-transparent hover:bg-themeBlue hover:text-white focus:bg-themeBlue focus:text-white rounded-sm py-1 px-5 '
					>
						Playing Today
					</button>
					<button
						onClick={() => fetchSubData('on_the_air')}
						value
						className='text-themeBlue border border-themeBlue bg-transparent hover:bg-themeBlue hover:text-white focus:bg-themeBlue focus:text-white rounded-sm py-1 px-5 '
					>
						Currently Airing
					</button>

					<button
						onClick={() => fetchSubData('popular')}
						className='text-themeBlue border border-themeBlue bg-transparent hover:bg-themeBlue hover:text-white focus:bg-themeBlue focus:text-white rounded-sm py-1 px-5'
					>
						Popular
					</button>
					<button
						onClick={() => fetchSubData('top_rated')}
						className='text-themeBlue border border-themeBlue bg-transparent hover:bg-themeBlue hover:text-white focus:bg-themeBlue focus:text-white rounded-sm py-1 px-5'
					>
						Top Rated
					</button>
					<TvGenre setSeries={setSeries} />
				</div>
			</div>

			<div className=' grid grid-cols-5 ml-20 gap-y-5 min-h-screen'>
				{series.map((serie, id) => {
					return (
						<div
							key={id}
							className='w-40 h-60 group cursor-pointer perspective'
						>
							<div className='w-full h-full rounded shadow-lg bg-gradient-to-r from-stone-300 to-gray-400 border border-[#fbfdfeb2]  relative preserve-3d group-hover:my-rotate-y-180 duration-500 ease-out -z-1'>
								<div className='absolute backface-hidden w-full h-full '>
									<img
										className='h-[90%] object-cover rounded-tl rounded-tr'
										src={`https://image.tmdb.org/t/p/w500/${serie?.backdrop_path}`}
										alt={serie.name}
									/>
									<h1 className='py-1 text-xs text-center text-black'>
										{sliceString(serie?.name, 25)}
									</h1>
								</div>

								<div className='flex absolute justify-between top-[5%] left-0 right-0 mx-2'>
									<button className=' bg-themeBlue px-2 py-1 text-white text-xs rounded-md'>
										{sliceString(serie?.first_air_date, 4)}
									</button>
									<button className='bg-themeBlue px-2 text-white rounded-md text-sm'>
										{<MdMonitor />}
									</button>
								</div>
								<div className='flex absolute justify-between top-[75%] left-0 right-0 mx-2'>
									<button className='flex items-center gap-x-1 bg-themeBlue px-2 py-1 text-white text-xs rounded-md'>
										<AiFillStar className='text-yellow-500' />
										{serie?.vote_average.toFixed(1)}
									</button>
								</div>
								<div className='absolute my-rotate-y-180 backface-hidden w-full h-full rounded shadow-lg bg-gradient-to-r from-stone-300 to-gray-400'>
									<img
										className=' absolute h-[90%] object-cover rounded-tl rounded-tr'
										src={`https://image.tmdb.org/t/p/w500/${serie?.backdrop_path}`}
										alt={serie.name}
									/>
									<div className='absolute flex flex-col bg-gradient-to-b from-black/70 via-black/60 to-black/70 h-[90%] w-full py-2 rounded-tl rounded-tr'>
										<h2 className='text-center py-1 text-lg text-white px-2'>
											{sliceString(serie?.name, 30)}
										</h2>
									</div>
									<div>
										<h2 className='absolute top-[40%] right-0 left-0 text-sm text-center text-white'>
											{sliceString(serie?.first_air_date, 4)}
										</h2>
									</div>
									<div className='absolute top-[50%] right-0 left-0'>
										<IoInformationCircleSharp className='text-center mx-auto text-themeBlue text-3xl' />
									</div>
									<div className='absolute text-center top-[70%] left-0 right-0'>
										<button className=' flex items-center gap-x-2 bg-themeBlue hover:bg-[#0b6e7e] rounded cursor-pointer text-white mx-auto px-4 py-1 text-lg'>
											<FaPlay />
											Trailer
										</button>
									</div>
									<div className='absolute flex items-center space-x-1 top-[90%] pt-1 '>
										<h2 className='text-themeBlue text-sm'>
											<FaDownload className='mx-2' />
										</h2>
										<h1 className='text-xs ml-3'>Rated:</h1>
										<AiFillStar className='text-yellow-500 mr-2' />
										<h2 className='text-xs'>
											{serie?.vote_average.toFixed(1)}
										</h2>
										<h2 className='text-themeBlue'>
											{like ? (
												<IoMdHeart className='ml-5 font-bold' />
											) : (
												<IoMdHeartEmpty className='ml-5 font-bold' />
											)}
										</h2>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Series;
