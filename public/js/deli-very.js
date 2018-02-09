/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

var vm = new Vue({
  el: '.view-box',
  data: {
    orders: {},
  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));

  },
  methods: {
    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);

      return lastOrder + 1;
    },
    prepareOrder: function (orderId) {
      this.orders[orderId].preparing = true;
      socket.emit("order_preparing", orderId);
    },
    dispatchOrder: function (orderId) {
      this.orders[orderId].sent = true;
      socket.emit("order_dispatched", orderId);
    },
    resolveOrder: function (orderId) {
      console.log("Would delete the order.");
      this.orders[orderId].resolved = true;
      socket.emit("order_resolved", orderId);
    },
    viewDot: function(order) {
      console.log("Clicked order " + order.orderId);
      // document.getElementById("viewDotDiv").style.left = order.details.loc.x + 25 + 'px';
      // document.getElementById("viewDotDiv").style.top = order.details.loc.y + 25 +'px';
      var elemId = 'dotorder' + order.orderId;
      console.log(elemId);
      var currentState = document.getElementById(elemId).style.display;
      var newStateDisplay = '';
      var newStateOpacity = ''
      if(currentState == "none") {
        newStateDisplay = "block";
        newStateOpacity = "1";
        console.log("disp: " + newStateDisplay + " op: " + newStateOpacity);
        document.getElementById(elemId).style.display = "block";
        setTimeout(function() {
          document.getElementById(elemId).style.opacity = "1";
        }, 10);
      } else {
        document.getElementById(elemId).style.opacity = "0";
        setTimeout(function() {
          document.getElementById(elemId).style.display = "none";
        }, 100);
      }
    },
  }
});


