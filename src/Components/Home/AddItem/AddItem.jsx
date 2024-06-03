import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import useAllItem from '../../../Hooks/useAllItem';
import Swal from 'sweetalert2';

const AddItem = () => {
	const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
	const [, refetch] = useAllItem();

	const onSubmit = async data => {
		const { name, price, category, rating, imported_country, available_quantity, description, image_url } = data;
		const newItem = { name, price, rating, category, description, imported_country, available_quantity, image_url }
		await fetch('http://localhost:2000/items/', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(newItem)
		})
			.then(res => res.json())
			.then(data => {
				if (data.acknowledged) {
					refetch();
					reset()
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Item Added Successfully",
						showConfirmButton: false,
						timer: 1500
					});
				}
			})
	}
	const options = useMemo(() => countryList().getData(), []);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid grid-cols-3 gap-4'>
					<div className='flex flex-col gap-1 text-base col-span-2'>
						<label className='font-medium' htmlFor="name">Fruit Name</label>
						<input {...register("name", { required: true })} className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='name' placeholder='Fruit Name' />
						{errors.email && <span className="text-sm text-red-500">This field is required *</span>}
					</div>
					<div className='flex flex-col gap-1 text-base'>
						<label className='font-medium' htmlFor="price">Price</label>
						<input {...register("price", { required: true })} className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='price' placeholder='Fruit Price' />
						{errors.email && <span className="text-sm text-red-500">This field is required *</span>}
					</div>
				</div>
				<div className='grid grid-cols-3 gap-4'>
					<div className='flex flex-col gap-1 text-base col-span-2'>
						<label className='font-medium' htmlFor="category">Categroy</label>
						<input {...register("category", { required: true })} className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='category' placeholder='Fruit Category' />
						{errors.email && <span className="text-sm text-red-500">This field is required *</span>}
					</div>
					<div className='flex flex-col gap-1 text-base'>
						<label className='font-medium' htmlFor="rating">Ratings</label>
						<input {...register("rating", { required: true })} className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='rating' placeholder='Fruit Ratings' />
						{errors.email && <span className="text-sm text-red-500">This field is required *</span>}
					</div>
				</div>
				<div className='grid grid-cols-3 gap-4'>
					<div className='flex flex-col gap-1 text-base col-span-2'>
						<label className='font-medium' htmlFor="imported_country">Imported Country</label>
						<select  {...register("imported_country")} name="country" id="" className='text-white border rounded-xl px-2 py-1'>
							{
								options.map(a => <option key={a.label} value={a.label}>{a.label}</option>)
							}
						</select>
						{errors.email && <span className="text-sm text-red-500">This field is required *</span>}
					</div>
					<div className='flex flex-col gap-1 text-base'>
						<label className='font-medium' htmlFor="available_quantity">Available Quantity</label>
						<input {...register("available_quantity", { required: true })} className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='available_quantity' placeholder='Available Quantity' />
						{errors.email && <span className="text-sm text-red-500">This field is required *</span>}
					</div>
				</div>
				<div className='flex flex-col gap-1 text-base'>
					<label className='font-medium' htmlFor="description">Fruit Description</label>
					<textarea {...register("description", { required: true })} className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='description' placeholder='Fruit Description' />
					{errors.email && <span className="text-sm text-red-500">This field is required *</span>}
				</div>
				<div className='flex flex-col gap-1 text-base'>
					<label className='font-medium' htmlFor="image_url">Fruit Image</label>
					<input {...register("image_url", { required: true })} className='border border-gray-300 px-2 py-1 rounded-xl outline-none ' type="text" name='image_url' placeholder='Fruit Image' value={`https://example.com/fruit.jpg`} />
					{errors.email && <span className="text-sm text-red-500">This field is required *</span>}
				</div>
				<div className='flex items-center justify-center mt-3'>
					<input type='submit' value="Add Item" className='bg-[#F85559] px-6 py-2 font-medium text-base rounded-xl text-white mt-4 cursor-pointer' />
				</div>
			</form>
		</div>
	);
};

export default AddItem;