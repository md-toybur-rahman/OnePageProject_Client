import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const {user, logOut} = useContext(AuthContext);
	const navigate = useNavigate();
	const handleLogOut = () => {
		logOut()
			.then(() => {
				localStorage.removeItem('token');
				Swal.fire({
					position: "center",
					title: "Now You Can't Enter Into The Main Page",
					showConfirmButton: false,
					timer: 1500
				});
				navigate('/signIn')
			})
	}
	return (
		<div className="navbar bg-blue-100">
			<div className="flex-1">
				<h1 className='text-black font-bold text-2xl cursor-none'>⭕ne Page</h1>
			</div>
			<div className="flex items-center gap-5">
				<div className="bg-[url('https://media.licdn.com/dms/image/D4D03AQG5CmsynJxUDg/profile-displayphoto-shrink_800_800/0/1713860584163?e=2147483647&v=beta&t=751B-oUARgTB_7wlfsezqtFrh3EQrWG6kTn-S72_CwI')] h-14 w-14 bg-cover rounded-full"></div>
				<button onClick={handleLogOut} className='border-2 border-black text-black px-4 py-1 rounded-xl font-medium text-lg'>Logout</button>
			</div>
		</div>
	);
};

export default Navbar;