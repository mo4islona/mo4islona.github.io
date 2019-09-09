window.Pano = Drawer.Factory.extend({
  __init(config) {
    this._super();
    this.config = config;
  },
  initialize(elem) {
    this.$container = $(elem);
    this.$elem = $('<svg width="100%" height="100%" />');

    this.drawingFigure = null;
    this.$container.html(this.$elem);

    this.$container
      .on('mouseup', this.stopDrag.bind(this))
      .on('mousedown', this.clickHandler.bind(this))
      .on('mousedown', 'circle', this.startDrag.bind(this));

    this.figures = [];
  },

  export() {
    const data = { v: [] };
    for (const i in this.figures) {
      const figure = this.figures[i];
      const vertices = figure.get('vertices');
      const verticesData = [];
      for (const j in vertices) {
        verticesData.push({
          x: vertices[j].get('x'),
          y: vertices[j].get('y'),
        });
      }
      data.v.push(verticesData);
    }

    data.f = this.figures[this.figures.length - 1].get('isFinished');
    return data;
  },
});

Pano.fn = Pano.prototype;

Pano.fn.clickHandler = function (e) {
  if (e.which !== 1) {
    return;
  }
  const vertex = this.add(e.pageX, e.pageY);

  vertex.$elem.trigger('mousedown');
};

Pano.fn.add = function (x, y) {
  if (this.drawingFigure === null) {
    const figure = new Figure({ config: this.config.Figure });
    this.append(figure);
    this.drawingFigure = figure;
    this.figures.push(figure);
  }

  const vertex = new Vertex({
    x, y, figure: this.drawingFigure, config: this.config.Vertex,
  });
  this.append(vertex);
  this.drawingFigure.addVertex(vertex);
  return vertex;
};

Pano.fn.startDrag = function (e) {
  e.stopPropagation();

  this.$elem.on('mousemove', (em) => {
    $(e.currentTarget).data('vertex').set({
      x: em.pageX,
      y: em.pageY,
    });
  });

  if (
    this.drawingFigure
    && !this.drawingFigure.isChanged
    && $(e.currentTarget).is(this.drawingFigure.get('vertices')[0].$elem)
  ) {
    this.drawingFigure.set('isFinished', true);
    this.drawingFigure = null;
  }
};

Pano.fn.stopDrag = function (e) {
  e.stopPropagation();
  this.$elem.off('mousemove');
};

/*
 Figure
 */
const Figure = Drawer.Model.extend({
  defaults: {
    vertices: [],
    config: {},
    isFinished: false,
  },
  initialize() {
    this.$elem = Drawer.Utils.createSvgElement('path').attr(this.get('config'));
  },
  render() {
    let path = '';
    const vertices = this.get('vertices');

    for (let i = 0, { length } = vertices; i < length; i++) {
      const vertex = vertices[i];
      path += `${i ? 'L' : 'M'} ${vertex.get('x')} ${vertex.get('y')} `;
    }

    if (this.get('isFinished')) {
      path += `L ${vertices[0].get('x')} ${vertices[0].get('y')} `;
    }

    this.$elem.attr('d', path);
  },
  addVertex(vertex) {
    const vertices = this.get('vertices').slice(0);
    vertices.push(vertex);
    this.set('vertices', vertices);
  },
});

/*
 Vertex
 */
const Vertex = Drawer.Model.extend({
  defaults: {
    x: 0,
    y: 0,
    figure: null,
    config: {},
  },
  initialize() {
    this.$elem = Drawer.Utils.createSvgElement('circle').data({ vertex: this });
  },
  render() {
    this.$elem.attr($.extend(this.get('config'), {
      cx: this.get('x'),
      cy: this.get('y'),
    }));
  },
  onChange() {
    this.get('figure').isChanged = true;
  },
});
