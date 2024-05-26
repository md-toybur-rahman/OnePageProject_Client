import React, { useEffect, useRef } from 'react';

const Card = (props) => {
	const parentRef = useRef(null);
	const contentRef = useRef(null);

	useEffect(() => {
		const toggleScrollbar = () => {
			if (contentRef.current.scrollHeight > 310) {
				parentRef.current.classList.add('overflow-y-scroll');
				parentRef.current.classList.remove('overflow-hidden');
			} else {
				parentRef.current.classList.add('overflow-hidden');
				parentRef.current.classList.remove('overflow-y-scroll');
			}
		};

		// Initial check
		toggleScrollbar();

		// Observe changes in the content
		const observer = new MutationObserver(toggleScrollbar);
		observer.observe(contentRef.current, { childList: true, subtree: true, characterData: true });

		// Cleanup observer on component unmount
		return () => observer.disconnect();
	}, []);
	return (
		<div className='border-2 border-blue-100 p-3 rounded-xl '>
			<h1 className='border-b pb-2 text-center w-[200px] mx-auto mb-5 text-xl font-semibold bg-[#1D232A]'>{props.title}</h1>
			<div ref={parentRef} className='overflow-y-scroll h-[310px]'>
				<div ref={contentRef}>
					{props.component}
				</div>
			</div>
		</div>
	);
};

export default Card;