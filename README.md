# SNAPPY: Full-stack Chat Application

#### Introduction

The MERN stack which consists of **Mongo DB**, **Express.js**, **Node.js**, and **React.js** is a popular stack for building full-stack web-based applications because of its simplicity and ease of use. In recent years, with the explosive popularity and the growing maturity of the JavaScript ecosystem, the MERN stack has been the goto stack for a large number of web applications. This stack is also highly popular among newcomers to the JS field because of how easy it is to get started with this stack.
## #Walkthrough Video of the Project 
[screen-capture (1).webm](https://user-images.githubusercontent.com/85514305/229291272-1b6a4e30-864d-4d4e-8504-5a168958253e.webm)
<br></br>
[screen-capture.webm](https://user-images.githubusercontent.com/85514305/229291250-83a67b27-9584-488b-82d5-af65d303f411.webm)
<br/><br/>
This repo consists of a **Chat Application** built with the MERN stack.
<br/><br/>
This is a full-stack chat application that can be up and running with just a few steps. 
Its frontend is built with React.
The backend is built with Express.js and Node.js.
Real-time message broadcasting is developed using [Socket.IO](https://socket.io/).

### Features

This application provides users with the following features
<br/>
* Login and Signup to become a Snappy head.
* Users can choose from exciting avatars as their Profile picture.
* Users have the option to select local image as their profice picture.
* Real-time updates to the user list, conversation list, and conversation messages

#### Screenshots

##### Chat Window
![image](https://user-images.githubusercontent.com/85514305/229290794-c09d78ca-cb9a-4309-95ba-36c15689b080.png)

<br/><br/>
##### Private Chat Window
![image](https://user-images.githubusercontent.com/85514305/229290862-fff055c1-32c4-4a8c-8aca-908c3fafdafe.png)

<br/><br/>
##### User Login
![image](https://user-images.githubusercontent.com/85514305/229290889-85674459-baff-4092-9452-9c50d37b8780.png)

<br></br>
##### User Signup
![image](https://user-images.githubusercontent.com/85514305/229290925-b96076d0-f834-48f4-b95f-265f39296bca.png)

<br></br>

### How to use

You can have this application up and running with just a few steps because it has both the frontend and the backend in a single repository. Follow the steps below to do so.

1. Clone this repo
2. Once you have the repo, you need to install its dependencies. So using a terminal, move into the root directory of the project and execute `npm install` to install the dependencies of the Node.js server and then run `npm run client-install` to install the dependencies of the frontend. The second command is a custom command that I wrote to simplify the installation process.
3. This application uses MongoDB as its Database. So make sure you have it installed. You can find detailed guides on how to do so [here](https://docs.mongodb.com/manual/administration/install-community/). Once installed, make sure that your local MongoDB server is not protected by any kind of authentication. If there is authentication involved, make sure you edit the `mongoURI` in the `config/keys.js` file.
4. Finally, all you have to do is simply run `npm run dev`. If this command fails, try installing the package [concurrently](https://www.npmjs.com/package/concurrently) globally by running `npm install -g concurrently` and then running the `dev` command.
5. The frontend of the application will be automatically opened in your web browser and you can test it away.


### Things to note

* The frontend is created using [create-react-app](https://github.com/facebook/create-react-app)
* Database connections in the backend are handled using the [Mongoose ORM](https://mongoosejs.com/)

### Future Enhancements

The Application contains basic chat features as of now.Planning to add few exciting features like adding time in the message content and also provide imagepicker to User so that they are able to crop their Profile picture and other details. You are welcome to open issues if you find any and I will accept PR's as well.
<br/><br/>

Cheers 💻 🍺 🔥 🙌
