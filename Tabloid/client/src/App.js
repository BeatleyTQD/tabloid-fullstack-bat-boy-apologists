import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from './providers/PostProvider';
import { PostTagProvider } from "./providers/PostTagProvider";
import { TagProvider } from "./providers/TagProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { UserTypeProvider } from "./providers/UserTypeProvider";
import { ImageUploadProvider } from "./providers/ImageUploadProvider";
function App() {
  return (
    <Router>
      <UserTypeProvider>
        <UserProfileProvider>
          <ImageUploadProvider>
            <PostProvider>
              <CategoryProvider>
                <Header />
                <TagProvider>
                  <PostTagProvider>
                    <ApplicationViews />
                  </PostTagProvider>
                </TagProvider>
              </CategoryProvider>
            </PostProvider>
          </ImageUploadProvider>
        </UserProfileProvider>
      </UserTypeProvider>
    </Router>
  );
}

export default App;
