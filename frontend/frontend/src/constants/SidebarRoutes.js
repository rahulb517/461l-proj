import React from 'react';
import { AiOutlineHome, AiOutlineProject, AiOutlineCloudServer } from 'react-icons/ai';
import { BsFiles } from 'react-icons/bs'

export const SidebarRoutes = [
	{
		title: 'Dream Team',
		className: 'nav-title'
	},
	{
		title: 'Home',
		route: '/dashboard',
		icon: <AiOutlineHome />,
		className: 'nav-text'
	},
	{
		title: 'Projects',
		route: '/projects',
		icon: <AiOutlineProject />,
		className: 'nav-text'
	},
	{
		title: 'Resources',
		route: '/resources',
		icon: <AiOutlineCloudServer />,
		className: 'nav-text'
	},
	{
		title: 'Datasets',
		route: '/datasets',
		icon: <BsFiles />,
		className: 'nav-text'
	},
]