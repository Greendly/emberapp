"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('emberapp/acceptance-tests/main', ['exports', 'ember-cli-sri/acceptance-tests/main'], function (exports, main) {

	'use strict';



	exports['default'] = main['default'];

});
define('emberapp/adapters/application', ['exports', 'ember-localforage-adapter/adapters/localforage'], function (exports, LFAdapter) {

    'use strict';

    exports['default'] = LFAdapter['default'].extend({
        namespace: 'EmberAppRecords'
    });

});
define('emberapp/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'emberapp/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('emberapp/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'emberapp/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('emberapp/components/ember-chart', ['exports', 'ember-cli-chart/components/ember-chart'], function (exports, EmberChart) {

	'use strict';

	exports['default'] = EmberChart['default'];

});
define('emberapp/components/jqui-accordion/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-accordion/component'], function (exports, Ember, jquiAccordion) {

	'use strict';

	exports['default'] = jquiAccordion['default'];

});
define('emberapp/components/jqui-autocomplete/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-autocomplete/component'], function (exports, Ember, jquiAutocomplete) {

	'use strict';

	exports['default'] = jquiAutocomplete['default'];

});
define('emberapp/components/jqui-button/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-button/component'], function (exports, Ember, jquiButton) {

	'use strict';

	exports['default'] = jquiButton['default'];

});
define('emberapp/components/jqui-datepicker/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-datepicker/component'], function (exports, Ember, jquiDatepicker) {

	'use strict';

	exports['default'] = jquiDatepicker['default'];

});
define('emberapp/components/jqui-menu/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-menu/component'], function (exports, Ember, jquiMenu) {

	'use strict';

	exports['default'] = jquiMenu['default'];

});
define('emberapp/components/jqui-progress-bar/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-progress-bar/component'], function (exports, Ember, jquiProgressBar) {

	'use strict';

	exports['default'] = jquiProgressBar['default'];

});
define('emberapp/components/jqui-slider/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-slider/component'], function (exports, Ember, jquiSlider) {

	'use strict';

	exports['default'] = jquiSlider['default'];

});
define('emberapp/components/jqui-spinner/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-spinner/component'], function (exports, Ember, jquiSpinner) {

	'use strict';

	exports['default'] = jquiSpinner['default'];

});
define('emberapp/components/jqui-tabs/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-tabs/component'], function (exports, Ember, jquiTabs) {

	'use strict';

	exports['default'] = jquiTabs['default'];

});
define('emberapp/components/pie-chart', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ["ember-pie-chart"],
    series: [],
    calculatedSeries: (function () {
      var offset = 0;
      var series = this.get("series");
      var newSeries = [];

      for (var i = 0; i < series.length; i++) {
        newSeries.push({
          title: series[i].title,
          color: series[i].color,
          value: series[i].value,
          offset: offset
        });

        offset -= series[i].value;
      }

      return newSeries;
    }).property("series.@each.value"),
    showLegend: false,
    baseColor: "#d0d0d0"
  });

});
define('emberapp/components/pie-slice', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: "circle",
    classNames: ["ember-pie-chart__chart-circle"],
    value: 0,
    duration: 400,
    didInsertElement: function didInsertElement() {
      this.$().attr("r", "25%");
      this.$().attr("cx", "50%");
      this.$().attr("cy", "50%");
      this.$().attr("stroke-dasharray", "0 100");
      this.$().attr("stroke-dashoffset", "0");
      this.$().attr("stroke", this.get("color"));
    },
    didRender: function didRender() {
      // animate the thing!
      if (this.animation) {
        clearInterval(this.animation);
      }

      var duration = this.get("duration");
      var iterations = Math.floor(this.get("duration") / 10);
      var currentValue = parseFloat(this.$().attr("stroke-dasharray").split(" ")[0]);
      var valueIncrement = (this.get("value") - currentValue) / iterations;
      var value = this.get("value");

      var i = 1;
      var _this = this;
      this.animation = setInterval(function () {
        var newValue = Math.min(valueIncrement * i + currentValue, value);

        _this.$().attr("stroke-dasharray", newValue + " 100");
        if (_this.$().next()) {
          _this.$().next().attr("stroke-dashoffset", -newValue);
        }
        i++;
        if (i > iterations) {
          clearInterval(_this.animation);
        }
      }, 10);
    }
  });

});
define('emberapp/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('emberapp/controllers/categories', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    init: function init() {},

    actions: {
      // save a category record to our offline datastore
      add: function add() {
        var selCat = this.get('selectedCategory');

        if (selCat !== undefined) {
          var subCat = this.store.createRecord('category', {
            name: this.get('newCategoryName')
          });
          subCat.save();
          selCat.get('subCategory').pushObject(subCat);
        } else {
          var category = this.store.createRecord('category', {
            name: this.get('newCategoryName')
          });
          category.save();
        }
      },
      // delete a category record from our offline datastore
      remove: function remove(category) {
        category.destroyRecord();
      }
    }
  });

});
define('emberapp/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('emberapp/controllers/rashody', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    init: function init() {},

    actions: {
      /* save a category record to our offline datastore */
      add: function add() {
        var rashody = this.store.createRecord('rashody', {
          date: moment(this.get('newDate'), "DD.MM.YYYY").unix(),
          count: this.get('newCount'),
          category: this.get('selectedCategory')
        });
        rashody.save();
      },
      /* delete a category record from our offline datastore */
      remove: function remove(rashody) {
        rashody.destroyRecord();
      },

      setFilterType: function setFilterType(ft) {
        this.set('filterType', ft);
      },
      setChartType: function setChartType(ct) {
        this.set('chartType', ct);
      }
    },
    filterType: 'All',
    chartType: 'details',

    filteredResults: (function () {
      var filterType = this.get('filterType');
      var fromDate = moment(this.get('fromDate'), "DD.MM.YYYY").unix();
      var beforeDate = moment(this.get('beforeDate'), "DD.MM.YYYY").unix();

      var thisDay = moment().unix();
      switch (filterType) {
        case 'All':
          return this.store.findAll('rashody');
        case 'lastDay':
          return this.store.filter('rashody', function (rashod) {
            return thisDay - rashod.get('date') < 86400; //one day                                     
          });
        case 'lastWeek':
          return this.store.filter('rashody', function (rashod) {
            return thisDay - rashod.get('date') < 604800; //one week                                     
          });
        case 'lastMonth':
          return this.store.filter('rashody', function (rashod) {
            return thisDay - rashod.get('date') < 2592000; //one week                                     
          });
        case 'between':
          return this.store.filter('rashody', function (rashod) {
            return rashod.get('date') >= fromDate && rashod.get('date') <= beforeDate;
          });
      }
    }).property('filterType', 'fromDate', 'beforeDate'),

    filteredResultsForPieChart: (function () {
      var filteredResults = this.get('filteredResults');
      var chartType = this.get('chartType');
      var rgb_r, rgb_g, rgb_b;
      var data = [];

      switch (chartType) {

        case 'general':
          filteredResults.forEach(function (item) {

            if (!item.get('category.parentCategory')) {
              rgb_r = rndInt(0, 245);rgb_g = rndInt(0, 245);rgb_b = rndInt(0, 245);
              data.pushObject({
                value: item.get('category.subcatRashCount'),
                color: 'rgb(' + rgb_r + ',' + rgb_g + ',' + rgb_b + ')',
                highlight: 'rgb(' + (rgb_r + 10) + ',' + (rgb_g + 10) + ',' + (rgb_b + 10) + ')',
                label: item.get('category.name')
              });
            }
          });
          break;

        case 'details':
          filteredResults.forEach(function (item) {

            rgb_r = rndInt(0, 245);rgb_g = rndInt(0, 245);rgb_b = rndInt(0, 245);
            data.pushObject({
              value: item.get('category.rashCount'),
              color: 'rgb(' + rgb_r + ',' + rgb_g + ',' + rgb_b + ')',
              highlight: 'rgb(' + (rgb_r + 10) + ',' + (rgb_g + 10) + ',' + (rgb_b + 10) + ')',
              label: item.get('category.name')
            });
          });
          break;
      }

      function rndInt(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
      }

      return data;
    }).property('filteredResults.@each', 'chartType'),

    PieChartOptions: {
      animationEasing: "linear"
    }

  });

});
define('emberapp/helpers/formatted-date', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.formattedDate = formattedDate;

  function formattedDate(params /*, hash*/) {
    return moment.unix(params).format("DD.MM.YY");
  }

  exports['default'] = Ember['default'].Helper.helper(formattedDate);

});
define('emberapp/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'emberapp/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('emberapp/initializers/export-application-global', ['exports', 'ember', 'emberapp/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('emberapp/models/category', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    rashody: DS['default'].hasMany('rashody', { async: true }),

    parentCategory: DS['default'].belongsTo('category', { inverse: 'subCategory' }),
    subCategory: DS['default'].hasMany('category', { inverse: 'parentCategory' }),

    //расходы по категории
    rashCount: (function () {
      var val = 0;
      this.get('rashody').forEach(function (rashod) {
        val += rashod.get('count');
      });
      return val;
    }).property('rashody.@each.count'),

    // расходы по категории и дочерним категориям
    subcatRashCount: (function () {
      var subVal = 0;
      this.get('subCategory').forEach(function (subCat) {
        subVal += subCat.get('subcatRashCount');
      });
      return subVal + this.get('rashCount');
    }).property('subCategory.@each.subcatRashCount', 'rashCount')

  });

});
define('emberapp/models/rashody', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    exports['default'] = DS['default'].Model.extend({
        category: DS['default'].belongsTo('category', { async: true }),
        date: DS['default'].attr('number'), //Unix Timestamp (seconds)
        count: DS['default'].attr('number')
    });

});
define('emberapp/router', ['exports', 'ember', 'emberapp/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('rashody');
    this.route('categories');
  });

  exports['default'] = Router;

});
define('emberapp/routes/application', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        redirect: function redirect() {
            this.transitionTo('categories');
        }
    });

});
define('emberapp/routes/categories', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        model: function model() {
            return Ember['default'].RSVP.hash({
                rashody: this.store.findAll('rashody'),
                category: this.store.findAll('category')
            });
        }
    });

});
define('emberapp/routes/rashody', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({

        model: function model() {
            return Ember['default'].RSVP.hash({
                rashody: this.store.findAll('rashody'),
                category: this.store.findAll('category')
            });
        }

    });

});
define('emberapp/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 8
            },
            "end": {
              "line": 14,
              "column": 42
            }
          },
          "moduleName": "emberapp/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Категории");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 8
            },
            "end": {
              "line": 15,
              "column": 37
            }
          },
          "moduleName": "emberapp/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Расходы");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 27,
            "column": 4
          }
        },
        "moduleName": "emberapp/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1,"class","navbar navbar-default navbar-fixed-top");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container-fluid");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","navbar-header");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"type","button");
        dom.setAttribute(el4,"class","navbar-toggle collapsed");
        dom.setAttribute(el4,"data-toggle","collapse");
        dom.setAttribute(el4,"data-target","#bs-example-navbar-collapse-1");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","sr-only");
        var el6 = dom.createTextNode("Toggle navigation");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"class","navbar-brand");
        dom.setAttribute(el4,"href","#");
        var el5 = dom.createTextNode("Ember App");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","collapse navbar-collapse");
        dom.setAttribute(el3,"id","bs-example-navbar-collapse-1");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","nav navbar-nav");
        var el5 = dom.createTextNode("\n    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n  \n");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n\n				");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 3, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        return morphs;
      },
      statements: [
        ["block","link-to",["categories"],[],0,null,["loc",[null,[14,8],[14,54]]]],
        ["block","link-to",["rashody"],[],1,null,["loc",[null,[15,8],[15,49]]]],
        ["content","outlet",["loc",[null,[22,0],[22,10]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('emberapp/templates/categories', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 6
            },
            "end": {
              "line": 15,
              "column": 6
            }
          },
          "moduleName": "emberapp/templates/categories.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("Σ ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createElement("button");
          dom.setAttribute(el3,"class","btn btn-default btn-xs");
          var el4 = dom.createTextNode("Delete");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [9, 0]);
          var morphs = new Array(5);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]),0,0);
          morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]),1,1);
          morphs[4] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [
          ["content","item.name",["loc",[null,[9,14],[9,27]]]],
          ["content","item.parentCategory.name",["loc",[null,[10,15],[10,43]]]],
          ["content","item.rashCount",["loc",[null,[11,14],[11,32]]]],
          ["content","item.subcatRashCount",["loc",[null,[12,22],[12,46]]]],
          ["element","action",["remove",["get","this",["loc",[null,[13,71],[13,75]]]]],[],["loc",[null,[13,53],[13,77]]]]
        ],
        locals: ["item"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 34,
            "column": 0
          }
        },
        "moduleName": "emberapp/templates/categories.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-xs-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Категории");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("table");
        dom.setAttribute(el3,"class","table");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tbody");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-xs-4");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Добавить категорию:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","row");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-xs-8");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","col-xs-4");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","add_rec btn btn-default");
        var el6 = dom.createTextNode("Добавить");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0]);
        var element3 = dom.childAt(element2, [3]);
        var element4 = dom.childAt(element3, [5]);
        var element5 = dom.childAt(element4, [3, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element2, [1, 3, 1]),1,1);
        morphs[1] = dom.createMorphAt(element3,3,3);
        morphs[2] = dom.createMorphAt(dom.childAt(element4, [1]),1,1);
        morphs[3] = dom.createElementMorph(element5);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model.category",["loc",[null,[7,14],[7,28]]]]],[],0,null,["loc",[null,[7,6],[15,15]]]],
        ["inline","input",[],["class","form-control","type","text","value",["subexpr","@mut",[["get","newCategoryName",["loc",[null,[21,51],[21,66]]]]],[],[]],"placeholder","Название категории"],["loc",[null,[21,4],[21,101]]]],
        ["inline","view",["select"],["class","selectpicker form-control","prompt","Выберите родительскую категорию","content",["subexpr","@mut",[["get","model.category",["loc",[null,[25,16],[25,30]]]]],[],[]],"selection",["subexpr","@mut",[["get","selectedCategory",["loc",[null,[25,41],[25,57]]]]],[],[]],"optionValuePath","content.id","optionLabelPath","content.name"],["loc",[null,[24,8],[25,119]]]],
        ["element","action",["add",["get","this",["loc",[null,[28,63],[28,67]]]]],[],["loc",[null,[28,48],[28,69]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('emberapp/templates/components/pie-chart', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 4
              },
              "end": {
                "line": 14,
                "column": 4
              }
            },
            "moduleName": "emberapp/templates/components/pie-chart.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","ember-pie-chart__legend-item");
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2,"class","ember-pie-chart__legend-color");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            dom.setAttribute(el2,"class","ember-pie-chart__legend-title");
            var el3 = dom.createTextNode("\n          ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(element0, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element1, 'style');
            morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
            return morphs;
          },
          statements: [
            ["attribute","style",["concat",["background: ",["get","data.color",["loc",[null,[9,72],[9,82]]]]]]],
            ["content","data.title",["loc",[null,[11,10],[11,24]]]]
          ],
          locals: ["data"],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 16,
              "column": 0
            }
          },
          "moduleName": "emberapp/templates/components/pie-chart.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","ember-pie-chart__legend");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["block","each",[["get","calculatedSeries",["loc",[null,[7,12],[7,28]]]]],[],0,null,["loc",[null,[7,4],[14,13]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "emberapp/templates/components/pie-chart.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el1 = dom.createElement("svg");
        dom.setAttribute(el1,"viewBox","0 0 64 64");
        dom.setAttribute(el1,"class","ember-pie-chart__chart");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element2, 'style');
        morphs[1] = dom.createMorphAt(element2,1,1);
        morphs[2] = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["attribute","style",["concat",["background: ",["get","baseColor",["loc",[null,[1,77],[1,86]]]]]]],
        ["content","yield",["loc",[null,[2,2],[2,11]]]],
        ["block","if",[["get","showLegend",["loc",[null,[5,6],[5,16]]]]],[],0,null,["loc",[null,[5,0],[16,7]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('emberapp/templates/rashody', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 35,
              "column": 8
            },
            "end": {
              "line": 42,
              "column": 8
            }
          },
          "moduleName": "emberapp/templates/rashody.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  \n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" \n            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createElement("button");
          dom.setAttribute(el3,"class","btn btn-default btn-xs");
          var el4 = dom.createTextNode("Delete");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [7, 0]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]),0,0);
          morphs[3] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [
          ["inline","formatted-date",[["get","item.date",["loc",[null,[37,33],[37,42]]]]],[],["loc",[null,[37,16],[37,44]]]],
          ["content","item.category.name",["loc",[null,[38,16],[38,38]]]],
          ["content","item.count",["loc",[null,[39,16],[39,30]]]],
          ["element","action",["remove",["get","this",["loc",[null,[40,73],[40,77]]]]],[],["loc",[null,[40,55],[40,79]]]]
        ],
        locals: ["item"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 89,
            "column": 0
          }
        },
        "moduleName": "emberapp/templates/rashody.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-xs-8");
        var el2 = dom.createTextNode("\n  \n  \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","btn-group filter_button");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"type","button");
        dom.setAttribute(el3,"class","btn btn-default");
        var el4 = dom.createTextNode("День");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"type","button");
        dom.setAttribute(el3,"class","btn btn-default");
        var el4 = dom.createTextNode("Неделя");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"type","button");
        dom.setAttribute(el3,"class","btn btn-default");
        var el4 = dom.createTextNode("Месяц");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"type","button");
        dom.setAttribute(el3,"class","btn btn-default");
        var el4 = dom.createTextNode("Все");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row filter_group_between");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-xs-4");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","input-group ");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","input-group-addon");
        var el6 = dom.createTextNode("От");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" \n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-xs-4");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","input-group");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","input-group-addon");
        var el6 = dom.createTextNode("До");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" \n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-xs-3");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"type","button");
        dom.setAttribute(el4,"class","btn btn-default");
        var el5 = dom.createTextNode("Применить");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-xs-7");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("table");
        dom.setAttribute(el4,"class","table");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-xs-5");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","btn-group filter_button");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"type","button");
        dom.setAttribute(el5,"class","btn btn-default");
        var el6 = dom.createTextNode("Общий вид");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"type","button");
        dom.setAttribute(el5,"class","btn btn-default");
        var el6 = dom.createTextNode("Детальный вид");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    \n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","col-xs-4");
        var el2 = dom.createTextNode("\n \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row new_record");
        var el3 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col-xs-9");
        var el4 = dom.createTextNode(" \n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h4");
        var el5 = dom.createTextNode("Добавить запись:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","input-group");
        var el5 = dom.createTextNode(" \n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","input-group-addon");
        var el6 = dom.createTextNode("Дата");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" \n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("   \n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","input-group");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","input-group-addon");
        var el6 = dom.createTextNode("Ед");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" \n      \n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","add_rec btn btn-default");
        var el5 = dom.createTextNode("Добавить");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" \n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  \n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  \n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element3, [1]);
        var element5 = dom.childAt(element3, [3]);
        var element6 = dom.childAt(element3, [5]);
        var element7 = dom.childAt(element3, [7]);
        var element8 = dom.childAt(element2, [3]);
        var element9 = dom.childAt(element8, [5, 1]);
        var element10 = dom.childAt(element2, [5]);
        var element11 = dom.childAt(element10, [3]);
        var element12 = dom.childAt(element11, [3]);
        var element13 = dom.childAt(element12, [1]);
        var element14 = dom.childAt(element12, [3]);
        var element15 = dom.childAt(fragment, [2, 1, 1]);
        var element16 = dom.childAt(element15, [9]);
        var morphs = new Array(15);
        morphs[0] = dom.createElementMorph(element4);
        morphs[1] = dom.createElementMorph(element5);
        morphs[2] = dom.createElementMorph(element6);
        morphs[3] = dom.createElementMorph(element7);
        morphs[4] = dom.createMorphAt(dom.childAt(element8, [1, 1]),3,3);
        morphs[5] = dom.createMorphAt(dom.childAt(element8, [3, 1]),3,3);
        morphs[6] = dom.createElementMorph(element9);
        morphs[7] = dom.createMorphAt(dom.childAt(element10, [1, 1]),1,1);
        morphs[8] = dom.createMorphAt(element11,1,1);
        morphs[9] = dom.createElementMorph(element13);
        morphs[10] = dom.createElementMorph(element14);
        morphs[11] = dom.createMorphAt(dom.childAt(element15, [3]),3,3);
        morphs[12] = dom.createMorphAt(element15,5,5);
        morphs[13] = dom.createMorphAt(dom.childAt(element15, [7]),3,3);
        morphs[14] = dom.createElementMorph(element16);
        return morphs;
      },
      statements: [
        ["element","action",["setFilterType","lastDay"],[],["loc",[null,[5,12],[5,48]]]],
        ["element","action",["setFilterType","lastWeek"],[],["loc",[null,[6,12],[6,49]]]],
        ["element","action",["setFilterType","lastMonth"],[],["loc",[null,[7,12],[7,50]]]],
        ["element","action",["setFilterType","All"],[],["loc",[null,[8,12],[8,44]]]],
        ["inline","jqui-datepicker",[],["value",["subexpr","@mut",[["get","fromDate",["loc",[null,[15,33],[15,41]]]]],[],[]],"class","dpnewDate form-control","dateFormat","dd.mm.yy"],["loc",[null,[15,8],[15,96]]]],
        ["inline","jqui-datepicker",[],["value",["subexpr","@mut",[["get","beforeDate",["loc",[null,[22,33],[22,43]]]]],[],[]],"class","dpnewDate form-control","dateFormat","dd.mm.yy"],["loc",[null,[22,8],[22,98]]]],
        ["element","action",["setFilterType","between"],[],["loc",[null,[27,14],[27,50]]]],
        ["block","each",[["get","filteredResults",["loc",[null,[35,16],[35,31]]]]],[],0,null,["loc",[null,[35,8],[42,17]]]],
        ["inline","ember-chart",[],["type","Pie","data",["subexpr","@mut",[["get","filteredResultsForPieChart",["loc",[null,[47,36],[47,62]]]]],[],[]],"options",["subexpr","@mut",[["get","PieChartOptions",["loc",[null,[47,71],[47,86]]]]],[],[]],"width",200,"height",200],["loc",[null,[47,6],[47,109]]]],
        ["element","action",["setChartType","general"],[],["loc",[null,[50,16],[50,51]]]],
        ["element","action",["setChartType","details"],[],["loc",[null,[51,16],[51,51]]]],
        ["inline","jqui-datepicker",[],["value",["subexpr","@mut",[["get","newDate",["loc",[null,[66,33],[66,40]]]]],[],[]],"class","dpnewDate form-control","dateFormat","dd.mm.yy"],["loc",[null,[66,8],[66,95]]]],
        ["inline","view",["select"],["class","selectpicker form-control","prompt","Выберите категорию","content",["subexpr","@mut",[["get","model.category",["loc",[null,[71,16],[71,30]]]]],[],[]],"selection",["subexpr","@mut",[["get","selectedCategory",["loc",[null,[72,18],[72,34]]]]],[],[]],"optionValuePath","content.id","optionLabelPath","content.name"],["loc",[null,[69,6],[75,8]]]],
        ["inline","input",[],["class","form-control","type","text","value",["subexpr","@mut",[["get","newCount",["loc",[null,[79,55],[79,63]]]]],[],[]]],["loc",[null,[79,8],[79,65]]]],
        ["element","action",["add",["get","this",["loc",[null,[82,61],[82,65]]]]],[],["loc",[null,[82,46],[82,67]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('emberapp/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('emberapp/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('emberapp/tests/controllers/categories.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/categories.js should pass jshint', function() { 
    ok(true, 'controllers/categories.js should pass jshint.'); 
  });

});
define('emberapp/tests/controllers/rashody.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/rashody.js should pass jshint', function() { 
    ok(true, 'controllers/rashody.js should pass jshint.'); 
  });

});
define('emberapp/tests/helpers/formatted-date.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/formatted-date.js should pass jshint', function() { 
    ok(true, 'helpers/formatted-date.js should pass jshint.'); 
  });

});
define('emberapp/tests/helpers/resolver', ['exports', 'ember/resolver', 'emberapp/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('emberapp/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('emberapp/tests/helpers/start-app', ['exports', 'ember', 'emberapp/app', 'emberapp/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('emberapp/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('emberapp/tests/models/category.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/category.js should pass jshint', function() { 
    ok(true, 'models/category.js should pass jshint.'); 
  });

});
define('emberapp/tests/models/rashody.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/rashody.js should pass jshint', function() { 
    ok(true, 'models/rashody.js should pass jshint.'); 
  });

});
define('emberapp/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('emberapp/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('emberapp/tests/routes/categories.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/categories.js should pass jshint', function() { 
    ok(true, 'routes/categories.js should pass jshint.'); 
  });

});
define('emberapp/tests/routes/rashody.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/rashody.js should pass jshint', function() { 
    ok(true, 'routes/rashody.js should pass jshint.'); 
  });

});
define('emberapp/tests/test-helper', ['emberapp/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('emberapp/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('emberapp/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

});
define('emberapp/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/adapters');
  test('unit/adapters/application-test.js should pass jshint', function() { 
    ok(true, 'unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('emberapp/tests/unit/controllers/categories-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:categories', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('emberapp/tests/unit/controllers/categories-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/categories-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/categories-test.js should pass jshint.'); 
  });

});
define('emberapp/tests/unit/controllers/rashody-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:rashody', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('emberapp/tests/unit/controllers/rashody-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/rashody-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/rashody-test.js should pass jshint.'); 
  });

});
define('emberapp/tests/unit/helpers/display-categories-test', ['emberapp/helpers/display-categories', 'qunit'], function (display_categories, qunit) {

  'use strict';

  qunit.module('Unit | Helper | display categories');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = display_categories.displayCategories(42);
    assert.ok(result);
  });

});
define('emberapp/tests/unit/helpers/display-categories-test.jshint', function () {

  'use strict';

  module('JSHint - unit/helpers');
  test('unit/helpers/display-categories-test.js should pass jshint', function() { 
    ok(true, 'unit/helpers/display-categories-test.js should pass jshint.'); 
  });

});
define('emberapp/tests/unit/helpers/formatted-date-test', ['emberapp/helpers/formatted-date', 'qunit'], function (formatted_date, qunit) {

  'use strict';

  qunit.module('Unit | Helper | formatted date');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = formatted_date.formattedDate(42);
    assert.ok(result);
  });

});
define('emberapp/tests/unit/helpers/formatted-date-test.jshint', function () {

  'use strict';

  module('JSHint - unit/helpers');
  test('unit/helpers/formatted-date-test.js should pass jshint', function() { 
    ok(true, 'unit/helpers/formatted-date-test.js should pass jshint.'); 
  });

});
define('emberapp/tests/unit/models/category-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('category', 'Unit | Model | category', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('emberapp/tests/unit/models/category-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/category-test.js should pass jshint', function() { 
    ok(true, 'unit/models/category-test.js should pass jshint.'); 
  });

});
define('emberapp/tests/unit/models/rashody-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('rashody', 'Unit | Model | rashody', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('emberapp/tests/unit/models/rashody-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/rashody-test.js should pass jshint', function() { 
    ok(true, 'unit/models/rashody-test.js should pass jshint.'); 
  });

});
define('emberapp/tests/unit/routes/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('emberapp/tests/unit/routes/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/application-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/application-test.js should pass jshint.'); 
  });

});
define('emberapp/tests/unit/routes/categories-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:categories', 'Unit | Route | categories', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('emberapp/tests/unit/routes/categories-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/categories-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/categories-test.js should pass jshint.'); 
  });

});
define('emberapp/tests/unit/routes/rashody-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:rashody', 'Unit | Route | rashody', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('emberapp/tests/unit/routes/rashody-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/rashody-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/rashody-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('emberapp/config/environment', ['ember'], function(Ember) {
  var prefix = 'emberapp';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("emberapp/tests/test-helper");
} else {
  require("emberapp/app")["default"].create({"name":"emberapp","version":"0.0.0+b18aec46"});
}

/* jshint ignore:end */
//# sourceMappingURL=emberapp.map