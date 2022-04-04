import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import UserSettings from './pages/userSettings';
import UsersData from "./records.json";
import {  setUsers } from "./redux/actions";
import {useEffect} from 'react'


function App() {

const dispatch = useDispatch();
useEffect(() => {
  dispatch(setUsers(UsersData));
}, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:userID" element={<UserSettings/>}/>
      </Routes>
    </div>
  );
}

export default App;
