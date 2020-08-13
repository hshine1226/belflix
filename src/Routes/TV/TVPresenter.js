import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import { tvApi } from "../../api";

const Container = styled.div`
  padding: 20px;
`;

const ButtonPrev = styled.a`
  cursor: pointer;
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 23px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ButtonNext = styled.a`
  cursor: pointer;
  position: absolute;
  bottom: -90px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 23px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  border-radius: 3px 0 0 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const TVPresenter = ({ topRated, popular, airingToday, error, loading }) => {
  const [topPage, setTopPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [airingPage, setAiringPage] = useState(1);

  const [topState, setTopState] = useState(null);
  const [popularState, setPopularState] = useState(null);
  const [airingState, setAiringState] = useState(null);

  useEffect(() => {
    setTopState(topRated);
    setPopularState(popular);
    setAiringState(airingToday);
  }, [topRated, popular, airingToday]);

  useEffect(() => {
    tvApi.topRated(topPage).then(({ data: { results } }) => {
      setTopState(results);
    });
  }, [topPage]);

  useEffect(() => {
    tvApi.popular(popularPage).then(({ data: { results } }) => {
      setPopularState(results);
    });
  }, [popularPage]);

  useEffect(() => {
    tvApi.airingToday(airingPage).then(({ data: { results } }) => {
      setAiringState(results);
    });
  }, [airingPage]);

  const handleTopNext = () => {
    setTopPage(topPage + 1);
  };

  const handleTopPrev = () => {
    if (topPage > 1) {
      setTopPage(topPage - 1);
    }
  };

  const handlePopularNext = () => {
    setPopularPage(popularPage + 1);
  };

  const handlePopularPrev = () => {
    if (popularPage > 1) {
      setPopularPage(popularPage - 1);
    }
  };

  const handleAiringNext = () => {
    setAiringPage(airingPage + 1);
  };

  const handleAiringPrev = () => {
    if (airingPage > 1) {
      setAiringPage(airingPage - 1);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <Container>
      {topState && topState.length > 0 && (
        <Section title="Top Rated Shows">
          {topState.map((show) => (
            <Poster
              id={show.id}
              key={show.id}
              title={show.name}
              imageUrl={show.poster_path}
              rating={show.vote_average}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
              isMovie={false}
            />
          ))}
          <ButtonPrev onClick={handleTopPrev}>
            <i className="fas fa-chevron-up"></i>
          </ButtonPrev>
          <ButtonNext onClick={handleTopNext}>
            <i className="fas fa-chevron-down"></i>
          </ButtonNext>
        </Section>
      )}
      {popularState && popularState.length > 0 && (
        <Section title="Popular Rated Shows">
          {popularState.map((show) => (
            <Poster
              id={show.id}
              key={show.id}
              title={show.name}
              imageUrl={show.poster_path}
              rating={show.vote_average}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
              isMovie={false}
            />
          ))}
          <ButtonPrev onClick={handlePopularPrev}>
            <i className="fas fa-chevron-up"></i>
          </ButtonPrev>
          <ButtonNext onClick={handlePopularNext}>
            <i className="fas fa-chevron-down"></i>
          </ButtonNext>
        </Section>
      )}
      {airingState && airingState.length > 0 && (
        <Section title="Airing Today">
          {airingState.map((show) => (
            <Poster
              id={show.id}
              key={show.id}
              title={show.name}
              imageUrl={show.poster_path}
              rating={show.vote_average}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
              isMovie={false}
            />
          ))}
          <ButtonPrev onClick={handleAiringPrev}>
            <i className="fas fa-chevron-up"></i>
          </ButtonPrev>
          <ButtonNext onClick={handleAiringNext}>
            <i className="fas fa-chevron-down"></i>
          </ButtonNext>
        </Section>
      )}
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );
};

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TVPresenter;
