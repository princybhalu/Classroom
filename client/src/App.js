import Registration  from './auth/registration/registration';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Registration />
      <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={200000} />
    </div>
  );
}

export default App;
