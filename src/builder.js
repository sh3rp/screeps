/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder');
 * mod.thing == 'a thing'; // true
 */
'use strict';


var Builder = function(tracker) {
    this.MAX_BUILDERS = 3;
    this.tracker = tracker;
};

Builder.prototype.spawnBuilders = function() {
    var total = this.getBuilders().length;
    if(total < this.MAX_BUILDERS) {
        for(var i=total;i<=this.MAX_BUILDERS;i++) {
            Game.spawns.MainSpawn.spawnCreep([WORK, CARRY, MOVE], 'build-'+(new Date).getTime());
        }
    }
};

Builder.prototype.getBuilders = function() {
    var builders = [];
    for(var name in Game.creeps) {
        if(name.startsWith("build-")) {
            builders.push(Game.creeps[name]);
        }
    }
    return builders;
}; 

Builder.prototype.build = function() {
    console.log("Building.");
};

module.exports = Builder;
