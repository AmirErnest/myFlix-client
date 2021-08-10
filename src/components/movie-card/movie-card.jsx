import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  
  render() {
    const { movie, onMovieClick } = this.props;
    
    return (
      <Card className="text-center" border="warning" style={{ margin: '5%' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="warning">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}