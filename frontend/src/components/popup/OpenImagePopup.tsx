import React, { useState } from 'react';

type Props = {
	images: string[];
};

function OpenImagePopup({ images }: Props) {
	const [selectImage, setSelectImage] = useState(0);

	const changePicture = (
		index: number,
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		e.stopPropagation();
		setSelectImage(index);
	};

	return (
		<div className='image-popup'>
			<img
				className='main-image-image'
				src={images[selectImage]}
				alt=''
				draggable={false}
				onClick={e => e.stopPropagation()}
			/>
			<div className='d-flex gap-2 mt-2'>
				{images.map((image, index) => (
					<button
						className='border-0 p-0'
						key={index}
						onClick={e => changePicture(index, e)}
					>
						<img
							className='mini-image'
							src={image}
							alt='recipe image'
							draggable={false}
						/>
					</button>
				))}
			</div>
		</div>
	);
}

export default OpenImagePopup;
