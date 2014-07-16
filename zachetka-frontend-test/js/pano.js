Pano = EForm.Factory.extend({
    __init: function (config) {
        this._super();
        this.config = config;
    },
    initialize: function (elem) {

        this.$container = $(elem);
        this.$elem = $('<svg width="100%" height="100%" />');

        this.drawingFigure = null;
        this.$container.html(this.$elem);

        this.$container
            .on('mousedown', this.clickHandler.bind(this))
            .on('mousedown', 'circle', this.startDrag.bind(this))
            .on('mouseup', 'circle', this.stopDrag.bind(this))

        this.figures = [];
    },

    export: function () {
        var data = {v: []};
        for (var i in this.figures) {
            var figure = this.figures[i];
            var vertices = figure.get('vertices');
            var verticesData = []
            for (var j in vertices) {
                verticesData.push({
                    x: vertices[j].get('x'),
                    y: vertices[j].get('y')
                })
            }
            data.v.push(verticesData)
        }

        data.f = this.figures[this.figures.length - 1].get('isFinished');
        return data;
    }
});

Pano.fn = Pano.prototype;

Pano.fn.clickHandler = function (event) {
    if (event.which != 1) {
        return;
    }
    var vertex = this.add(event.pageX, event.pageY);
    vertex.$elem.trigger('mousedown');
}

Pano.fn.add = function (x, y) {

    if (this.drawingFigure === null) {
        var figure = new Figure({config: this.config.Figure});
        this.append(figure);
        this.drawingFigure = figure;
        this.figures.push(figure)
    }

    var vertex = new Vertex({x: x, y: y, figure: this.drawingFigure, config: this.config.Vertex});
    this.append(vertex);
    this.drawingFigure.addVertex(vertex);
    return vertex;
}

Pano.fn.startDrag = function (event) {
    event.stopPropagation();

    this.$elem.on('mousemove', function (eventMove) {
        $(event.currentTarget).data('vertex').set({
            x: eventMove.pageX,
            y: eventMove.pageY
        });
    })

    if (this.drawingFigure && !this.drawingFigure.isChanged && $(event.currentTarget).is(this.drawingFigure.get('vertices')[0].$elem)) {
        this.drawingFigure.set('isFinished', true);
        this.drawingFigure = null;
    }
}

Pano.fn.stopDrag = function (event) {
    event.stopPropagation();
    this.$elem.off('mousemove')
}

/*
 Figure
 */
var Figure = EForm.Model.extend({
    defaults: {
        vertices: [],
        config: {},
        isFinished: false
    },
    initialize: function () {
        this.$elem = Utils.createSvgElement('path').attr(this.get('config'))
    },
    render: function () {
        var path = '';
        var vertices = this.get('vertices');

        for (var i = 0, length = vertices.length; i < length; i++) {
            var vertex = vertices[i];
            path += (i ? 'L' : 'M') + ' ' + vertex.get('x') + ' ' + vertex.get('y') + ' ';
        }

        if (this.get('isFinished')) {
            path += 'L ' + vertices[0].get('x') + ' ' + vertices[0].get('y') + ' ';
        }

        this.$elem.attr('d', path);
    },
    addVertex: function (vertex) {
        var vertices = this.get('vertices').slice(0);
        vertices.push(vertex);
        this.set('vertices', vertices);
    }
});

/*
 Vertex
 */
var Vertex = EForm.Model.extend({
    defaults: {
        x: 0,
        y: 0,
        figure: null,
        config: {}
    },
    initialize: function () {
        this.$elem = Utils.createSvgElement('circle').data({vertex: this})
    },
    render: function () {
        this.$elem.attr($.extend(this.get('config'), {
            cx: this.get('x'),
            cy: this.get('y')
        }));
    },
    onChange: function () {
        this.get('figure').isChanged = true;
    }
})


