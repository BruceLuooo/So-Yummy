import { createContext, useState } from 'react';
import {
	ProfileContextType,
	profileData,
	UserProfile,
	UserData,
} from '../types/profileTypes';
import userIcon from '../assets/userIcon.svg';

interface Props {
	children: React.ReactNode;
}

const initalState: UserProfile = {
	name: '',
	title: '',
	bio: '',
	email: '',
	password: '',
	followers: null,
	following: null,
	loading: true,
	avatar: userIcon,
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider = ({ children }: Props) => {
	const [profileInformation, setProfileInformation] =
		useState<UserProfile>(initalState);

	const addProfile = (profile: profileData) => {
		setProfileInformation(prev => ({
			...prev,
			name: profile.name,
			title: profile.title,
			bio: profile.bio,
			email: profile.email,
			followers: profile.follower.length,
			following: profile.following.length,
			avatar: profile.avatar,
			loading: false,
		}));
	};

	const updateProfileInformation = (editProfile: UserData) => {
		setProfileInformation(prev => ({
			...prev,
			name: editProfile.name,
			title: editProfile.title,
			bio: editProfile.bio,
			email: editProfile.email,
			password: '',
		}));
	};
	const updateProfilePicture = (url: string) => {
		setProfileInformation(prev => ({
			...prev,
			avatar: url,
		}));
	};

	const removeFollowing = () => {
		setProfileInformation(prev => ({
			...prev,
			following: prev.following! - 1,
		}));
	};
	const addFollowing = () => {
		setProfileInformation(prev => ({
			...prev,
			following: prev.following! + 1,
		}));
	};
	const removeFollower = () => {
		setProfileInformation(prev => ({
			...prev,
			followers: prev.followers! - 1,
		}));
	};
	const addFollower = () => {
		setProfileInformation(prev => ({
			...prev,
			followers: prev.followers! + 1,
		}));
	};

	return (
		<ProfileContext.Provider
			value={{
				addProfile,
				profileInformation,
				updateProfileInformation,
				removeFollowing,
				addFollowing,
				removeFollower,
				addFollower,
				updateProfilePicture,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export default ProfileContext;
