Link = Class.extend({

    pointStart: null,
    pointEnd: null,
    restingDistance: 0,

    __init: function() {
        this.pointStart = pointStart;
        this.pointEnd = pointEnd;
    },

    calculate: function() {

        var diffX = pointStart.x - pointEnd.x,
            diffY = pointStart.y - pointEnd.y,
            d = Math.sqrt(diffX * diffX + diffY * diffY)
        ;

        // difference scalar
        var difference = (this.restingDistance - d) / d

        // translation for each PointMass. They'll be pushed 1/2 the required distance to match their resting distances.
        var translateX = diffX * 0.5 * difference,
            translateY = diffY * 0.5 * difference
        ;

        p1.x += translateX
        p1.y += translateY

    }

});