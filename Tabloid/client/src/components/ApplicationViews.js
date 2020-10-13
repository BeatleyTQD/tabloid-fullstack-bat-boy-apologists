import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Post from "../components/post/Post"
import PostList from "./post/PostList";
import Home from "./Home";
import UserProfileList from "../components/UserProfile/UserProfileList";
import UserProfileDetails from "../components/UserProfile/UserProfileDetails";
import UserProfileEdit from "../components/UserProfile/UserProfileEdit";
import TagList from "../components/Tag/TagList";
import TagForm from "../components/Tag/TagForm";
import TagEditForm from "../components/Tag/TagEditForm";
import CategoryList from "./Category/CategoryList";
import PostDetail from "../components/post/PostDetail";
import PostForm from "../components/post/PostForm";
import PostEditForm from "./post/PostEditForm";
import CategoryForm from "./Category/CategoryForm";
import CategoryEditForm from './Category/CategoryEditForm';
import MyPosts from "./post/MyPosts";



export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);


  return (
    <main className="main__applicationViews">
      <Switch>

        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/add">
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"Admin"') !== -1 ? <CategoryForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category" exact>
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"Admin"') !== -1 ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/:id/edit" exact>
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"Admin"') !== -1 ? <CategoryEditForm /> : <Redirect to="/login" />}
        </Route>


        {/* ///////////POSTS//////////// */}
        <Route path="/post" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/myposts" exact>
          {isLoggedIn ? <MyPosts /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/add" exact>
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id" exact>
          {isLoggedIn ? <PostDetail /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id/edit" >
          {isLoggedIn ? <PostEditForm /> : <Redirect to="/login" />}
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

        <Route path="/userprofiles/edit/:id" exact>
          <UserProfileEdit />
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
