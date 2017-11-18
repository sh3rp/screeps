var Builder = require('builder');

module.exports.loop = function () {
    var b = new Builder();
    b.spawnBuilders();
    //console.log(builder.getBuilders());
    spawnHarvesters();
    var harvesters = getHarvesters();
    //console.log(JSON.stringify(highTrafficSwamp()));
    for (var idx in harvesters) {
        var creep = harvesters[idx];
        markSwamp(getTerrain(creep));
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

function markSwamp(tPos) {
    if(tPos["t"] == "swamp") {
        var key = tPos["x"] + "." + tPos["y"];
        if(Memory.highTrafficSwamp == undefined) {
            Memory.highTrafficSwamp = {};
        }
        if(key in Memory.highTrafficSwamp) {
            Memory.highTrafficSwamp[key] = Memory.highTrafficSwamp[key] + 1;
        } else {
            Memory.highTrafficSwamp[key] = 1;
        }
    }
}

function highTrafficSwamp() {
    return Memory.highTrafficSwamp;
}

function getTerrain(creep) {
    var looked = creep.pos.look();
    var x = creep.pos.x;
    var y = creep.pos.y;
    
    for(var idx in looked) {
        if(looked[idx]['type'] == 'terrain') {
            return {
                "t":looked[idx]['terrain'],
                "x":x,
                "y":y
            };
        }
    }
}

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
