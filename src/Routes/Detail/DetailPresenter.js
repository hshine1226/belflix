import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImg});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Item = styled.span``;

const OverView = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 20px;
`;

const IMDBButton = styled.button`
  width: fit-content;
  height: 30px;
  color: #000000;
  background-color: #e2b616;
  border: none;
  font-weight: 800;
  border-radius: 5px;
`;

const YoutubeButton = styled.button`
  width: 60px;
  height: 30px;
  color: #f8f8f8;
  background-color: #c71f1e;
  border: none;
  font-weight: 800;
  border-radius: 5px;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      ></Backdrop>
      <Content>
        <Cover
          bgImg={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("assets/noPosterSmall.jpg")
          }
        />
        <Data>
          <Title>{result.title ? result.title : result.name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <OverView>{result.overview}</OverView>
          {result.imdb_id ? (
            <IMDBButton>
              <a
                href={`https://www.imdb.com/title/${result.imdb_id}`}
                target="_black"
              >
                IMDB
              </a>
            </IMDBButton>
          ) : null}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
