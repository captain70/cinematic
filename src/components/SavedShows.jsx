import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsCameraVideoFill } from 'react-icons/bs';
import { FaDownload, FaPlay } from 'react-icons/fa';
import { IoInformationCircleSharp } from 'react-icons/io5';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { IoMdCloseCircle } from 'react-icons/io';

const SavedShows = () => {
	const [shows, setShows] = useState([]);
	const { user } = UserAuth();

	useEffect(() => {
		onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
			setShows(doc.data()?.favoriteShows);
		});
	}, [user?.email]);

	const sliceString = (str, num) => {
		return str.slice(0, num);
	};

	const showRef = doc(db, 'users', `${user?.email}`);
	const deleteShow = async (passedId) => {
		try {
			const remainingShows = shows.filter((item) => item.id !== passedId);
			await updateDoc(showRef, {
				favoriteShows: remainingShows,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className=' grid grid-cols-5 ml-20 gap-y-4 min-h-screen'>
				{shows.map((show, id) => {
					return (
						<div
							key={id}
							className='w-40 h-60 group cursor-pointer perspective'
						>
							<div className='w-full h-full rounded shadow-lg bg-gradient-to-r from-stone-300 to-gray-400 border border-[#fbfdfeb2]  relative preserve-3d group-hover:my-rotate-y-180 duration-500 ease-out'>
								<div className='absolute backface-hidden w-full h-full '>
									<img
										className='h-[90%] object-cover rounded-tl rounded-tr'
										src={`https://image.tmdb.org/t/p/w500/${show?.img}`}
										alt={show.title}
									/>
									<h1 className='py-1 text-xs text-center text-black'>
										{sliceString(show?.title, 25)}
									</h1>
								</div>

								<div className='flex absolute justify-between top-[5%] left-0 right-0 mx-2'>
									<button className=' bg-themeBlue px-2 py-1 text-white text-xs rounded-md'>
										{sliceString(show?.year, 4)}
									</button>
									<button className='bg-themeBlue px-2 text-white rounded-md text-sm'>
										{<BsCameraVideoFill />}
									</button>
								</div>
								<div className='flex absolute justify-between top-[75%] left-0 right-0 mx-2'>
									<button className='flex items-center gap-x-1 bg-themeBlue px-2 py-1 text-white text-xs rounded-md'>
										<AiFillStar className='text-yellow-500' />
										{show?.rating}
									</button>
								</div>
								<div className='absolute my-rotate-y-180 backface-hidden w-full h-full rounded shadow-lg bg-gradient-to-r from-stone-300 to-gray-400'>
									<img
										className=' absolute h-[90%] object-cover rounded-tl rounded-tr'
										src={`https://image.tmdb.org/t/p/w500/${show?.img}`}
										alt={show.title}
									/>
									<div className='absolute flex flex-col bg-gradient-to-b from-black/70 via-black/60 to-black/70 h-[90%] w-full py-2 rounded-tl rounded-tr'>
										<h2 className='text-center py-1 text-lg text-white px-2'>
											{sliceString(show?.title, 30)}
										</h2>
									</div>
									<div>
										<h2 className='absolute top-[40%] right-0 left-0 text-sm text-center text-white'>
											{sliceString(show?.year, 4)}
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
									<div className='absolute flex items-center space-x-1 top-[90%] py-1 px-1'>
										<h2 className='text-themeBlue text-sm'>
											<FaDownload className='mx-2' />
										</h2>
										<h1 className='text-xs ml-3'>Rated:</h1>
										<AiFillStar className='text-yellow-500 mr-2' />
										<h2 className='text-xs'>{show?.rating}</h2>
										<h2
											onClick={() => deleteShow(show.id)}
											className='text-xl pl-1  font-bold text-red-600'
										>
											<IoMdCloseCircle />
										</h2>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SavedShows;
