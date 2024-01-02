# Blog Project (Admin Site)
![Blog-API-Admin-Home](https://github.com/jasonHYLam/TOP-Blog-API-Admin/assets/105083538/97f7d4e7-4741-468a-a3d1-6bb0e6bdc204)


This repo contains the Admin Frontend app for The Odin Project Blog-API project.
This may have been the most challenging project thus far, due to the scale and largely owing to many concepts being completely new to me. 

TinyMCE editor is used to make rich text blog posts. There is authentication for the admin, as well as authorization for most routes to determine if the user is an admin.

The admin can create, delete, publish and edit blog posts.
![Blog-API-Admin-Edit](https://github.com/jasonHYLam/TOP-Blog-API-Admin/assets/105083538/8cedf3bd-394d-4de7-ab11-60e7f6417e7b)

What I've learned:
- General communication with the backend (including authorization, sending POST/DELETE/PUT requests)
- SO MUCH about frontend structure when using React-Router, particularly when updating PageComponents when updating/deleting blog data or submitting new posts/comments.
- How to conditionally render content based on whether the user has logged in using OutletContext, when using React-Router.
- Just consolidating making API requests in general using the Fetch API.
- Necessity of using credentials in fetch request as and when required, when using cookies for authorization.
- Difference between Admin site and Public site; the admin site requires redirecting to the login page if not logged in, in order to protect certain routes.
- How to make multiple requests from the same page (eg. blogPost POST, comment POST, blogPost DELETE, etc).
![Blog-API-Amin-Create](https://github.com/jasonHYLam/TOP-Blog-API-Admin/assets/105083538/120c8959-970c-46d3-8667-84cb46e17574)

To add in the future:
- Editing and deleting comments
- Implementing "likes/upvotes" function
- Displaying the number of comments and likes/upvotes.
- Nested comments
-  Nicer background art :)
![Blog-API-Admin-Delete](https://github.com/jasonHYLam/TOP-Blog-API-Admin/assets/105083538/3160b84f-44b4-4a85-b89b-f77d2f424da3)
