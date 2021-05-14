import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import Preloader from "../components/Preloader";

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";
 
  const userRegister = useSelector((state) => state.userRegister);
  
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [dispatch,history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if(password != confirmPassword){
        setMessage('Password do not match')
    }else{
        dispatch(register(name, email, password));
    }


  };

  return (
    <FormContainer>
      <h1>Register</h1>

      {message && <Message variant="danger">{message}</Message>}

      {error && <Message variant="danger">{error}</Message>}

      {loading && <Preloader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
           required 
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="PasswordCongirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
                    Register
                    </Button>
      </Form>

      <Row className='py-3'>
        <Col>
         Have an Account? <Link 
         to={redirect ? `/login?redirect=${redirect}` : '/login'}>
         Sign In
         </Link>
        </Col>
        </Row>

    </FormContainer>
  );
};

export default RegisterScreen;
