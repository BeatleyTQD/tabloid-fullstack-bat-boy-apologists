import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import Post from "./post/Post";
import PostList from "./post/PostList";
import Home from "./Home";
import UserProfileList from "./UserProfileList";
import UserProfileDetails from "./UserProfileDetails";
import TagList from "./TagList";
import CategoryList from "./Category/CategoryList";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);
  // let isAdmin = sessionStorage.getItem("userProfile");
  // isAdmin.search('"name":"Admin"')
  
  return (
    <main className="main__applicationViews">
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post">
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/category" exact>
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"Admin"') != -1 ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tags">
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userprofiles" exact>
          {isLoggedIn ? <UserProfileList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userprofiles/:id" exact>
          <UserProfileDetails />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}
