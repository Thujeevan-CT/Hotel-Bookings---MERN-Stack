import './App.css';
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import Homescreen from './screens/Homescreen'
import Bookingscreen from './screens/Bookingscreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
        <Navbar />


        <BrowserRouter>

        <Route path='/home' exact component={Homescreen} />
        <Route path='/book/:roomid/:fromDate/:toDate' exact component={Bookingscreen} />
        <Route path='/register' exact component={RegisterScreen} />
        <Route path='/login' exact component={LoginScreen} />
        <Route path='/profile' exact component={ProfileScreen} />
        <Route path='/admin' exact component={Adminscreen} />
        <Route path='/' exact component={Landingscreen} ></Route>

        </BrowserRouter>

    </div>
  );
}

export default App;
