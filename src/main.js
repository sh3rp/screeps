'use strict';

var Builder = require('builder');
var Tracker = require('tracker');
var Harvester = require('harvester');

if(global.tracker == undefined) {
    global.tracker = new Tracker();
    console.log("new tracker");
}
if(global.builder == undefined) {
    global.builder = new Builder(global.tracker);
    console.log("new builder");    
}
if(global.harvester == undefined) {
    global.harvester = new Harvester(global.tracker);
    console.log("new harvester");    
}
Creep.prototype.setState = function(s) {
    console.log("Setting state to " + s);
    this.memory.state = s;
    console.log("[MEMORY] "+ this.name + " -> " + JSON.stringify(this.memory.state));
}
Creep.prototype.getState = function() {
    return this.memory.state;
}

module.exports.loop = function () {
    var b = global.builder;
    var h = global.harvester;
    b.spawnBuilders();
    b.build();
    h.spawnHarvesters();
    h.harvest();
}
