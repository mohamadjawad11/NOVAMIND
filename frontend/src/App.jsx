import React from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import BlogTitles from './pages/BlogTitles/BlogTitle.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Community from './pages/Community/Community.jsx';
import WriteArticle from './pages/WriteArticle/WriteArticle.jsx';
import ReviewResume from './pages/ReviewResume/ReviewResume.jsx';
import RemoveObject from './pages/RemoveObject/RemoveObject.jsx';
import RemoveBackground from './pages/RemoveBackground/RemoveBackground.jsx';
import GenerateImages from './pages/GenerateImages/GenerateImages.jsx';
import Layout from './pages/Layout/Layout.jsx';
import { useAuth } from '@clerk/clerk-react';
import {Toaster} from 'react-hot-toast';
//https://novamind-black.vercel.app
//https://mern-real-estate-cpar.onrender.com

const App = () => {
  const { isSignedIn, getToken } = useAuth();

useEffect(() => {
    if (isSignedIn) {
      getToken().then((token) => console.log("User Token:", token));
    } else {
      console.log("User is not signed in.");
    }
  }, [isSignedIn, getToken]);

  // Debugging: Log the authentication status
  useEffect(() => {
    console.log("User signed in:", isSignedIn);
  }, [isSignedIn]);

  return (
   <div>
     <Toaster />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="write-article" element={<WriteArticle />} />
        <Route path="blog-titles" element={<BlogTitles />} />
        <Route path="generate-images" element={<GenerateImages />} />
        <Route path="remove-background" element={<RemoveBackground />} />
        <Route path="remove-object" element={<RemoveObject />} />
        <Route path="review-resume" element={<ReviewResume />} />
        <Route path="community" element={<Community />} />
      </Route>
    </Routes>
   </div>
  );
};

export default App;
