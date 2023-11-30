import { DisplayType } from "./index";
import { Card, Grid, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rateMovie, rateTvShow } from "./mutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [rating, setRating] = useState(0);

  const notifyOnSuccess = (item: any) =>
    toast.success(
      `${
        dataType === DisplayType.Movies ? item.title : item.name
      } is succesfully rated!`
    );
  const notifyOnError = (item: any) =>
    toast.error(
      `${
        dataType === DisplayType.Movies ? item.title : item.name
      } is NOT rated! enter the number first`
    );
  

  const { mutate: rateMovieMutation } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: (id: number) => rateMovie(id, rating),
  });
  const { mutate: rateTvShowMutation } = useMutation({
    mutationKey: ["rateTvShow"],
    mutationFn: (id: number) => rateTvShow(id, rating),
  });

  const rateType =
    dataType === DisplayType.Movies ? rateMovieMutation : rateTvShowMutation;

  

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
            <Link
              to={
                dataType === DisplayType.Movies
                  ? `/moive/${item.id}`
                  : `/tvshow/${item.id}`
              }>
              <Card
                fluid
                image={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                header={
                  dataType === DisplayType.Movies ? item.title : item.name
                }
                meta={`Release: ${item.release_data} | Rating: ${item.vote_average}`}
                description={item.overview.slice(0, 300) + "..."}
              />
            </Link>
            <Form>
              <Form.Group>
                <Form.Field>
                  <Form.Input
                    type="number"
                    min={0}
                    max={10}
                    step={0.5}
                    onChange={(e) => setRating(+e.target.value)}
                    action={{
                      color: "olive",
                      icon: "star",
                      onClick: () => {
                        if(rating > 0) {
                          rateType(item.id);
                          notifyOnSuccess(item);
                        } else {
                          notifyOnError(item);
                        }
                        setTimeout(() => {
                          setRating(0);
                        }, 100)
                      },
                    }}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Card.Group>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default ColumnDisplay;
