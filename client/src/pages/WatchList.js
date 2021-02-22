import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import WatchListItem from "../components/watchListPage/WatchListItem";
import ErrorMessage from "../layouts/ErrorMessage";
import Spinner from "../layouts/Spinner";
import { GET_WATCHLIST } from "../queries/queries";

const WatchList = () => {
  const { loading, error, data } = useQuery(GET_WATCHLIST, { fetchPolicy: "network-only" });

  const no_items = (
    <div className="no_items">
      <p>No items in watchlist</p>
      <Link to="/airing">Add anime from airing anime</Link>
    </div>
  );

  return (
    <div className="top_animes_section">
      <h1 className="top_heading">Your Watchlist</h1>
      {error && <ErrorMessage />}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="watchlist_items">
            {data &&
              // (data.getWatchList.length === 0
              //   ? no_items
              data.getWatchList.map((anime) => <WatchListItem key={anime._id} anime={anime} id={anime._id} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default WatchList;
