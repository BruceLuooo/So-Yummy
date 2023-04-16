import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useContext, useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import logo from '../assets/logo.svg';
import NavbarPopup from './popup/NavbarPopup';
import ProfileContext from '../context/profileContext';
import { ProfileContextType } from '../types/profileTypes';

function NavbarTop() {
	const [popup, setPopup] = useState(false);
	const { profileInformation } = useContext(
		ProfileContext,
	) as ProfileContextType;

	useEffect(() => {
		const closePopup = () => {
			setPopup(false);
		};

		window.addEventListener('click', closePopup);
	}, []);

	const openPopup = (e: React.MouseEvent<HTMLImageElement>) => {
		e.stopPropagation();
		setPopup(true);
	};

	return (
		<Navbar sticky='top' className='navbar'>
			<Container className='gap-1 px-3'>
				<Navbar.Brand>
					<a href='/' className='link-style'>
						<img src={logo} draggable={false} alt='avatar' className='logo' />
						<Navbar.Brand className='logo-name'>Cooking Cart</Navbar.Brand>
					</a>
				</Navbar.Brand>

				<div className='navbar-rightside'>
					<div className='searchbar-container'>
						<Searchbar />
					</div>
					<div className='relative'>
						<img
							src={profileInformation.avatar}
							draggable={false}
							alt='user-icon'
							className='user-icon'
							onClick={openPopup}
						/>
						{popup && <NavbarPopup />}
					</div>
				</div>
			</Container>
		</Navbar>
	);
}

export default NavbarTop;
