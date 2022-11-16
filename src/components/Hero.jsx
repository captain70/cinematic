import axios from 'axios';
import { useEffect, useState } from 'react';
import endPoints from '../endPoints';
import { TbMovie } from 'react-icons/tb';
import { MdMonitor } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/skyblue';

const Hero = () => {
	const [trending, setTrending] = useState([]);
	const [like, setLike] = useState(false);

	useEffect(() => {
		axios.get(endPoints.requestTrendingDay).then((response) => {
			setTrending(response.data.results);
		});
	}, []);

	return (
		<>
			<Splide
				hasTrack={false}
				options={{
					type: 'fade',
					rewind: true,
					autoplay: 'paused',
					pauseOnHover: true,
					pagination: true,
					arrows: true,
					resetProgress: false,
					easing: 'ease',
					interval: 7000,
					speed: 1000,
				}}
			>
				<SplideTrack>
					{trending.map((show) => {
						return (
							<SplideSlide key={show?.id}>
								<div className='w-full h-[550px] text-white'>
									<div className='w-full h-full'>
										<div className='absolute w-full h-[550px] bg-gradient-r from-black '>
											{' '}
										</div>
										<img
											className='w-full h-full object-cover'
											src={`https://image.tmdb.org/t/p/original/${show?.backdrop_path}`}
											alt={show?.title}
										/>
										<div className=' flex flex-col absolute w-3/5 max-h-fit top-[40%] left-[20%] rounded-md px-3 pt-3 backdrop-brightness-50 '>
											<div className='max-h-fit w-full'>
												<h1 className='flex justify-between text-3xl md:5xl text-white font-bold py-2'>
													{show?.original_title}
													{/* {like ? (
														<IoMdHeart className='text-2xl font-normal text-themeBlue' />
													) : (
														<IoMdHeartEmpty className='text-2xl font-normal text-themeBlue' />
													)} */}
												</h1>
												<p className='text-left text-md tracking-wide leading-normal'>
													{`${show?.overview.slice(0, 350)}..`}
												</p>
											</div>
											<div className=' flex items-center space-x-3 my-4'>
												<div className='flex mb-3'>
													<button className=' flex justify-center items-center bg-themeBlue w-full min-h-2/5  p-3 rounded-md text-xl'>
														<FaPlay className='pr-3 text-4xl' />
														Watch Now
													</button>
												</div>
												<div className='flex flex-col'>
													<div className='flex items-center space-x-2 text-sm'>
														{show?.media_type === 'movie' ? (
															<TbMovie />
														) : (
															<MdMonitor />
														)}

														<p>{show?.release_date}</p>
													</div>

													<h4 className='flex items-center text-sm'>
														Rated:{' '}
														<AiFillStar className='text-yellow-500 ml-1' />
														{show?.vote_average.toFixed(1)}
													</h4>

													<p className='text-sm'>
														out of 10 with {show?.vote_count} votes
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</SplideSlide>
						);
					})}
				</SplideTrack>

				{/* <div className='splide__progress'>
					<div className='splide__progress__bar' />
				</div>

				<button className='splide__toggle'>
					<span className='splide__toggle__play'>Play</span>
					<span className='splide__toggle__pause'>Pause</span>
				</button> */}
			</Splide>
		</>
	);
};

export default Hero;
