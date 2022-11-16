import React from 'react';
import { AiFillTwitterCircle, AiOutlineCopyright } from 'react-icons/ai';

import { FaFacebook, FaTelegram } from 'react-icons/fa';
import { RiInstagramFill, RiMovie2Fill } from 'react-icons/ri';
import { RiWhatsappFill } from 'react-icons/ri';
import { BsReddit, BsPinterest } from 'react-icons/bs';

const Footer = () => {
	return (
		<div className='w-full mt-48 bg-black/90 py-4 px-4 relative bottom-0'>
			<div className='flex-col mx-auto items-center justify-center sm:flex-row py-2 text-gray-500'>
				<div className='flex justify-center items-center mx-auto mb-3 mt-1 sm:w-[300px] text-xl space-x-3 '>
					<a
						href='https://www.facebook.com/'
						className='text-2xl text-blue-600 hover:text-blue-700'
					>
						<FaFacebook />
					</a>
					<a
						href='https://www.instagram.com/'
						className='text-2xl text-amber-600 hover:text-amber-700'
					>
						<RiInstagramFill />
					</a>
					<a
						href='https://www.twitter.com/'
						className='text-2xl text-blue-400 hover:text-blue-500'
					>
						<AiFillTwitterCircle />
					</a>
					<a
						href='https://www.pinterest.com/'
						className=' text-2xl  text-red-700 hover:text-red-800'
					>
						<BsPinterest />
					</a>
					<a
						href='https://www.whatsapp.com/'
						className=' text-2xl text-green-400 hover:text-green-500'
					>
						<RiWhatsappFill />
					</a>
					<a
						href='https://www.telegram.com/'
						className=' text-2xl text-blue-400 hover:text-blue-500'
					>
						<FaTelegram />
					</a>
					<a
						href='https://www.reddit.com/'
						className=' text-2xl  text-red-500 hover:text-red-600'
					>
						<BsReddit />
					</a>
				</div>

				<div className='text-xs text-white '>
					<p className='flex items-center justify-center'>
						<AiOutlineCopyright className='mr-1' />
						2022 <RiMovie2Fill className='ml-1 text-themeBlue' />
						Cinematic.com, LTD. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
