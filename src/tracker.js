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
    if(this.traveled[terrain][coords.label] == undefined) {
        var coords = this.coords(creep);    
        coords.count = coords.count + 1;    
        this.traveled[terrain][coords.label] = coords;
    } else {
        this.traveled[terrain][coords.label].count = this.traveled[terrain][coords.label].count + 1;
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
    return {
        "x" : creep.pos.x,
        "y" : creep.pos.y,
        "label" : creep.pos.x + "." + creep.pos.y,
        "count" : 0
    };
};

Tracker.prototype.trackByTerrain = function(terrain) {
    return this.traveled[terrain];
}

Tracker.prototype.topNByTerrain = function(terrain,n) {
    var tops = [];
    var tracks = this.trackByTerrain(terrain);
    for(var idx in tracks) {
        var loc = tracks[idx];
    }
}

module.exports = Tracker;