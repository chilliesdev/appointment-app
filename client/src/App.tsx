import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Signin, Signup } from './auth/views';

function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/signup">Signup Page</Link>
        </li>
        <li>
          <Link to="/signin">Signin Page</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
