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
    sendOrder: function (orderId) {
      if(this.orders[orderId].order_sent) {
        return;
      }
      console.log(this.orders[orderId].order_sent);
      // document.getElementById("orderid"+orderId).innerHTML = "<b>Sent!<b>";
      // document.getElementById("orderid"+orderId).disabled = true;
      document.getElementById("orderid"+orderId).id += "sent";
      console.log(this.orders[orderId].order_sent);
      this.orders[orderId].order_sent = true;
      // document.getElementById("orderid"+orderId).style.backgroundColor = "lime";
      socket.emit("orderSent", orderId);
    },
  }
});
