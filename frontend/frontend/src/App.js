// import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Datasets from './components/Datasets';
import Signup from './components/Signup';
import Sidebar from './components/Sidebar';
import Projects from './components/Projects';
import Resources from './components/Resources';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './AuthContext';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import React from 'react';
import './App.css';


function App() {

	return (
		<AuthProvider>
			<div className="App">
				<BrowserRouter>
					<Switch>						
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					{/* <React.Fragment> */}
						{/* <Sidebar /> */}
						<PrivateRoute path="/dashboard">
							<Sidebar />
							<Dashboard />
						</PrivateRoute>
						<PrivateRoute path="/home">
							<Sidebar />
							<Dashboard />
						</PrivateRoute>
						<PrivateRoute path="/datasets">
							<Sidebar />
							<Datasets />
						</PrivateRoute>
						<PrivateRoute path="/projects">
							<Sidebar />
							<Projects />
						</PrivateRoute>
						<PrivateRoute path="/resources">
							<Sidebar />
							<Resources />
						</PrivateRoute>
						<PrivateRoute path="/logout">
							<Sidebar />
							<Logout />
						</PrivateRoute>
					{/* </React.Fragment> */}
					<Redirect to="/"/>
					</Switch>
				</BrowserRouter>
			</div>
		</AuthProvider>
  );
}

export default App;
