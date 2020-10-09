import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Post from "./post/Post";
import PostList from "./post/PostList";
import Home from "./Home";
import UserProfileList from "./UserProfileList";
import UserProfileDetails from "./UserProfileDetails";
import TagList from "./Tag/TagList";
import TagForm from "./Tag/TagForm";
import TagEditForm from "./Tag/TagEditForm";
import CategoryList from "./Category/CategoryList";
import PostDetail from "./post/PostDetail";
import PostForm from "./post/PostForm";
import CategoryForm from "./Category/CategoryForm"
export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);


  return (
    <>
      <Switch>

        <Route path="/category/add">
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"Admin"') != -1 ? <CategoryForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>


        {/* ///////////POSTS//////////// */}
        <Route path="/post" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/add" exact>
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category" exact>
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"Admin"') != -1 ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id" exact>
          <PostDetail />
        </Route>


        {/* ///////////TAGS//////////// */}
        <Route path="/tags" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tags/add">
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tags/:id/edit" >
          {isLoggedIn ? <TagEditForm /> : <Redirect to="/login" />}
        </Route>


        {/* ///////////USER PROFILES//////////// */}
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
    </>
  );
}
