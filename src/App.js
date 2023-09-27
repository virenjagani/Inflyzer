import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from "./component/UserList";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import UserForm from "./component/UserForm";
import RegistrationForm from "./Auth/RegistrationForm";
import LoginForm from "./Auth/LoginForm";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "../src/Auth/Authentication/PrivateRoute";
import PublicRoute from "../src/Auth/Authentication/PublicRoute";
import Home from "./component/Home";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Route exact path='/'>
                <Home/>
              </Route>
              <Route path="/register" exact>
                <PrivateRoute>
                  <RegistrationForm />
                </PrivateRoute>
              </Route>
              <Route path="/login" exact>
                <PrivateRoute>
                  <LoginForm />
                </PrivateRoute>
              </Route>

              <Route path="/user" exact>
                <PublicRoute>
                  <UserList />
                </PublicRoute>
              </Route>
              <Route path="/user/add" exact>
                <PublicRoute>
                  <UserForm />
                </PublicRoute>
              </Route>
              <Route path="/user/edit/:id" exact>
                <PublicRoute>
                  <UserForm />
                </PublicRoute>
              </Route>
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
