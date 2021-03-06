import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
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
import PostTagEdit from "./Tag/PostTagEdit";
import CategoryForm from "./Category/CategoryForm";
import CategoryEditForm from './Category/CategoryEditForm';
import MyPosts from "./post/MyPosts";
import SubscribedPosts from "./post/SubcribedPosts";
import PostComments from "./Comment/PostComments";
import CommentForm from "./Comment/CommentForm";
import CommentEditForm from "./Comment/CommentEditForm";


export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main className="main__applicationViews">
      <Switch>

        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category/add">
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') !== -1 ? <CategoryForm /> : isLoggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
        </Route>

        <Route path="/category" exact>
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') !== -1 ? <CategoryList /> : isLoggedIn ? <Redirect to="/" />  : <Redirect to="/login" />}
        </Route>

        <Route path="/category/:id/edit" exact>
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') !== -1 ? <CategoryEditForm /> : isLoggedIn ? <Redirect to="/" />  : <Redirect to="/login" />}
        </Route>


        {/* ///////////POSTS//////////// */}
        <Route path="/post" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/myposts" exact>
          {isLoggedIn ? <MyPosts /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/subscribedPosts" exact>
          {isLoggedIn ? <SubscribedPosts /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/add" exact>
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id" exact>
          {isLoggedIn ? <PostDetail /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id/edit" exact >
          {isLoggedIn ? <PostEditForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/posttag/:id" >
          {isLoggedIn ? <PostTagEdit /> : <Redirect to="/login" />}
        </Route>

        {/* ///////////COMMENTS/////////////// */}
        <Route path="/post/:id/comments" exact >
          {isLoggedIn ? <PostComments /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id/addcomment">
          {isLoggedIn ? <CommentForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comment/:id/edit">
          {isLoggedIn ? <CommentEditForm /> :  <Redirect to="/login" />}
        </Route>

        {/* ///////////TAGS//////////// */}
        <Route path="/tags" exact>
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') !== -1 ? <TagList /> : isLoggedIn ? <Redirect to="/" />  : <Redirect to="/login" />}
        </Route>

        <Route path="/tags/add">
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') !== -1 ? <TagForm /> : isLoggedIn ? <Redirect to="/" />  : <Redirect to="/login" />}
        </Route>

        <Route path="/tags/:id/edit" >
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') !== -1 ? <TagEditForm /> : isLoggedIn ? <Redirect to="/" />  : <Redirect to="/login" />}
        </Route>


        {/* ///////////USER PROFILES//////////// */}
        <Route path="/userprofiles" exact>
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') !== -1 ? <UserProfileList /> : isLoggedIn ? <Redirect to="/" />  : <Redirect to="/login" />}
        </Route>

        <Route path="/userprofiles/:id" exact>
        {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') !== -1 ? <UserProfileDetails /> : isLoggedIn ? <Redirect to="/" />  : <Redirect to="/login" />}
        </Route>

        <Route path="/userprofiles/edit/:id" exact>
          {isLoggedIn && sessionStorage.getItem("userProfile").search('"name":"10g03kd03212d3213d213d123cvb"') !== -1 ? <UserProfileEdit /> : isLoggedIn ? <Redirect to="/" />  : <Redirect to="/login" />}
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
