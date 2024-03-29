import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://my-flix-1.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
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
            
            <br/>

            <div className="d-grid gap-2">
              <Button type="submit" onClick={handleSubmit}> Log In </Button>
            </div>

            
              <Link to={`/register`}>
              <div className="d-grid gap-2">
                <Button variant="success link">Register</Button>
              </div>
              </Link>
            
          </Form>
        </div>
      </Col>
    </Row>
  );
}


LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired
};