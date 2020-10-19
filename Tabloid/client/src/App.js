import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { PostProvider } from './providers/PostProvider';
import { TagProvider } from "./providers/TagProvider";
import { PostTagProvider } from "./providers/PostTagProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { UserTypeProvider } from "./providers/UserTypeProvider";
import { ImageUploadProvider } from "./providers/ImageUploadProvider";
import { CommentProvider } from "./providers/CommentProvider";

function App() {
  return (
    <Router>
      <UserTypeProvider>
        <UserProfileProvider>
          <ImageUploadProvider>
            <PostProvider>
              <CommentProvider>
                <CategoryProvider>
                  <TagProvider>
                    <PostTagProvider>
                      <Header />
                      <ApplicationViews />
                    </PostTagProvider>
                  </TagProvider>
                </CategoryProvider>
              </CommentProvider>
            </PostProvider>
          </ImageUploadProvider>
        </UserProfileProvider>
      </UserTypeProvider>
    </Router>
  );
}

export default App;
