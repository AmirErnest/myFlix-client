import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';



export class DirectorView extends React.Component {
  render() {
    const {movie, onBackClick} = this.props;

    <div className="director-view">

      <div className="director-name">
        <h1><span className="value"> {movie.Director.Name}</span></h1>
      </div>

      <div className="director-birthdate">
        <h2><span className="value"> {movie.Director.Birthdate} </span></h2>
      </div>

      <div className="director-bio">
        <h3><span className="value"> {movie.Director.Bio} </span></h3>
      </div>

      <Button variant="primary" onClick={() => { onBackClick(null); }}> Back </Button>

    </div>
  }
}

DirectorView.propTypes = {
  director: propTypes.shape({
    Name: propTypes.string.isrequired,
    Bio: propTypes.string.isrequired,
    Birthdate: propTypes.string.isrequired
  }).isrequired
};