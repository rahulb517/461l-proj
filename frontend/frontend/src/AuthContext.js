import React from 'react';

export const AuthContext = React.createContext();

const initialState = {
	isAuth: localStorage.getItem('isAuth'),
	user: localStorage.getItem('user'),
	token: localStorage.getItem('token')
}

const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			localStorage.setItem('user', JSON.stringify(action.payload.user));
			localStorage.setItem('token', JSON.stringify(action.payload.token));
			localStorage.setItem('isAuth', true);
	
			return {
				...state,
				isAuth: true,
				user: action.payload.userId,
				token: action.payload.token
			}

		case 'LOGOUT':
			localStorage.clear();
			return {
				...state,
				isAuth: false,
				user: null,
				token: null
			}
		default:
			return state
	}
}

export const AuthProvider = (props) => {
	const [user, dispatch] = React.useReducer(authReducer, initialState);

	return(
		<AuthContext.Provider value={[user, dispatch]}>
			{props.children}
		</AuthContext.Provider>
	)
}