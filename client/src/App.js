import Registration  from './auth/registration';
import { toast, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/login';
import  Dashboard from './dashboard';
import UpdateUser from './auth/updateUser';
import { useSelector } from 'react-redux';
import AllStudentsList from './auth/allStudents';
import AllProfessorsList from './auth/allProfessors';
import { RoleName } from './model/RoleName';
import ErrorPage from './error'; 
import Profile from './auth/profile';
import Material from './auth/material';
import UpdateClass from './classroom/updateClass';
import { useSelector } from 'react-redux'
import ViewClass from './classroom/viewClass';

function App() {

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const user = useSelector(state => state.user);
  console.log(isLoggedIn);

  return (
    <Router >
      <div className="App">
        <Routes>
        
          <Route exact path='/' element={ isLoggedIn ? < Dashboard /> : <Navigate to="/auth/login"/> } ></Route>
          <Route exact path='/errorPage' element={ <ErrorPage /> } ></Route>

          <Route path='/auth' >
            <Route exact path='/auth/login' element={ isLoggedIn ? <Navigate to="/"/> : < Login />}></Route>
            <Route exact path='/auth/register' element={isLoggedIn ? user.role === RoleName.ADMIN ? < Registration /> : < ErrorPage /> : <Navigate to="/"/> }></Route>
            <Route exect path={'/auth/update/:id'} element={ isLoggedIn ? user.role === RoleName.ADMIN ? <UpdateUser  /> : < ErrorPage /> : <Navigate to="/"/>} ></Route>
            <Route exact path='/auth/allStudents' element={ isLoggedIn ? user.role === RoleName.ADMIN ? <AllStudentsList /> : <ErrorPage /> : <Navigate to="/"/>} ></Route>
            <Route exact path='/auth/allProfessors' element={ isLoggedIn ? user.role === RoleName.ADMIN ? <AllProfessorsList /> : <ErrorPage /> : <Navigate to="/"/> } ></Route>
            <Route exact path='/auth/profile' element={ isLoggedIn ? <Profile /> : <Navigate to="/"/>}></Route>
            <Route exact path='/auth/material/:userId' element={ <Material /> } ></Route>
          </Route>

        </Routes>

        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={200000} theme="dark" />
      </div>
    </Router>
  );
}

export default App;
