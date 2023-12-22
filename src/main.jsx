import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { createBrowserRouter, RouterProvider, useLoaderData } from 'react-router-dom'

import { LoginPage } from './Components/LoginPage'
import { AllBlogPostsPage, allBlogPostsLoader } from './Components/AllBlogPostsPage'

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
      },
      {
        path: 'create-post',
      },
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
