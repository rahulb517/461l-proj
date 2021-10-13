// import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Datasets from './components/Datasets';
import Signup from './components/Signup';
import Sidebar from './components/Sidebar';
import Projects from './components/Projects';
import Resources from './components/Resources';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './AuthContext';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
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
					<React.Fragment>
						<Sidebar />
						<Route path="/dashboard">
							<Dashboard />
						</Route>
						<Route path="/datasets">
							<Datasets />
						</Route>
						<Route path="/projects">
							<Projects />
						</Route>
						<Route path="/resources">
							<Resources />
						</Route>
					</React.Fragment>
					</Switch>
				</BrowserRouter>
			</div>
		</AuthProvider>
  );
}

export default App;
