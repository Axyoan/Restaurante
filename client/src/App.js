import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/login"
import Main from "./pages/client/main"
import MainW from "./pages/waiter/main"
import ManageWaiter from "./pages/waiter/manageWaiter"
import AddNewWaiter from "./pages/waiter/addNewWaiter"
import UpdateWaiter from "./pages/waiter/updateWaiter"
import ManageDishes from "./pages/waiter/manageDishes"
import AddNewDish from "./pages/waiter/addNewDish"
import UpdateDish from "./pages/waiter/updateDish"
import AssignTables from "./pages/waiter/assignTables"
import ManageTables from "./pages/waiter/manageTables"
import { GlobalStyle } from "./styles/core.js"

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          
          <Route path="/" exact component={Login} />
          <Route path="/main/" component={Main} />
          <Route path="/mainW/" component={MainW} />
          <Route path="/manageW/" component={ManageWaiter} />
          <Route path="/addNewW/" component={AddNewWaiter} />
          <Route path="/updateW/" component={UpdateWaiter} />
          <Route path="/manageD/" component={ManageDishes} />
          <Route path="/addNewD/" component={AddNewDish} />
          <Route path="/updateD/" component={UpdateDish} />
          <Route path="/assignT/" component={AssignTables} />
          <Route path="/manageT/" component={ManageTables} />

        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
