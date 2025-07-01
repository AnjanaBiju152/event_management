import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { loginApi } from '../services/allApi';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');
    const { email, password } = userData;

    if (!email || !password) {
      toast.warning('Please fill the form completely');
      return;
    }

    try {
      const result = await loginApi(userData);
      console.log('Login response:', JSON.stringify(result, null, 2));

      if (result.status === 200 && result.data) {
        const { user_data, jwt_token } = result.data;
        if (!user_data || !jwt_token) {
          toast.error('Invalid response from server');
          console.error('Missing user_data or jwt_token:', result.data);
          return;
        }
        sessionStorage.setItem('existingUser', JSON.stringify(user_data));
        sessionStorage.setItem('token', jwt_token);
        toast.success('Login successful');
        console.log('User role:', user_data.role);
        if (user_data.role === 'admin') {
          console.log('Redirecting to /admin/dashboard');
          navigate('/admin/dashboard', { replace: true });
        } else if (user_data.role === 'user') {
          console.log('Redirecting to /user/dashboard');
          navigate('/user/dashboard', { replace: true });
        } else {
          toast.error(`Unknown user role: ${user_data.role}`);
          console.error('Invalid role:', user_data.role);
          navigate('/login', { replace: true });
        }
      } else {
        const errorMsg = result.data?.message || 'Login failed. Please try again.';
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
        console.error('Login failed:', result.status, result.data);
      }
    } catch (error) {
      const errorMsg = error.data?.message || 'Network error. Please check server status.';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    setUserData({ email: '', password: '' });
    sessionStorage.removeItem('existingUser');
    sessionStorage.removeItem('token');
  }, []);

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '80vh', paddingTop: '100px', paddingBottom: '40px' }}
      >
        <Card className="p-4 shadow" style={{ width: '400px' }}>
          <h2 className="text-center mb-4 fw-bold">Login to Eventara</h2>
          {errorMessage && (
            <div className="text-center text-danger mb-3">
              {errorMessage}
              <div>
                <Button variant="primary" size="sm" onClick={handleLogin} className="mt-2">
                  Retry
                </Button>
              </div>
            </div>
          )}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                autoComplete="off"
                name="login-email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                autoComplete="off"
                name="login-password"
              />
            </Form.Group>
            <Button variant="primary" type="button" className="w-100" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Card>
      </Container>
      <ToastContainer />
    </>
  );
};

export default LoginPage;