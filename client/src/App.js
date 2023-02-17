import Registration  from './auth/registration';
import { toast, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate, Link , useParams } from 'react-router-dom';
import Login from './auth/login';
import CreateClass from './classroom/createClass';
import Dashboard from './dashboard';
import UpdateUser from './auth/updateUser';
import UpdateClass from './classroom/updateClass';
import { useSelector } from 'react-redux'
import ViewClass from './classroom/viewClass';
import AllUser from './auth/allUser';

function App() {

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const user = useSelector(state => state.user);
  console.log(isLoggedIn);

  return (
    <Router >
      <div className="App">
        <Routes>
        
          <Route exact path='/' element={ isLoggedIn ? < Dashboard /> : <Navigate to="/auth/login"/> } ></Route>
          <Route path='/auth' >
            <Route exact path='/auth/login' element={ < Login />}></Route>
            <Route exact path='/auth/register' element={< Registration />}></Route>
            <Route  exect path={'/auth/update/:id'} element={ <UpdateUser  /> } ></Route>
            {/* <Route  exect path={'/auth/delete/:id'} element={ <UpdateUser  /> } ></Route> */}
            <Route exact path='/auth/allUser' element={ <AllUser /> } ></Route>
          </Route>
          <Route path='/classroom'>
            <Route exact path='/classroom/createClass' element={ < CreateClass /> }></Route>
            <Route exact path='/classroom/updateClass' element={ < UpdateClass /> }></Route>
            <Route exact path='/classroom/ViewClass' element={ < ViewClass /> }></Route>
          </Route>

        </Routes>

        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={20000} />
      </div>
    </Router>
  );
}

export default App;
