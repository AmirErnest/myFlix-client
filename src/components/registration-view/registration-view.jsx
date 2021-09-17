import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { Link } from "react-router-dom";


import './registration-view.scss';



export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [birthdateError, setBirthdateError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    if (setisValid) {
      axios.post('https://my-flix-1.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthdate
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('error registering the user')
        });
    };
  }

  const formValidation = () => {
    let usernameError = {};
    let passwordError = {};
    let emailError = {};
    let birthdateError = {};
    let isValid = true;


    if (username.trim().length < 4) {
      usernameError.usernameShort = "Username incorrect. Use at least 4 characters.";
      isValid = false;
    }
    if (password.trim().length < 5) {
      passwordError.passwordMissing = "Password incorrect. Use at least 5 characters.";
      isValid = false;
    }
    if (!(email && email.includes(".") && email.includes("@"))) {
      emailError.emailNotEmail = "Email address incorrect.";
      isValid = false;
    }
    if (birthdate === '') {
      birthdateError.birthdateEmpty = "Please enter your birthdate.";
      isValid = false;
    }
    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    setBirthdateError(birthdateError);
    return isValid;
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
        <div> 
          <Form style={{margin:"5%"}}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text"
                  value={username} 
                  onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  value={password} 
                  onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>E-mail</Form.Label>
                <Form.Control 
                  type="text"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Birth Date </Form.Label>
                <Form.Control 
                  type="date"
                  value={birthdate} 
                  onChange={e => setBirthdate(e.target.value)} />
            </Form.Group>
            
            <br/>

            <div className="d-grid gap-2">
              <Button type="submit" onClick={handleSubmit}> Register </Button>
            </div>

          <Link to="/">
          <div className="d-grid gap-2">
            <Button variant="secondary" type="button">Log IN</Button>
          </div>
          </Link>
          </Form>
        </div>
      </Col>
    </Row>
  );
} 

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }),
};