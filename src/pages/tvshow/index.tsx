import { useParams } from "react-router-dom";
import {
  Grid,
  Header,
  Loader,
  Segment,
  Image,
  List,
  Label,
  Accordion,
  Card,
} from "semantic-ui-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTvShowDetails } from "./query";
import { prettyNumber } from "../../utils";

const TvShow = () => {
  const { id } = useParams();

  if (!id) {
    return (
      <div style={{ marginTop: 50 }}>There is no details for this TV show</div>
    );
  }

  const { data, isLoading } = useQuery({
    queryKey: ["tvshows"],
    queryFn: () => fetchTvShowDetails(id),
  });

  if (isLoading) {
    return <Loader active />;
  }

  const seasonsPanel = data.seasons?.map((season: any) => ({
    key: season.id,
    title: `Season ${season.season_number}`,
    content: {
      content: (
        <Card
          style={{ height: "70px" }}
          meta={season.air_date}
          description={`${season.episode_count} Episodes`}
        />
      ),
    },
  }));

  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header>{data.name}</Header>
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
                <Image
                  size="medium"
                  src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                />
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <List>
                <List.Item>
                  <List.Header>
                    Only For Adults? {data.adult ? "Yes" : "No"}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>Created By: </List.Header>
                  {data.created_by?.map((person: any) => (
                    <List.Item key={person.id}>{person.name}</List.Item>
                  ))}
                </List.Item>
                <List.Item>
                  <List.Header>Genres: </List.Header>
                  <div style={{ display: "flex", gap: 10 }}>
                    {data?.genres?.map((genre: any) => (
                      <Label key={genre.id}>{genre.name}</Label>
                    ))}
                  </div>
                </List.Item>
                <List.Item>
                  <List.Header>Popularity: </List.Header>
                  {data.popularity}
                </List.Item>
                <List.Item>
                  <List.Header>Episodes runtime: </List.Header>
                  {data.episode_run_time?.join(" ")}
                </List.Item>
                <List.Item>
                  <List.Header>Vote: </List.Header>
                  {data.vote_average}
                </List.Item>

                <List.Item>
                  <List.Header>First air date: </List.Header>
                  {data.first_air_date}
                </List.Item>

                <List.Item>
                  <List.Header>Networks: </List.Header>
                  {data.networks?.map((network: any) => (
                    <Image
                      key={network.id}
                      size="small"
                      src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                    />
                  ))}
                </List.Item>

                <List.Item>
                  <List.Header>
                    Episodes: {data.number_of_episodes}{" "}
                  </List.Header>
                </List.Item>

                <List.Item>
                  <List.Header>Seasons: {data.number_of_seasons} </List.Header>
                </List.Item>

                <List.Item>
                  <List.Header>Country: {data.original_country} </List.Header>
                </List.Item>

                <List.Item>
                  <List.Header>Description: </List.Header>
                  <List.Item>{data.overview}</List.Item>
                </List.Item>

                <List.Item>
                  <List.Header>Language: </List.Header>
                  {data.spoken_languages?.map((lang: any, index: number) => (
                    <List.Item key={index}>{lang.name}</List.Item>
                  ))}
                </List.Item>

                <List.Item>
                  <List.Header>Seasons: </List.Header>
                  <List.Description style={{height: "300px", overflowY: "auto"}}>
                    <Accordion defaultActiveIndex={0} panels={seasonsPanel} styled />
                  </List.Description>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default TvShow;
