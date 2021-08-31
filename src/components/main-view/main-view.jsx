// Modules
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';

// React-Bootstrap Components
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import  MoviesList  from '../movies-list/movies-list';
import  DirectorView  from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavBar } from '../navbar-view/navbar-view';

// React-Bootstrap Components
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

// React-router-DOM components
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// SCSS Styling import
import './main-view.scss';


 class MainView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  // Log In
  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  //  Get user recent data from DB
  getUsers(token) {
    axios.post('https://my-flix-1.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //   Get all movies in DB
  getMovies(token) {
    axios.get('https://my-flix-1.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onRegister(register) {
    this.props.setUser(register.user.Username);
  }


  render() {
    let { movies, user } = this.props;

    return (
      <Router>
        <NavBar user={user} />

        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies}/>
          }} />

          <Route exact path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route exact path="/profile" render={() => {
            if (!user) return <Col>
              <ProfileView />
            </Col>
          }} />

          <Route exact path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route exact path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path='/users/:username' render={({ history }) => {
            if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
            if (movies.length === 0) return;
            return <ProfileView history={history} movies={movies} />
          }} />

        </Row>
      </Router>
    );
  }
};

//get the state from the store & pass it as props to that component that is connected to the store.
let mapStateToProps = state => {
  return { 
    movies: state.movies, 
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);