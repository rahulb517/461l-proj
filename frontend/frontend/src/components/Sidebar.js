import React from 'react'
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { SidebarRoutes } from '../constants/SidebarRoutes';
import '../styles/Sidebar.css';

// when the user clicks away, the sidebar automatically closes
let useClickOutside = (handler) => {
	let navRef = React.useRef();

	React.useEffect(() => {
		let maybeHandler = (e) => {
			if (!navRef.current.contains(e.target)){
				handler();
			}
		}

		document.addEventListener('mousedown', maybeHandler);

		return () => {
			document.removeEventListener('mousedown', maybeHandler);
		}
	});

	return navRef;
}

function Sidebar() {
	const [sidebar, setSidebar] = React.useState(false);

	const showSidebar = () => {
		setSidebar(!sidebar);
	}

	let navRef = useClickOutside(() => {
		setSidebar(false);
	})

	return (
		<div ref={navRef}>
			<div className='navbar'>
				<Link to="#" className='menu-bars'>
					<FaBars onClick={ showSidebar }/>
				</Link>
			</div>
			
			<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
				<ul className='menu-items' onClick={showSidebar}>
					{/* this uses the sidebar routes that were defined in the constants folder */}
					{ SidebarRoutes.map((item, index) => {
						if (item.hasOwnProperty('route')) {
							return (
								<li key={index} className={ item.className }>
									<Link to={item.route}>
										{ item.icon }
										<span>{ item.title }</span>
									</Link>
								</li>
							)
						}
						else {
							return (
								<li key={index} className={ item.className }>
									<span>{ item.title }</span>
								</li>
							);
						}
					})}
				</ul>
			</nav>
		</div>
	)
}

export default Sidebar
