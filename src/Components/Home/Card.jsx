import React, { useEffect, useRef } from 'react';
import useObserveScrollbar from '../../Hooks/useObserveScrollbar';

const Card = (props) => {
	const [parentRef, contentRef] = useObserveScrollbar();

	return (
		<div className='border-2 border-blue-100 p-3 rounded-xl'>
			<h1 className='border-b pb-2 text-center w-[200px] mx-auto mb-5 text-xl font-semibold bg-[#1D232A]'>{props.title} {props.quantity ? `- ${props.quantity}` : ''}</h1>
			<div ref={parentRef} className='overflow-y-scroll h-[310px] no-scrollbar'>
				<div ref={contentRef}>
					{props.component}
				</div>
			</div>
		</div>
	);
};

export default Card;