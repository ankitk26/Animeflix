import React from "react";
import AnimeInfoLower from "./animeInfo/AnimeInfoLower";
import AnimeInfoUpper from "./animeInfo/AnimeInfoUpper";

const AnimeInfo = ({ anime }) => {
  return (
    <div className="anime_info_wrapper">
      <AnimeInfoUpper anime={anime} />
      <AnimeInfoLower anime={anime} />
    </div>
  );
};

export default AnimeInfo;
