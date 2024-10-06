# teifi-davidr
 
This application was developed as a response to the interview project given by Teifi as outlined in an email by Frank van der Heijden

## Description:

This is a simple CRUD application that makes use of shopify's component library(polaris) and their graphql back-end. The application 
was developed using React(with Next and typescript and Redux as a state management platform)and a Node/express back-end server.
Here is a link to a video demonstration: https://youtu.be/ju-7E70ib3I 

## Instructions:
As the application was developed with a distinct front and back end, both will need to be running in order for it to work properly.

### General setup:
This application uses a .env file containing the DOMAIN and ACCESS_TOKEN provided as part of the project. This file was excluded from
the git repo as is standard practice to avoid spreading personal/sensitive information.  You will need to create a new one with the same
variable names and proper values.

### Back-end:
Open a terminal in the root folder of the git repo
Change directory to the `back-end`
Run the command `npm install`
Once the previous command has finished executing, run the command `node app.js`
You can now proceed to the front-end

### Front-end:
Open a terminal in the root folder of the git repo
Change directory to the `teifi-fe`
Run the command `npm install` (this will install any modules needed to run the application)
Once the previous command has finished executing, run the command `npm run dev`
You can now open the application on your web browser, it will show up once everything is ready

## Comments:
I would have liked to fix the modals properly. In their current form, the create new customer button and they are on the same level, meaning
when the modals show up, the css for the whole page goes haywire.  I used !important to ensure the components keep their current and intended
layout and hide the create new customer button.