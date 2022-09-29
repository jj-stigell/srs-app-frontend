import './App.css';
import Title from './components/Title';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';

const App = () => {

  // eslint-disable-next-line no-undef
  const user = useSelector(state => state.user.user);
  const token = useSelector(state => state.user.token);
  console.log('user is:::::::',user);
  console.log('token is:::::::',token);

  return (
    <div className="App">
      <Title />
      <NavBar user={user}/>
    </div>
  );
};

export default App;
