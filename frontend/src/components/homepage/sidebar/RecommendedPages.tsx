import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCommunities } from '../../../apis/homePages';

interface Profile {
	_id: string;
	avatar: string;
	name: string;
}

function RecommendedPages() {
	const navigate = useNavigate();
	const [profiles, setProfiles] = useState<Profile[]>([]);

	useEffect(() => {
		getCommunities().then(data => {
			setProfiles(data);
		});
	}, []);
	return (
		<div className='recommended-container'>
			<div className='recommended-header'>
				<span style={{ fontWeight: '600' }}>Top Communities</span>
			</div>
			<div className='recommended-results'>
				{profiles.map((profile, index) => (
					<div key={index} className='recommended'>
						<img
							src={profile.avatar}
							alt='avatar'
							className='rightside-image'
							draggable={false}
							onClick={() => navigate(`/profile/${profile._id}`)}
						/>
						<button
							onClick={() => navigate(`/profile/${profile._id}`)}
							className='recommended-name text'
						>
							<span>{profile.name}</span>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default RecommendedPages;
