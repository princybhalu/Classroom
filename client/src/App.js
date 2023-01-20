import Registration  from './auth/registration/registration';
import { toast, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './auth/login/login';
import  Dashboard from './dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        
          <Route exact path='/' element={ < Dashboard />} ></Route>
          <Route path='/auth'>
            <Route exact path='/auth/login' element={ < Login />}></Route>
            <Route exact path='/auth/register' element={< Registration />}></Route>
          </Route>

        </Routes>


        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={200000} />
      </div>
    </Router>
  );
}

export default App;
