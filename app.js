/*jslint node: true */
/* eslint-env node */
'use strict';

// Require express, socket.io, and vue
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
 
// Pick arbitrary port for server
var port = 3000;
app.set('port', (process.env.PORT || port));

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public/')));
// Serve vue from node_modules as vue/
app.use('/vue', express.static(path.join(__dirname, '/node_modules/vue/dist/')));
// Serve index.html directly as root page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
// Serve map.html as /map
app.get('/map', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/map.html'));
});
app.get('/stache', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/stache.html'));
});
// Serve dispatcher.html as /dispatcher
app.get('/dispatcher', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/dispatcher.html'));
});

// Store data in an object to keep the global namespace clean and 
// prepare for multiple instances of data if necessary
function Data() {
  this.orders = {};
}

/*
  Adds an order to to the queue
*/

Data.prototype.addOrder = function (order) {
  //Store the order in an "associative array" with orderId as key
  var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
    return Math.max(last, next);
  }, 0);
  var nextOrder = lastOrder + 1;
  var order_struct = {orderId: nextOrder, 
                details: order,
                preparing: false,
                sent: false,
                resolved: false};
  
  console.log(order_struct);
  this.orders[nextOrder] = order_struct;
  return nextOrder;
};

Data.prototype.orderDispatched = function(orderId) {
  this.orders[orderId].sent = true;
  
};

Data.prototype.orderPreparing= function(orderId) {
  this.orders[orderId].preparing = true;
};

Data.prototype.orderResolve= function(orderId) {
  this.orders[orderId].resolved = true;
};

Data.prototype.getAllOrders = function () {
  return this.orders;
};

Data.prototype.printOrder = function(orderId) {
  console.log(this.orders[orderId]);
}

var data = new Data();

io.on('connection', function (socket) {
  // This is relevant for a dispatcher view.
  socket.emit('initialize', { orders: data.getAllOrders() });

  // When a connected client emits an "addOrder" message
  socket.on('addOrder', function (order) {
    var orderid = data.addOrder(order);
    console.log("Order was recieved and given an order id. Replying with order id.");
    // Reply to the sender with the order id.
    socket.emit('order_recieved', orderid);
    // send updated info to all connected clients, note the use of io instead of socket
    io.emit('currentQueue', { orders: data.getAllOrders() });
  });

  // These are relevant for the clients. 
  socket.on('order_dispatched', function(orderId) {
    console.log("Order: " + orderId + " was just dispatched.");
    data.orderDispatched(orderId);
    io.emit('order_dispatched', orderId);
  });

  socket.on('order_preparing', function(orderId) {
    console.log("Order: " + orderId + " is being prepared");
    data.orderPreparing(orderId);
    io.emit('order_preparing', orderId);
  });

  socket.on('order_resolved', function(orderId) {
    console.log("Order: " + orderId + " has been resolved");
    data.orderResolve(orderId);
    io.emit('order_resolved', orderId);
  });

});

var server = http.listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});
