import "../App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import noImageAvailable from "../assets/noImage.png";

export default function MediaDetailsSection() {
  let { id } = useParams();
  const [fullDetails, setFullDetails] = useState<any>({});
  const [seasons, setSeasons] = useState<any[]>([]);
  const [episodes, setEpisodes] = useState<any[]>([]);

  // get shows by id when page loads and save it in state

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFullDetails(data);
      });
  }, [id]);

  // get show's seasons based on id and save it in state

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
      .then((response) => response.json())
      .then((data) => {
        setSeasons(data);
      });
  }, [id]);

  // get show's episodes based on id and save it in state

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data);
      });
  }, [id]);

  // assign corresponding episodes to each season

  const matchedEpisodes = seasons.reduce((acc: any, i: any) => {
    acc[i.number] = {
      season: i,
      episodes: episodes.filter(
        (j: any) => parseInt(i.number) === parseInt(j.season)
      ),
    };
    return acc;
  }, {});

  return (
    <div className="app">
      <DetailsPoster>
        <Poster
          src={
            fullDetails?.image ? fullDetails?.image?.original : noImageAvailable
          }
        />
        <TitleDetails>
          <h1>
            {fullDetails.name} {} <span>(</span>
            {/* display only premiered year  */}
            {fullDetails.premiered?.slice(0, 4)}
            <span>)</span>
          </h1>
          <Details>
            <p dangerouslySetInnerHTML={{ __html: fullDetails.summary }}></p>
            <p>
              <span style={{ fontWeight: "bold" }}>Type:</span>{" "}
              {fullDetails.type}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Status:</span>{" "}
              {fullDetails.status}
            </p>
            <Genres>
              <p style={{ marginTop: 0 }}>
                <span style={{ fontWeight: "bold" }}>Genres: </span>{" "}
                {fullDetails.genres?.length > 0
                  ? // genres separated by comma
                    fullDetails.genres?.join(", ")
                  : " No genres"}
              </p>
            </Genres>
          </Details>
        </TitleDetails>
      </DetailsPoster>

      {/* map through matched seasons/episodes and display episodes based on season */}

      {Object.entries(matchedEpisodes).map((season: any) => {
        return (
          <>
            <h1>season {season[0]}</h1>
            <EpisodesContainer>
              {/* map through all episodes and display episode's details  */}
              {season[1].episodes.map((episode: any) => {
                return (
                  <EpisodeTitlePoster>
                    {/* link to TV MAZE episode url */}
                    <a href={episode.url}>
                      <PosterEpisodes
                        src={
                          episode.image
                            ? episode.image?.original
                            : noImageAvailable
                        }
                      />
                      <EpisodeTitle>
                        <Text>{episode?.name}</Text>
                      </EpisodeTitle>
                    </a>
                  </EpisodeTitlePoster>
                );
              })}
            </EpisodesContainer>
          </>
        );
      })}
    </div>
  );
}
const Details = styled.div`
  line-height: 1.5rem;
`;
const Poster = styled.img`
  width: 25rem;
  height: 22rem;
  margin: 3rem;
  border-radius: 5px;
`;
const PosterEpisodes = styled.img`
  display: block;
  width: 25rem;
  height: 15rem;
  margin: 1.5rem;
  border-radius: 5px;
`;
const TitleDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  max-width: 80%;
  padding-left: 6rem;
`;
const DetailsPoster = styled.div`
  display: flex;
  margin: 3rem;
`;
const Genres = styled.div`
  display: flex;
  flex-direction: row;
`;
const EpisodesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const EpisodeTitle = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: 0.8s ease;
  background-color: #dddbdb;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
const EpisodeTitlePoster = styled.div`
  position: relative;
`;
const Text = styled.h4`
  color: black;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;
