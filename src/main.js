var Builder = require('builder');
var Tracker = require('tracker');
var Harvester = require('harvester');

global.tracker = new Tracker();
global.builder = new Builder(global.tracker);
global.harvester = new Harvester(global.tracker);

module.exports.loop = function () {
    var b = global.builder;
    var h = global.harvester;
    b.spawnBuilders();
    b.build();
    h.spawnHarvesters();
    h.harvest();
}
