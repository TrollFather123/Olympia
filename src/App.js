import logo from "./logo.svg";
import "./App.css";
import Routing from "./Routing/Routing";
import { Provider } from "react-redux";
import { store } from "./Store/Store";

function App() {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
}

export default App;
