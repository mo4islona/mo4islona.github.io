World = Class.extend({

    gravity: 1,
    points: [],
    isEnabled: true,

    ctx: null,
    elem: null,
    width: window.innerWidth,
    height: window.innerHeight,

    __init: function () {

        this.elem = document.getElementById('game');
        this.ctx = this.elem.getContext('2d');

        this.setSize(this.width, this.height);


        requestAnimFrame(this.render.bind(this));
    },

    setSize: function (width, height) {
        this.ctx.canvas.width  = width;
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
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI, false);
                this.ctx.closePath();
                this.ctx.fill();

                console.log(point)
            }

        }

        //requestAnimFrame(this.render.bind(this));
    }

});