import { Grid, Segment, Form, Button, Header } from "semantic-ui-react";
import { useMutation } from "@tanstack/react-query";
import { mutationLogin } from "./mutation";
import { useNavigate } from "react-router-dom";

const Auth = () => {

    const {data, mutate} = useMutation({mutationKey: ["login"], mutationFn: mutationLogin })
    
    const navigate = useNavigate();
    
    const handleLogin = () => {
        mutate();
        localStorage.setItem("guest_session_id", data.guest_session_id)
        navigate("/");
    }
  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="olive" textAlign="center">
          SIMPLE SIGN UP FORM <br />
          Sign up as a guest
        </Header>
        <Form size="large">
          <Segment stacked>
            <Button color="olive" size="big" fluid onClick={handleLogin}>
              Log in
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Auth;
