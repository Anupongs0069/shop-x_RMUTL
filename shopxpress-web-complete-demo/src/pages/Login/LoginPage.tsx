import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Container, Row, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validated, setValidated] = useState<boolean>(false);
  const [error, setError] = useState<string>('');


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const handleLogin = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.checkValidity() === false) {
      setValidated(true);
      return;
    }

    // Mock authentication logic
    const loginResult = await login(email, password);
    if (loginResult) {
      setError('');
      toast.success('Login successfully');
    } else {
      toast.error('Invalid email or password');
    }
  }, [login, toast, setError, email, password]);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h1 className="text-center">Login</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleLogin}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a password.
                </Form.Control.Feedback>
              </Form.Group>
              <div className='d-grid'>

              </div>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" className="mt-3" >
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
