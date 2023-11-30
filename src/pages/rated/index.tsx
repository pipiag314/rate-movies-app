import { useState } from "react";
import { Container, Header, Menu, Segment } from "semantic-ui-react";
import { DisplayType } from "../home";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTvShows } from "./query";
import ColumnDisplay from "../home/ColumnDisplay";

const Rated = () => {

    const [activeTab, setActiveTab] = useState<DisplayType>(DisplayType.Movies);
    
    const { data: ratedMovies, isLoading: isLoadingRatedMovies } = useQuery({
        queryKey: ["ratedMovies"],
        queryFn: fetchRatedMovies,
      });

    const { data: ratedTvShows, isLoading: isLoadingRatedTvShows } = useQuery({
        queryKey: ["rateTvShows"],
        queryFn: fetchRatedTvShows,
      });

      console.log(ratedMovies)
    
    return (
        <div style={{marginTop: 50}}>
            <Container>
                <Menu pointing secondary>
                    <Menu.Item name="Movies" active={activeTab === DisplayType.Movies} onClick={() => setActiveTab(DisplayType.Movies)} />
                    <Menu.Item name="TvShows" active={activeTab === DisplayType.TvShows} onClick={() => setActiveTab(DisplayType.TvShows)} />
                </Menu>

                <Segment>
                    {activeTab === DisplayType.Movies ? (
                        <div>
                            <Header as={"h2"}>Rated Movies</Header>
                            {isLoadingRatedMovies ? (
                                <div>Loading...</div>
                            ) : (
                                <ColumnDisplay data={ratedMovies.results} dataType={DisplayType.Movies} />
                            )}
                        </div>
                    ) : (
                        <div>
                            <Header as={"h2"}>TV Shows</Header>
                            {isLoadingRatedTvShows ? (
                                <div>Loading...</div>
                            ) : (
                                <ColumnDisplay data={ratedTvShows.results} dataType={DisplayType.TvShows} />
                            )}
                        </div>
                    )}
                </Segment>
            </Container>
        </div>
    )
}

export default Rated;