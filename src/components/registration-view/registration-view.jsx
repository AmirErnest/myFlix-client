import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';


export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthdate, setBirthdate ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegistration(username);
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
          </Form>
        </div>
      </Col>
    </Row>
  );
} 

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};
