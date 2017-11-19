'use strict';

var Tracker = function() {
    this.traveled = {};
    this.marks = 0;
}

Tracker.prototype.mark = function(creep) {
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
    this.marks = this.marks + 1;

    if(this.marks % 1000 == 0) {
        console.log("tracker: sorting");
    }
};

Tracker.prototype.terrain = function(creep) {
    return creep.pos.lookFor(LOOK_TERRAIN);
};

Tracker.prototype.coords = function(creep) {
    return creep.pos.x + "." + creep.pos.y;
}; 

module.exports = Tracker;