import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import Message from "Components/Message";
import ReactPlayer from "react-player";

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
  filter: blur(2px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 8px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
  display: flex;
`;

const Item = styled.span`
  display: flex;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 60%;
`;

const Logo = styled.div`
  display: block;
  width: 50px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
`;

const Player = styled(ReactPlayer)`
  margin: 20px 0;
`;

const SeasonTab = styled.div`
  display: grid;
  margin-top: 10px;
  height: 130px;
  grid-template-columns: repeat(auto-fill, 100px);
  width: 100%;
  grid-gap: 10px;
`;
const Season = styled.div`
  display: block;
  width: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 10px;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Netflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message text={error} color="#e74c3c"></Message>
  ) : (
    <Container>
      <Helmet>
        <title>
          {`${
            result.original_title ? result.original_title : result.original_name
          } | Netflix`}
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime
                ? result.runtime
                : result.episode_run_time && result.episode_run_time[0]}{" "}
              min
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
            {result.imdb_id && (
              <Item>
                <Divider>•</Divider>
                <a
                  href={`https://www.imdb.com/title/${result.imdb_id}`}
                  target="_blank"
                >
                  IMDB
                </a>
              </Item>
            )}
            {result.production_companies && (
              <Item>
                {result.production_companies.map(
                  (item) =>
                    item.logo_path && (
                      <>
                        <Divider>•</Divider>
                        <Logo
                          bgImage={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                        ></Logo>
                      </>
                    )
                )}
              </Item>
            )}
            {result.production_countries.length > 0 && (
              <Item>
                <Divider>•</Divider>
                {result.production_countries[0].iso_3166_1}
              </Item>
            )}
          </ItemContainer>
          {result.videos.results[0] && "key" in result.videos.results[0] && (
            <Player
              url={`https://www.youtube.com/watch?v=${result.videos.results[0].key}`}
              playing
              controls
            />
          )}
          <Overview>{result.overview}</Overview>
          <SeasonTab>
            {result.seasons &&
              result.seasons.map((item) => (
                <Season
                  bgImage={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                />
              ))}
          </SeasonTab>
        </Data>
      </Content>
    </Container>
  );
DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
