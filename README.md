## Preparation
Note that to run this you'll need to install the various dependencies in node_modules; they can be installed via `npm install`.
## Running
To run, first clone the repo and install the Node componenets. Start mongoDB with `mongod&`, then run the app with `npm start`.
## Documentations for project
The documentations of database schema and other test stuff are in the `docs` folder in PDF.
The final project documentation are in the `docs` folder in PDF.
## Documentation
This is our webapp, POI, or Points of Interest.  It allows users to input a location and get relevant data in the form of weather, tweets, and attractions. The location is loaded into the database along with the relevant information and previous search terms. The buttons allow toggling of the tweets, attractions, and weather data, as well as deletion of locations, and editing them.
![image](https://github.com/TianyingTina/cs411/blob/master/public/images/Screenshot1.png)
![image](https://github.com/TianyingTina/cs411/blob/master/public/images/Screenshot2.png)
This app requires the user to log into Twitter in order to run all the functions.

Screenshots (preview):
![image](https://github.com/TianyingTina/cs411/blob/master/public/images/Screenshot3.png)
After logging in, the logout button will appear.
![image](https://github.com/TianyingTina/cs411/blob/master/public/images/Screenshot4.png)
When you click the weather button, it will search for the weather in your location and shows the following results:
![image](https://github.com/TianyingTina/cs411/blob/master/public/images/Screenshot5.png)
When you click on the Yelp button, it will search restaurants in your location and show the following results:
![image](https://github.com/TianyingTina/cs411/blob/master/public/images/Screenshot6.png)
When you click on the Twitter button, it will search Twitter using your location and your search terms, then show the following results:
![image](https://github.com/TianyingTina/cs411/blob/master/public/images/Screenshot7.png)
When you misspell words, you can edit the search terms by clicking the update button. You can also delete the saved search and create a new search.
![image](https://github.com/TianyingTina/cs411/blob/master/public/images/Screenshot8.png)
#Looking Foward:
First, we could auto-detect the user’s location with Google’s map api. After getting this information, we could automatically update relevant nearby weather information, show a list nearby interested tweets, and grab pictures from instagram to display as a gallery. We could implement an autocomplete functionality allowing the user to type in part of their search terms and have the app auto fill their query. We also would like to provide a more dynamic view. For example, the user could see information from the APIs on a single view and without having to click individual buttons to toggle the different API information. (Imagine you are opening multiple apps at the same time and they all are smartly synchronized.) We would also add more APIs to get more relevant data.  
