# Characters
## Motivation
Often a person's story is left untold. However, we believe these stories will inspire people. This web application intends to share the stories around the world by collaborating with people who shares the story (i.e. Characters). Our app focuses on connecting characters with apparel designers, and uploading/selling the apparel in our online shop.
## Installation
First clone the repository and cd into it.
Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Download the [MongoDB community server](https://www.mongodb.com/try/download/community).
Create the database folder for mongodb to store data in your local machine.
For windows:
```
mkdir -p C:/data/db
```
For mac/linux:
```
sudo mkdir -p /data/db
```

To install the backend dependencies, run commands:
```
cd backend && npm ci
```
To install the frontend dependencies, run commands:
```
cd frontend && npm ci
```
## Usage
To run the project,

1. Start MongoDB server:
```
mongod
```
2. Start backend:

Open another terminal and run the following command to start the Nodemon server in the backend folder
```
cd backend && nodemon
```
If successful, the following line should display in the terminal
```
Connected to Mongo!
```
3. Start frontend:

Open another terminal and run the following command to start the React project in the frontend folder
```
cd frontend && npm start
```
A browser should open on localhost:3000
## Contribution
Please commit to the appropriate branch using the [Git Flow model](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
1. Clone the repo
2. Create a feature branch (or checkout to the branch you want to make changes on)
    - We follow the branch naming standard: [Jira ticket #]
3. Commit changes with a message that begin with the ticket number of the task followed by a short description of commit changes
4. Push the changes
5. Submit a pull request using [this template](https://gist.github.com/jcserv/33f19818fde83c18e755b1c138eeac49)
We use JIRA for ticketing