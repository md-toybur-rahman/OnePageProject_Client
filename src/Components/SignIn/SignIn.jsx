import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const SignIn = () => {
	const { signIn, googleSignIn } = useContext(AuthContext);
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { register, handleSubmit, watch, formState: { errors } } = useForm();

	const onSubmit = data => {
		const { email, password } = data;
		signIn(email, password)
			.then(data => {
				const userData = { email }
				fetch('http://localhost:2000/jwt', {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify(userData)
				})
					.then(res => res.json())
					.then(data => {
						console.log(data)
						if (data.status == 'success') {
							console.log(data)
							localStorage.setItem('token', JSON.stringify(data.token));
							Swal.fire({
								position: "center",
								icon: "success",
								title: "Sign In Successfully",
								showConfirmButton: false,
								timer: 1500
							});
						}
					})
				navigate('/')
			})
	}
	const handleGoogleSignIn = () => {
		googleSignIn()
			.then(data => {
				const user = data.user;
				const userData = { first_name: data._tokenResponse.firstName, lastName: data._tokenResponse.lastName, email: user.email, phone_number: user.phoneNumber, login_from: data.providerId }
				if (data.providerId === 'google.com') {
					fetch('http://localhost:2000/users', {
						method: 'POST',
						headers: {
							'content-type': 'application/json'
						},
						body: JSON.stringify(userData)
					})
						.then(res => res.json())
						.then(data => {
							console.log(data)
							if (data.status == 'success') {
								fetch('http://localhost:2000/jwt', {
									method: 'POST',
									headers: {
										'content-type': 'application/json'
									},
									body: JSON.stringify({ email: data.email })
								})
									.then(res => res.json())
									.then(data => {
										localStorage.setItem('token', JSON.stringify(data.token));
										navigate('/');
										Swal.fire({
											position: "center",
											icon: "success",
											title: "Sign In Successfully",
											showConfirmButton: false,
											timer: 1500
										});
									})
							}
						})

				}

			})
	}
	return (
		<div>
			<h1 className='text-3xl font-bold mt-20 mb-5 text-center'>Sign In</h1>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-5 max-w-[400px] mx-auto w-full border-2 border-gray-400 p-8 rounded-2xl'>
				<div className='grid grid-cols-1 gap-6 w-full'>
					<div className='flex flex-col gap-2 text-base'>
						<label className='font-medium' htmlFor="email">Email</label>
						<input {...register("email", { required: true })} className='border border-gray-300 px-2 py-1 rounded-xl outline-none' type="email" name='email' placeholder='Enter your Email' />
						{errors.email && <span className="text-sm text-red-500">This field is required *</span>}
					</div>
				</div>
				<div className='grid grid-cols-1 gap-6 w-full'>
					<div className='flex flex-col gap-2 text-base'>
						<label className='font-medium' htmlFor="password">Password</label>
						<input {...register("password", { required: true })} className='border border-gray-300 px-2 py-1 rounded-xl outline-none' type="password" name='password' placeholder='Enter your Password' />
						{errors.password && <span className="text-sm text-red-500">This field is required *</span>}
					</div>
				</div>
				<div>
					<p className='text-base font-medium'>Are you a new user? <Link to="/signUp" className='text-[#F85559] cursor-pointer'>Sign up</Link></p>
				</div>
				<div className='flex items-center gap-10 mt-5'>
					<p className='text-base font-semibold text-gray-500'>Sign in with</p>
					<div onClick={handleGoogleSignIn} className='cursor-pointer w-6 h-6'>
						<img className='w-full h-full' src="google.png" alt="" />
					</div>
				</div>


				<input type='submit' value="Sign In" className='bg-[#F85559] px-6 py-2 font-medium text-base rounded-xl text-white mt-4 cursor-pointer' />
			</form>
		</div>
	);
};

export default SignIn;