import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, CardDeck, Form, Row, Button } from 'react-bootstrap';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthdate: null,
      FavoriteMovies: null,
      validated: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  //get user information method
  getUser(token) {
    let username = localStorage.getItem('user');
    axios.get(`https://my-flix-1.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      //Assign the result to the state
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthdate: response.data.Birthdate,
        FavoriteMovies: response.data.FavoriteMovies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  removeFavoriteMovie(movie) {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    //axios delete a movie
    axios.delete(`https://my-flix-1.herokuapp.com/users/${username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert("The movie is successfully removed");
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleUpdate (e, newUsername, newPassword, newEmail, newBirthdate) {
    this.setState({
      validated: null,
    });

    let form = e.currentTarget;
    if (form.checkvalidity() === false) {
      /*  The stopPropagation() method of the Event interface prevents further propagation of the 
      current event in the capturing and bubbling phases. */
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');

    axios.put(`https://my-flix-1.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername: this.state.Username,
        Password: newPassword ? newPassword: this.state.Password,
        Email: newEmail ? newEmail: this.state.Email,
        Birthdate: newBirthdate ? newBirthdate: this.state.Birthdate,
      },
    })
    .then((response) => {
      alert("changes are successfully saved!");
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthdate: response.data.Birthdate
      });
      localStorage.setItem('user', this.state.Username);
      window.open(`/users/${username}`, '_self');
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  setUsername(input) {
    this.Username = input;
  }
  setPassword(input) {
    this.Password = input;
  }
  setEmail(input) {
    this.Email = input;
  }
  setBirthdate(input) {
    this.Birthdate = input;
  }

  handleDeleteUser(e) {
    e.preventDefault();
  
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');

    axios.delete(`https://my-flix-1.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      alert("Your account is successfully deleted");
      window.open(`/`, '_self');
    })
    .catch((e) => {
      console.log(e);
    });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return (
      <Row className="profile-view">
        <Card className="profile-card">
          <h2>Your Favorites Movies</h2>
          <Card.Body>
            {FavoriteMovies && FavoriteMovies.length === 0 && <div className="text-center">Empty.</div>}

            <div className="favorites-movies">
              {FavoriteMovies && (FavoriteMovies.length > 0) && movies &&
                movies.map((movie) => {
                  if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                    return (
                      <CardDeck className="movie-card-deck" key={movie._id}>
                        <Card className="favorites-item card-content" style={{ width: '16rem' }}>
                          <Card.Img style={{ width: '18rem' }} className="movieCard" variant="top" src={movie.ImagePath} />
                          <Card.Body>
                            <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                            <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movie._id} onClick={() => this.removeFavoriteMovie(movie)}>
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      </CardDeck>
                    );
                  }
                })}
            </div>
          </Card.Body>

          <h1 className="section">Update Profile Information</h1>
          <Card.Body>
            <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthdate)}>
              
              <Form.Group controlId="formBasicUsername">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">
                  Password<span className="required">*</span>
                </Form.Label>
                <Form.Control type="password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} />
              </Form.Group>
              
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
              </Form.Group>
              
              <Form.Group controlId="formBasicBirthday">
                <Form.Label className="form-label">Birthdate</Form.Label>
                <Form.Control type="date" placeholder="Change Birthdate" onChange={(e) => this.setBirthdate(e.target.value)} />
              </Form.Group>

              <Button variant="danger" type="submit">
                Update Info
              </Button>

              <h3>Delete your account</h3>
              <Card.Body>
                <Button variant="danger" onClick={(e) => this.handleDeleteUser(e)}>
                  Delete Account
                </Button>
              </Card.Body>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    );
  }
}

ProfileView.prototypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isrequired
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }),
};