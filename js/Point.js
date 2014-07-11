Point = Class.extend({

    x: 0,
    y: 0,

    prevX: 0,
    prevY: 0,
    accelerateX: 0,
    accelerateY: 0,

    mass: 1,
    massPower: 1,

    initialize: function () {
        this.massPower = Math.min(Point.MAX_MASS, this.mass) / Point.MAX_MASS;
    },

    calculate: function () {
        //
        this.accelerateY += World.GRAVITY;

        this.accelerateX *= .999;
        this.accelerateY *= .999;

        var nextX = this.x + this.accelerateX;
        var nextY = this.y + this.accelerateY;

        this.prevX = this.x;
        this.prevY = this.y;

        this.x = nextX;
        this.y = nextY;
    }

});

Point.MAX_MASS = 30;