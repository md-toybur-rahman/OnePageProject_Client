import React, { useContext, useEffect, useMemo } from 'react';
import SearchBar from '../SearchItem/SearchBar';
import UpdateItemCard from './UpdateItemCard';
import { SearchContext } from '../../../Provider/SearchProvider';
import { getItemContext } from '../../../Provider/GetItemProvider';
import countryList from 'react-select-country-list';
import Swal from 'sweetalert2';
import useAllItem from '../../../Hooks/useAllItem';



const UpdateItem = () => {
	const { updateSearchItem } = useContext(SearchContext);
	const options = useMemo(() => countryList().getData(), []);
	// const { register, handleSubmit, reset, formState: { errors } } = useForm();
	const { item } = useContext(getItemContext);
	const [, refetch] = useAllItem();
	const token = localStorage.getItem('token');
	useEffect(() => {
		document.getElementById('update_fruit_name').innerText = item[0]?.name || 'Fruit Name';
		document.getElementById('update_id').value = item[0]?._id || '';
		document.getElementById('update_name').value = item[0]?.name || '';
		document.getElementById('update_price').value = item[0]?.price || '';
		document.getElementById('update_category').value = item[0]?.category || '';
		document.getElementById('update_rating').value = item[0]?.rating || '';
		document.getElementById('update_available_quantity').value = item[0]?.available_quantity || '';
		document.getElementById('update_description').value = item[0]?.description || '';
	}, [item])
	const handleUpdate = event => {
		event.preventDefault();
		const form = event.target;
		const id = form.name.id;
		const name = form.name.value;
		const price = form.price.value;
		const category = form.category.value;
		const rating = form.rating.value;
		const imported_country = form.country.value;
		const available_quantity = form.available_quantity.value;
		const description = form.description.value;
		const image_url = form.image_url.value;
		const updateItem = {name, price, rating, category, description, imported_country, available_quantity, image_url}
		fetch(`http://localhost:2000/items?id=${item[0]?._id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${token}`
			},
			body: JSON.stringify(updateItem)
		})
			.then(res => res.json())
			.then(data => {
				if(data.acknowledged) {
					form.reset()
					refetch();
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Updated Successfully",
						showConfirmButton: false,
						timer: 1500
					});
				}
			})
	}
	return (
		<div>
			<div className='relative'>
				<SearchBar search_type="update" input_id="updateInputField"></SearchBar>

				<div id='updateItemContainer' className={`${updateSearchItem.length > 0 ? 'block' : 'hidden'} absolute w-full bg-[#363f4a] p-2`}>
					{
						updateSearchItem.map(item => <UpdateItemCard key={item._id} item={item} search_type="update" input_id="updateInputField"></UpdateItemCard>)
					}
				</div>
			</div>
			<div>
				<h1 id='update_fruit_name' className='text-xl font-medium text-center mt-4 mb-2'>Fruit Name</h1>
			</div>
			<form id='updateInputField' onSubmit={handleUpdate}>
			<input id='update_id' className='hidden' type="text" name='id' />
				<div className='grid grid-cols-3 gap-4'>
					<div className='flex flex-col gap-1 text-base col-span-2'>
						<label className='font-medium' htmlFor="name">Fruit Name</label>
						<input id='update_name' className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='name' placeholder='Fruit Name' />
					</div>
					<div className='flex flex-col gap-1 text-base'>
						<label className='font-medium' htmlFor="price">Price</label>
						<input id='update_price' className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='price' placeholder='Fruit Price' />
					</div>
				</div>
				<div className='grid grid-cols-3 gap-4'>
					<div className='flex flex-col gap-1 text-base col-span-2'>
						<label className='font-medium' htmlFor="category">Categroy</label>
						<input id='update_category' className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='category' placeholder='Fruit Category' />
					</div>
					<div className='flex flex-col gap-1 text-base'>
						<label className='font-medium' htmlFor="rating">Ratings</label>
						<input id='update_rating' className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='rating' placeholder='Fruit Ratings' />
					</div>
				</div>
				<div className='grid grid-cols-3 gap-4'>
					<div className='flex flex-col gap-1 text-base col-span-2'>
						<label className='font-medium' htmlFor="imported_country">Imported Country</label>
						<select name="country" id="" className='text-white border rounded-xl px-2 py-1'>
							{
								item[0]?.imported_country ?
									<option selected defaultValue={item[0]?.imported_country}>{item[0]?.imported_country}</option>
									: ''
							}
							{
								options.map(a => <option key={a.label} defaultValue={a.label}>{a.label}</option>)
							}
						</select>
					</div>
					<div className='flex flex-col gap-1 text-base'>
						<label className='font-medium' htmlFor="available_quantity">Available Quantity</label>
						<input id='update_available_quantity' className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='available_quantity' placeholder='Available Quantity' />
					</div>
				</div>
				<div className='flex flex-col gap-1 text-base'>
					<label className='font-medium' htmlFor="description">Fruit Description</label>
					<textarea id='update_description' className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='description' placeholder='Fruit Description' />
				</div>
				<div className='flex flex-col gap-1 text-base'>
					<label className='font-medium' htmlFor="image_url">Fruit Image</label>
					<input className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='image_url' placeholder='Fruit Image' defaultValue={`https://example.com/fruit.jpg`} />
				</div>
				<div className='flex items-center justify-center mt-3'>
					<input type='submit' value="Update Item" className='bg-[#F85559] px-6 py-2 font-medium text-base rounded-xl text-white mt-4 cursor-pointer' />
				</div>
			</form>
		</div>
	);
};

export default UpdateItem;