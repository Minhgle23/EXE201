import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../component/common/style/Login.css';

const Login = ({ setIsAuthenticated, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9999/users');
      const users = await response.json();

      const user = users.find((u) => u.username === username && u.password === password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true);
        alert('Login successful');

        if (user?.role === 'ADMIN') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow">
            <div className="card-body p-0">
              <div className="row g-0">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-4">
                  <img src="./assets/images/signin/signin-image.jpg" alt="sign up image" className="img-fluid" />
                  
                </div>
                <div className="col-12 col-md-6 p-4">
                  <h2 className="card-title text-center mb-4">Sign In</h2>
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="remember-me" />
                      <label className="form-check-label" htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Log in</button>
                    {error && <p className="text-danger mt-2">{error}</p>}
                  </form>
                  <div className="mt-3 text-center">
                    <p>Or login with</p>
                    <div className="d-flex justify-content-center">
                      <a href="#" className="btn btn-outline-primary me-2"><i className="fa fa-facebook"></i></a>
                      <a href="#" className="btn btn-outline-info me-2"><i className="fa fa-twitter"></i></a>
                      <a href="#" className="btn btn-outline-danger"><i className="fa fa-google"></i></a>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                  <p className="mt-3 text-center">
                    <a href="/forgot" className="forgot text-decoration-none text-dark">Forgot your password?</a>
                    
                  </p>
                  </div>  
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;