World = Class.extend({

    points: [],
    isEnabled: true,

    ctx: null,
    elem: null,
    width: window.innerWidth,
    height: window.innerHeight,

    initialize: function () {

        console.log('1');

        this.elem = document.getElementById('game');
        this.ctx = this.elem.getContext('2d');

        this.setSize(this.width, this.height);

        requestAnimFrame(this.render.bind(this));
    },

    setSize: function (width, height) {
        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;
    },

    enable: function () {
        this.isEnabled = true;
    },

    disable: function () {
        this.isEnabled = false;
    },

    render: function () {

        if (this.isEnabled) {

            this.ctx.fillStyle = '#FFF';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.fillStyle = '#000';

            for (var i = 0, length = this.points.length; i < length; i++) {
                var point = this.points[i];
                point.calculate();

                if (point.y > this.height) {
                    point.y = this.height;
                   // point.accelerateY = -point.accelerateY * 1/point.massPower;
                }

                this.ctx.beginPath();
                this.ctx.arc(point.x - point.mass, point.y - point.mass, point.mass, 0, 2 * Math.PI, false);
                this.ctx.closePath();
                this.ctx.fill();
            }

        }

        requestAnimFrame(this.render.bind(this));
    }

});

World.GRAVITY = .7;