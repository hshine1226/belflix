import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const DetailPresenter = ({ result, videos, error, loading }) => {
  const [slideIndex, setSlideIndex] = useState(1);

  const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
  `;

  const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.bgImage});
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
  `;

  const Cover = styled.div`
    width: 35%;
    height: 100%;
    border-radius: 5px;
  `;

  const CoverImage = styled.img`
    height: 100%;
    mask-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
      linear-gradient(to left top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  `;

  const Content = styled.div`
    width: calc(67% - 100px);
    min-width: 600px;
    position: absolute;
    top: 25px;
    left: 36%;
    right: 0;
    height: 100%;
    max-height: 570px;

    @media (max-width: 1200px) {
      width: 100%;
      left: 0;
      padding: 0 45px;
      min-width: 0;
    }
  `;

  const Data = styled.div`
    width: 100%;
  `;

  const Title = styled.h3`
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 10px;
  `;

  const ItemContainer = styled.div`
    margin: 20px 0;
  `;

  const Divider = styled.span`
    margin: 0 10px;
  `;

  const Item = styled.span`
    font-weight: 500;
  `;

  const OverView = styled.p`
    font-size: 15px;
    opacity: 0.7;
    line-height: 1.5;
    width: 100%;
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

  const SlideContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    margin: 25px 0;
    overflow-y: hidden;
  `;

  const NumberText = styled.div`
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    position: absolute;
    top: 0;
  `;

  const ButtonPrev = styled.a`
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 0;
    width: auto;
    padding: 16px;
    margin-top: -22px;
    color: white;
    font-weight: bold;
    font-size: 18px;
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
    top: 50%;
    right: 0;
    width: auto;
    padding: 16px;
    margin-top: -22px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
    border-radius: 3px 0 0 3px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  `;

  const YoutubeVideo = styled.iframe`
    width: 100%;
    height: 100%;
    display: none;
    &:nth-child(${slideIndex}) {
      display: block;
    }
  `;

  const handlePrev = () => {
    if (slideIndex === 1) {
      setSlideIndex(videos.length);
    } else {
      setSlideIndex(slideIndex - 1);
    }
    console.log(slideIndex);
  };

  const handleNext = () => {
    if (slideIndex === videos.length) {
      setSlideIndex(1);
    } else {
      setSlideIndex(slideIndex + 1);
    }
    console.log(slideIndex);
  };

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      ></Backdrop>
      <Cover>
        <CoverImage
          src={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("assets/noPosterSmall.jpg")
          }
        />
      </Cover>
      <Content>
        <Data>
          <Title>{result.title ? result.title : result.name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date === null
                ? "개봉일 데이터 없음"
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
                target="_blank"
                rel="noopener noreferrer"
              >
                IMDB
              </a>
            </IMDBButton>
          ) : null}
        </Data>
        {videos && videos.length > 0 ? (
          <SlideContainer>
            {videos.map((video, index, arr) => (
              <YoutubeVideo
                key={video.id}
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
              ></YoutubeVideo>
            ))}
            <NumberText>{`${slideIndex}/${videos.length}`}</NumberText>
            <ButtonPrev onClick={handlePrev}>&#10094;</ButtonPrev>
            <ButtonNext onClick={handleNext}>&#10095;</ButtonNext>
          </SlideContainer>
        ) : null}
      </Content>
    </Container>
  );
};

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
