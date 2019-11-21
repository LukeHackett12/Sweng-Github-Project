# Sweng Github Project
#### Visualisations of Data based on a Github Profile

![Full Demo](https://imgur.com/SjSyeur.gif)

# 

## Description

This project uses ReactJS with an Express backend to scrape data from a github users profile and displays it graphically using plotly. Below I will give a brief outline of each page in the application andhow it operates.

### Home Screen

![Home Screen](https://imgur.com/C055uhG.png)

The Home Screen is quite simple. There is a title at the top, and a Github Octocat logo that swings side to side. Below the logo there is a login button that when clicked links to githubs OAuthV2 login system.

### Loading Screen

![Loading Screen](https://imgur.com/jaGw3po.png)

Once you click on the login button you are redirected to Github. The reason you login instead of just searching for a user is so you cancount private repos in the data, as well as making the backend data queries easier.

Github will log you in and return a code in the URL parameter that is then in turn passed onto the backend. The backend has the client secret so can exchange this code for a user access token that it sends to the client.

Once the 'access_token' is saved as a cookie in the browser the frontend makes a request for the users information from the backend. The backend will collect all required data for the graphs and send it to the frontend. The profile page is loaded once all this info is received.

### Profile Screen

![Profile Screen](https://imgur.com/9uT79Jr.png)

This is the screen you are presented with once you are successfully logged in. The top of the page is taken up with the users profile picture and username. There is a sidebar that has the users starred repos and links to each of them. To the right is the main body of the webpage which is the graphs. They are rendered in a seperate ReactJS component and are talked about below.

### Graphs

![Graphs](https://imgur.com/7kCXuSr.png)

There are three graphs displayed here. The first of which is a line chart that maps how many repositories a user has created over time. The bubble chart below it is a measure of how many events the user has over the past week. Events are interactions with github such as repo creation, following or getting followed etc.. so this is agood measure of how frequently a user is on/using the site. Finally there is a sunburst chart that has the logged in user in the middle and shows all of their followers surrounding them.

## Running the Project

To run the project it is necessary to run both the api and client node projects. You also need to create a '.env' file in the ./api and ./client directories. For the api you need the following values:

    CLIENT_ID=<YOUR_CLIENT_ID_GOES_HERE>
    CLIENT_SECRET=<YOUR_CLIENT_SECRET_GOES_HERE>

The client '.env' file needs the following:

    REACT_APP_CLIENT_ID=<YOUR_CLIENT_ID_GOES_HERE>
    REACT_APP_BASE_URL='http://localhost'
    REACT_APP_PORT=3000

The client ID and client Secret can be obained by following the instructions [here](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/)

For the api you run the following commands in the api directory:

    npm install
    npm start

To run the client run the following commands in the client directory:

    yarn install
    yarn start 

