import { DisplayType } from "./index";
import { Card, Grid } from "semantic-ui-react";

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  vote_average: number;
  release_data: string;
  name?: string;
}

interface ColumnDisplayProps {
  data: DisplayData[];
  dataType: DisplayType;
}

const ColumnDisplay = ({ dataType, data }: ColumnDisplayProps) => {
  return (
    // <div>
    //     {data.map(movie => (
    //         <div>{dataType === DisplayType.Movies ? movie.title : movie.name}</div>
    //     ))}
    // </div>

    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded="vertically">
      {data.map((item) => (
        <Grid.Column key={item.id}>
          <Card.Group>
            <Card
              fluid
              image={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              header={dataType === DisplayType.Movies ? item.title : item.name}
              meta={`Release: ${item.release_data} | Rating: ${item.vote_average}`}
              description={item.overview.slice(0, 300) + "..."}
            />
          </Card.Group>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default ColumnDisplay;
