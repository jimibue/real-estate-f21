import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Navbar from "./components/NavBar";
import Available from "./pages/Available";
import Cities from "./pages/Cities";
import FindHomes from "./pages/FIndHomes";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/available" component={Available} />
          <Route exact path="/cities" component={Cities} />
          <Route exact path="/find_homes" component={FindHomes} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
