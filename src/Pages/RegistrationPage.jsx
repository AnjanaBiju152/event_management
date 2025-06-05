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

  const handleRegister = async () => {
    const { name, email, mobile, password } = userData;

    if (!name || !email || !mobile || !password) {
      toast.warning('Please fill all fields');
      return;
    }

    try {
      const result = await registerApi(userData);

      if (result.status === 201) {
        toast.success(`${name} registered successfully`);
        setUserData({ name: '', email: '', mobile: '', password: '' }); // reset form
        navigate('/login'); // navigate after reset
      } else if (result.status === 409) {
        toast.warning(`${email} already exists`);
      } else {
        toast.error('Registration failed');
      }
    } catch {
      toast.error('Network or server error');
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
          <Form  >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail" >
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
