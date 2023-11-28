import { Button } from "semantic-ui-react";
import { useState } from "react";
import ColumnDisplay from "./ColumnDisplay";
import { fetchMovies, fetchTvShows } from "./query";
import { useQuery } from "@tanstack/react-query";

export enum DisplayType {
  Movies = "movies",
  TvShows = "tvshows",
}

const Home = () => {
  
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.Movies
  );

  const {data: movieData, isLoading: isLoadingMovies} = useQuery({queryKey: ["movie"], queryFn: fetchMovies})
  const {data: tvShowData, isLoading: isLoadingTvShows} = useQuery({queryKey: ["tvshows"], queryFn: fetchTvShows})
  
  
  return (
    <div style={{ marginTop: "50px", height: "auto" }}>
      <Button.Group>
        <Button
          color={displayType === DisplayType.Movies ? "blue" : undefined}
          onClick={() => setDisplayType(DisplayType.Movies)}>
          Movies
        </Button>
        <Button
          color={displayType === DisplayType.TvShows ? "blue" : undefined}
          onClick={() => setDisplayType(DisplayType.TvShows)}>
          TV Shows
        </Button>
      </Button.Group>


      {isLoadingMovies || isLoadingTvShows ? (
        <div>Loading...</div>
      ) : (
        <div style={{ marginTop: 20 }}>
          {displayType === DisplayType.Movies ? (
            <ColumnDisplay data={movieData.results} dataType={DisplayType.Movies} />
          ) : (
            <ColumnDisplay data={tvShowData.results} dataType={DisplayType.TvShows} />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
