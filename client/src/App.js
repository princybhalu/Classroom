import Registration from './auth/registration';
import { toast, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/login';
import Dashboard from './dashboard';
import UpdateUser from './auth/updateUser';
import { useSelector } from 'react-redux';
import AllStudentsList from './auth/allStudents';
import AllProfessorsList from './auth/allProfessors';
import { RoleName } from './model/RoleName';
import ErrorPage from './error';
import Profile from './auth/profile';
import Material from './material/uploadMaterial';
import JoinClassroom from './classroom/joinClassroom';
import ViewMaterial from './material/viewMaterial';
import UpdateMaterial from './material/updateMaterial';
import UploadAssignment from './assignment/uploadAssignment';
import CreateClassroom from './classroom/createClassroom';
import ViewClassroom from './classroom/viewClassroom';
import ViewAssignment from './assignment/viewAssignment';
import UpdateAssingment from './assignment/updateAssingment';
import StudentUploadAssignment  from "./assignment/studentUploadAssignment"

function App() {

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const user = useSelector(state => state.user);
  console.log(isLoggedIn);

  return (
    <Router >
      <div className="App">
        <Routes>

          <Route exact path='/' element={isLoggedIn ? < Dashboard /> : <Navigate to="/auth/login" />} ></Route>
          <Route exact path='/errorPage' element={<ErrorPage />} ></Route>

          <Route path='/auth' >
            {/* <Route exact path='/auth/login' element={isLoggedIn ? <Navigate to="/" /> : < Login />}></Route> */}
            <Route exact path='/auth/login' element={<Login />}></Route> 
            <Route exact path='/auth/register' element={isLoggedIn ? user.role === RoleName.ADMIN ? < Registration /> : < ErrorPage /> : <Navigate to="/" />}></Route>
            <Route exect path={'/auth/update/:id'} element={isLoggedIn ? user.role === RoleName.ADMIN ? <UpdateUser /> : < ErrorPage /> : <Navigate to="/" />} ></Route>
            <Route exact path='/auth/allStudents' element={isLoggedIn ? user.role === RoleName.ADMIN ? <AllStudentsList /> : <ErrorPage /> : <Navigate to="/" />} ></Route>
            <Route exact path='/auth/allProfessors' element={isLoggedIn ? user.role === RoleName.ADMIN ? <AllProfessorsList /> : <ErrorPage /> : <Navigate to="/" />} ></Route>
            <Route exact path='/auth/profile' element={isLoggedIn ? <Profile /> : <Navigate to="/" />}></Route>
          </Route>

          <Route path='/classroom' >
            <Route exact path='/classroom/joinClassroom' element={isLoggedIn ? < JoinClassroom /> : < Login />}></Route>
            <Route exact path='/classroom/createClassroom' element={isLoggedIn ?  user.role === RoleName.PROFESSOR ? < CreateClassroom /> : <ErrorPage /> : < Login />}></Route>
            <Route exact path='/classroom/viewClassroom/:class_id' element={isLoggedIn ? < ViewClassroom /> : < Login />}></Route>

          </Route>

          <Route path='/material' >
            <Route exact path='/material/uploadMaterial/:user_Id' element={<Material />} ></Route>
            <Route exact path='/material/viewMaterial/:user_Id' element={<ViewMaterial />} ></Route>
            <Route exact path='/material/updateMaterial/:MaterialId' element={<UpdateMaterial />} ></Route>
          </Route>

          <Route path='/assignment' >
            <Route exact path='/assignment/uploadAssignment/:user_Id' element={<UploadAssignment />}></Route>
            <Route exact path='/assignment/viewAssignment/:user_Id' element={<ViewAssignment />}></Route>
            <Route exact path='/assignment/updateAssignment/:AssignmentId' element={<UpdateAssingment />}></Route>
            <Route exact path='/assignment/studentUploadAssignment/:AssignmentId' element={<StudentUploadAssignment />}></Route>
          </Route>


        </Routes>

        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={1000} theme="dark" />
      </div>
    </Router>
  );
}

export default App;
