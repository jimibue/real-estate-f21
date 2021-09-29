import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Navbar from "./components/NavBar";
import About from "./pages/About";
import Available from "./pages/Available";
import Cities from "./pages/Cities";
import Examples from "./pages/Examples";
import Home from "./pages/Home";
import Things from "./pages/Things";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/available" component={Available} />
          <Route exact path="/cities" component={Cities} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
