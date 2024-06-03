import React, { useContext } from 'react';
import SearchProvider, { SearchContext } from '../../../Provider/SearchProvider';
import { useForm } from 'react-hook-form';

const SearchBar = (props) => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const { onSubmit, handleClear } = useContext(SearchContext);

	return (
		<div>
			<form onKeyUp={handleSubmit(onSubmit)} onSubmit={handleSubmit(onSubmit)}>
				<div className='flex gap-2 text-base border py-2 px-1 rounded-xl'>
					<input {...register("search_type", { required: true })} className='hidden' type="text" name='search_type' value={props.search_type} />
					<input id={props.input_id} {...register("search", { required: true })} className='px-2 py-1 rounded-xl outline-none flex-grow bg-transparent' type="text" name='search' placeholder='Search Item' />
					{errors.first_name && <span className="text-sm text-red-500">This field is required *</span>}
					<button onClick={() => handleClear(props.input_id)}>✖</button>
					<input type="submit" className='rounded-md w-fit px-3 cursor-pointer bg-[#F85559] font-semibold' value={"Search"} />
				</div>
			</form>
		</div>
	);
};

export default SearchBar;