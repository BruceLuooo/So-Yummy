export const containerStyles = {
	width: '100%',
	height: '100%',
	position: 'relative',
};

function LoadingPlaceHolder(props: any) {
	return (
		<div
			style={{
				backgroundColor: '#eee',
				width: '100%',
				overflow: 'hidden',
				position: props.container ? 'absolute' : 'relative',
				...props.extraStyles,
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: '0',
					left: '0',
					width: '100%',
					background:
						'linear-gradient(to right, #eeeeee 10%, #dddddd 50%, #eeeeee 90%)',
					height: '100%',
				}}
			></div>
		</div>
	);
}

export default LoadingPlaceHolder;
