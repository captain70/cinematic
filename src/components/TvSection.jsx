import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { MdMonitor } from 'react-icons/md';
import { FaDownload, FaPlay } from 'react-icons/fa';
import { IoInformationCircleSharp } from 'react-icons/io5';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

const TvSection = ({ tvShow }) => {
	const [like, setLike] = useState(false);
	const [saved, setSaved] = useState(false);
	const { user } = UserAuth();

	const showID = doc(db, 'users', `${user?.email}`);

	const saveShow = async () => {
		try {
			if (user?.email) {
				setLike(!like);
				setSaved(true);
				await updateDoc(showID, {
					tvFavorites: arrayUnion({
						id: tvShow.id,
						title: tvShow.name,
						img: tvShow.backdrop_path,
						year: tvShow.first_air_date,
						rating: tvShow.vote_average,
					}),
				});
			} else {
				alert('Please log in to save a Tv Show');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const sliceString = (str, num) => {
		return str.slice(0, num);
	};
	return (
		<div
			key={tvShow?.id}
			className='w-40 h-60 group cursor-pointer perspective'
		>
			<div className='w-full h-full rounded shadow-lg bg-gradient-to-r from-stone-300 to-gray-400 border border-[#fbfdfeb2]  relative preserve-3d group-hover:my-rotate-y-180 duration-500 ease-out -z-1'>
				<div className='absolute backface-hidden w-full h-full '>
					<img
						className='h-[90%] object-cover rounded-tl rounded-tr'
						src={`https://image.tmdb.org/t/p/w500/${tvShow?.backdrop_path}`}
						alt={tvShow.name}
					/>
					<h1 className='py-1 text-xs text-center text-black'>
						{sliceString(tvShow?.name, 25)}
					</h1>
				</div>

				<div className='flex absolute justify-between top-[5%] left-0 right-0 mx-2'>
					<button className=' bg-themeBlue px-2 py-1 text-white text-xs rounded-md'>
						{sliceString(tvShow?.first_air_date, 4)}
					</button>
					<button className='bg-themeBlue px-2 text-white rounded-md text-sm'>
						{<MdMonitor />}
					</button>
				</div>
				<div className='flex absolute justify-between top-[75%] left-0 right-0 mx-2'>
					<button className='flex items-center gap-x-1 bg-themeBlue px-2 py-1 text-white text-xs rounded-md'>
						<AiFillStar className='text-yellow-500' />
						{tvShow?.vote_average.toFixed(1)}
					</button>
				</div>
				<div className='absolute my-rotate-y-180 backface-hidden w-full h-full rounded shadow-lg bg-gradient-to-r from-stone-300 to-gray-400'>
					<img
						className=' absolute h-[90%] object-cover rounded-tl rounded-tr'
						src={`https://image.tmdb.org/t/p/w500/${tvShow?.backdrop_path}`}
						alt={tvShow.name}
					/>
					<div className='absolute flex flex-col bg-gradient-to-b from-black/70 via-black/60 to-black/70 h-[90%] w-full py-2 rounded-tl rounded-tr'>
						<h2 className='text-center py-1 text-lg text-white px-2'>
							{sliceString(tvShow?.name, 30)}
						</h2>
					</div>
					<div>
						<h2 className='absolute top-[40%] right-0 left-0 text-sm text-center text-white'>
							{sliceString(tvShow?.first_air_date, 4)}
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
						<h2 className='text-xs'>{tvShow?.vote_average.toFixed(1)}</h2>
						<h2 onClick={saveShow} className='text-themeBlue'>
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
};

export default TvSection;
