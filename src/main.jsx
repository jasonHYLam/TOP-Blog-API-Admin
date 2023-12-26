import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { createBrowserRouter, RouterProvider, useLoaderData } from 'react-router-dom'

import { LoginPage } from './Components/LoginPage'
import { AllBlogPostsPage, allBlogPostsLoader } from './Components/AllBlogPostsPage'
import { CreateBlogPostPage } from './Components/CreateBlogPostPage'
import { BlogPostPage } from './Components/BlogPostPage'
// import { blogPostPageLoader } from './Components/BlogPostPage'

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'posts',
        element: <AllBlogPostsPage/>,
        loader: allBlogPostsLoader,
      },
      {
        path: 'posts/:postid',
        element: <BlogPostPage/>,
        // loader: blogPostPageLoader,
      },
      {
        path: 'create-post',
        element: <CreateBlogPostPage/>,
        // action: onSubmit,
      },
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
