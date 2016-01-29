# Delivery Manager
Application to make task of delivery boy easier

https://deliverymanager.herokuapp.com/

# App for Deliveryboy -

1. Current location of Delivery boy
2. Delivery boy can see all the orders in app with following information based sorted by date

	a. Name

	b. Address

	c. Pincode (for distance from Source) == 1 km -- 100 weight

	d. Price == 10,000 -- 100 weight (Get Max price of order)

	e. Payment Status - Paid or Not Paid === Paid 100 weight

	f. Mobile Phone (To send automatic time of arrival based on distance)

	g. Type of Delivery - One day === One day Delivery 1000 weight

	h. Date of order === 1 day delay (100 weight less weight)

Distance from Source to other destination

3. Generate Order Sequence will show correct sequence of order
4. Sequence page will contain a button option to show Map route as well

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




