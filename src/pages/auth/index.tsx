import { Grid, Segment, Form, Button, Header } from "semantic-ui-react";
import { mutationLogin } from "./mutation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Auth = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage.getItem("guest_session_id") !== null
  );
  
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    const {guest_session_id} = await mutationLogin();
    console.log("handling login start")
    console.log("handling login...")
      localStorage.setItem("guest_session_id", guest_session_id);
      toast.success("Logged In succesfully");
      navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("guest_session_id");
    setIsUserLoggedIn(localStorage.getItem("guest_session_id") !== null);
    toast.success("Logged Out succesfully");
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        {isUserLoggedIn ? (
          <Segment stacked>
            <Header>
              Account: {`guest${localStorage.getItem("guest_session_id")}`}
            </Header>
            <Button color="red" size="big" fluid onClick={handleLogout}>
              Log out
            </Button>
          </Segment>
        ) : (
          <>
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
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Auth;
