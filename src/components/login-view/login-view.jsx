import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <div> 
    <Image src="./img/moviepic.jpg" thumbnail/> 
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
          <div className="d-inline-block text-center">Or</div>
          <Button variant="success" type="submit" onClick={RegistrationView}> Register </Button>
        </div>
      </Form>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};