import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: 'login'
      },
      {
        path: 'posts',
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
