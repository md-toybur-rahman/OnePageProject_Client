import React from 'react';
import { useForm } from 'react-hook-form';

const SearchItem = () => {

	const { register, handleSubmit, watch, formState: { errors } } = useForm();

	const onSubmit = () => {

	}

	return (
		<div>
			<form onSubmit={handleSubmit(onsubmit)}>
				<div className='flex gap-2 text-base border py-2 px-1 rounded-xl'>
					<input {...register("search", { required: true })} className='px-2 py-1 rounded-xl outline-none flex-grow bg-transparent' type="text" name='first_name' placeholder='Search Item' />
					{errors.first_name && <span className="text-sm text-red-500">This field is required *</span>}
					<input className='border rounded-md w-fit px-3' type="submit" value={"Search"} />
				</div>
			</form>
		</div>
	);
};

export default SearchItem;