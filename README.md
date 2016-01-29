# Delivery Manager
Application to make task of delivery boy easier

https://deliverymanager.herokuapp.com/

# App for Deliveryboy -

1. Once delivery boy opens app, it will get the location of him

2. Delivery boy can see all the orders that he has to deliver for the day in app with following information based sorted by date

    a. Name

  	b. Address

    c. Pin Code (for distance from Source)

  	d. Price

    e. Payment Status

    f. Mobile Phone (To send automatic time of arrival based on distance)

    g. Type of Delivery (One day or normal)

  	h. Date of order

    i. Order Number

3. Show Map - It will show map based on current location using shortest path or TSP algorithm

Since google api’s are already providing this functionality, our job is very easy (https://developers.google.com/maps/documentation/javascript/directions)

We can set starting and end point same and multiple wait points where delivery boy has to deliver. Only limitation is that it allows max 10 points (2 origin + 8  way points)

4. We can implement functionality where Client can see real time location of delivery boy so that they can collection items in time

5. More advance options - If customer on their GPS or enable location from website, delivery boy can easily track customer and deliver quickly

Important Links:

https://developers.google.com/maps/documentation/javascript/directions

https://developers.google.com/maps/documentation/javascript/distancematrix


# Backend

Install npm

Install node

Go to project folder and run "npm install"

start the server - "node server.js"

Open "http://localhost:8080/" in browser


#Frontend

Install sass. Refer: http://sass-lang.com/install

Update sass files and run "sass --sourcemap=none scss/main.scss css/main.css" inside public folder

# Deploy your application

Commit your code to the repository and deploy it to Heroku using Git.

$ git add .

$ git commit -am "make it better"

$ git push heroku master


#Push github:

$ git push origin master

# Resolve Heroku issues:

sudo apt-get install ruby1.9.1

sudo apt-get install ruby1.9.3

http://stackoverflow.com/questions/1892877/how-do-i-make-ruby-1-9-the-default-ruby-on-ubuntu?lq=1




