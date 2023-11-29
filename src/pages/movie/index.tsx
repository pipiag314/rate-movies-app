import { useParams } from "react-router-dom";
import { Grid, Header, Loader, Segment, Image, List, Label } from "semantic-ui-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "./query";
import { prettyNumber } from "../../utils";

const Movie = () => {
  const { id } = useParams();

  if (!id) {
    return (
      <div style={{ marginTop: 50 }}>There is no details for this movie</div>
    );
  }

  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetails(id),
  });


  if (isLoading) {
    return <Loader active />;
  }

  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header>{data.title}</Header>
        <Grid columns={2} divided textAlign="left" style={{ marginTop: 50 }}>
          <Grid.Row>
            <Grid.Column widescreen={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  height: "100%",
                }}>
                    <Image size="medium" centered src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} />
                    
                </div>
            </Grid.Column>
            <Grid.Column width={10}>
                <List>
                  <List.Item>
                    <List.Header>Only For Adults? {data.adult ? "Yes" : "No"}</List.Header>
                  </List.Item>
                  <List.Item>
                    <List.Header>Budget: {prettyNumber(data.budget)}</List.Header>
                  </List.Item>
                  <List.Item>
                    <List.Header>Genres: </List.Header>
                    <div style={{display: "flex", gap: 10}}>
                      {data?.genres?.map((genre: any) => (
                        <Label key={genre.id}>{genre.name}</Label>
                      ))}
                    </div>
                  </List.Item>
                  <List.Item>
                    <List.Header>IMDB: </List.Header>
                    {data.imdb_id}
                  </List.Item>
                  <List.Item>
                    <List.Header>Popularity: </List.Header>
                    {data.popularity}
                  </List.Item>
                  <List.Item>
                    <List.Header>Revenue: </List.Header>
                    {prettyNumber(data.revenue)}
                  </List.Item>
                  <List.Item>
                    <List.Header>Runtime: </List.Header>
                    {data.runtime + "min"}
                  </List.Item>
                  <List.Item>
                    <List.Header>Vote: </List.Header>
                    {data.vote_average}
                  </List.Item>
                  <List.Item>
                    <List.Header>Language: </List.Header>
                    {data.spoken_languages?.map((lang: any, index: number) => (
                      <List.Item key={index}>{lang.name}</List.Item>
                    ))}
                  </List.Item>
                </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default Movie;
