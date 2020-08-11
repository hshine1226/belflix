import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  transition: opacity 0.2s linear;
  margin-bottom: 10px;
`;

const Rating = styled.span`
  position: absolute;
  bottom: 5px;
  right: 5px;
  opacity: 0;
  transition: opacity 0.2s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 15px;
  position: relative;
  height: 100%;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const InformContainer = styled.div``;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          src={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require("assets/noPosterSmall.jpg")
          }
        />
        <Rating>
          <span role="img" aria-label="rating">
            ⭐
          </span>
          {"  "}
          {rating}/10
        </Rating>
      </ImageContainer>
      <InformContainer>
        <Title>
          {title.length > 11 ? `${title.substring(0, 11)}...` : title}
        </Title>
        <Year>{year}</Year>
      </InformContainer>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default Poster;
