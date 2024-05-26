// import React, { useState } from 'react';

// const imageUploadToken = import.meta.env.VITE_Image_Upload_Token;

// const useUploadImage = () => {
// 	const [imageURL, setImageURL] = useState('')
// 	const imageUploadURL = `https://api.imgbb.com/1/upload?expiration=600&key=${imageUploadToken}`

// 	const uploadImage = (formData, image) => {
// 		const GetFormData = formData;
// 		GetFormData.append('profile_picture', image)
// 		fetch(imageUploadURL, {
// 			method: 'POST',
// 			body: GetFormData
// 		})
// 		.then(res => res.json())
// 		.then(imgResponse => {
// 			setImageURL(imgResponse)
// 		})
// 	}

// 	return {uploadImage, imageURL};
// };

// export default useUploadImage;