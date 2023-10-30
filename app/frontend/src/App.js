import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PersonList from "./PersonList";
import SelectedPerson from "./SelectedPerson";
import UpdatePerson from "./UpdatePerson";
import AddPerson from "./AddPerson";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PersonList} />
        <Route path="/person/:id" exact component={SelectedPerson} />
        <Route path="/person/:id/edit" exact component={UpdatePerson} />
        <Route path="/add" exact component={AddPerson} />
      </Switch>
    </Router>
  );
};

export default App;
