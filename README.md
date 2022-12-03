STG Note-Taking App

MERN Stack Framework:
Create folder for project, STGNoteTakingApp

Front-end:
- Will use React.JS
Back-end:
- Express.JS and/or Node.JS - for app (middle) layer
- MongoDB - used to create database layer


Frontend Steps:
1. Navigate to folder where code will be remotely stored, STGNoteTakingApp
2. Create React app: npx create-react-app frontend. This will create a folder named frontend with the react templates and modules
3. Navigate into frontend folder: cd frontend
4. Install react-router-dom: npm i react-router-dom
5. Install React Bootstrap: npm i react-bootstrap bootstrap
6. Start app: npm start
7. In src folder, create a components folder. Add files:
  - CreateNote.jsx
  - EditNote.jsx
  - NoteList.jsx
8. Update App.js and index.js files
See https://mfikri.com/en/blog/express-mysql-react for examples of code in steps 7 and 8.

Backend Steps:
1. Create new folder, backend, in STGNoteTakingApp and navigate into it.
2. Create package.json file: npm init -y
3. Install express.JS, Mongoose, CORs: npm i express mongoose cors body-parser
4. Add node.JS dependencies: npm i --save-d nodemon
5. Add line of code to the package.json file: "type": "module"
6. Create index.js file and paste boilerplate code.
7. Create folders for controllers, routes and models. These will likely include files NoteController.js, NoteModel.js, and NoteRoute.js, respectively. 
See https://mfikri.com/en/blog/express-mysql-react for examples of code for step 7.


Additional Resources:
https://www.mongodb.com/languages/mern-stack-tutorial
https://www.positronx.io/react-mern-stack-crud-app-tutorial/