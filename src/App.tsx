import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route} from 'react-router-dom';

import PointsListPage from './pages/PointsList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

	  <Router>
		<Route path="/points" exact component={PointsListPage}/>
	  </Router>
    </div>
  );
}

export default App;
