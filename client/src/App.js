// import logo from './logo.svg';
// import './App.css';
import DashBoard from './Dashboard/DashBoard';
import FilterBoard from './Dashboard/FilterBoard';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<DashBoard />} ></Route>
        {/* <Route path="/login" element={<Login />}  ></Route>
        <Route path="/register" element={<Signup />}></Route> */}
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        <Route path="/filter" element={<FilterBoard />} />
        {/* <Route path="/AddEmployee" element={<AddEmployee />} /> */}
        {/* <Route path="/UpdateEmployee" element={<UpdateEmployee />} /> */}

      </Routes>
    </BrowserRouter>
    );
}

export default App;
