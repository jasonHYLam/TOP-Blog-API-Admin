import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import { LoginPage } from './Components/LoginPage/LoginPage'
import { AllBlogPostsPage } from './Components/AllBlogPostsPage/AllBlogPostsPage'
import { CreateBlogPostPage } from './Components/CreateBlogPostPage/CreateBlogPostPage'
import { BlogPostPage } from './Components/BlogPostPage/BlogPostPage'
import { ParentComponent } from './Components/ParentComponent/ParentComponent'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentComponent/>,
    children: [
      {
        index: true,
        element: <Navigate replace to='/posts' />
      },
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'posts',
        element: <AllBlogPostsPage/>,
      },
      {
        path: 'posts/:postid',
        element: <BlogPostPage/>,
      },
      {
        path: 'create-post',
        element: <CreateBlogPostPage/>,
      },
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
