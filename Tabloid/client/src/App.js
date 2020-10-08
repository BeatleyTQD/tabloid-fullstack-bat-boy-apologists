import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from './providers/PostProvider';
import { TagProvider } from "./providers/TagProvider";
import {CategoryProvider} from "./providers/CategoryProvider";
function App() {
  return (
    <Router>
      <CategoryProvider>
      <UserProfileProvider>
        <PostProvider>
          <Header />
          <TagProvider>
            <ApplicationViews />
          </TagProvider>
        </PostProvider>
      </UserProfileProvider>
      </CategoryProvider>
    </Router>
  );
}

export default App;
