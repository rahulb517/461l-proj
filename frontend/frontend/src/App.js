import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Datasets from './components/Datasets';
import Signup from './components/Signup';
import { BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <div className="App">
		<BrowserRouter>
			<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
					<Route path="/datasets">
						<Datasets />
					</Route>
			</Switch>
		</BrowserRouter>
    </div>
  );
}

export default App;
