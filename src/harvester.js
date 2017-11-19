'use strict';

var Harvester = function(tracker) {
    this.MAX_HARVESTERS = 15;
    this.S_HARVEST = 1;
    this.S_DISPENSE = 2;

    this.tracker = tracker;
};

Harvester.prototype.harvest = function() {
    var harvesters = this.getHarvesters();
    for(var idx in harvesters) {
        var creep = harvesters[idx];
        
        this.tracker.mark(creep);
        
        // reset if state is undefined
        if(creep.getState() === undefined) {
            if(creep.carry.energy == 0) {
                creep.setState(this.S_HARVEST);
            } else {
                creep.setState(this.S_DISPENSE);
            }
        }

        if(creep.getState() == this.S_HARVEST) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            } else {
                if(creep.carry.energy == creep.carryCapacity) {
                    creep.setState(this.S_DISPENSE);
                }
            }
        } else {
            if(Game.spawns.MainSpawn.energy == Game.spawns.MainSpawn.energyCapacity) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }else {
                    if(creep.carry.energy == 0) {
                        creep.setState(this.S_HARVEST);
                    }
                }
            } else {
                if( creep.transfer(Game.spawns['MainSpawn'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                    creep.moveTo(Game.spawns['MainSpawn']);
                } else {
                    if(creep.carry.energy == 0) {
                        creep.setState(this.S_HARVEST);
                    }
                }
            }
        }
    }
};

Harvester.prototype.getHarvesters = function() {
    var harvesters = [];
    for(var name in Game.creeps) {
        if(name.startsWith("util-")) {
            harvesters.push(Game.creeps[name]);
        }
    }
    return harvesters;
};

Harvester.prototype.spawnHarvesters = function() {
    var total = 0;
    for(var name in Game.creeps) {
        if(name.startsWith("util-")) {
            total++;
        }
    }
    if(total < this.MAX_HARVESTERS) {
        for(var i=total;i<=this.MAX_HARVESTERS;i++) {
            Game.spawns.MainSpawn.spawnCreep([WORK, CARRY, MOVE], 'util-'+(new Date).getTime());
        }
    }
};

module.exports = Harvester;
