import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSearchResults } from '../apis/search';
import search from '../assets/search.svg';
import useDebounce from '../hooks/useDebounce';

interface Results {
	profiles: {
		avatar: string;
		_id: string;
		name: string;
	}[];
	recipes: {
		images: string[];
		_id: string;
		recipeName: string;
	}[];
}

function Searchbar() {
	const [searchBarActive, setSearchBarActive] = useState(false);
	const [searchItem, setSearchItem] = useState('');
	const [searchResults, setSearchResults] = useState<Results>({
		profiles: [],
		recipes: [],
	});
	const [error, setError] = useState({
		active: false,
		msg: ``,
	});
	const debounce = useDebounce(searchItem, 300);
	const inputRef = useRef(null);

	useEffect(() => {
		const handler = () => setSearchBarActive(false);
		window.addEventListener('click', handler);
	}, []);

	useEffect(() => {
		if (searchItem === '') {
			setError({ active: false, msg: '' });
			setSearchResults({ profiles: [], recipes: [] });
		} else {
			setSearchResults({
				profiles: [],
				recipes: [],
			});
			findSearchedItems();
		}
	}, [debounce]);

	const findSearchedItems = () => {
		getSearchResults(searchItem).then((data: Results) => {
			if (data.recipes.length === 0 && data.profiles.length === 0) {
				return setError({
					active: true,
					msg: `Sorry, we couldn't find any results
            `,
				});
			} else {
				setSearchResults(data);
			}
		});
	};

	const handleSearchBar = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setSearchBarActive(true);
	};

	return (
		<div className='results'>
			<div className='searchBar' onClick={handleSearchBar}>
				<input
					type='text'
					className={`searchBarInput ${searchBarActive && 'searchBarActive'}`}
					placeholder='search'
					value={searchItem}
					onChange={e => setSearchItem(e.target.value)}
					ref={inputRef}
				/>
				<div
					className='searchIcon'
					onClick={() => {
						// @ts-ignore
						inputRef.current!.focus();
					}}
				>
					<img
						src={search}
						alt='search Icon'
						className='search-icon'
						draggable={false}
					/>
				</div>
			</div>
			<div
				className={`searchResultsContainer ${
					searchBarActive && 'searchResultsVisible'
				}`}
			>
				{searchResults.profiles.map((results, index) => (
					<Link key={index} to={`/profile/${results._id}`} className='link'>
						<div className='searchResult'>
							<img
								src={results.avatar}
								alt='product picture'
								className='rightside-image'
								draggable={false}
							/>
							<div className='productInfo'>
								<div>{results.name}</div>
							</div>
						</div>
					</Link>
				))}
				{searchResults.recipes.map((results, index) => (
					<Link key={index} to={`/recipe/${results._id}`} className='link'>
						<div className='searchResult'>
							<img
								src={results.images[0]}
								alt='product picture'
								className='rightside-image'
								draggable={false}
							/>
							<div className='productInfo'>
								<div>{results.recipeName}</div>
							</div>
						</div>
					</Link>
				))}
				{error.active && <div className='text-black'>{error.msg}</div>}
			</div>
		</div>
	);
}

export default Searchbar;
