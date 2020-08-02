import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
  padding: 0 10px;
`;

const TVPresenter = ({ topRated, popular, airingToday, error, loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated Shows">
          {topRated.map((show) => (
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
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Rated Shows">
          {popular.map((show) => (
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
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title="Airing Today">
          {airingToday.map((show) => (
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
        </Section>
      )}
      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TVPresenter;
