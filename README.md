# Ticket Booking Backend (Node.Js)
## Table of Contents
* About the Project
* Features
* Instructions for Running
* Working
* Implementation
* Contributing
* Contact
## About
" Movie Theatre Booking System " the goal of this project is to develop the backend service for the ticket booking system for the theatre counter. I have implemented the services in "Node.js" and the database used is "Mongo DB" which is very efficient working database for the management of any type of requests. The services including in the project are as follows :
* Book a ticket using a user’s name, phone number, and timings
* Can update the ticket timings
* View all the tickets for a particular time
* Delete a particular ticket
* View the user’s details based on the ticket id
* Mark a ticket as expired if there is a diff of 8 hours between the ticket timing and current time
## Features
* Restful API design
* MVC architecture
* Tech stack : Node.js,Express,MongoDB,Mongoose,ES6
## Instructions for running
* [git clone](https://github.com/Hacker-Abhinav/ticketBooking.git)
*  **cd ticketBooking**
* **npm i**
* **npm start**
## Working of API
### Models
* Ticket
* User
### Routes
#### user routes
* sign up
```localhost:8000/api/v1/users/signup```<br/>
![Screenshot (18)](https://user-images.githubusercontent.com/43217839/91682367-f22a2680-eb6e-11ea-9fd6-2b3daa0923c9.png)

_you have to give email,phone,name,password and confirmPassword to signup_
* login
```localhost:8000/api/v1/users/login```<br/>
![Screenshot (19)](https://user-images.githubusercontent.com/43217839/91682394-0a01aa80-eb6f-11ea-8b75-8d4ff22cf672.png)

_you have to give email and password to login_
#### ticket routes
* Book a ticket
```localhost:8000/api/v1/tickets```<br/>
![booking](https://user-images.githubusercontent.com/43217839/91682719-12a6b080-eb70-11ea-8285-28d1f4756aca.PNG)
_only a logged in user can buy a ticket, he has to give start time of a movie and name,phone no will be taken from user model_
* View all tickets
```localhost:8000/api/v1/tickets```
![all](https://user-images.githubusercontent.com/43217839/91682206-6f08d080-eb6e-11ea-99cd-b993b1cbf06d.PNG)
* View all tickets for a particular time
```localhost:8000/api/v1/tickets```<br/>
![getatime](https://user-images.githubusercontent.com/43217839/91682431-2d2c5a00-eb6f-11ea-9447-256022dcaa51.PNG)
_you have to give a start time as a json object in the body_
* View user details for a ticket
```localhost:8000/api/v1/tickets/5f4bd691686a475c7c6dc2c5```<br/>
![getuser](https://user-images.githubusercontent.com/43217839/91682479-551bbd80-eb6f-11ea-8637-424658e80ceb.PNG)
_you have to pass particular ticket id as a parameter_
* delete a ticket
```localhost:8000/api/v1/tickets/5f4bd691686a475c7c6dc2c5```<br/>
![deletetic](https://user-images.githubusercontent.com/43217839/91682462-459c7480-eb6f-11ea-8961-5e81cadda6c9.PNG)
_you have to pass ticket id as a parameter_
* update timing of a ticket
```localhost:8000/api/v1/tickets/5f4bd691686a475c7c6dc2c5```<br/>
![updateTime](https://user-images.githubusercontent.com/43217839/91682491-6369d980-eb6f-11ea-891c-60b325f3f678.PNG)
_you have to pass ticket id as a parameter and the modified timing_
## Implementation
* child referencing
user is passed as a child to ticket <br/>
 **user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },**
    
 * aggregation pipeline
 to restrict max 20 tickets used aggregation on ticket model <br/>
 **const stats = await Ticket.aggregate([
    {
      $match: { startsAt: req.body.startsAt },
    },
    {
      $group: {
        _id: null,
        numTicket: { $sum: 1 },
      },
    },
  ]);**
  
* TTL indexing
to automatically delete expired documents i have used ttl indexing on expiresAt field <br/>
**ticketSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });**
## Contributing
* Fork the Project
* Create your Feature Branch (git checkout -b feature/AmazingFeature)
* Commit your Changes (git commit -m 'Add some AmazingFeature')
* Push to the Branch (git push origin feature/AmazingFeature)
* Open a Pull Request
## Author
Abhinav Kumar - https://github.com/Hacker-Abhinav

Project Link: https://github.com/Hacker-Abhinav/ticketBooking

