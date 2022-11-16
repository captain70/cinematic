import React from 'react';
import SavedShows from '../components/SavedShows';

const Account = () => {
	console.log();
	return (
		<>
			<div className=' flex flex-col  items-center justify-center w-full text-white'>
				<button className='my-7 text-xl bg-themeBlue rounded-md px-4 py-1'>
					My List
				</button>
			</div>
			<SavedShows />
		</>
	);
};

export default Account;
