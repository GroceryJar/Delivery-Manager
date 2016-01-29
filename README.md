# Delivery Manager
Application to make task of delivery boy easier

https://deliverymanager.herokuapp.com/

# App for Deliveryboy -


1. Once delivery boy opens app, it will get the location of him

2. Delivery boy can see all the orders in app with following information based sorted by date

a. Name

  	b. Address

c. Pin Code (for distance from Source)

  	d. Price

e. Payment Status

f. Mobile Phone (To send automatic time of arrival based on distance)

g. Type of Delivery (One day or normal)

  	h. Date of order

3. Generate Order -  It will assign n orders to delivery boy based on Weight algorithm. It will be decided based on Type of delivery, date of order, price and payment status. Weigth will be assigned to Type of delivery, date of order, price and payment status

Need to decide the weigth and decide algorithm to solve it.

4. Show Map - It will show map based on current location using shortest path or TSP algorithm


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




