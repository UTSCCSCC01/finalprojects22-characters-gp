# Motivatioin

# Installation
First clone the repository and cd into it.
Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 

Download the [MongoDB community server](https://www.mongodb.com/try/download/community).

To install the backend dependencies, run commands:
```
cd backend && npm install
```
To install the frontend dependencies, run commands:
```
cd frontend && npm install
```
# Usage
To run the project,

1. Start MongoDB server, run command:
```
mongod
```
2. Start backend

Open another terminal and run the following command to start the Nodemon server in the backend folder
```
cd backend && nodemon
```
If successful, the following line should display in the terminal
```
Connected to Mongo!
```
3. Start frontend

Open another terminal and run the following command to start the React project in the frontend folder
```
cd frontend && npm start
```
A browser should open on localhost:3000
# Contribution
Please commit to the appropriate branch using the [Git Flow model](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
1. Fork the repo
2. Commit changes with a descriptive message
3. Push to the forked repo
4. Merge from upstream
5. Submit a Pull request using [this template](https://gist.github.com/jcserv/33f19818fde83c18e755b1c138eeac49)