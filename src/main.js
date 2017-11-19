var Builder = require('builder');

module.exports.loop = function () {
    if(global.builder == undefined) {
        global.builder = new Builder();
        console.log("Created new builder");
    }
    var b = global.builder;
    console.log("Builder = "+ JSON.stringify(b));
    b.spawnBuilders();
    spawnHarvesters();
    var harvesters = getHarvesters();
    for (var idx in harvesters) {
        var creep = harvesters[idx];
        builder.mark(creep);
        if(creep.memory['state'] == HARVEST) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            } else {
                if(creep.carry.energy == creep.carryCapacity) {
                    creep.memory['state'] = DISPENSE;
                }
            }
        } else {
            if(Game.spawns.MainSpawn.energy == Game.spawns.MainSpawn.energyCapacity) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }else {
                    if(creep.carry.energy == 0) {
                        creep.memory['state'] = HARVEST;
                    }
                }
            } else {
                if( creep.transfer(Game.spawns['MainSpawn'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                    creep.moveTo(Game.spawns['MainSpawn']);
                } else {
                    if(creep.carry.energy == 0) {
                        creep.memory['state'] = HARVEST;
                    }
                }
            }
        }
    }
}

var MAX_HARVESTERS = 12;

var HARVEST = 1;
var DISPENSE = 2;

function getHarvesters() {
    var harvesters = [];
    for(var name in Game.creeps) {
        if(name.startsWith("util-")) {
            harvesters.push(Game.creeps[name]);
        }
    }
    return harvesters;
}

function spawnHarvesters() {
    var total = 0;
    for(var name in Game.creeps) {
        if(name.startsWith("util-")) {
            total++;
        }
    }
    if(total < MAX_HARVESTERS) {
        for(var i=total;i<=MAX_HARVESTERS;i++) {
            Game.spawns.MainSpawn.spawnCreep([WORK, CARRY, MOVE], 'util-'+(new Date).getTime());
        }
    }
}
