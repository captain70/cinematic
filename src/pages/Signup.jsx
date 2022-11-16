import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { user, signUp } = UserAuth();
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await signUp(email, password);
			navigate('/');
		} catch (error) {
			setError(error.message);
		}
	};
	return (
		<>
			<div className=' w-full h-[400px]'>
				<img
					className='hidden sm:block relative w-full min-h-screen object-cover'
					src='https://cnbl-cdn.bamgrid.com/assets/60c53d45f6f0546647ddd4e006a207c713d149586cea401fdc0152f2fa9263a6/original'
					alt='/'
				/>

				{/* <div className=' fixed w-full px-4 py-24 z-50'> */}
				<div className='absolute w-full h-full px-4 py-24 top-[2%]'>
					<div className='max-w-[450px] h-[500px] mx-auto bg-black/75 text-white'>
						<div className='max-w-[320px] mx-auto py-16'>
							<h1 className='text-3xl font-bold'>Sign Up</h1>
							{error ? <p className='p-3 bg-red-500 my-2'>{error}</p> : null}
							<form
								onSubmit={submitHandler}
								className='w-full flex flex-col py-4'
							>
								<input
									onChange={(e) => setEmail(e.target.value)}
									className='p-3 my-2 bg-gray-600 rounded outline-none'
									type='email'
									placeholder='Email'
									autoComplete='email'
								/>{' '}
								<input
									onChange={(e) => setPassword(e.target.value)}
									className='p-3 my-2 bg-gray-600 rounded outline-none'
									type='password'
									placeholder='Password'
									autoComplete='current-password'
								/>
								<button className='bg-themeBlue py-3 my-6 rounded font-bold'>
									Sign Up
								</button>
								<div className='flex justify-between items-center text-sm text-gray-600'>
									<p>
										<input className='mr-2' type='checkbox' />
										Remember Me
									</p>
									<p>Need Help?</p>
								</div>
								<p className='py-8'>
									<span className='text-gray-600 '>
										Already Subscribed to Cinematic?
									</span>{' '}
									<Link to={'/login'}>Sign In</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
