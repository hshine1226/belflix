import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import { moviesApi } from "../../api";

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

const HomePresenter = ({ nowPlaying, popular, upcoming, error, loading }) => {
  const [nowPage, setNowPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [nowPlayingState, setNowPlayingState] = useState(null);
  const [popularState, setPopularState] = useState(null);
  const [upcomingState, setUpcomingState] = useState(null);

  useEffect(() => {
    if (nowPlayingState === null) {
      setNowPlayingState(nowPlaying);
    }
    if (popularState === null) {
      setPopularState(popular);
    }
    if (upcomingState === null) {
      setUpcomingState(upcoming);
    }
  }, [
    nowPlaying,
    popular,
    upcoming,
    nowPlayingState,
    popularState,
    upcomingState,
  ]);

  useEffect(() => {
    moviesApi.nowPlaying(nowPage).then(({ data: { results } }) => {
      setNowPlayingState(results);
    });
  }, [nowPage]);

  useEffect(() => {
    moviesApi.popular(popularPage).then(({ data: { results } }) => {
      setPopularState(results);
    });
  }, [popularPage]);

  useEffect(() => {
    moviesApi.upcoming(upcomingPage).then(({ data: { results } }) => {
      setUpcomingState(results);
    });
  }, [upcomingPage]);

  const handleNowNext = async () => {
    setNowPage(nowPage + 1);
  };

  const handleNowPrev = () => {
    if (nowPage > 1) {
      setNowPage(nowPage - 1);
      moviesApi.nowPlaying(nowPage).then(({ data: { results } }) => {
        setNowPlayingState(results);
      });
    }
  };

  const handlePopularNext = () => {
    setPopularPage(popularPage + 1);
  };

  const handlePopularPrev = () => {
    if (popularPage > 1) {
      setPopularPage(popularPage - 1);
      moviesApi.popular(popularPage).then(({ data: { results } }) => {
        setPopularState(results);
      });
    }
  };

  const handleUpcomingNext = () => {
    setUpcomingPage(upcomingPage + 1);
  };

  const handleUpcomingPrev = () => {
    if (upcomingPage > 1) {
      setUpcomingPage(upcomingPage - 1);
      moviesApi.upcoming(upcomingPage).then(({ data: { results } }) => {
        setUpcomingState(results);
      });
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <Container>
      {nowPlayingState && nowPlayingState.length > 0 ? (
        <Section title="Now playing">
          {nowPlayingState.map((movie) => (
            <Poster
              id={movie.id}
              key={movie.id}
              title={movie.title}
              imageUrl={movie.poster_path}
              rating={movie.vote_average}
              year={movie.release_date && movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
          <ButtonPrev onClick={handleNowPrev}>&#x25B4;</ButtonPrev>
          <ButtonNext onClick={handleNowNext}>&#x25BE;</ButtonNext>
        </Section>
      ) : null}
      {upcomingState && upcomingState.length > 0 && (
        <Section title="Upcoming Movies">
          {upcomingState.map((movie) => (
            <Poster
              id={movie.id}
              key={movie.id}
              title={movie.title}
              imageUrl={movie.poster_path}
              rating={movie.vote_average}
              year={movie.release_date && movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
          <ButtonPrev onClick={handleUpcomingPrev}>&#x25B4;</ButtonPrev>
          <ButtonNext onClick={handleUpcomingNext}>&#x25BE;</ButtonNext>
        </Section>
      )}
      {popularState && popularState.length > 0 && (
        <Section title="Popular Movies">
          {popularState.map((movie) => (
            <Poster
              id={movie.id}
              key={movie.id}
              title={movie.title}
              imageUrl={movie.poster_path}
              rating={movie.vote_average}
              year={movie.release_date && movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
          <ButtonPrev onClick={handlePopularPrev}>&#x25B4;</ButtonPrev>
          <ButtonNext onClick={handlePopularNext}>&#x25BE;</ButtonNext>
        </Section>
      )}
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );
};

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default HomePresenter;
