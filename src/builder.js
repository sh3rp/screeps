/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builder');
 * mod.thing == 'a thing'; // true
 */
 
var Builder = function() {
    this.MAX_BUILDERS = 3;
    this.traveled = {};
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

Builder.prototype.mark = function(creep) {
    var terrain = this.terrain(creep);
    if(this.traveled[terrain] == undefined) {
        this.traveled[terrain] = {};
    }
    var coords = this.coords(creep);
    if(this.traveled[terrain][coords] == undefined) {
        this.traveled[terrain][coords] = 1
    } else {
        this.traveled[terrain][coords] = this.traveled[terrain][coords] + 1;
    }
}

Builder.prototype.terrain = function(creep) {
    return creep.pos.lookFor(LOOK_TERRAIN);
}

Builder.prototype.coords = function(creep) {
    return creep.pos.x + "." + creep.pos.y;
}
    

module.exports = Builder;
