import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AnimeItem from "../components/AnimeItem";
import { allGenres } from "../constants/constants";
import ErrorMessage from "../layouts/ErrorMessage";
import Spinner from "../layouts/Spinner";
import { getHeading, getQuery } from "../utils/utils";

const Home = ({ type }) => {
  const [ending, setEnding] = useState(10);
  const { loading, error, data } = useQuery(getQuery(type));

  const showMore = () => setEnding((prev) => prev + 10);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const getDisplayItems = (type) => {
    switch (type) {
      case "top_rated":
        return data.topAnime.slice(0, ending).map((anime) => <AnimeItem key={anime.mal_id} anime={anime} />);
      case "upcoming":
        return data.upcoming.map((anime) => <AnimeItem key={anime.mal_id} anime={anime} />);
      default:
        return data.airing.map((anime) => <AnimeItem key={anime.mal_id} anime={anime} />);
    }
  };

  return (
    <div className="top_animes_section">
      <h1 className="top_heading">{getHeading(type)}</h1>

      {error && <ErrorMessage />}

      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Display all anime */}
          <div className="top_animes_list">{data && getDisplayItems(type)}</div>
          {type === "top_rated" && (
            <>
              {ending < 50 && (
                <div className="show_btn_wrapper">
                  {/* Button for loading more items */}
                  <button onClick={() => showMore()} className="show_more_btn">
                    LOAD MORE
                  </button>
                </div>
              )}

              <div style={{ marginTop: "2rem" }}>
                <h1>Anime by Genre</h1>
                <div className="anime_genre" style={{ marginTop: "2rem" }}>
                  {/* Display anime by genre */}

                  {allGenres.map((genre) => (
                    <Link to={`/animes/genre/${genre.id}`} key={genre.id}>
                      <span>{genre.genre}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
