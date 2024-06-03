import React, { useEffect, useRef } from 'react';

const useObserveScrollbar = () => {
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
	return [parentRef, contentRef];
};

export default useObserveScrollbar;