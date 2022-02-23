import React, { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import PageNotFound from "./component/PageNotFound";
import User from "./component/User";
import UserList from "./component/UserList"
import Login from "./component/Login";
import Layout from "./component/static/Layout";
import { refresh } from "./slices/auth";
import Message from "./component/chat/Message";
import { selectIsloggedIn } from "./slices/auth";
const AuthLayout = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              //	state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn =   useSelector(selectIsloggedIn);
 
const loadDashboard= ()=>{
  history.push("/user-list")
}
 

  useEffect(() => {
    
    

    if (localStorage.getItem("refreshToken")) {
      dispatch(refresh());
    }
    if (isLoggedIn) {
      
     loadDashboard()
      
    }
  }, []);

  
  const authUser = localStorage.getItem("isLoggedIn");
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
         
        
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <User />
          </Route>
          <AuthLayout
            authUser={authUser}
            exact={true}
            path="/user"
            component={User}
          />
          <Route path="/" exact>
            <User />
          </Route>
          
		   <AuthLayout
            authUser={authUser}
            exact={true}
            path="/user/:id"
            component={User}
          />
		   <AuthLayout
            authUser={authUser}
            exact={true}
            path="/user-list"
            component={UserList}
          />
         
         
          
          <AuthLayout
            authUser={authUser}
            exact={true}
            path="/chat"
            component={Message}
          />
       
          <Route component={PageNotFound} />
        </Switch>

        {/* <FooterPage /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
