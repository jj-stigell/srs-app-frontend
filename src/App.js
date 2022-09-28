import './App.css';
import Title from './components/Title';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';

const App = () => {

  // eslint-disable-next-line no-undef
  const user = useSelector(state => state.user);
  console.log('user is:::::::',user);

  return (
    <div className="App">
      <NavBar user={user}/>
      <Title />
      <p>
        dev env is: {process.env.REACT_APP_DEV_BACKEND_URL}
        <br/>
        test env is: {process.env.REACT_APP_TEST_BACKEND_URL}
        <br/>
        production env is: {process.env.REACT_APP_PROD_BACKEND_URL}
      </p>
    </div>
  );
};

export default App;
