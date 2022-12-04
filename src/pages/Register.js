/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useNavigate } from "react-router-dom";
import {  useDispatch } from 'react-redux'
import { loginAction } from '../redux'
import { Form, Button, Image } from 'react-bootstrap';
import { Layout } from '../components'
import Logo from '../assets/images/logo.png';

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ON FORM SUBMIT
  const onFormSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target),
    formDataObj = Object.fromEntries(formData.entries())
    dispatch(loginAction(formDataObj))
    .unwrap()
    .then(() => {     
      setTimeout(() => {navigate("/home")}, 500);
    });
  }

  return (
    <Layout className="app-register" isHeader={false}>

      {/* CONTENT */}
      <div className='content'>
        <div className='form-wrap'>
          <Image src={Logo}/>
          <h2>Login</h2>
          <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>

    </Layout>
  )
}
