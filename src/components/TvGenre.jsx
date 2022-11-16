import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { GoChevronDown } from 'react-icons/go';
import axios from 'axios';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const TvGenre = ({ setSeries }) => {
	const fetchSubData = useCallback(
		(text) => {
			let url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${text}&page=1`;

			axios
				.get(url)
				.then((response) => {
					setSeries(response.data.results);
				})
				.catch((error) => console.log(error));
		},
		[setSeries]
	);

	return (
		<div className='z-10'>
			<Menu as='div' className='relative inline-block text-left'>
				<Menu.Button className=' flex items-center justify-center text-themeBlue bg-transparent text-lg py-1 px-5 focus:bg-themeBlue hover:bg-themeBlue hover:text-white focus:text-white rounded-sm'>
					Genres
					<GoChevronDown className='mx-1 h-5 w-5' aria-hidden='true' />
				</Menu.Button>

				<Transition
					as={Fragment}
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveFrom='transform opacity-100 scale-100'
					leaveTo='transform opacity-0 scale-95'
				>
					<Menu.Items className='absolute left-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-lg shadow-lg bg-white text-center focus:outline-none'>
						<div className='px-1 py-1'>
							<Menu.Item>
								{({ active }) => (
									<Link
										onClick={() => fetchSubData('family')}
										className={classNames(
											active
												? 'bg-gray-300 rounded-tl-md rounded-tr-md text-black'
												: 'text-themeBlue',
											'block px-4 py-2 text-sm'
										)}
									>
										Family
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										onClick={() => fetchSubData('mystery')}
										className={classNames(
											active ? 'bg-gray-300 text-black' : 'text-themeBlue',
											'block px-4 py-2 text-sm'
										)}
									>
										Mystery
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										onClick={() => fetchSubData('animation')}
										className={classNames(
											active ? 'bg-gray-300 text-black' : 'text-themeBlue',
											'block px-4 py-2 text-sm'
										)}
									>
										Animation
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										onClick={() => fetchSubData('comedy')}
										className={classNames(
											active ? 'bg-gray-300 text-black' : 'text-themeBlue',
											'block px-4 py-2 text-sm'
										)}
									>
										Comedy
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										onClick={() => fetchSubData('crime')}
										className={classNames(
											active ? 'bg-gray-300 text-black' : 'text-themeBlue',
											'block px-4 py-2 text-sm'
										)}
									>
										Crime
									</Link>
								)}
							</Menu.Item>

							<Menu.Item>
								{({ active }) => (
									<Link
										onClick={() => fetchSubData('horror')}
										className={classNames(
											active ? 'bg-gray-300 text-black' : 'text-themeBlue',
											'block px-4 py-2 text-sm'
										)}
									>
										Horror
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										onClick={() => fetchSubData('love')}
										className={classNames(
											active ? 'bg-gray-300 text-black' : 'text-themeBlue',
											'block px-4 py-2 text-sm'
										)}
									>
										Romance
									</Link>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
};

export default TvGenre;
