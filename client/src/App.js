// import logo from './logo.svg';
import './App.css';
import DashBoard from './Dashboard/DashBoard';
import FilterBoard from './Dashboard/FilterBoard';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Dashboard/Navbar';
import Header from './Dashboard/Header';

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <div className='body'>
        <Header />
        <div className='app'>

          <Navbar className='navbar' />
          <Routes>
            <Route path="/" element={<DashBoard />} ></Route>
            {/* <Route path="/login" element={<Login />}  ></Route>
        <Route path="/register" element={<Signup />}></Route> */}
            {/* <Route path="/profile" element={<UserProfile />} /> */}
            <Route path="/filter" element={<FilterBoard />} />
            {/* <Route path="/AddEmployee" element={<AddEmployee />} /> */}
            {/* <Route path="/UpdateEmployee" element={<UpdateEmployee />} /> */}

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
