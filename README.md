## [Live Demo](https://welcometoimessage.herokuapp.com)

# Introduction

iMessage is a realtime chat application built on MERN stack. User can login using Google and send/receive message(with timestamp) in realtime in chat rooms. MongoDB(NoSQL) used for cloud storage of conversations. Pusher for realtime update.

[<img src="https://github.com/Flash2022/MERN-iMessage/blob/master/iMessage.gif" width="480" height="270">](https://welcometoimessage.herokuapp.com/)

## Tools:
- [Material-UI](https://material-ui.com) - React UI framework
- [Redux](https://redux.js.org) - State container for JS
- [React](https://reactjs.org) - JS library
- [Pusher](https://pusher.com) - Realtime chat
- [Express](https://expressjs.com) - [Node.js](https://nodejs.org) framework
- [Postman](https://www.postman.com) - API testing
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - NoSQL cloud database
- [Firebase](https://firebase.google.com/docs/auth) - Google authentication
- [Heroku](https://www.heroku.com) - Deloyment

## Key features:
- Google Authentication
- Avatar/profile pic same as Google account
- Create rooms and message (with timestamp)
- Messages visible with sender's avatar
- Logout by clicking on your avatar

## Getting Started

**Step 1: Clone the code into a fresh folder**

```
$ git clone https://github.com/Flash2022/MERN-iMessage.git
$ cd MERN-iMessage
```

**Step 2: Create a Virtual Environment and install Dependencies**

Create a new Virtual Environment for the project and activate it. If you don't have the `virtualenv` command yet, you can find installation [instructions here](https://virtualenv.readthedocs.io/en/latest/).

```
$ virtualenv venv
$ source venv/bin/activate
```

Next, we need to install the server dependencies, which are listed in `package.json`.

```
(venv) $ npm install
```

Next, we need to build react project to static files, which are listed in `client`.

```
(venv) $ cd client
(venv) $ npm install
(venv) $ npm run build
```

We can find `index.html` in `build`.

**Step 3: Run application**

Now we're ready to start our server using [Nodemon](https://nodemon.io):

```
(venv) $ nodemon server.js
```

Open http://localhost:9000 (port number is prompted) to view it in your browser.
The app will automatically reload if you make changes to the code.
You will see the build errors and warnings in the console.

Try hosted app [here.](https://welcometoimessage.herokuapp.com)

