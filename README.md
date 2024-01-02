# Blog Project (Admin Site)

![Blog-API-Public-Homepage](https://github.com/jasonHYLam/TOP-Blog-API-Admin/assets/105083538/d420750b-3f1b-4485-8a91-dbd220e96c4b)
![Blog-API-Public-Postpage](https://github.com/jasonHYLam/TOP-Blog-API-Admin/assets/105083538/b458bf86-9551-4162-9fcd-3087dbe008ab)
![Blog-API-Public-Comments](https://github.com/jasonHYLam/TOP-Blog-API-Admin/assets/105083538/aa53ac02-92b6-45a5-b7eb-e2a353e98588)


This repo contains the Admin Frontend app for The Odin Project Blog-API project.
This may have been the most challenging project thus far, due to the scale and largely owing to many concepts being completely new to me. 

TinyMCE editor is used to make rich text blog posts. There is authentication for the admin, as well as authorization for most routes to determine if the user is an admin.

The admin can create, delete, publish and edit blog posts.

What I've learned:
- General communication with the backend (including authorization, sending POST/DELETE/PUT requests)
- SO MUCH about frontend structure when using React-Router, particularly when updating PageComponents when updating/deleting blog data or submitting new posts/comments.
- How to conditionally render content based on whether the user has logged in using OutletContext, when using React-Router.
- Just consolidating making API requests in general using the Fetch API.
- Necessity of using credentials in fetch request as and when required, when using cookies for authorization.
- Difference between Admin site and Public site; the admin site requires redirecting to the login page if not logged in, in order to protect certain routes.
- How to make multiple requests from the same page (eg. blogPost POST, comment POST, blogPost DELETE, etc).

To add in the future:
- Editing and deleting comments
- Implementing "likes/upvotes" function
- Displaying the number of comments and likes/upvotes.
- Nested comments
-  Nicer background art :)
