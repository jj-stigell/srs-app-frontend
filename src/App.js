import logo from './logo.svg';
import './App.css';
import Title from './components/Title';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Title />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <br/>
          dev env is: {process.env.REACT_APP_DEV_BACKEND_URL}
          <br/>
          test env is: {process.env.REACT_APP_TEST_BACKEND_URL}
          <br/>
          production env is: {process.env.REACT_APP_PROD_BACKEND_URL}
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
    </div>
  );
}

export default App;
