import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	getRandomRecommendedProfiles,
	getRecommendedProfiles,
} from '../../../apis/homePages';
import LoadingPlaceHolder from '../../loading/LoadingPlaceHolder';
import avatar from '../../../assets/7.png';

interface Profile {
	avatar: string;
	_id: string;
	name: string;
	title: string;
}

function SuggestedPeople() {
	const navigate = useNavigate();
	const initalState = [
		{ avatar: '', _id: 'a', name: 'asdfkjha', title: 'asdkflkjh' },
		{ avatar: '', _id: 'a', name: 'asdfkjha', title: 'asdkflkjh' },
		{ avatar: '', _id: 'a', name: 'asdfkjha', title: 'asdkflkjh' },
	];

	const [profiles, setProfiles] = useState<Profile[]>(initalState);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = Cookies.get('token');
		if (token === undefined) {
			getRandomRecommendedProfiles().then(data => {
				setProfiles(data);
				return setTimeout(() => {
					setLoading(false);
				}, 200);
			});
		} else {
			getRecommendedProfiles(JSON.parse(token)).then(data => {
				setProfiles(data);
				return setTimeout(() => {
					setLoading(false);
				}, 200);
			});
		}
	}, []);

	return (
		<div className='recommended-container'>
			<div className='recommended-header'>
				<span style={{ fontWeight: '600' }}>Suggested People</span>
			</div>
			{loading ? (
				<div className='recommended-results'>
					{profiles.map((profile, index) => (
						<div key={index} className='recommended'>
							<div className='relative'>
								<LoadingPlaceHolder
									extraStyles={{
										height: '100%',
										top: '0',
										left: '0',
										borderRadius: '50%',
									}}
									container
								/>
								<img
									src={avatar}
									alt='avatar'
									className='rightside-image blur'
									draggable={false}
								/>
							</div>
							<div className='recommended-name blur-gap text'>
								<span className='relative blur-width'>
									<LoadingPlaceHolder
										extraStyles={{
											height: '100%',
											top: '0',
											left: '0',
										}}
										container
									/>
									{profile.name}
								</span>
								<span className='relative blur-width'>
									<LoadingPlaceHolder
										extraStyles={{ height: '100%', top: '0', left: '0' }}
										container
									/>
									{profile.title}
								</span>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className='recommended-results'>
					{profiles.map((profile, index) => (
						<div key={index} className='recommended'>
							<div>
								<img
									src={profile.avatar}
									alt='avatar'
									className='rightside-image'
									draggable={false}
									onClick={() => navigate(`/profile/${profile._id}`)}
								/>
							</div>
							<button
								onClick={() => navigate(`/profile/${profile._id}`)}
								className='recommended-name text'
							>
								<span>{profile.name}</span>
								<span>{profile.title}</span>
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default SuggestedPeople;
