import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import SearchProvider from '../../Provider/SearchProvider';
import GetItemProvider from '../../Provider/GetItemProvider';

const Layout = () => {
	return (
		<div className='max-w-[1500px] mx-auto'>
			<Navbar></Navbar>
			<div className="min-h-[100vh]">
				<SearchProvider>
					<GetItemProvider>
						<Home></Home>
					</GetItemProvider>
				</SearchProvider>
			</div>
			<Footer></Footer>
		</div>
	);
};

export default Layout;