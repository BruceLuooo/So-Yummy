export interface UserData {
	title: string;
	name: string;
	bio: string;
	avatar: string;
	email: string;
	password: string;
}
export interface UserProfile {
	name: string;
	title: string;
	bio: string;
	email: string;
	password: string;
	followers: number | null;
	following: number | null;
	loading: boolean;
	avatar: string;
}
export interface profileData {
	name: string;
	title: string;
	bio: string;
	email: string;
	password: string;
	follower: { id: string; name: string; avatar: string }[];
	following: { id: string; name: string; avatar: string }[];
	avatar: string;
}

export type ProfileContextType = {
	profileInformation: UserProfile;
	addProfile: (profile: profileData) => void;
	updateProfileInformation: (editProfile: UserData) => void;
	removeFollowing: () => void;
	addFollowing: () => void;
	removeFollower: () => void;
	addFollower: () => void;
	updateProfilePicture: (url: string) => void;
};
