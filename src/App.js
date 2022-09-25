import logo from './logo.svg';
import './App.css';
import Title from './components/Title';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NavBar />
        <Title />
        <p>
          dev env is: {process.env.REACT_APP_DEV_BACKEND_URL}
          <br/>
          test env is: {process.env.REACT_APP_TEST_BACKEND_URL}
          <br/>
          production env is: {process.env.REACT_APP_PROD_BACKEND_URL}
        </p>
      </header>
    </div>
  );
};

export default App;
