import Registration  from './auth/registration';
import { toast, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate, Link , useParams } from 'react-router-dom';
import Login from './auth/login';
import  Dashboard from './dashboard';
import UpdateUser from './auth/updateUser';
import { useSelector } from 'react-redux';
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

        </Routes>

        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={200000} />
      </div>
    </Router>
  );
}

export default App;
