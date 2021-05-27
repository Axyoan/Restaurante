import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/client/login"
import Main from "./pages/client/main"
import { GlobalStyle } from "./styles/core.js"

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/main/" component={Main} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
