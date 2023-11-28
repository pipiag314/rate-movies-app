import { DisplayType } from "./index";
import { Card, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded="vertically">
      {data?.map((item) => (
        <Grid.Column key={item.id}>
          <Card.Group>
            <Link to={dataType === DisplayType.Movies ? `/moive/${item.id}` : `/tvshow/${item.id}`}>
              <Card
                fluid
                image={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                header={dataType === DisplayType.Movies ? item.title : item.name}
                meta={`Release: ${item.release_data} | Rating: ${item.vote_average}`}
                description={item.overview.slice(0, 300) + "..."}
              />
            </Link>
          </Card.Group>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default ColumnDisplay;
