import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { registerApi } from '../services/allApi';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    setErrorMessage('');
    const { name, email, mobile, password } = userData;

    if (!name || !email || !mobile || !password) {
      toast.warning('Please fill all fields');
      return;
    }

    try {
      const result = await registerApi(userData);
      console.log('Register response:', JSON.stringify(result, null, 2));

      if (result.status === 201) {
        toast.success(`${name} registered successfully`);
        setUserData({ name: '', email: '', mobile: '', password: '' });
        navigate('/login');
      } else {
        const errorMsg = result.data?.message || 'Registration failed';
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
        console.error('Registration failed:', result.status, result.data);
      }
    } catch (error) {
      const errorMsg = error.data?.message || 'Network error. Please check server status.';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '80vh', paddingTop: '100px', paddingBottom: '50px' }}
      >
        <Card className="p-4 shadow" style={{ width: '400px' }}>
          <h2 className="text-center mb-4 fw-bold">Register at Eventara</h2>
          {errorMessage && (
            <div className="text-center text-danger mb-3">
              {errorMessage}
              <div>
                <Button variant="primary" size="sm" onClick={handleRegister} className="mt-2">
                  Retry
                </Button>
              </div>
            </div>
          )}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter mobile no"
                value={userData.mobile}
                onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
            </Form.Group>
            <Button
              variant="success"
              type="button"
              className="w-100"
              onClick={handleRegister}
            >
              REGISTER
            </Button>
          </Form>
        </Card>
      </Container>
      <ToastContainer />
    </>
  );
};

export default RegisterPage;