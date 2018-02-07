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
  }
});
