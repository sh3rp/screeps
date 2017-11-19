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
    this.S_BUILDING_ROAD = 10;
    this.S_GATHERING = 11;
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
    if(creep.getState() == this.S_GATHERING) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        } else {
            if(creep.carry.energy == creep.carryCapacity) {
                creep.setState(this.S_BUILDING);
            }
        }
    } else if(creep.getState() == this.BUILDING_ROAD) {
        var targets = tracker.trackByTerrain("swamp");

    }
};

module.exports = Builder;
