import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

import {Link} from 'react-router-dom';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">

        <div className="movie-poster">
          <Image src={ movie.ImagePath } fluid />
        </div>

        <div className="movie-title">
          <span className="label"> Title: </span>
          <span className="value"><h1> { movie.Title} </h1></span>
        </div>

        <div className="movie-description">
          <span className="label"> Description: </span>
          <span className="value"> {movie.Description} </span>
        </div>

        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre: </Button>
        </Link>

        <Button onClick={ () => { onBackClick(null); }}> Back </Button>
        
      </div>
    );
  }
}

MovieView.prototype = {
  movie: propTypes.shape({
    Title: propTypes.string.isrequired,
    Descripton: propTypes.string.isrequired,
    ImagePath: propTypes.string.isrequired,
    Director: propTypes.shape({
      Name: propTypes.string.isrequired
    }),
    Genre: propTypes.shape({
      Name: propTypes.string.isrequired
    }),
  }).isrequired
};