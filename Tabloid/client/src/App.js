import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from './providers/PostProvider';
import { TagProvider } from "./providers/TagProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { UserTypeProvider } from "./providers/UserTypeProvider";
function App() {
  return (
    <Router>
      <UserTypeProvider>
      <UserProfileProvider>
        
        <PostProvider>
          <CategoryProvider>
            <Header />
            <TagProvider>
              <ApplicationViews />
            </TagProvider>
          </CategoryProvider>
        </PostProvider>
      </UserProfileProvider>
      </UserTypeProvider>
    </Router>
  );
}

export default App;
