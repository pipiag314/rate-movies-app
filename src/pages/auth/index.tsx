import { Grid, Segment, Form, Button, Header } from "semantic-ui-react";
import { useMutation } from "@tanstack/react-query";
import { mutationLogin } from "./mutation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Auth = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem("guest_session_id") !== null);
    const {data, mutate} = useMutation({mutationKey: ["login"], mutationFn: mutationLogin })
    
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("guest_session_id");
        setIsUserLoggedIn(localStorage.getItem("guest_session_id") !== null)
        toast.success("Logged Out succesfully")
    }
    
    
    const handleLogin = () => {
        mutate();
        localStorage.setItem("guest_session_id", data.guest_session_id)
        navigate("/");
        toast.success("Logged In succesfully");
    }
  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
      <Grid.Column style={{ maxWidth: 450 }}>

        {isUserLoggedIn ? (
          <Segment stacked>
            <Header>Account: {`guest${localStorage.getItem("guest_session_id")}`}</Header>
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
