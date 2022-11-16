import React, { useState } from 'react';
import { RiMovie2Fill } from 'react-icons/ri';
import { BiSearch } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
// import { BsFillMoonStarsFill } from 'react-icons/bs';

const Navbar = () => {
	const [input, setInput] = useState('');

	const { user, logOut } = UserAuth();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		navigate('/searched/' + input);
		setInput('');
	};

	const logoutHandler = async () => {
		try {
			await logOut();
			navigate('/');
		} catch (error) {}
	};
	const splitEmail = (str) => {
		return str.split('@')[0];
	};

	return (
		<div className='flex items-center justify-between px-4 py-1  shadow-md z-10 sticky top-0 w-full bg-black/90 '>
			<Link to='/'>
				<div className='flex items-center space-x-1'>
					<RiMovie2Fill className='text-3xl text-themeBlue font-bold' />
					<h1 className='text-3xl text-white'>Cinematic</h1>
				</div>
			</Link>

			<ul className=' hidden md:flex text-slate-400 items-center space-x-4 cursor-pointer'>
				<Link to={'/'}>
					<li className='hover:text-white text-xl'>Home</li>
				</Link>
				<Link to={'/movies'}>
					<li className='hover:text-white text-xl'>Movies</li>
				</Link>
				<Link to={'/series'}>
					<li className='hover:text-white text-xl'>Series</li>
				</Link>

				<Link to='/account'>
					<button className='hover:text-white text-xl'>My List</button>
				</Link>
			</ul>
			<div className='hidden md:flex items-center'>
				<form
					onSubmit={submitHandler}
					className='flex justify-center items-center'
				>
					<input
						onChange={(e) => setInput(e.target.value)}
						type='text'
						className='px-10 w=1/2 h-10 bg-transparent border border-themeBlue outline-none text-white'
						placeholder='search'
						value={input}
					/>
					<button className='rounded-r-lg border border-themeBlue h-10 px-5 bg-themeBlue'>
						<BiSearch className='text-white text-xl' />
					</button>
				</form>
			</div>
			{user?.email ? (
				<div className=' hidden md:flex items-center focus:outline-none focus:ring focus:ring-violet-300'>
					<button className='text-white px-5 py-1 text-lg cursor-pointer'>
						{`Welcome, ${splitEmail(user.email)}`}
					</button>
					<button
						onClick={logoutHandler}
						className=' md:visible bg-themeBlue rounded cursor-pointer text-white px-5 py-1 text-md'
					>
						Log Out
					</button>
				</div>
			) : (
				<div className=' hidden md:flex items-center focus:outline-none focus:ring focus:ring-violet-300'>
					<Link to='/login'>
						<button className='text-white px-5 py-1 text-lg cursor-pointer'>
							Sign In
						</button>
					</Link>
					<Link to='/signup'>
						<button className=' md:visible bg-themeBlue rounded cursor-pointer text-white px-5 py-1 text-md'>
							Sign Up
						</button>
					</Link>
				</div>
			)}
			{/* <div className='md:hidden'>
				<AiOutlineMenu className='w-10' />
			</div>
			<ul className='absolute bg-zinc-200 w-full px-8'>
				<Link to={'/'}>
					<li className='border-2 border-zinc-300 w-full hover:text-white text-xl'>
						Home
					</li>
				</Link>
				<Link to={'/'}>
					<li className='border-2 border-zinc-300 w-full hover:text-white text-xl'>
						Movies
					</li>
				</Link>
				<Link to={'/'}>
					<li className='border-2 border-zinc-300 w-full hover:text-white text-xl'>
						Series
					</li>
				</Link>
				<Link to={'/'}>
					<li className='border-2 border-zinc-300 w-full hover:text-white text-xl'>
						Genre
					</li>
				</Link>

				<div className='flex flex-col my-4'>
					<Link to={'/'}>
						<button className='text-white px-8 py-3 text-lg mb-4'>
							Sign In
						</button>
					</Link>
					<Link to={'/'}>
						<button className='bg-themeBlue rounded cursor-pointer text-white px-8 py-3 text-md'>
							Sign Up
						</button>
					</Link>
				</div>
			</ul> */}
		</div>
	);
};

export default Navbar;
