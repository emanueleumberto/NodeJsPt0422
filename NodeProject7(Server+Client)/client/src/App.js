import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import HeaderNav from './components/HeaderNav';
import Error from './pages/Error';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          {/* <HeaderNav /> */}
          <Routes>
            <Route index element= {<HomePage />} />
            <Route path='/api/:token' element= {<HomePage />} />
            <Route path='/login' element= {<Login />} />
            <Route path='/register' element= {<Register />} />
            <Route path='/profile' element= {<Profile />} />
            <Route path='/users' element= {<Users />} />
            <Route path='*' element= {<Error />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
