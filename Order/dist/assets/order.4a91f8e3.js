import { r as registerPlugin, h as hideStatusBar, C as CapacitorHttp } from "./statusbar.f6df8738.js";
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var fabric = {};
var __viteBrowserExternal = {};
var __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
var require$$2 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
(function(exports) {
  /*! Fabric.js Copyright 2008-2015, Printio (Juriy Zaytsev, Maxim Chernyak) */
  var fabric2 = fabric2 || { version: "5.3.0" };
  {
    exports.fabric = fabric2;
  }
  if (typeof document !== "undefined" && typeof window !== "undefined") {
    if (document instanceof (typeof HTMLDocument !== "undefined" ? HTMLDocument : Document)) {
      fabric2.document = document;
    } else {
      fabric2.document = document.implementation.createHTMLDocument("");
    }
    fabric2.window = window;
  } else {
    var jsdom = require$$2;
    var virtualWindow = new jsdom.JSDOM(
      decodeURIComponent("%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3C%2Fhead%3E%3Cbody%3E%3C%2Fbody%3E%3C%2Fhtml%3E"),
      {
        features: {
          FetchExternalResources: ["img"]
        },
        resources: "usable"
      }
    ).window;
    fabric2.document = virtualWindow.document;
    fabric2.jsdomImplForWrapper = require$$2.implForWrapper;
    fabric2.nodeCanvas = require$$2.Canvas;
    fabric2.window = virtualWindow;
    DOMParser = fabric2.window.DOMParser;
  }
  fabric2.isTouchSupported = "ontouchstart" in fabric2.window || "ontouchstart" in fabric2.document || fabric2.window && fabric2.window.navigator && fabric2.window.navigator.maxTouchPoints > 0;
  fabric2.isLikelyNode = typeof Buffer !== "undefined" && typeof window === "undefined";
  fabric2.SHARED_ATTRIBUTES = [
    "display",
    "transform",
    "fill",
    "fill-opacity",
    "fill-rule",
    "opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-linecap",
    "stroke-dashoffset",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "id",
    "paint-order",
    "vector-effect",
    "instantiated_by_use",
    "clip-path"
  ];
  fabric2.DPI = 96;
  fabric2.reNum = "(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:[eE][-+]?\\d+)?)";
  fabric2.commaWsp = "(?:\\s+,?\\s*|,\\s*)";
  fabric2.rePathCommand = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:[eE][-+]?\d+)?)/ig;
  fabric2.reNonWord = /[ \n\.,;!\?\-]/;
  fabric2.fontPaths = {};
  fabric2.iMatrix = [1, 0, 0, 1, 0, 0];
  fabric2.svgNS = "http://www.w3.org/2000/svg";
  fabric2.perfLimitSizeTotal = 2097152;
  fabric2.maxCacheSideLimit = 4096;
  fabric2.minCacheSideLimit = 256;
  fabric2.charWidthsCache = {};
  fabric2.textureSize = 2048;
  fabric2.disableStyleCopyPaste = false;
  fabric2.enableGLFiltering = true;
  fabric2.devicePixelRatio = fabric2.window.devicePixelRatio || fabric2.window.webkitDevicePixelRatio || fabric2.window.mozDevicePixelRatio || 1;
  fabric2.browserShadowBlurConstant = 1;
  fabric2.arcToSegmentsCache = {};
  fabric2.boundsOfCurveCache = {};
  fabric2.cachesBoundsOfCurve = true;
  fabric2.forceGLPutImageData = false;
  fabric2.initFilterBackend = function() {
    if (fabric2.enableGLFiltering && fabric2.isWebglSupported && fabric2.isWebglSupported(fabric2.textureSize)) {
      console.log("max texture size: " + fabric2.maxTextureSize);
      return new fabric2.WebglFilterBackend({ tileSize: fabric2.textureSize });
    } else if (fabric2.Canvas2dFilterBackend) {
      return new fabric2.Canvas2dFilterBackend();
    }
  };
  if (typeof document !== "undefined" && typeof window !== "undefined") {
    window.fabric = fabric2;
  }
  (function() {
    function _removeEventListener(eventName, handler) {
      if (!this.__eventListeners[eventName]) {
        return;
      }
      var eventListener = this.__eventListeners[eventName];
      if (handler) {
        eventListener[eventListener.indexOf(handler)] = false;
      } else {
        fabric2.util.array.fill(eventListener, false);
      }
    }
    function on(eventName, handler) {
      if (!this.__eventListeners) {
        this.__eventListeners = {};
      }
      if (arguments.length === 1) {
        for (var prop in eventName) {
          this.on(prop, eventName[prop]);
        }
      } else {
        if (!this.__eventListeners[eventName]) {
          this.__eventListeners[eventName] = [];
        }
        this.__eventListeners[eventName].push(handler);
      }
      return this;
    }
    function _once(eventName, handler) {
      var _handler = function() {
        handler.apply(this, arguments);
        this.off(eventName, _handler);
      }.bind(this);
      this.on(eventName, _handler);
    }
    function once(eventName, handler) {
      if (arguments.length === 1) {
        for (var prop in eventName) {
          _once.call(this, prop, eventName[prop]);
        }
      } else {
        _once.call(this, eventName, handler);
      }
      return this;
    }
    function off(eventName, handler) {
      if (!this.__eventListeners) {
        return this;
      }
      if (arguments.length === 0) {
        for (eventName in this.__eventListeners) {
          _removeEventListener.call(this, eventName);
        }
      } else if (arguments.length === 1 && typeof arguments[0] === "object") {
        for (var prop in eventName) {
          _removeEventListener.call(this, prop, eventName[prop]);
        }
      } else {
        _removeEventListener.call(this, eventName, handler);
      }
      return this;
    }
    function fire(eventName, options) {
      if (!this.__eventListeners) {
        return this;
      }
      var listenersForEvent = this.__eventListeners[eventName];
      if (!listenersForEvent) {
        return this;
      }
      for (var i = 0, len = listenersForEvent.length; i < len; i++) {
        listenersForEvent[i] && listenersForEvent[i].call(this, options || {});
      }
      this.__eventListeners[eventName] = listenersForEvent.filter(function(value) {
        return value !== false;
      });
      return this;
    }
    fabric2.Observable = {
      fire,
      on,
      once,
      off
    };
  })();
  fabric2.Collection = {
    _objects: [],
    add: function() {
      this._objects.push.apply(this._objects, arguments);
      if (this._onObjectAdded) {
        for (var i = 0, length = arguments.length; i < length; i++) {
          this._onObjectAdded(arguments[i]);
        }
      }
      this.renderOnAddRemove && this.requestRenderAll();
      return this;
    },
    insertAt: function(object, index, nonSplicing) {
      var objects = this._objects;
      if (nonSplicing) {
        objects[index] = object;
      } else {
        objects.splice(index, 0, object);
      }
      this._onObjectAdded && this._onObjectAdded(object);
      this.renderOnAddRemove && this.requestRenderAll();
      return this;
    },
    remove: function() {
      var objects = this._objects, index, somethingRemoved = false;
      for (var i = 0, length = arguments.length; i < length; i++) {
        index = objects.indexOf(arguments[i]);
        if (index !== -1) {
          somethingRemoved = true;
          objects.splice(index, 1);
          this._onObjectRemoved && this._onObjectRemoved(arguments[i]);
        }
      }
      this.renderOnAddRemove && somethingRemoved && this.requestRenderAll();
      return this;
    },
    forEachObject: function(callback, context) {
      var objects = this.getObjects();
      for (var i = 0, len = objects.length; i < len; i++) {
        callback.call(context, objects[i], i, objects);
      }
      return this;
    },
    getObjects: function(type) {
      if (typeof type === "undefined") {
        return this._objects.concat();
      }
      return this._objects.filter(function(o) {
        return o.type === type;
      });
    },
    item: function(index) {
      return this._objects[index];
    },
    isEmpty: function() {
      return this._objects.length === 0;
    },
    size: function() {
      return this._objects.length;
    },
    contains: function(object, deep) {
      if (this._objects.indexOf(object) > -1) {
        return true;
      } else if (deep) {
        return this._objects.some(function(obj) {
          return typeof obj.contains === "function" && obj.contains(object, true);
        });
      }
      return false;
    },
    complexity: function() {
      return this._objects.reduce(function(memo, current) {
        memo += current.complexity ? current.complexity() : 0;
        return memo;
      }, 0);
    }
  };
  fabric2.CommonMethods = {
    _setOptions: function(options) {
      for (var prop in options) {
        this.set(prop, options[prop]);
      }
    },
    _initGradient: function(filler, property) {
      if (filler && filler.colorStops && !(filler instanceof fabric2.Gradient)) {
        this.set(property, new fabric2.Gradient(filler));
      }
    },
    _initPattern: function(filler, property, callback) {
      if (filler && filler.source && !(filler instanceof fabric2.Pattern)) {
        this.set(property, new fabric2.Pattern(filler, callback));
      } else {
        callback && callback();
      }
    },
    _setObject: function(obj) {
      for (var prop in obj) {
        this._set(prop, obj[prop]);
      }
    },
    set: function(key, value) {
      if (typeof key === "object") {
        this._setObject(key);
      } else {
        this._set(key, value);
      }
      return this;
    },
    _set: function(key, value) {
      this[key] = value;
    },
    toggle: function(property) {
      var value = this.get(property);
      if (typeof value === "boolean") {
        this.set(property, !value);
      }
      return this;
    },
    get: function(property) {
      return this[property];
    }
  };
  (function(global) {
    var sqrt = Math.sqrt, atan2 = Math.atan2, pow = Math.pow, PiBy180 = Math.PI / 180, PiBy2 = Math.PI / 2;
    fabric2.util = {
      cos: function(angle) {
        if (angle === 0) {
          return 1;
        }
        if (angle < 0) {
          angle = -angle;
        }
        var angleSlice = angle / PiBy2;
        switch (angleSlice) {
          case 1:
          case 3:
            return 0;
          case 2:
            return -1;
        }
        return Math.cos(angle);
      },
      sin: function(angle) {
        if (angle === 0) {
          return 0;
        }
        var angleSlice = angle / PiBy2, sign = 1;
        if (angle < 0) {
          sign = -1;
        }
        switch (angleSlice) {
          case 1:
            return sign;
          case 2:
            return 0;
          case 3:
            return -sign;
        }
        return Math.sin(angle);
      },
      removeFromArray: function(array, value) {
        var idx = array.indexOf(value);
        if (idx !== -1) {
          array.splice(idx, 1);
        }
        return array;
      },
      getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      degreesToRadians: function(degrees) {
        return degrees * PiBy180;
      },
      radiansToDegrees: function(radians) {
        return radians / PiBy180;
      },
      rotatePoint: function(point, origin, radians) {
        var newPoint = new fabric2.Point(point.x - origin.x, point.y - origin.y), v = fabric2.util.rotateVector(newPoint, radians);
        return new fabric2.Point(v.x, v.y).addEquals(origin);
      },
      rotateVector: function(vector, radians) {
        var sin = fabric2.util.sin(radians), cos = fabric2.util.cos(radians), rx = vector.x * cos - vector.y * sin, ry = vector.x * sin + vector.y * cos;
        return {
          x: rx,
          y: ry
        };
      },
      createVector: function(from, to) {
        return new fabric2.Point(to.x - from.x, to.y - from.y);
      },
      calcAngleBetweenVectors: function(a, b) {
        return Math.acos((a.x * b.x + a.y * b.y) / (Math.hypot(a.x, a.y) * Math.hypot(b.x, b.y)));
      },
      getHatVector: function(v) {
        return new fabric2.Point(v.x, v.y).multiply(1 / Math.hypot(v.x, v.y));
      },
      getBisector: function(A, B, C) {
        var AB = fabric2.util.createVector(A, B), AC = fabric2.util.createVector(A, C);
        var alpha = fabric2.util.calcAngleBetweenVectors(AB, AC);
        var ro = fabric2.util.calcAngleBetweenVectors(fabric2.util.rotateVector(AB, alpha), AC);
        var phi = alpha * (ro === 0 ? 1 : -1) / 2;
        return {
          vector: fabric2.util.getHatVector(fabric2.util.rotateVector(AB, phi)),
          angle: alpha
        };
      },
      projectStrokeOnPoints: function(points, options, openPath) {
        var coords = [], s = options.strokeWidth / 2, strokeUniformScalar = options.strokeUniform ? new fabric2.Point(1 / options.scaleX, 1 / options.scaleY) : new fabric2.Point(1, 1), getStrokeHatVector = function(v) {
          var scalar = s / Math.hypot(v.x, v.y);
          return new fabric2.Point(v.x * scalar * strokeUniformScalar.x, v.y * scalar * strokeUniformScalar.y);
        };
        if (points.length <= 1) {
          return coords;
        }
        points.forEach(function(p, index) {
          var A = new fabric2.Point(p.x, p.y), B, C;
          if (index === 0) {
            C = points[index + 1];
            B = openPath ? getStrokeHatVector(fabric2.util.createVector(C, A)).addEquals(A) : points[points.length - 1];
          } else if (index === points.length - 1) {
            B = points[index - 1];
            C = openPath ? getStrokeHatVector(fabric2.util.createVector(B, A)).addEquals(A) : points[0];
          } else {
            B = points[index - 1];
            C = points[index + 1];
          }
          var bisector = fabric2.util.getBisector(A, B, C), bisectorVector = bisector.vector, alpha = bisector.angle, scalar, miterVector;
          if (options.strokeLineJoin === "miter") {
            scalar = -s / Math.sin(alpha / 2);
            miterVector = new fabric2.Point(
              bisectorVector.x * scalar * strokeUniformScalar.x,
              bisectorVector.y * scalar * strokeUniformScalar.y
            );
            if (Math.hypot(miterVector.x, miterVector.y) / s <= options.strokeMiterLimit) {
              coords.push(A.add(miterVector));
              coords.push(A.subtract(miterVector));
              return;
            }
          }
          scalar = -s * Math.SQRT2;
          miterVector = new fabric2.Point(
            bisectorVector.x * scalar * strokeUniformScalar.x,
            bisectorVector.y * scalar * strokeUniformScalar.y
          );
          coords.push(A.add(miterVector));
          coords.push(A.subtract(miterVector));
        });
        return coords;
      },
      transformPoint: function(p, t, ignoreOffset) {
        if (ignoreOffset) {
          return new fabric2.Point(
            t[0] * p.x + t[2] * p.y,
            t[1] * p.x + t[3] * p.y
          );
        }
        return new fabric2.Point(
          t[0] * p.x + t[2] * p.y + t[4],
          t[1] * p.x + t[3] * p.y + t[5]
        );
      },
      makeBoundingBoxFromPoints: function(points, transform) {
        if (transform) {
          for (var i = 0; i < points.length; i++) {
            points[i] = fabric2.util.transformPoint(points[i], transform);
          }
        }
        var xPoints = [points[0].x, points[1].x, points[2].x, points[3].x], minX = fabric2.util.array.min(xPoints), maxX = fabric2.util.array.max(xPoints), width = maxX - minX, yPoints = [points[0].y, points[1].y, points[2].y, points[3].y], minY = fabric2.util.array.min(yPoints), maxY = fabric2.util.array.max(yPoints), height = maxY - minY;
        return {
          left: minX,
          top: minY,
          width,
          height
        };
      },
      invertTransform: function(t) {
        var a = 1 / (t[0] * t[3] - t[1] * t[2]), r = [a * t[3], -a * t[1], -a * t[2], a * t[0]], o = fabric2.util.transformPoint({ x: t[4], y: t[5] }, r, true);
        r[4] = -o.x;
        r[5] = -o.y;
        return r;
      },
      toFixed: function(number, fractionDigits) {
        return parseFloat(Number(number).toFixed(fractionDigits));
      },
      parseUnit: function(value, fontSize) {
        var unit = /\D{0,2}$/.exec(value), number = parseFloat(value);
        if (!fontSize) {
          fontSize = fabric2.Text.DEFAULT_SVG_FONT_SIZE;
        }
        switch (unit[0]) {
          case "mm":
            return number * fabric2.DPI / 25.4;
          case "cm":
            return number * fabric2.DPI / 2.54;
          case "in":
            return number * fabric2.DPI;
          case "pt":
            return number * fabric2.DPI / 72;
          case "pc":
            return number * fabric2.DPI / 72 * 12;
          case "em":
            return number * fontSize;
          default:
            return number;
        }
      },
      falseFunction: function() {
        return false;
      },
      getKlass: function(type, namespace) {
        type = fabric2.util.string.camelize(type.charAt(0).toUpperCase() + type.slice(1));
        return fabric2.util.resolveNamespace(namespace)[type];
      },
      getSvgAttributes: function(type) {
        var attributes = [
          "instantiated_by_use",
          "style",
          "id",
          "class"
        ];
        switch (type) {
          case "linearGradient":
            attributes = attributes.concat(["x1", "y1", "x2", "y2", "gradientUnits", "gradientTransform"]);
            break;
          case "radialGradient":
            attributes = attributes.concat(["gradientUnits", "gradientTransform", "cx", "cy", "r", "fx", "fy", "fr"]);
            break;
          case "stop":
            attributes = attributes.concat(["offset", "stop-color", "stop-opacity"]);
            break;
        }
        return attributes;
      },
      resolveNamespace: function(namespace) {
        if (!namespace) {
          return fabric2;
        }
        var parts = namespace.split("."), len = parts.length, i, obj = global || fabric2.window;
        for (i = 0; i < len; ++i) {
          obj = obj[parts[i]];
        }
        return obj;
      },
      loadImage: function(url, callback, context, crossOrigin) {
        if (!url) {
          callback && callback.call(context, url);
          return;
        }
        var img = fabric2.util.createImage();
        var onLoadCallback = function() {
          callback && callback.call(context, img, false);
          img = img.onload = img.onerror = null;
        };
        img.onload = onLoadCallback;
        img.onerror = function() {
          fabric2.log("Error loading " + img.src);
          callback && callback.call(context, null, true);
          img = img.onload = img.onerror = null;
        };
        if (url.indexOf("data") !== 0 && crossOrigin !== void 0 && crossOrigin !== null) {
          img.crossOrigin = crossOrigin;
        }
        if (url.substring(0, 14) === "data:image/svg") {
          img.onload = null;
          fabric2.util.loadImageInDom(img, onLoadCallback);
        }
        img.src = url;
      },
      loadImageInDom: function(img, onLoadCallback) {
        var div = fabric2.document.createElement("div");
        div.style.width = div.style.height = "1px";
        div.style.left = div.style.top = "-100%";
        div.style.position = "absolute";
        div.appendChild(img);
        fabric2.document.querySelector("body").appendChild(div);
        img.onload = function() {
          onLoadCallback();
          div.parentNode.removeChild(div);
          div = null;
        };
      },
      enlivenObjects: function(objects, callback, namespace, reviver) {
        objects = objects || [];
        var enlivenedObjects = [], numLoadedObjects = 0, numTotalObjects = objects.length;
        function onLoaded() {
          if (++numLoadedObjects === numTotalObjects) {
            callback && callback(enlivenedObjects.filter(function(obj) {
              return obj;
            }));
          }
        }
        if (!numTotalObjects) {
          callback && callback(enlivenedObjects);
          return;
        }
        objects.forEach(function(o, index) {
          if (!o || !o.type) {
            onLoaded();
            return;
          }
          var klass = fabric2.util.getKlass(o.type, namespace);
          klass.fromObject(o, function(obj, error) {
            error || (enlivenedObjects[index] = obj);
            reviver && reviver(o, obj, error);
            onLoaded();
          });
        });
      },
      enlivenObjectEnlivables: function(object, context, callback) {
        var enlivenProps = fabric2.Object.ENLIVEN_PROPS.filter(function(key) {
          return !!object[key];
        });
        fabric2.util.enlivenObjects(enlivenProps.map(function(key) {
          return object[key];
        }), function(enlivedProps) {
          var objects = {};
          enlivenProps.forEach(function(key, index) {
            objects[key] = enlivedProps[index];
            context && (context[key] = enlivedProps[index]);
          });
          callback && callback(objects);
        });
      },
      enlivenPatterns: function(patterns, callback) {
        patterns = patterns || [];
        function onLoaded() {
          if (++numLoadedPatterns === numPatterns) {
            callback && callback(enlivenedPatterns);
          }
        }
        var enlivenedPatterns = [], numLoadedPatterns = 0, numPatterns = patterns.length;
        if (!numPatterns) {
          callback && callback(enlivenedPatterns);
          return;
        }
        patterns.forEach(function(p, index) {
          if (p && p.source) {
            new fabric2.Pattern(p, function(pattern) {
              enlivenedPatterns[index] = pattern;
              onLoaded();
            });
          } else {
            enlivenedPatterns[index] = p;
            onLoaded();
          }
        });
      },
      groupSVGElements: function(elements, options, path) {
        var object;
        if (elements && elements.length === 1) {
          if (typeof path !== "undefined") {
            elements[0].sourcePath = path;
          }
          return elements[0];
        }
        if (options) {
          if (options.width && options.height) {
            options.centerPoint = {
              x: options.width / 2,
              y: options.height / 2
            };
          } else {
            delete options.width;
            delete options.height;
          }
        }
        object = new fabric2.Group(elements, options);
        if (typeof path !== "undefined") {
          object.sourcePath = path;
        }
        return object;
      },
      populateWithProperties: function(source, destination, properties) {
        if (properties && Array.isArray(properties)) {
          for (var i = 0, len = properties.length; i < len; i++) {
            if (properties[i] in source) {
              destination[properties[i]] = source[properties[i]];
            }
          }
        }
      },
      createCanvasElement: function() {
        return fabric2.document.createElement("canvas");
      },
      copyCanvasElement: function(canvas2) {
        var newCanvas = fabric2.util.createCanvasElement();
        newCanvas.width = canvas2.width;
        newCanvas.height = canvas2.height;
        newCanvas.getContext("2d").drawImage(canvas2, 0, 0);
        return newCanvas;
      },
      toDataURL: function(canvasEl, format, quality) {
        return canvasEl.toDataURL("image/" + format, quality);
      },
      createImage: function() {
        return fabric2.document.createElement("img");
      },
      multiplyTransformMatrices: function(a, b, is2x2) {
        return [
          a[0] * b[0] + a[2] * b[1],
          a[1] * b[0] + a[3] * b[1],
          a[0] * b[2] + a[2] * b[3],
          a[1] * b[2] + a[3] * b[3],
          is2x2 ? 0 : a[0] * b[4] + a[2] * b[5] + a[4],
          is2x2 ? 0 : a[1] * b[4] + a[3] * b[5] + a[5]
        ];
      },
      qrDecompose: function(a) {
        var angle = atan2(a[1], a[0]), denom = pow(a[0], 2) + pow(a[1], 2), scaleX = sqrt(denom), scaleY = (a[0] * a[3] - a[2] * a[1]) / scaleX, skewX = atan2(a[0] * a[2] + a[1] * a[3], denom);
        return {
          angle: angle / PiBy180,
          scaleX,
          scaleY,
          skewX: skewX / PiBy180,
          skewY: 0,
          translateX: a[4],
          translateY: a[5]
        };
      },
      calcRotateMatrix: function(options) {
        if (!options.angle) {
          return fabric2.iMatrix.concat();
        }
        var theta = fabric2.util.degreesToRadians(options.angle), cos = fabric2.util.cos(theta), sin = fabric2.util.sin(theta);
        return [cos, sin, -sin, cos, 0, 0];
      },
      calcDimensionsMatrix: function(options) {
        var scaleX = typeof options.scaleX === "undefined" ? 1 : options.scaleX, scaleY = typeof options.scaleY === "undefined" ? 1 : options.scaleY, scaleMatrix = [
          options.flipX ? -scaleX : scaleX,
          0,
          0,
          options.flipY ? -scaleY : scaleY,
          0,
          0
        ], multiply = fabric2.util.multiplyTransformMatrices, degreesToRadians = fabric2.util.degreesToRadians;
        if (options.skewX) {
          scaleMatrix = multiply(
            scaleMatrix,
            [1, 0, Math.tan(degreesToRadians(options.skewX)), 1],
            true
          );
        }
        if (options.skewY) {
          scaleMatrix = multiply(
            scaleMatrix,
            [1, Math.tan(degreesToRadians(options.skewY)), 0, 1],
            true
          );
        }
        return scaleMatrix;
      },
      composeMatrix: function(options) {
        var matrix = [1, 0, 0, 1, options.translateX || 0, options.translateY || 0], multiply = fabric2.util.multiplyTransformMatrices;
        if (options.angle) {
          matrix = multiply(matrix, fabric2.util.calcRotateMatrix(options));
        }
        if (options.scaleX !== 1 || options.scaleY !== 1 || options.skewX || options.skewY || options.flipX || options.flipY) {
          matrix = multiply(matrix, fabric2.util.calcDimensionsMatrix(options));
        }
        return matrix;
      },
      resetObjectTransform: function(target) {
        target.scaleX = 1;
        target.scaleY = 1;
        target.skewX = 0;
        target.skewY = 0;
        target.flipX = false;
        target.flipY = false;
        target.rotate(0);
      },
      saveObjectTransform: function(target) {
        return {
          scaleX: target.scaleX,
          scaleY: target.scaleY,
          skewX: target.skewX,
          skewY: target.skewY,
          angle: target.angle,
          left: target.left,
          flipX: target.flipX,
          flipY: target.flipY,
          top: target.top
        };
      },
      isTransparent: function(ctx, x, y, tolerance) {
        if (tolerance > 0) {
          if (x > tolerance) {
            x -= tolerance;
          } else {
            x = 0;
          }
          if (y > tolerance) {
            y -= tolerance;
          } else {
            y = 0;
          }
        }
        var _isTransparent = true, i, temp, imageData = ctx.getImageData(x, y, tolerance * 2 || 1, tolerance * 2 || 1), l = imageData.data.length;
        for (i = 3; i < l; i += 4) {
          temp = imageData.data[i];
          _isTransparent = temp <= 0;
          if (_isTransparent === false) {
            break;
          }
        }
        imageData = null;
        return _isTransparent;
      },
      parsePreserveAspectRatioAttribute: function(attribute) {
        var meetOrSlice = "meet", alignX = "Mid", alignY = "Mid", aspectRatioAttrs = attribute.split(" "), align;
        if (aspectRatioAttrs && aspectRatioAttrs.length) {
          meetOrSlice = aspectRatioAttrs.pop();
          if (meetOrSlice !== "meet" && meetOrSlice !== "slice") {
            align = meetOrSlice;
            meetOrSlice = "meet";
          } else if (aspectRatioAttrs.length) {
            align = aspectRatioAttrs.pop();
          }
        }
        alignX = align !== "none" ? align.slice(1, 4) : "none";
        alignY = align !== "none" ? align.slice(5, 8) : "none";
        return {
          meetOrSlice,
          alignX,
          alignY
        };
      },
      clearFabricFontCache: function(fontFamily) {
        fontFamily = (fontFamily || "").toLowerCase();
        if (!fontFamily) {
          fabric2.charWidthsCache = {};
        } else if (fabric2.charWidthsCache[fontFamily]) {
          delete fabric2.charWidthsCache[fontFamily];
        }
      },
      limitDimsByArea: function(ar, maximumArea) {
        var roughWidth = Math.sqrt(maximumArea * ar), perfLimitSizeY = Math.floor(maximumArea / roughWidth);
        return { x: Math.floor(roughWidth), y: perfLimitSizeY };
      },
      capValue: function(min, value, max) {
        return Math.max(min, Math.min(value, max));
      },
      findScaleToFit: function(source, destination) {
        return Math.min(destination.width / source.width, destination.height / source.height);
      },
      findScaleToCover: function(source, destination) {
        return Math.max(destination.width / source.width, destination.height / source.height);
      },
      matrixToSVG: function(transform) {
        return "matrix(" + transform.map(function(value) {
          return fabric2.util.toFixed(value, fabric2.Object.NUM_FRACTION_DIGITS);
        }).join(" ") + ")";
      },
      removeTransformFromObject: function(object, transform) {
        var inverted = fabric2.util.invertTransform(transform), finalTransform = fabric2.util.multiplyTransformMatrices(inverted, object.calcOwnMatrix());
        fabric2.util.applyTransformToObject(object, finalTransform);
      },
      addTransformToObject: function(object, transform) {
        fabric2.util.applyTransformToObject(
          object,
          fabric2.util.multiplyTransformMatrices(transform, object.calcOwnMatrix())
        );
      },
      applyTransformToObject: function(object, transform) {
        var options = fabric2.util.qrDecompose(transform), center = new fabric2.Point(options.translateX, options.translateY);
        object.flipX = false;
        object.flipY = false;
        object.set("scaleX", options.scaleX);
        object.set("scaleY", options.scaleY);
        object.skewX = options.skewX;
        object.skewY = options.skewY;
        object.angle = options.angle;
        object.setPositionByOrigin(center, "center", "center");
      },
      sizeAfterTransform: function(width, height, options) {
        var dimX = width / 2, dimY = height / 2, points = [
          {
            x: -dimX,
            y: -dimY
          },
          {
            x: dimX,
            y: -dimY
          },
          {
            x: -dimX,
            y: dimY
          },
          {
            x: dimX,
            y: dimY
          }
        ], transformMatrix = fabric2.util.calcDimensionsMatrix(options), bbox = fabric2.util.makeBoundingBoxFromPoints(points, transformMatrix);
        return {
          x: bbox.width,
          y: bbox.height
        };
      },
      mergeClipPaths: function(c1, c2) {
        var a = c1, b = c2;
        if (a.inverted && !b.inverted) {
          a = c2;
          b = c1;
        }
        fabric2.util.applyTransformToObject(
          b,
          fabric2.util.multiplyTransformMatrices(
            fabric2.util.invertTransform(a.calcTransformMatrix()),
            b.calcTransformMatrix()
          )
        );
        var inverted = a.inverted && b.inverted;
        if (inverted) {
          a.inverted = b.inverted = false;
        }
        return new fabric2.Group([a], { clipPath: b, inverted });
      },
      hasStyleChanged: function(prevStyle, thisStyle, forTextSpans) {
        forTextSpans = forTextSpans || false;
        return prevStyle.fill !== thisStyle.fill || prevStyle.stroke !== thisStyle.stroke || prevStyle.strokeWidth !== thisStyle.strokeWidth || prevStyle.fontSize !== thisStyle.fontSize || prevStyle.fontFamily !== thisStyle.fontFamily || prevStyle.fontWeight !== thisStyle.fontWeight || prevStyle.fontStyle !== thisStyle.fontStyle || prevStyle.textBackgroundColor !== thisStyle.textBackgroundColor || prevStyle.deltaY !== thisStyle.deltaY || forTextSpans && (prevStyle.overline !== thisStyle.overline || prevStyle.underline !== thisStyle.underline || prevStyle.linethrough !== thisStyle.linethrough);
      },
      stylesToArray: function(styles, text) {
        var styles = fabric2.util.object.clone(styles, true), textLines = text.split("\n"), charIndex = -1, prevStyle = {}, stylesArray = [];
        for (var i = 0; i < textLines.length; i++) {
          if (!styles[i]) {
            charIndex += textLines[i].length;
            continue;
          }
          for (var c = 0; c < textLines[i].length; c++) {
            charIndex++;
            var thisStyle = styles[i][c];
            if (thisStyle && Object.keys(thisStyle).length > 0) {
              var styleChanged = fabric2.util.hasStyleChanged(prevStyle, thisStyle, true);
              if (styleChanged) {
                stylesArray.push({
                  start: charIndex,
                  end: charIndex + 1,
                  style: thisStyle
                });
              } else {
                stylesArray[stylesArray.length - 1].end++;
              }
            }
            prevStyle = thisStyle || {};
          }
        }
        return stylesArray;
      },
      stylesFromArray: function(styles, text) {
        if (!Array.isArray(styles)) {
          return styles;
        }
        var textLines = text.split("\n"), charIndex = -1, styleIndex = 0, stylesObject = {};
        for (var i = 0; i < textLines.length; i++) {
          for (var c = 0; c < textLines[i].length; c++) {
            charIndex++;
            if (styles[styleIndex] && styles[styleIndex].start <= charIndex && charIndex < styles[styleIndex].end) {
              stylesObject[i] = stylesObject[i] || {};
              stylesObject[i][c] = Object.assign({}, styles[styleIndex].style);
              if (charIndex === styles[styleIndex].end - 1) {
                styleIndex++;
              }
            }
          }
        }
        return stylesObject;
      }
    };
  })(exports);
  (function() {
    var _join = Array.prototype.join, commandLengths = {
      m: 2,
      l: 2,
      h: 1,
      v: 1,
      c: 6,
      s: 4,
      q: 4,
      t: 2,
      a: 7
    }, repeatedCommands = {
      m: "l",
      M: "L"
    };
    function segmentToBezier(th2, th3, cosTh, sinTh, rx, ry, cx1, cy1, mT, fromX, fromY) {
      var costh2 = fabric2.util.cos(th2), sinth2 = fabric2.util.sin(th2), costh3 = fabric2.util.cos(th3), sinth3 = fabric2.util.sin(th3), toX = cosTh * rx * costh3 - sinTh * ry * sinth3 + cx1, toY = sinTh * rx * costh3 + cosTh * ry * sinth3 + cy1, cp1X = fromX + mT * (-cosTh * rx * sinth2 - sinTh * ry * costh2), cp1Y = fromY + mT * (-sinTh * rx * sinth2 + cosTh * ry * costh2), cp2X = toX + mT * (cosTh * rx * sinth3 + sinTh * ry * costh3), cp2Y = toY + mT * (sinTh * rx * sinth3 - cosTh * ry * costh3);
      return [
        "C",
        cp1X,
        cp1Y,
        cp2X,
        cp2Y,
        toX,
        toY
      ];
    }
    function arcToSegments(toX, toY, rx, ry, large, sweep, rotateX) {
      var PI = Math.PI, th = rotateX * PI / 180, sinTh = fabric2.util.sin(th), cosTh = fabric2.util.cos(th), fromX = 0, fromY = 0;
      rx = Math.abs(rx);
      ry = Math.abs(ry);
      var px = -cosTh * toX * 0.5 - sinTh * toY * 0.5, py = -cosTh * toY * 0.5 + sinTh * toX * 0.5, rx2 = rx * rx, ry2 = ry * ry, py2 = py * py, px2 = px * px, pl = rx2 * ry2 - rx2 * py2 - ry2 * px2, root = 0;
      if (pl < 0) {
        var s = Math.sqrt(1 - pl / (rx2 * ry2));
        rx *= s;
        ry *= s;
      } else {
        root = (large === sweep ? -1 : 1) * Math.sqrt(pl / (rx2 * py2 + ry2 * px2));
      }
      var cx = root * rx * py / ry, cy = -root * ry * px / rx, cx1 = cosTh * cx - sinTh * cy + toX * 0.5, cy1 = sinTh * cx + cosTh * cy + toY * 0.5, mTheta = calcVectorAngle(1, 0, (px - cx) / rx, (py - cy) / ry), dtheta = calcVectorAngle((px - cx) / rx, (py - cy) / ry, (-px - cx) / rx, (-py - cy) / ry);
      if (sweep === 0 && dtheta > 0) {
        dtheta -= 2 * PI;
      } else if (sweep === 1 && dtheta < 0) {
        dtheta += 2 * PI;
      }
      var segments2 = Math.ceil(Math.abs(dtheta / PI * 2)), result = [], mDelta = dtheta / segments2, mT = 8 / 3 * Math.sin(mDelta / 4) * Math.sin(mDelta / 4) / Math.sin(mDelta / 2), th3 = mTheta + mDelta;
      for (var i = 0; i < segments2; i++) {
        result[i] = segmentToBezier(mTheta, th3, cosTh, sinTh, rx, ry, cx1, cy1, mT, fromX, fromY);
        fromX = result[i][5];
        fromY = result[i][6];
        mTheta = th3;
        th3 += mDelta;
      }
      return result;
    }
    function calcVectorAngle(ux, uy, vx, vy) {
      var ta = Math.atan2(uy, ux), tb = Math.atan2(vy, vx);
      if (tb >= ta) {
        return tb - ta;
      } else {
        return 2 * Math.PI - (ta - tb);
      }
    }
    function getBoundsOfCurve(x0, y0, x1, y1, x2, y2, x3, y3) {
      var argsString;
      if (fabric2.cachesBoundsOfCurve) {
        argsString = _join.call(arguments);
        if (fabric2.boundsOfCurveCache[argsString]) {
          return fabric2.boundsOfCurveCache[argsString];
        }
      }
      var sqrt = Math.sqrt, min = Math.min, max = Math.max, abs = Math.abs, tvalues = [], bounds = [[], []], a, b, c, t, t1, t2, b2ac, sqrtb2ac;
      b = 6 * x0 - 12 * x1 + 6 * x2;
      a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
      c = 3 * x1 - 3 * x0;
      for (var i = 0; i < 2; ++i) {
        if (i > 0) {
          b = 6 * y0 - 12 * y1 + 6 * y2;
          a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
          c = 3 * y1 - 3 * y0;
        }
        if (abs(a) < 1e-12) {
          if (abs(b) < 1e-12) {
            continue;
          }
          t = -c / b;
          if (0 < t && t < 1) {
            tvalues.push(t);
          }
          continue;
        }
        b2ac = b * b - 4 * c * a;
        if (b2ac < 0) {
          continue;
        }
        sqrtb2ac = sqrt(b2ac);
        t1 = (-b + sqrtb2ac) / (2 * a);
        if (0 < t1 && t1 < 1) {
          tvalues.push(t1);
        }
        t2 = (-b - sqrtb2ac) / (2 * a);
        if (0 < t2 && t2 < 1) {
          tvalues.push(t2);
        }
      }
      var x, y, j = tvalues.length, jlen = j, mt;
      while (j--) {
        t = tvalues[j];
        mt = 1 - t;
        x = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
        bounds[0][j] = x;
        y = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
        bounds[1][j] = y;
      }
      bounds[0][jlen] = x0;
      bounds[1][jlen] = y0;
      bounds[0][jlen + 1] = x3;
      bounds[1][jlen + 1] = y3;
      var result = [
        {
          x: min.apply(null, bounds[0]),
          y: min.apply(null, bounds[1])
        },
        {
          x: max.apply(null, bounds[0]),
          y: max.apply(null, bounds[1])
        }
      ];
      if (fabric2.cachesBoundsOfCurve) {
        fabric2.boundsOfCurveCache[argsString] = result;
      }
      return result;
    }
    function fromArcToBeziers(fx, fy, coords) {
      var rx = coords[1], ry = coords[2], rot = coords[3], large = coords[4], sweep = coords[5], tx = coords[6], ty = coords[7], segsNorm = arcToSegments(tx - fx, ty - fy, rx, ry, large, sweep, rot);
      for (var i = 0, len = segsNorm.length; i < len; i++) {
        segsNorm[i][1] += fx;
        segsNorm[i][2] += fy;
        segsNorm[i][3] += fx;
        segsNorm[i][4] += fy;
        segsNorm[i][5] += fx;
        segsNorm[i][6] += fy;
      }
      return segsNorm;
    }
    function makePathSimpler(path) {
      var x = 0, y = 0, len = path.length, x1 = 0, y1 = 0, current, i, converted, destinationPath = [], previous, controlX, controlY;
      for (i = 0; i < len; ++i) {
        converted = false;
        current = path[i].slice(0);
        switch (current[0]) {
          case "l":
            current[0] = "L";
            current[1] += x;
            current[2] += y;
          case "L":
            x = current[1];
            y = current[2];
            break;
          case "h":
            current[1] += x;
          case "H":
            current[0] = "L";
            current[2] = y;
            x = current[1];
            break;
          case "v":
            current[1] += y;
          case "V":
            current[0] = "L";
            y = current[1];
            current[1] = x;
            current[2] = y;
            break;
          case "m":
            current[0] = "M";
            current[1] += x;
            current[2] += y;
          case "M":
            x = current[1];
            y = current[2];
            x1 = current[1];
            y1 = current[2];
            break;
          case "c":
            current[0] = "C";
            current[1] += x;
            current[2] += y;
            current[3] += x;
            current[4] += y;
            current[5] += x;
            current[6] += y;
          case "C":
            controlX = current[3];
            controlY = current[4];
            x = current[5];
            y = current[6];
            break;
          case "s":
            current[0] = "S";
            current[1] += x;
            current[2] += y;
            current[3] += x;
            current[4] += y;
          case "S":
            if (previous === "C") {
              controlX = 2 * x - controlX;
              controlY = 2 * y - controlY;
            } else {
              controlX = x;
              controlY = y;
            }
            x = current[3];
            y = current[4];
            current[0] = "C";
            current[5] = current[3];
            current[6] = current[4];
            current[3] = current[1];
            current[4] = current[2];
            current[1] = controlX;
            current[2] = controlY;
            controlX = current[3];
            controlY = current[4];
            break;
          case "q":
            current[0] = "Q";
            current[1] += x;
            current[2] += y;
            current[3] += x;
            current[4] += y;
          case "Q":
            controlX = current[1];
            controlY = current[2];
            x = current[3];
            y = current[4];
            break;
          case "t":
            current[0] = "T";
            current[1] += x;
            current[2] += y;
          case "T":
            if (previous === "Q") {
              controlX = 2 * x - controlX;
              controlY = 2 * y - controlY;
            } else {
              controlX = x;
              controlY = y;
            }
            current[0] = "Q";
            x = current[1];
            y = current[2];
            current[1] = controlX;
            current[2] = controlY;
            current[3] = x;
            current[4] = y;
            break;
          case "a":
            current[0] = "A";
            current[6] += x;
            current[7] += y;
          case "A":
            converted = true;
            destinationPath = destinationPath.concat(fromArcToBeziers(x, y, current));
            x = current[6];
            y = current[7];
            break;
          case "z":
          case "Z":
            x = x1;
            y = y1;
            break;
        }
        if (!converted) {
          destinationPath.push(current);
        }
        previous = current[0];
      }
      return destinationPath;
    }
    function calcLineLength(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
    function CB1(t) {
      return t * t * t;
    }
    function CB2(t) {
      return 3 * t * t * (1 - t);
    }
    function CB3(t) {
      return 3 * t * (1 - t) * (1 - t);
    }
    function CB4(t) {
      return (1 - t) * (1 - t) * (1 - t);
    }
    function getPointOnCubicBezierIterator(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
      return function(pct) {
        var c1 = CB1(pct), c2 = CB2(pct), c3 = CB3(pct), c4 = CB4(pct);
        return {
          x: p4x * c1 + p3x * c2 + p2x * c3 + p1x * c4,
          y: p4y * c1 + p3y * c2 + p2y * c3 + p1y * c4
        };
      };
    }
    function getTangentCubicIterator(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
      return function(pct) {
        var invT = 1 - pct, tangentX = 3 * invT * invT * (p2x - p1x) + 6 * invT * pct * (p3x - p2x) + 3 * pct * pct * (p4x - p3x), tangentY = 3 * invT * invT * (p2y - p1y) + 6 * invT * pct * (p3y - p2y) + 3 * pct * pct * (p4y - p3y);
        return Math.atan2(tangentY, tangentX);
      };
    }
    function QB1(t) {
      return t * t;
    }
    function QB2(t) {
      return 2 * t * (1 - t);
    }
    function QB3(t) {
      return (1 - t) * (1 - t);
    }
    function getPointOnQuadraticBezierIterator(p1x, p1y, p2x, p2y, p3x, p3y) {
      return function(pct) {
        var c1 = QB1(pct), c2 = QB2(pct), c3 = QB3(pct);
        return {
          x: p3x * c1 + p2x * c2 + p1x * c3,
          y: p3y * c1 + p2y * c2 + p1y * c3
        };
      };
    }
    function getTangentQuadraticIterator(p1x, p1y, p2x, p2y, p3x, p3y) {
      return function(pct) {
        var invT = 1 - pct, tangentX = 2 * invT * (p2x - p1x) + 2 * pct * (p3x - p2x), tangentY = 2 * invT * (p2y - p1y) + 2 * pct * (p3y - p2y);
        return Math.atan2(tangentY, tangentX);
      };
    }
    function pathIterator(iterator, x1, y1) {
      var tempP = { x: x1, y: y1 }, p, tmpLen = 0, perc;
      for (perc = 1; perc <= 100; perc += 1) {
        p = iterator(perc / 100);
        tmpLen += calcLineLength(tempP.x, tempP.y, p.x, p.y);
        tempP = p;
      }
      return tmpLen;
    }
    function findPercentageForDistance(segInfo, distance) {
      var perc = 0, tmpLen = 0, iterator = segInfo.iterator, tempP = { x: segInfo.x, y: segInfo.y }, p, nextLen, nextStep = 0.01, angleFinder = segInfo.angleFinder, lastPerc;
      while (tmpLen < distance && nextStep > 1e-4) {
        p = iterator(perc);
        lastPerc = perc;
        nextLen = calcLineLength(tempP.x, tempP.y, p.x, p.y);
        if (nextLen + tmpLen > distance) {
          perc -= nextStep;
          nextStep /= 2;
        } else {
          tempP = p;
          perc += nextStep;
          tmpLen += nextLen;
        }
      }
      p.angle = angleFinder(lastPerc);
      return p;
    }
    function getPathSegmentsInfo(path) {
      var totalLength = 0, len = path.length, current, x1 = 0, y1 = 0, x2 = 0, y2 = 0, info = [], iterator, tempInfo, angleFinder;
      for (var i = 0; i < len; i++) {
        current = path[i];
        tempInfo = {
          x: x1,
          y: y1,
          command: current[0]
        };
        switch (current[0]) {
          case "M":
            tempInfo.length = 0;
            x2 = x1 = current[1];
            y2 = y1 = current[2];
            break;
          case "L":
            tempInfo.length = calcLineLength(x1, y1, current[1], current[2]);
            x1 = current[1];
            y1 = current[2];
            break;
          case "C":
            iterator = getPointOnCubicBezierIterator(
              x1,
              y1,
              current[1],
              current[2],
              current[3],
              current[4],
              current[5],
              current[6]
            );
            angleFinder = getTangentCubicIterator(
              x1,
              y1,
              current[1],
              current[2],
              current[3],
              current[4],
              current[5],
              current[6]
            );
            tempInfo.iterator = iterator;
            tempInfo.angleFinder = angleFinder;
            tempInfo.length = pathIterator(iterator, x1, y1);
            x1 = current[5];
            y1 = current[6];
            break;
          case "Q":
            iterator = getPointOnQuadraticBezierIterator(
              x1,
              y1,
              current[1],
              current[2],
              current[3],
              current[4]
            );
            angleFinder = getTangentQuadraticIterator(
              x1,
              y1,
              current[1],
              current[2],
              current[3],
              current[4]
            );
            tempInfo.iterator = iterator;
            tempInfo.angleFinder = angleFinder;
            tempInfo.length = pathIterator(iterator, x1, y1);
            x1 = current[3];
            y1 = current[4];
            break;
          case "Z":
          case "z":
            tempInfo.destX = x2;
            tempInfo.destY = y2;
            tempInfo.length = calcLineLength(x1, y1, x2, y2);
            x1 = x2;
            y1 = y2;
            break;
        }
        totalLength += tempInfo.length;
        info.push(tempInfo);
      }
      info.push({ length: totalLength, x: x1, y: y1 });
      return info;
    }
    function getPointOnPath(path, distance, infos) {
      if (!infos) {
        infos = getPathSegmentsInfo(path);
      }
      var i = 0;
      while (distance - infos[i].length > 0 && i < infos.length - 2) {
        distance -= infos[i].length;
        i++;
      }
      var segInfo = infos[i], segPercent = distance / segInfo.length, command = segInfo.command, segment = path[i], info;
      switch (command) {
        case "M":
          return { x: segInfo.x, y: segInfo.y, angle: 0 };
        case "Z":
        case "z":
          info = new fabric2.Point(segInfo.x, segInfo.y).lerp(
            new fabric2.Point(segInfo.destX, segInfo.destY),
            segPercent
          );
          info.angle = Math.atan2(segInfo.destY - segInfo.y, segInfo.destX - segInfo.x);
          return info;
        case "L":
          info = new fabric2.Point(segInfo.x, segInfo.y).lerp(
            new fabric2.Point(segment[1], segment[2]),
            segPercent
          );
          info.angle = Math.atan2(segment[2] - segInfo.y, segment[1] - segInfo.x);
          return info;
        case "C":
          return findPercentageForDistance(segInfo, distance);
        case "Q":
          return findPercentageForDistance(segInfo, distance);
      }
    }
    function parsePath(pathString) {
      var result = [], coords = [], currentPath, parsed, re = fabric2.rePathCommand, rNumber = "[-+]?(?:\\d*\\.\\d+|\\d+\\.?)(?:[eE][-+]?\\d+)?\\s*", rNumberCommaWsp = "(" + rNumber + ")" + fabric2.commaWsp, rFlagCommaWsp = "([01])" + fabric2.commaWsp + "?", rArcSeq = rNumberCommaWsp + "?" + rNumberCommaWsp + "?" + rNumberCommaWsp + rFlagCommaWsp + rFlagCommaWsp + rNumberCommaWsp + "?(" + rNumber + ")", regArcArgumentSequence = new RegExp(rArcSeq, "g"), match, coordsStr, path;
      if (!pathString || !pathString.match) {
        return result;
      }
      path = pathString.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi);
      for (var i = 0, coordsParsed, len = path.length; i < len; i++) {
        currentPath = path[i];
        coordsStr = currentPath.slice(1).trim();
        coords.length = 0;
        var command = currentPath.charAt(0);
        coordsParsed = [command];
        if (command.toLowerCase() === "a") {
          for (var args; args = regArcArgumentSequence.exec(coordsStr); ) {
            for (var j = 1; j < args.length; j++) {
              coords.push(args[j]);
            }
          }
        } else {
          while (match = re.exec(coordsStr)) {
            coords.push(match[0]);
          }
        }
        for (var j = 0, jlen = coords.length; j < jlen; j++) {
          parsed = parseFloat(coords[j]);
          if (!isNaN(parsed)) {
            coordsParsed.push(parsed);
          }
        }
        var commandLength = commandLengths[command.toLowerCase()], repeatedCommand = repeatedCommands[command] || command;
        if (coordsParsed.length - 1 > commandLength) {
          for (var k = 1, klen = coordsParsed.length; k < klen; k += commandLength) {
            result.push([command].concat(coordsParsed.slice(k, k + commandLength)));
            command = repeatedCommand;
          }
        } else {
          result.push(coordsParsed);
        }
      }
      return result;
    }
    function getSmoothPathFromPoints(points, correction) {
      var path = [], i, p1 = new fabric2.Point(points[0].x, points[0].y), p2 = new fabric2.Point(points[1].x, points[1].y), len = points.length, multSignX = 1, multSignY = 0, manyPoints = len > 2;
      correction = correction || 0;
      if (manyPoints) {
        multSignX = points[2].x < p2.x ? -1 : points[2].x === p2.x ? 0 : 1;
        multSignY = points[2].y < p2.y ? -1 : points[2].y === p2.y ? 0 : 1;
      }
      path.push(["M", p1.x - multSignX * correction, p1.y - multSignY * correction]);
      for (i = 1; i < len; i++) {
        if (!p1.eq(p2)) {
          var midPoint = p1.midPointFrom(p2);
          path.push(["Q", p1.x, p1.y, midPoint.x, midPoint.y]);
        }
        p1 = points[i];
        if (i + 1 < points.length) {
          p2 = points[i + 1];
        }
      }
      if (manyPoints) {
        multSignX = p1.x > points[i - 2].x ? 1 : p1.x === points[i - 2].x ? 0 : -1;
        multSignY = p1.y > points[i - 2].y ? 1 : p1.y === points[i - 2].y ? 0 : -1;
      }
      path.push(["L", p1.x + multSignX * correction, p1.y + multSignY * correction]);
      return path;
    }
    function transformPath(path, transform, pathOffset) {
      if (pathOffset) {
        transform = fabric2.util.multiplyTransformMatrices(
          transform,
          [1, 0, 0, 1, -pathOffset.x, -pathOffset.y]
        );
      }
      return path.map(function(pathSegment) {
        var newSegment = pathSegment.slice(0), point = {};
        for (var i = 1; i < pathSegment.length - 1; i += 2) {
          point.x = pathSegment[i];
          point.y = pathSegment[i + 1];
          point = fabric2.util.transformPoint(point, transform);
          newSegment[i] = point.x;
          newSegment[i + 1] = point.y;
        }
        return newSegment;
      });
    }
    fabric2.util.joinPath = function(pathData) {
      return pathData.map(function(segment) {
        return segment.join(" ");
      }).join(" ");
    };
    fabric2.util.parsePath = parsePath;
    fabric2.util.makePathSimpler = makePathSimpler;
    fabric2.util.getSmoothPathFromPoints = getSmoothPathFromPoints;
    fabric2.util.getPathSegmentsInfo = getPathSegmentsInfo;
    fabric2.util.getBoundsOfCurve = getBoundsOfCurve;
    fabric2.util.getPointOnPath = getPointOnPath;
    fabric2.util.transformPath = transformPath;
  })();
  (function() {
    var slice = Array.prototype.slice;
    function invoke(array, method) {
      var args = slice.call(arguments, 2), result = [];
      for (var i = 0, len = array.length; i < len; i++) {
        result[i] = args.length ? array[i][method].apply(array[i], args) : array[i][method].call(array[i]);
      }
      return result;
    }
    function max(array, byProperty) {
      return find(array, byProperty, function(value1, value2) {
        return value1 >= value2;
      });
    }
    function min(array, byProperty) {
      return find(array, byProperty, function(value1, value2) {
        return value1 < value2;
      });
    }
    function fill(array, value) {
      var k = array.length;
      while (k--) {
        array[k] = value;
      }
      return array;
    }
    function find(array, byProperty, condition) {
      if (!array || array.length === 0) {
        return;
      }
      var i = array.length - 1, result = byProperty ? array[i][byProperty] : array[i];
      if (byProperty) {
        while (i--) {
          if (condition(array[i][byProperty], result)) {
            result = array[i][byProperty];
          }
        }
      } else {
        while (i--) {
          if (condition(array[i], result)) {
            result = array[i];
          }
        }
      }
      return result;
    }
    fabric2.util.array = {
      fill,
      invoke,
      min,
      max
    };
  })();
  (function() {
    function extend(destination, source, deep) {
      if (deep) {
        if (!fabric2.isLikelyNode && source instanceof Element) {
          destination = source;
        } else if (source instanceof Array) {
          destination = [];
          for (var i = 0, len = source.length; i < len; i++) {
            destination[i] = extend({}, source[i], deep);
          }
        } else if (source && typeof source === "object") {
          for (var property in source) {
            if (property === "canvas" || property === "group") {
              destination[property] = null;
            } else if (source.hasOwnProperty(property)) {
              destination[property] = extend({}, source[property], deep);
            }
          }
        } else {
          destination = source;
        }
      } else {
        for (var property in source) {
          destination[property] = source[property];
        }
      }
      return destination;
    }
    function clone(object, deep) {
      return extend({}, object, deep);
    }
    fabric2.util.object = {
      extend,
      clone
    };
    fabric2.util.object.extend(fabric2.util, fabric2.Observable);
  })();
  (function() {
    function camelize(string) {
      return string.replace(/-+(.)?/g, function(match, character) {
        return character ? character.toUpperCase() : "";
      });
    }
    function capitalize(string, firstLetterOnly) {
      return string.charAt(0).toUpperCase() + (firstLetterOnly ? string.slice(1) : string.slice(1).toLowerCase());
    }
    function escapeXml(string) {
      return string.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function graphemeSplit(textstring) {
      var i = 0, chr, graphemes = [];
      for (i = 0, chr; i < textstring.length; i++) {
        if ((chr = getWholeChar(textstring, i)) === false) {
          continue;
        }
        graphemes.push(chr);
      }
      return graphemes;
    }
    function getWholeChar(str, i) {
      var code = str.charCodeAt(i);
      if (isNaN(code)) {
        return "";
      }
      if (code < 55296 || code > 57343) {
        return str.charAt(i);
      }
      if (55296 <= code && code <= 56319) {
        if (str.length <= i + 1) {
          throw "High surrogate without following low surrogate";
        }
        var next = str.charCodeAt(i + 1);
        if (56320 > next || next > 57343) {
          throw "High surrogate without following low surrogate";
        }
        return str.charAt(i) + str.charAt(i + 1);
      }
      if (i === 0) {
        throw "Low surrogate without preceding high surrogate";
      }
      var prev = str.charCodeAt(i - 1);
      if (55296 > prev || prev > 56319) {
        throw "Low surrogate without preceding high surrogate";
      }
      return false;
    }
    fabric2.util.string = {
      camelize,
      capitalize,
      escapeXml,
      graphemeSplit
    };
  })();
  (function() {
    var slice = Array.prototype.slice, emptyFunction = function() {
    }, IS_DONTENUM_BUGGY = function() {
      for (var p in { toString: 1 }) {
        if (p === "toString") {
          return false;
        }
      }
      return true;
    }(), addMethods = function(klass, source, parent) {
      for (var property in source) {
        if (property in klass.prototype && typeof klass.prototype[property] === "function" && (source[property] + "").indexOf("callSuper") > -1) {
          klass.prototype[property] = function(property2) {
            return function() {
              var superclass = this.constructor.superclass;
              this.constructor.superclass = parent;
              var returnValue = source[property2].apply(this, arguments);
              this.constructor.superclass = superclass;
              if (property2 !== "initialize") {
                return returnValue;
              }
            };
          }(property);
        } else {
          klass.prototype[property] = source[property];
        }
        if (IS_DONTENUM_BUGGY) {
          if (source.toString !== Object.prototype.toString) {
            klass.prototype.toString = source.toString;
          }
          if (source.valueOf !== Object.prototype.valueOf) {
            klass.prototype.valueOf = source.valueOf;
          }
        }
      }
    };
    function Subclass() {
    }
    function callSuper(methodName) {
      var parentMethod = null, _this = this;
      while (_this.constructor.superclass) {
        var superClassMethod = _this.constructor.superclass.prototype[methodName];
        if (_this[methodName] !== superClassMethod) {
          parentMethod = superClassMethod;
          break;
        }
        _this = _this.constructor.superclass.prototype;
      }
      if (!parentMethod) {
        return console.log("tried to callSuper " + methodName + ", method not found in prototype chain", this);
      }
      return arguments.length > 1 ? parentMethod.apply(this, slice.call(arguments, 1)) : parentMethod.call(this);
    }
    function createClass() {
      var parent = null, properties = slice.call(arguments, 0);
      if (typeof properties[0] === "function") {
        parent = properties.shift();
      }
      function klass() {
        this.initialize.apply(this, arguments);
      }
      klass.superclass = parent;
      klass.subclasses = [];
      if (parent) {
        Subclass.prototype = parent.prototype;
        klass.prototype = new Subclass();
        parent.subclasses.push(klass);
      }
      for (var i = 0, length = properties.length; i < length; i++) {
        addMethods(klass, properties[i], parent);
      }
      if (!klass.prototype.initialize) {
        klass.prototype.initialize = emptyFunction;
      }
      klass.prototype.constructor = klass;
      klass.prototype.callSuper = callSuper;
      return klass;
    }
    fabric2.util.createClass = createClass;
  })();
  (function() {
    var couldUseAttachEvent = !!fabric2.document.createElement("div").attachEvent, touchEvents = ["touchstart", "touchmove", "touchend"];
    fabric2.util.addListener = function(element, eventName, handler, options) {
      element && element.addEventListener(eventName, handler, couldUseAttachEvent ? false : options);
    };
    fabric2.util.removeListener = function(element, eventName, handler, options) {
      element && element.removeEventListener(eventName, handler, couldUseAttachEvent ? false : options);
    };
    function getTouchInfo(event) {
      var touchProp = event.changedTouches;
      if (touchProp && touchProp[0]) {
        return touchProp[0];
      }
      return event;
    }
    fabric2.util.getPointer = function(event) {
      var element = event.target, scroll = fabric2.util.getScrollLeftTop(element), _evt = getTouchInfo(event);
      return {
        x: _evt.clientX + scroll.left,
        y: _evt.clientY + scroll.top
      };
    };
    fabric2.util.isTouchEvent = function(event) {
      return touchEvents.indexOf(event.type) > -1 || event.pointerType === "touch";
    };
  })();
  (function() {
    function setStyle(element, styles) {
      var elementStyle = element.style;
      if (!elementStyle) {
        return element;
      }
      if (typeof styles === "string") {
        element.style.cssText += ";" + styles;
        return styles.indexOf("opacity") > -1 ? setOpacity(element, styles.match(/opacity:\s*(\d?\.?\d*)/)[1]) : element;
      }
      for (var property in styles) {
        if (property === "opacity") {
          setOpacity(element, styles[property]);
        } else {
          var normalizedProperty = property === "float" || property === "cssFloat" ? typeof elementStyle.styleFloat === "undefined" ? "cssFloat" : "styleFloat" : property;
          elementStyle.setProperty(normalizedProperty, styles[property]);
        }
      }
      return element;
    }
    var parseEl = fabric2.document.createElement("div"), supportsOpacity = typeof parseEl.style.opacity === "string", supportsFilters = typeof parseEl.style.filter === "string", reOpacity = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/, setOpacity = function(element) {
      return element;
    };
    if (supportsOpacity) {
      setOpacity = function(element, value) {
        element.style.opacity = value;
        return element;
      };
    } else if (supportsFilters) {
      setOpacity = function(element, value) {
        var es = element.style;
        if (element.currentStyle && !element.currentStyle.hasLayout) {
          es.zoom = 1;
        }
        if (reOpacity.test(es.filter)) {
          value = value >= 0.9999 ? "" : "alpha(opacity=" + value * 100 + ")";
          es.filter = es.filter.replace(reOpacity, value);
        } else {
          es.filter += " alpha(opacity=" + value * 100 + ")";
        }
        return element;
      };
    }
    fabric2.util.setStyle = setStyle;
  })();
  (function() {
    var _slice = Array.prototype.slice;
    function getById(id) {
      return typeof id === "string" ? fabric2.document.getElementById(id) : id;
    }
    var sliceCanConvertNodelists, toArray = function(arrayLike) {
      return _slice.call(arrayLike, 0);
    };
    try {
      sliceCanConvertNodelists = toArray(fabric2.document.childNodes) instanceof Array;
    } catch (err) {
    }
    if (!sliceCanConvertNodelists) {
      toArray = function(arrayLike) {
        var arr = new Array(arrayLike.length), i = arrayLike.length;
        while (i--) {
          arr[i] = arrayLike[i];
        }
        return arr;
      };
    }
    function makeElement(tagName, attributes) {
      var el = fabric2.document.createElement(tagName);
      for (var prop in attributes) {
        if (prop === "class") {
          el.className = attributes[prop];
        } else if (prop === "for") {
          el.htmlFor = attributes[prop];
        } else {
          el.setAttribute(prop, attributes[prop]);
        }
      }
      return el;
    }
    function addClass(element, className) {
      if (element && (" " + element.className + " ").indexOf(" " + className + " ") === -1) {
        element.className += (element.className ? " " : "") + className;
      }
    }
    function wrapElement(element, wrapper, attributes) {
      if (typeof wrapper === "string") {
        wrapper = makeElement(wrapper, attributes);
      }
      if (element.parentNode) {
        element.parentNode.replaceChild(wrapper, element);
      }
      wrapper.appendChild(element);
      return wrapper;
    }
    function getScrollLeftTop(element) {
      var left = 0, top = 0, docElement = fabric2.document.documentElement, body = fabric2.document.body || {
        scrollLeft: 0,
        scrollTop: 0
      };
      while (element && (element.parentNode || element.host)) {
        element = element.parentNode || element.host;
        if (element === fabric2.document) {
          left = body.scrollLeft || docElement.scrollLeft || 0;
          top = body.scrollTop || docElement.scrollTop || 0;
        } else {
          left += element.scrollLeft || 0;
          top += element.scrollTop || 0;
        }
        if (element.nodeType === 1 && element.style.position === "fixed") {
          break;
        }
      }
      return { left, top };
    }
    function getElementOffset(element) {
      var docElem, doc = element && element.ownerDocument, box = { left: 0, top: 0 }, offset = { left: 0, top: 0 }, scrollLeftTop, offsetAttributes = {
        borderLeftWidth: "left",
        borderTopWidth: "top",
        paddingLeft: "left",
        paddingTop: "top"
      };
      if (!doc) {
        return offset;
      }
      for (var attr in offsetAttributes) {
        offset[offsetAttributes[attr]] += parseInt(getElementStyle(element, attr), 10) || 0;
      }
      docElem = doc.documentElement;
      if (typeof element.getBoundingClientRect !== "undefined") {
        box = element.getBoundingClientRect();
      }
      scrollLeftTop = getScrollLeftTop(element);
      return {
        left: box.left + scrollLeftTop.left - (docElem.clientLeft || 0) + offset.left,
        top: box.top + scrollLeftTop.top - (docElem.clientTop || 0) + offset.top
      };
    }
    var getElementStyle;
    if (fabric2.document.defaultView && fabric2.document.defaultView.getComputedStyle) {
      getElementStyle = function(element, attr) {
        var style = fabric2.document.defaultView.getComputedStyle(element, null);
        return style ? style[attr] : void 0;
      };
    } else {
      getElementStyle = function(element, attr) {
        var value = element.style[attr];
        if (!value && element.currentStyle) {
          value = element.currentStyle[attr];
        }
        return value;
      };
    }
    (function() {
      var style = fabric2.document.documentElement.style, selectProp = "userSelect" in style ? "userSelect" : "MozUserSelect" in style ? "MozUserSelect" : "WebkitUserSelect" in style ? "WebkitUserSelect" : "KhtmlUserSelect" in style ? "KhtmlUserSelect" : "";
      function makeElementUnselectable(element) {
        if (typeof element.onselectstart !== "undefined") {
          element.onselectstart = fabric2.util.falseFunction;
        }
        if (selectProp) {
          element.style[selectProp] = "none";
        } else if (typeof element.unselectable === "string") {
          element.unselectable = "on";
        }
        return element;
      }
      function makeElementSelectable(element) {
        if (typeof element.onselectstart !== "undefined") {
          element.onselectstart = null;
        }
        if (selectProp) {
          element.style[selectProp] = "";
        } else if (typeof element.unselectable === "string") {
          element.unselectable = "";
        }
        return element;
      }
      fabric2.util.makeElementUnselectable = makeElementUnselectable;
      fabric2.util.makeElementSelectable = makeElementSelectable;
    })();
    function getNodeCanvas(element) {
      var impl = fabric2.jsdomImplForWrapper(element);
      return impl._canvas || impl._image;
    }
    function cleanUpJsdomNode(element) {
      if (!fabric2.isLikelyNode) {
        return;
      }
      var impl = fabric2.jsdomImplForWrapper(element);
      if (impl) {
        impl._image = null;
        impl._canvas = null;
        impl._currentSrc = null;
        impl._attributes = null;
        impl._classList = null;
      }
    }
    function setImageSmoothing(ctx, value) {
      ctx.imageSmoothingEnabled = ctx.imageSmoothingEnabled || ctx.webkitImageSmoothingEnabled || ctx.mozImageSmoothingEnabled || ctx.msImageSmoothingEnabled || ctx.oImageSmoothingEnabled;
      ctx.imageSmoothingEnabled = value;
    }
    fabric2.util.setImageSmoothing = setImageSmoothing;
    fabric2.util.getById = getById;
    fabric2.util.toArray = toArray;
    fabric2.util.addClass = addClass;
    fabric2.util.makeElement = makeElement;
    fabric2.util.wrapElement = wrapElement;
    fabric2.util.getScrollLeftTop = getScrollLeftTop;
    fabric2.util.getElementOffset = getElementOffset;
    fabric2.util.getNodeCanvas = getNodeCanvas;
    fabric2.util.cleanUpJsdomNode = cleanUpJsdomNode;
  })();
  (function() {
    function addParamToUrl(url, param) {
      return url + (/\?/.test(url) ? "&" : "?") + param;
    }
    function emptyFn() {
    }
    function request(url, options) {
      options || (options = {});
      var method = options.method ? options.method.toUpperCase() : "GET", onComplete = options.onComplete || function() {
      }, xhr = new fabric2.window.XMLHttpRequest(), body = options.body || options.parameters;
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          onComplete(xhr);
          xhr.onreadystatechange = emptyFn;
        }
      };
      if (method === "GET") {
        body = null;
        if (typeof options.parameters === "string") {
          url = addParamToUrl(url, options.parameters);
        }
      }
      xhr.open(method, url, true);
      if (method === "POST" || method === "PUT") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      }
      xhr.send(body);
      return xhr;
    }
    fabric2.util.request = request;
  })();
  fabric2.log = console.log;
  fabric2.warn = console.warn;
  (function() {
    var extend = fabric2.util.object.extend, clone = fabric2.util.object.clone;
    var RUNNING_ANIMATIONS = [];
    fabric2.util.object.extend(RUNNING_ANIMATIONS, {
      cancelAll: function() {
        var animations = this.splice(0);
        animations.forEach(function(animation) {
          animation.cancel();
        });
        return animations;
      },
      cancelByCanvas: function(canvas2) {
        if (!canvas2) {
          return [];
        }
        var cancelled = this.filter(function(animation) {
          return typeof animation.target === "object" && animation.target.canvas === canvas2;
        });
        cancelled.forEach(function(animation) {
          animation.cancel();
        });
        return cancelled;
      },
      cancelByTarget: function(target) {
        var cancelled = this.findAnimationsByTarget(target);
        cancelled.forEach(function(animation) {
          animation.cancel();
        });
        return cancelled;
      },
      findAnimationIndex: function(cancelFunc) {
        return this.indexOf(this.findAnimation(cancelFunc));
      },
      findAnimation: function(cancelFunc) {
        return this.find(function(animation) {
          return animation.cancel === cancelFunc;
        });
      },
      findAnimationsByTarget: function(target) {
        if (!target) {
          return [];
        }
        return this.filter(function(animation) {
          return animation.target === target;
        });
      }
    });
    function noop() {
      return false;
    }
    function defaultEasing(t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }
    function animate(options) {
      options || (options = {});
      var cancel = false, context, removeFromRegistry = function() {
        var index = fabric2.runningAnimations.indexOf(context);
        return index > -1 && fabric2.runningAnimations.splice(index, 1)[0];
      };
      context = extend(clone(options), {
        cancel: function() {
          cancel = true;
          return removeFromRegistry();
        },
        currentValue: "startValue" in options ? options.startValue : 0,
        completionRate: 0,
        durationRate: 0
      });
      fabric2.runningAnimations.push(context);
      requestAnimFrame(function(timestamp) {
        var start = timestamp || +new Date(), duration = options.duration || 500, finish = start + duration, time, onChange = options.onChange || noop, abort = options.abort || noop, onComplete = options.onComplete || noop, easing = options.easing || defaultEasing, isMany = "startValue" in options ? options.startValue.length > 0 : false, startValue = "startValue" in options ? options.startValue : 0, endValue = "endValue" in options ? options.endValue : 100, byValue = options.byValue || (isMany ? startValue.map(function(value, i) {
          return endValue[i] - startValue[i];
        }) : endValue - startValue);
        options.onStart && options.onStart();
        (function tick(ticktime) {
          time = ticktime || +new Date();
          var currentTime = time > finish ? duration : time - start, timePerc = currentTime / duration, current = isMany ? startValue.map(function(_value, i) {
            return easing(currentTime, startValue[i], byValue[i], duration);
          }) : easing(currentTime, startValue, byValue, duration), valuePerc = isMany ? Math.abs((current[0] - startValue[0]) / byValue[0]) : Math.abs((current - startValue) / byValue);
          context.currentValue = isMany ? current.slice() : current;
          context.completionRate = valuePerc;
          context.durationRate = timePerc;
          if (cancel) {
            return;
          }
          if (abort(current, valuePerc, timePerc)) {
            removeFromRegistry();
            return;
          }
          if (time > finish) {
            context.currentValue = isMany ? endValue.slice() : endValue;
            context.completionRate = 1;
            context.durationRate = 1;
            onChange(isMany ? endValue.slice() : endValue, 1, 1);
            onComplete(endValue, 1, 1);
            removeFromRegistry();
            return;
          } else {
            onChange(current, valuePerc, timePerc);
            requestAnimFrame(tick);
          }
        })(start);
      });
      return context.cancel;
    }
    var _requestAnimFrame = fabric2.window.requestAnimationFrame || fabric2.window.webkitRequestAnimationFrame || fabric2.window.mozRequestAnimationFrame || fabric2.window.oRequestAnimationFrame || fabric2.window.msRequestAnimationFrame || function(callback) {
      return fabric2.window.setTimeout(callback, 1e3 / 60);
    };
    var _cancelAnimFrame = fabric2.window.cancelAnimationFrame || fabric2.window.clearTimeout;
    function requestAnimFrame() {
      return _requestAnimFrame.apply(fabric2.window, arguments);
    }
    function cancelAnimFrame() {
      return _cancelAnimFrame.apply(fabric2.window, arguments);
    }
    fabric2.util.animate = animate;
    fabric2.util.requestAnimFrame = requestAnimFrame;
    fabric2.util.cancelAnimFrame = cancelAnimFrame;
    fabric2.runningAnimations = RUNNING_ANIMATIONS;
  })();
  (function() {
    function calculateColor(begin, end, pos) {
      var color = "rgba(" + parseInt(begin[0] + pos * (end[0] - begin[0]), 10) + "," + parseInt(begin[1] + pos * (end[1] - begin[1]), 10) + "," + parseInt(begin[2] + pos * (end[2] - begin[2]), 10);
      color += "," + (begin && end ? parseFloat(begin[3] + pos * (end[3] - begin[3])) : 1);
      color += ")";
      return color;
    }
    function animateColor(fromColor, toColor, duration, options) {
      var startColor = new fabric2.Color(fromColor).getSource(), endColor = new fabric2.Color(toColor).getSource(), originalOnComplete = options.onComplete, originalOnChange = options.onChange;
      options = options || {};
      return fabric2.util.animate(fabric2.util.object.extend(options, {
        duration: duration || 500,
        startValue: startColor,
        endValue: endColor,
        byValue: endColor,
        easing: function(currentTime, startValue, byValue, duration2) {
          var posValue = options.colorEasing ? options.colorEasing(currentTime, duration2) : 1 - Math.cos(currentTime / duration2 * (Math.PI / 2));
          return calculateColor(startValue, byValue, posValue);
        },
        onComplete: function(current, valuePerc, timePerc) {
          if (originalOnComplete) {
            return originalOnComplete(
              calculateColor(endColor, endColor, 0),
              valuePerc,
              timePerc
            );
          }
        },
        onChange: function(current, valuePerc, timePerc) {
          if (originalOnChange) {
            if (Array.isArray(current)) {
              return originalOnChange(
                calculateColor(current, current, 0),
                valuePerc,
                timePerc
              );
            }
            originalOnChange(current, valuePerc, timePerc);
          }
        }
      }));
    }
    fabric2.util.animateColor = animateColor;
  })();
  (function() {
    function normalize(a, c, p, s) {
      if (a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        if (c === 0 && a === 0) {
          s = p / (2 * Math.PI) * Math.asin(1);
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
      }
      return { a, c, p, s };
    }
    function elastic(opts, t, d) {
      return opts.a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - opts.s) * (2 * Math.PI) / opts.p);
    }
    function easeOutCubic(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    }
    function easeInOutCubic(t, b, c, d) {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t * t + b;
      }
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
    function easeInQuart(t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    }
    function easeOutQuart(t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }
    function easeInOutQuart(t, b, c, d) {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t * t * t + b;
      }
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
    function easeInQuint(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    }
    function easeOutQuint(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    }
    function easeInOutQuint(t, b, c, d) {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t * t * t * t + b;
      }
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
    function easeInSine(t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }
    function easeOutSine(t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }
    function easeInOutSine(t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
    function easeInExpo(t, b, c, d) {
      return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    }
    function easeOutExpo(t, b, c, d) {
      return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }
    function easeInOutExpo(t, b, c, d) {
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      t /= d / 2;
      if (t < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      }
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
    function easeInCirc(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    }
    function easeOutCirc(t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }
    function easeInOutCirc(t, b, c, d) {
      t /= d / 2;
      if (t < 1) {
        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      }
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
    function easeInElastic(t, b, c, d) {
      var s = 1.70158, p = 0, a = c;
      if (t === 0) {
        return b;
      }
      t /= d;
      if (t === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      var opts = normalize(a, c, p, s);
      return -elastic(opts, t, d) + b;
    }
    function easeOutElastic(t, b, c, d) {
      var s = 1.70158, p = 0, a = c;
      if (t === 0) {
        return b;
      }
      t /= d;
      if (t === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      var opts = normalize(a, c, p, s);
      return opts.a * Math.pow(2, -10 * t) * Math.sin((t * d - opts.s) * (2 * Math.PI) / opts.p) + opts.c + b;
    }
    function easeInOutElastic(t, b, c, d) {
      var s = 1.70158, p = 0, a = c;
      if (t === 0) {
        return b;
      }
      t /= d / 2;
      if (t === 2) {
        return b + c;
      }
      if (!p) {
        p = d * (0.3 * 1.5);
      }
      var opts = normalize(a, c, p, s);
      if (t < 1) {
        return -0.5 * elastic(opts, t, d) + b;
      }
      return opts.a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - opts.s) * (2 * Math.PI) / opts.p) * 0.5 + opts.c + b;
    }
    function easeInBack(t, b, c, d, s) {
      if (s === void 0) {
        s = 1.70158;
      }
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
    function easeOutBack(t, b, c, d, s) {
      if (s === void 0) {
        s = 1.70158;
      }
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
    function easeInOutBack(t, b, c, d, s) {
      if (s === void 0) {
        s = 1.70158;
      }
      t /= d / 2;
      if (t < 1) {
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
      }
      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    }
    function easeInBounce(t, b, c, d) {
      return c - easeOutBounce(d - t, 0, c, d) + b;
    }
    function easeOutBounce(t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      }
    }
    function easeInOutBounce(t, b, c, d) {
      if (t < d / 2) {
        return easeInBounce(t * 2, 0, c, d) * 0.5 + b;
      }
      return easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
    fabric2.util.ease = {
      easeInQuad: function(t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      easeOutQuad: function(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      easeInOutQuad: function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
          return c / 2 * t * t + b;
        }
        return -c / 2 * (--t * (t - 2) - 1) + b;
      },
      easeInCubic: function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
      },
      easeOutCubic,
      easeInOutCubic,
      easeInQuart,
      easeOutQuart,
      easeInOutQuart,
      easeInQuint,
      easeOutQuint,
      easeInOutQuint,
      easeInSine,
      easeOutSine,
      easeInOutSine,
      easeInExpo,
      easeOutExpo,
      easeInOutExpo,
      easeInCirc,
      easeOutCirc,
      easeInOutCirc,
      easeInElastic,
      easeOutElastic,
      easeInOutElastic,
      easeInBack,
      easeOutBack,
      easeInOutBack,
      easeInBounce,
      easeOutBounce,
      easeInOutBounce
    };
  })();
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), extend = fabric3.util.object.extend, clone = fabric3.util.object.clone, toFixed = fabric3.util.toFixed, parseUnit = fabric3.util.parseUnit, multiplyTransformMatrices = fabric3.util.multiplyTransformMatrices, svgValidTagNames = [
      "path",
      "circle",
      "polygon",
      "polyline",
      "ellipse",
      "rect",
      "line",
      "image",
      "text"
    ], svgViewBoxElements = ["symbol", "image", "marker", "pattern", "view", "svg"], svgInvalidAncestors = ["pattern", "defs", "symbol", "metadata", "clipPath", "mask", "desc"], svgValidParents = ["symbol", "g", "a", "svg", "clipPath", "defs"], attributesMap = {
      cx: "left",
      x: "left",
      r: "radius",
      cy: "top",
      y: "top",
      display: "visible",
      visibility: "visible",
      transform: "transformMatrix",
      "fill-opacity": "fillOpacity",
      "fill-rule": "fillRule",
      "font-family": "fontFamily",
      "font-size": "fontSize",
      "font-style": "fontStyle",
      "font-weight": "fontWeight",
      "letter-spacing": "charSpacing",
      "paint-order": "paintFirst",
      "stroke-dasharray": "strokeDashArray",
      "stroke-dashoffset": "strokeDashOffset",
      "stroke-linecap": "strokeLineCap",
      "stroke-linejoin": "strokeLineJoin",
      "stroke-miterlimit": "strokeMiterLimit",
      "stroke-opacity": "strokeOpacity",
      "stroke-width": "strokeWidth",
      "text-decoration": "textDecoration",
      "text-anchor": "textAnchor",
      opacity: "opacity",
      "clip-path": "clipPath",
      "clip-rule": "clipRule",
      "vector-effect": "strokeUniform",
      "image-rendering": "imageSmoothing"
    }, colorAttributes = {
      stroke: "strokeOpacity",
      fill: "fillOpacity"
    }, fSize = "font-size", cPath = "clip-path";
    fabric3.svgValidTagNamesRegEx = getSvgRegex(svgValidTagNames);
    fabric3.svgViewBoxElementsRegEx = getSvgRegex(svgViewBoxElements);
    fabric3.svgInvalidAncestorsRegEx = getSvgRegex(svgInvalidAncestors);
    fabric3.svgValidParentsRegEx = getSvgRegex(svgValidParents);
    fabric3.cssRules = {};
    fabric3.gradientDefs = {};
    fabric3.clipPaths = {};
    function normalizeAttr(attr) {
      if (attr in attributesMap) {
        return attributesMap[attr];
      }
      return attr;
    }
    function normalizeValue(attr, value, parentAttributes, fontSize) {
      var isArray = Array.isArray(value), parsed;
      if ((attr === "fill" || attr === "stroke") && value === "none") {
        value = "";
      } else if (attr === "strokeUniform") {
        return value === "non-scaling-stroke";
      } else if (attr === "strokeDashArray") {
        if (value === "none") {
          value = null;
        } else {
          value = value.replace(/,/g, " ").split(/\s+/).map(parseFloat);
        }
      } else if (attr === "transformMatrix") {
        if (parentAttributes && parentAttributes.transformMatrix) {
          value = multiplyTransformMatrices(
            parentAttributes.transformMatrix,
            fabric3.parseTransformAttribute(value)
          );
        } else {
          value = fabric3.parseTransformAttribute(value);
        }
      } else if (attr === "visible") {
        value = value !== "none" && value !== "hidden";
        if (parentAttributes && parentAttributes.visible === false) {
          value = false;
        }
      } else if (attr === "opacity") {
        value = parseFloat(value);
        if (parentAttributes && typeof parentAttributes.opacity !== "undefined") {
          value *= parentAttributes.opacity;
        }
      } else if (attr === "textAnchor") {
        value = value === "start" ? "left" : value === "end" ? "right" : "center";
      } else if (attr === "charSpacing") {
        parsed = parseUnit(value, fontSize) / fontSize * 1e3;
      } else if (attr === "paintFirst") {
        var fillIndex = value.indexOf("fill");
        var strokeIndex = value.indexOf("stroke");
        var value = "fill";
        if (fillIndex > -1 && strokeIndex > -1 && strokeIndex < fillIndex) {
          value = "stroke";
        } else if (fillIndex === -1 && strokeIndex > -1) {
          value = "stroke";
        }
      } else if (attr === "href" || attr === "xlink:href" || attr === "font") {
        return value;
      } else if (attr === "imageSmoothing") {
        return value === "optimizeQuality";
      } else {
        parsed = isArray ? value.map(parseUnit) : parseUnit(value, fontSize);
      }
      return !isArray && isNaN(parsed) ? value : parsed;
    }
    function getSvgRegex(arr) {
      return new RegExp("^(" + arr.join("|") + ")\\b", "i");
    }
    function _setStrokeFillOpacity(attributes) {
      for (var attr in colorAttributes) {
        if (typeof attributes[colorAttributes[attr]] === "undefined" || attributes[attr] === "") {
          continue;
        }
        if (typeof attributes[attr] === "undefined") {
          if (!fabric3.Object.prototype[attr]) {
            continue;
          }
          attributes[attr] = fabric3.Object.prototype[attr];
        }
        if (attributes[attr].indexOf("url(") === 0) {
          continue;
        }
        var color = new fabric3.Color(attributes[attr]);
        attributes[attr] = color.setAlpha(toFixed(color.getAlpha() * attributes[colorAttributes[attr]], 2)).toRgba();
      }
      return attributes;
    }
    function _getMultipleNodes(doc, nodeNames) {
      var nodeName, nodeArray = [], nodeList, i, len;
      for (i = 0, len = nodeNames.length; i < len; i++) {
        nodeName = nodeNames[i];
        nodeList = doc.getElementsByTagName(nodeName);
        nodeArray = nodeArray.concat(Array.prototype.slice.call(nodeList));
      }
      return nodeArray;
    }
    fabric3.parseTransformAttribute = function() {
      function rotateMatrix(matrix2, args) {
        var cos = fabric3.util.cos(args[0]), sin = fabric3.util.sin(args[0]), x = 0, y = 0;
        if (args.length === 3) {
          x = args[1];
          y = args[2];
        }
        matrix2[0] = cos;
        matrix2[1] = sin;
        matrix2[2] = -sin;
        matrix2[3] = cos;
        matrix2[4] = x - (cos * x - sin * y);
        matrix2[5] = y - (sin * x + cos * y);
      }
      function scaleMatrix(matrix2, args) {
        var multiplierX = args[0], multiplierY = args.length === 2 ? args[1] : args[0];
        matrix2[0] = multiplierX;
        matrix2[3] = multiplierY;
      }
      function skewMatrix(matrix2, args, pos) {
        matrix2[pos] = Math.tan(fabric3.util.degreesToRadians(args[0]));
      }
      function translateMatrix(matrix2, args) {
        matrix2[4] = args[0];
        if (args.length === 2) {
          matrix2[5] = args[1];
        }
      }
      var iMatrix = fabric3.iMatrix, number = fabric3.reNum, commaWsp = fabric3.commaWsp, skewX = "(?:(skewX)\\s*\\(\\s*(" + number + ")\\s*\\))", skewY = "(?:(skewY)\\s*\\(\\s*(" + number + ")\\s*\\))", rotate = "(?:(rotate)\\s*\\(\\s*(" + number + ")(?:" + commaWsp + "(" + number + ")" + commaWsp + "(" + number + "))?\\s*\\))", scale = "(?:(scale)\\s*\\(\\s*(" + number + ")(?:" + commaWsp + "(" + number + "))?\\s*\\))", translate = "(?:(translate)\\s*\\(\\s*(" + number + ")(?:" + commaWsp + "(" + number + "))?\\s*\\))", matrix = "(?:(matrix)\\s*\\(\\s*(" + number + ")" + commaWsp + "(" + number + ")" + commaWsp + "(" + number + ")" + commaWsp + "(" + number + ")" + commaWsp + "(" + number + ")" + commaWsp + "(" + number + ")\\s*\\))", transform = "(?:" + matrix + "|" + translate + "|" + scale + "|" + rotate + "|" + skewX + "|" + skewY + ")", transforms = "(?:" + transform + "(?:" + commaWsp + "*" + transform + ")*)", transformList = "^\\s*(?:" + transforms + "?)\\s*$", reTransformList = new RegExp(transformList), reTransform = new RegExp(transform, "g");
      return function(attributeValue) {
        var matrix2 = iMatrix.concat(), matrices = [];
        if (!attributeValue || attributeValue && !reTransformList.test(attributeValue)) {
          return matrix2;
        }
        attributeValue.replace(reTransform, function(match) {
          var m = new RegExp(transform).exec(match).filter(function(match2) {
            return !!match2;
          }), operation = m[1], args = m.slice(2).map(parseFloat);
          switch (operation) {
            case "translate":
              translateMatrix(matrix2, args);
              break;
            case "rotate":
              args[0] = fabric3.util.degreesToRadians(args[0]);
              rotateMatrix(matrix2, args);
              break;
            case "scale":
              scaleMatrix(matrix2, args);
              break;
            case "skewX":
              skewMatrix(matrix2, args, 2);
              break;
            case "skewY":
              skewMatrix(matrix2, args, 1);
              break;
            case "matrix":
              matrix2 = args;
              break;
          }
          matrices.push(matrix2.concat());
          matrix2 = iMatrix.concat();
        });
        var combinedMatrix = matrices[0];
        while (matrices.length > 1) {
          matrices.shift();
          combinedMatrix = fabric3.util.multiplyTransformMatrices(combinedMatrix, matrices[0]);
        }
        return combinedMatrix;
      };
    }();
    function parseStyleString(style, oStyle) {
      var attr, value;
      style.replace(/;\s*$/, "").split(";").forEach(function(chunk) {
        var pair = chunk.split(":");
        attr = pair[0].trim().toLowerCase();
        value = pair[1].trim();
        oStyle[attr] = value;
      });
    }
    function parseStyleObject(style, oStyle) {
      var attr, value;
      for (var prop in style) {
        if (typeof style[prop] === "undefined") {
          continue;
        }
        attr = prop.toLowerCase();
        value = style[prop];
        oStyle[attr] = value;
      }
    }
    function getGlobalStylesForElement(element, svgUid) {
      var styles = {};
      for (var rule in fabric3.cssRules[svgUid]) {
        if (elementMatchesRule(element, rule.split(" "))) {
          for (var property in fabric3.cssRules[svgUid][rule]) {
            styles[property] = fabric3.cssRules[svgUid][rule][property];
          }
        }
      }
      return styles;
    }
    function elementMatchesRule(element, selectors) {
      var firstMatching, parentMatching = true;
      firstMatching = selectorMatches(element, selectors.pop());
      if (firstMatching && selectors.length) {
        parentMatching = doesSomeParentMatch(element, selectors);
      }
      return firstMatching && parentMatching && selectors.length === 0;
    }
    function doesSomeParentMatch(element, selectors) {
      var selector, parentMatching = true;
      while (element.parentNode && element.parentNode.nodeType === 1 && selectors.length) {
        if (parentMatching) {
          selector = selectors.pop();
        }
        element = element.parentNode;
        parentMatching = selectorMatches(element, selector);
      }
      return selectors.length === 0;
    }
    function selectorMatches(element, selector) {
      var nodeName = element.nodeName, classNames = element.getAttribute("class"), id = element.getAttribute("id"), matcher, i;
      matcher = new RegExp("^" + nodeName, "i");
      selector = selector.replace(matcher, "");
      if (id && selector.length) {
        matcher = new RegExp("#" + id + "(?![a-zA-Z\\-]+)", "i");
        selector = selector.replace(matcher, "");
      }
      if (classNames && selector.length) {
        classNames = classNames.split(" ");
        for (i = classNames.length; i--; ) {
          matcher = new RegExp("\\." + classNames[i] + "(?![a-zA-Z\\-]+)", "i");
          selector = selector.replace(matcher, "");
        }
      }
      return selector.length === 0;
    }
    function elementById(doc, id) {
      var el;
      doc.getElementById && (el = doc.getElementById(id));
      if (el) {
        return el;
      }
      var node, i, len, nodelist = doc.getElementsByTagName("*");
      for (i = 0, len = nodelist.length; i < len; i++) {
        node = nodelist[i];
        if (id === node.getAttribute("id")) {
          return node;
        }
      }
    }
    function parseUseDirectives(doc) {
      var nodelist = _getMultipleNodes(doc, ["use", "svg:use"]), i = 0;
      while (nodelist.length && i < nodelist.length) {
        var el = nodelist[i], xlinkAttribute = el.getAttribute("xlink:href") || el.getAttribute("href");
        if (xlinkAttribute === null) {
          return;
        }
        var xlink = xlinkAttribute.slice(1), x = el.getAttribute("x") || 0, y = el.getAttribute("y") || 0, el2 = elementById(doc, xlink).cloneNode(true), currentTrans = (el2.getAttribute("transform") || "") + " translate(" + x + ", " + y + ")", parentNode, oldLength = nodelist.length, attr, j, attrs, len, namespace = fabric3.svgNS;
        applyViewboxTransform(el2);
        if (/^svg$/i.test(el2.nodeName)) {
          var el3 = el2.ownerDocument.createElementNS(namespace, "g");
          for (j = 0, attrs = el2.attributes, len = attrs.length; j < len; j++) {
            attr = attrs.item(j);
            el3.setAttributeNS(namespace, attr.nodeName, attr.nodeValue);
          }
          while (el2.firstChild) {
            el3.appendChild(el2.firstChild);
          }
          el2 = el3;
        }
        for (j = 0, attrs = el.attributes, len = attrs.length; j < len; j++) {
          attr = attrs.item(j);
          if (attr.nodeName === "x" || attr.nodeName === "y" || attr.nodeName === "xlink:href" || attr.nodeName === "href") {
            continue;
          }
          if (attr.nodeName === "transform") {
            currentTrans = attr.nodeValue + " " + currentTrans;
          } else {
            el2.setAttribute(attr.nodeName, attr.nodeValue);
          }
        }
        el2.setAttribute("transform", currentTrans);
        el2.setAttribute("instantiated_by_use", "1");
        el2.removeAttribute("id");
        parentNode = el.parentNode;
        parentNode.replaceChild(el2, el);
        if (nodelist.length === oldLength) {
          i++;
        }
      }
    }
    var reViewBoxAttrValue = new RegExp(
      "^\\s*(" + fabric3.reNum + "+)\\s*,?\\s*(" + fabric3.reNum + "+)\\s*,?\\s*(" + fabric3.reNum + "+)\\s*,?\\s*(" + fabric3.reNum + "+)\\s*$"
    );
    function applyViewboxTransform(element) {
      if (!fabric3.svgViewBoxElementsRegEx.test(element.nodeName)) {
        return {};
      }
      var viewBoxAttr = element.getAttribute("viewBox"), scaleX = 1, scaleY = 1, minX = 0, minY = 0, viewBoxWidth, viewBoxHeight, matrix, el, widthAttr = element.getAttribute("width"), heightAttr = element.getAttribute("height"), x = element.getAttribute("x") || 0, y = element.getAttribute("y") || 0, preserveAspectRatio = element.getAttribute("preserveAspectRatio") || "", missingViewBox = !viewBoxAttr || !(viewBoxAttr = viewBoxAttr.match(reViewBoxAttrValue)), missingDimAttr = !widthAttr || !heightAttr || widthAttr === "100%" || heightAttr === "100%", toBeParsed = missingViewBox && missingDimAttr, parsedDim = {}, translateMatrix = "", widthDiff = 0, heightDiff = 0;
      parsedDim.width = 0;
      parsedDim.height = 0;
      parsedDim.toBeParsed = toBeParsed;
      if (missingViewBox) {
        if ((x || y) && element.parentNode && element.parentNode.nodeName !== "#document") {
          translateMatrix = " translate(" + parseUnit(x) + " " + parseUnit(y) + ") ";
          matrix = (element.getAttribute("transform") || "") + translateMatrix;
          element.setAttribute("transform", matrix);
          element.removeAttribute("x");
          element.removeAttribute("y");
        }
      }
      if (toBeParsed) {
        return parsedDim;
      }
      if (missingViewBox) {
        parsedDim.width = parseUnit(widthAttr);
        parsedDim.height = parseUnit(heightAttr);
        return parsedDim;
      }
      minX = -parseFloat(viewBoxAttr[1]);
      minY = -parseFloat(viewBoxAttr[2]);
      viewBoxWidth = parseFloat(viewBoxAttr[3]);
      viewBoxHeight = parseFloat(viewBoxAttr[4]);
      parsedDim.minX = minX;
      parsedDim.minY = minY;
      parsedDim.viewBoxWidth = viewBoxWidth;
      parsedDim.viewBoxHeight = viewBoxHeight;
      if (!missingDimAttr) {
        parsedDim.width = parseUnit(widthAttr);
        parsedDim.height = parseUnit(heightAttr);
        scaleX = parsedDim.width / viewBoxWidth;
        scaleY = parsedDim.height / viewBoxHeight;
      } else {
        parsedDim.width = viewBoxWidth;
        parsedDim.height = viewBoxHeight;
      }
      preserveAspectRatio = fabric3.util.parsePreserveAspectRatioAttribute(preserveAspectRatio);
      if (preserveAspectRatio.alignX !== "none") {
        if (preserveAspectRatio.meetOrSlice === "meet") {
          scaleY = scaleX = scaleX > scaleY ? scaleY : scaleX;
        }
        if (preserveAspectRatio.meetOrSlice === "slice") {
          scaleY = scaleX = scaleX > scaleY ? scaleX : scaleY;
        }
        widthDiff = parsedDim.width - viewBoxWidth * scaleX;
        heightDiff = parsedDim.height - viewBoxHeight * scaleX;
        if (preserveAspectRatio.alignX === "Mid") {
          widthDiff /= 2;
        }
        if (preserveAspectRatio.alignY === "Mid") {
          heightDiff /= 2;
        }
        if (preserveAspectRatio.alignX === "Min") {
          widthDiff = 0;
        }
        if (preserveAspectRatio.alignY === "Min") {
          heightDiff = 0;
        }
      }
      if (scaleX === 1 && scaleY === 1 && minX === 0 && minY === 0 && x === 0 && y === 0) {
        return parsedDim;
      }
      if ((x || y) && element.parentNode.nodeName !== "#document") {
        translateMatrix = " translate(" + parseUnit(x) + " " + parseUnit(y) + ") ";
      }
      matrix = translateMatrix + " matrix(" + scaleX + " 0 0 " + scaleY + " " + (minX * scaleX + widthDiff) + " " + (minY * scaleY + heightDiff) + ") ";
      if (element.nodeName === "svg") {
        el = element.ownerDocument.createElementNS(fabric3.svgNS, "g");
        while (element.firstChild) {
          el.appendChild(element.firstChild);
        }
        element.appendChild(el);
      } else {
        el = element;
        el.removeAttribute("x");
        el.removeAttribute("y");
        matrix = el.getAttribute("transform") + matrix;
      }
      el.setAttribute("transform", matrix);
      return parsedDim;
    }
    function hasAncestorWithNodeName(element, nodeName) {
      while (element && (element = element.parentNode)) {
        if (element.nodeName && nodeName.test(element.nodeName.replace("svg:", "")) && !element.getAttribute("instantiated_by_use")) {
          return true;
        }
      }
      return false;
    }
    fabric3.parseSVGDocument = function(doc, callback, reviver, parsingOptions) {
      if (!doc) {
        return;
      }
      parseUseDirectives(doc);
      var svgUid = fabric3.Object.__uid++, i, len, options = applyViewboxTransform(doc), descendants = fabric3.util.toArray(doc.getElementsByTagName("*"));
      options.crossOrigin = parsingOptions && parsingOptions.crossOrigin;
      options.svgUid = svgUid;
      if (descendants.length === 0 && fabric3.isLikelyNode) {
        descendants = doc.selectNodes('//*[name(.)!="svg"]');
        var arr = [];
        for (i = 0, len = descendants.length; i < len; i++) {
          arr[i] = descendants[i];
        }
        descendants = arr;
      }
      var elements = descendants.filter(function(el) {
        applyViewboxTransform(el);
        return fabric3.svgValidTagNamesRegEx.test(el.nodeName.replace("svg:", "")) && !hasAncestorWithNodeName(el, fabric3.svgInvalidAncestorsRegEx);
      });
      if (!elements || elements && !elements.length) {
        callback && callback([], {});
        return;
      }
      var clipPaths = {};
      descendants.filter(function(el) {
        return el.nodeName.replace("svg:", "") === "clipPath";
      }).forEach(function(el) {
        var id = el.getAttribute("id");
        clipPaths[id] = fabric3.util.toArray(el.getElementsByTagName("*")).filter(function(el2) {
          return fabric3.svgValidTagNamesRegEx.test(el2.nodeName.replace("svg:", ""));
        });
      });
      fabric3.gradientDefs[svgUid] = fabric3.getGradientDefs(doc);
      fabric3.cssRules[svgUid] = fabric3.getCSSRules(doc);
      fabric3.clipPaths[svgUid] = clipPaths;
      fabric3.parseElements(elements, function(instances, elements2) {
        if (callback) {
          callback(instances, options, elements2, descendants);
          delete fabric3.gradientDefs[svgUid];
          delete fabric3.cssRules[svgUid];
          delete fabric3.clipPaths[svgUid];
        }
      }, clone(options), reviver, parsingOptions);
    };
    function recursivelyParseGradientsXlink(doc, gradient) {
      var gradientsAttrs = ["gradientTransform", "x1", "x2", "y1", "y2", "gradientUnits", "cx", "cy", "r", "fx", "fy"], xlinkAttr = "xlink:href", xLink = gradient.getAttribute(xlinkAttr).slice(1), referencedGradient = elementById(doc, xLink);
      if (referencedGradient && referencedGradient.getAttribute(xlinkAttr)) {
        recursivelyParseGradientsXlink(doc, referencedGradient);
      }
      gradientsAttrs.forEach(function(attr) {
        if (referencedGradient && !gradient.hasAttribute(attr) && referencedGradient.hasAttribute(attr)) {
          gradient.setAttribute(attr, referencedGradient.getAttribute(attr));
        }
      });
      if (!gradient.children.length) {
        var referenceClone = referencedGradient.cloneNode(true);
        while (referenceClone.firstChild) {
          gradient.appendChild(referenceClone.firstChild);
        }
      }
      gradient.removeAttribute(xlinkAttr);
    }
    var reFontDeclaration = new RegExp(
      "(normal|italic)?\\s*(normal|small-caps)?\\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*(" + fabric3.reNum + "(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|" + fabric3.reNum + "))?\\s+(.*)"
    );
    extend(fabric3, {
      parseFontDeclaration: function(value, oStyle) {
        var match = value.match(reFontDeclaration);
        if (!match) {
          return;
        }
        var fontStyle = match[1], fontWeight = match[3], fontSize = match[4], lineHeight = match[5], fontFamily = match[6];
        if (fontStyle) {
          oStyle.fontStyle = fontStyle;
        }
        if (fontWeight) {
          oStyle.fontWeight = isNaN(parseFloat(fontWeight)) ? fontWeight : parseFloat(fontWeight);
        }
        if (fontSize) {
          oStyle.fontSize = parseUnit(fontSize);
        }
        if (fontFamily) {
          oStyle.fontFamily = fontFamily;
        }
        if (lineHeight) {
          oStyle.lineHeight = lineHeight === "normal" ? 1 : lineHeight;
        }
      },
      getGradientDefs: function(doc) {
        var tagArray = [
          "linearGradient",
          "radialGradient",
          "svg:linearGradient",
          "svg:radialGradient"
        ], elList = _getMultipleNodes(doc, tagArray), el, j = 0, gradientDefs = {};
        j = elList.length;
        while (j--) {
          el = elList[j];
          if (el.getAttribute("xlink:href")) {
            recursivelyParseGradientsXlink(doc, el);
          }
          gradientDefs[el.getAttribute("id")] = el;
        }
        return gradientDefs;
      },
      parseAttributes: function(element, attributes, svgUid) {
        if (!element) {
          return;
        }
        var value, parentAttributes = {}, fontSize, parentFontSize;
        if (typeof svgUid === "undefined") {
          svgUid = element.getAttribute("svgUid");
        }
        if (element.parentNode && fabric3.svgValidParentsRegEx.test(element.parentNode.nodeName)) {
          parentAttributes = fabric3.parseAttributes(element.parentNode, attributes, svgUid);
        }
        var ownAttributes = attributes.reduce(function(memo, attr2) {
          value = element.getAttribute(attr2);
          if (value) {
            memo[attr2] = value;
          }
          return memo;
        }, {});
        var cssAttrs = extend(
          getGlobalStylesForElement(element, svgUid),
          fabric3.parseStyleAttribute(element)
        );
        ownAttributes = extend(
          ownAttributes,
          cssAttrs
        );
        if (cssAttrs[cPath]) {
          element.setAttribute(cPath, cssAttrs[cPath]);
        }
        fontSize = parentFontSize = parentAttributes.fontSize || fabric3.Text.DEFAULT_SVG_FONT_SIZE;
        if (ownAttributes[fSize]) {
          ownAttributes[fSize] = fontSize = parseUnit(ownAttributes[fSize], parentFontSize);
        }
        var normalizedAttr, normalizedValue, normalizedStyle = {};
        for (var attr in ownAttributes) {
          normalizedAttr = normalizeAttr(attr);
          normalizedValue = normalizeValue(normalizedAttr, ownAttributes[attr], parentAttributes, fontSize);
          normalizedStyle[normalizedAttr] = normalizedValue;
        }
        if (normalizedStyle && normalizedStyle.font) {
          fabric3.parseFontDeclaration(normalizedStyle.font, normalizedStyle);
        }
        var mergedAttrs = extend(parentAttributes, normalizedStyle);
        return fabric3.svgValidParentsRegEx.test(element.nodeName) ? mergedAttrs : _setStrokeFillOpacity(mergedAttrs);
      },
      parseElements: function(elements, callback, options, reviver, parsingOptions) {
        new fabric3.ElementsParser(elements, callback, options, reviver, parsingOptions).parse();
      },
      parseStyleAttribute: function(element) {
        var oStyle = {}, style = element.getAttribute("style");
        if (!style) {
          return oStyle;
        }
        if (typeof style === "string") {
          parseStyleString(style, oStyle);
        } else {
          parseStyleObject(style, oStyle);
        }
        return oStyle;
      },
      parsePointsAttribute: function(points) {
        if (!points) {
          return null;
        }
        points = points.replace(/,/g, " ").trim();
        points = points.split(/\s+/);
        var parsedPoints = [], i, len;
        for (i = 0, len = points.length; i < len; i += 2) {
          parsedPoints.push({
            x: parseFloat(points[i]),
            y: parseFloat(points[i + 1])
          });
        }
        return parsedPoints;
      },
      getCSSRules: function(doc) {
        var styles = doc.getElementsByTagName("style"), i, len, allRules = {}, rules;
        for (i = 0, len = styles.length; i < len; i++) {
          var styleContents = styles[i].textContent;
          styleContents = styleContents.replace(/\/\*[\s\S]*?\*\//g, "");
          if (styleContents.trim() === "") {
            continue;
          }
          rules = styleContents.split("}");
          rules = rules.filter(function(rule) {
            return rule.trim();
          });
          rules.forEach(function(rule) {
            var match = rule.split("{"), ruleObj = {}, declaration = match[1].trim(), propertyValuePairs = declaration.split(";").filter(function(pair2) {
              return pair2.trim();
            });
            for (i = 0, len = propertyValuePairs.length; i < len; i++) {
              var pair = propertyValuePairs[i].split(":"), property = pair[0].trim(), value = pair[1].trim();
              ruleObj[property] = value;
            }
            rule = match[0].trim();
            rule.split(",").forEach(function(_rule) {
              _rule = _rule.replace(/^svg/i, "").trim();
              if (_rule === "") {
                return;
              }
              if (allRules[_rule]) {
                fabric3.util.object.extend(allRules[_rule], ruleObj);
              } else {
                allRules[_rule] = fabric3.util.object.clone(ruleObj);
              }
            });
          });
        }
        return allRules;
      },
      loadSVGFromURL: function(url, callback, reviver, options) {
        url = url.replace(/^\n\s*/, "").trim();
        new fabric3.util.request(url, {
          method: "get",
          onComplete
        });
        function onComplete(r) {
          var xml = r.responseXML;
          if (!xml || !xml.documentElement) {
            callback && callback(null);
            return false;
          }
          fabric3.parseSVGDocument(xml.documentElement, function(results, _options, elements, allElements) {
            callback && callback(results, _options, elements, allElements);
          }, reviver, options);
        }
      },
      loadSVGFromString: function(string, callback, reviver, options) {
        var parser = new fabric3.window.DOMParser(), doc = parser.parseFromString(string.trim(), "text/xml");
        fabric3.parseSVGDocument(doc.documentElement, function(results, _options, elements, allElements) {
          callback(results, _options, elements, allElements);
        }, reviver, options);
      }
    });
  })(exports);
  fabric2.ElementsParser = function(elements, callback, options, reviver, parsingOptions, doc) {
    this.elements = elements;
    this.callback = callback;
    this.options = options;
    this.reviver = reviver;
    this.svgUid = options && options.svgUid || 0;
    this.parsingOptions = parsingOptions;
    this.regexUrl = /^url\(['"]?#([^'"]+)['"]?\)/g;
    this.doc = doc;
  };
  (function(proto) {
    proto.parse = function() {
      this.instances = new Array(this.elements.length);
      this.numElements = this.elements.length;
      this.createObjects();
    };
    proto.createObjects = function() {
      var _this = this;
      this.elements.forEach(function(element, i) {
        element.setAttribute("svgUid", _this.svgUid);
        _this.createObject(element, i);
      });
    };
    proto.findTag = function(el) {
      return fabric2[fabric2.util.string.capitalize(el.tagName.replace("svg:", ""))];
    };
    proto.createObject = function(el, index) {
      var klass = this.findTag(el);
      if (klass && klass.fromElement) {
        try {
          klass.fromElement(el, this.createCallback(index, el), this.options);
        } catch (err) {
          fabric2.log(err);
        }
      } else {
        this.checkIfDone();
      }
    };
    proto.createCallback = function(index, el) {
      var _this = this;
      return function(obj) {
        var _options;
        _this.resolveGradient(obj, el, "fill");
        _this.resolveGradient(obj, el, "stroke");
        if (obj instanceof fabric2.Image && obj._originalElement) {
          _options = obj.parsePreserveAspectRatioAttribute(el);
        }
        obj._removeTransformMatrix(_options);
        _this.resolveClipPath(obj, el);
        _this.reviver && _this.reviver(el, obj);
        _this.instances[index] = obj;
        _this.checkIfDone();
      };
    };
    proto.extractPropertyDefinition = function(obj, property, storage) {
      var value = obj[property], regex2 = this.regexUrl;
      if (!regex2.test(value)) {
        return;
      }
      regex2.lastIndex = 0;
      var id = regex2.exec(value)[1];
      regex2.lastIndex = 0;
      return fabric2[storage][this.svgUid][id];
    };
    proto.resolveGradient = function(obj, el, property) {
      var gradientDef = this.extractPropertyDefinition(obj, property, "gradientDefs");
      if (gradientDef) {
        var opacityAttr = el.getAttribute(property + "-opacity");
        var gradient = fabric2.Gradient.fromElement(gradientDef, obj, opacityAttr, this.options);
        obj.set(property, gradient);
      }
    };
    proto.createClipPathCallback = function(obj, container) {
      return function(_newObj) {
        _newObj._removeTransformMatrix();
        _newObj.fillRule = _newObj.clipRule;
        container.push(_newObj);
      };
    };
    proto.resolveClipPath = function(obj, usingElement) {
      var clipPath = this.extractPropertyDefinition(obj, "clipPath", "clipPaths"), element, klass, objTransformInv, container, gTransform, options;
      if (clipPath) {
        container = [];
        objTransformInv = fabric2.util.invertTransform(obj.calcTransformMatrix());
        var clipPathTag = clipPath[0].parentNode;
        var clipPathOwner = usingElement;
        while (clipPathOwner.parentNode && clipPathOwner.getAttribute("clip-path") !== obj.clipPath) {
          clipPathOwner = clipPathOwner.parentNode;
        }
        clipPathOwner.parentNode.appendChild(clipPathTag);
        for (var i = 0; i < clipPath.length; i++) {
          element = clipPath[i];
          klass = this.findTag(element);
          klass.fromElement(
            element,
            this.createClipPathCallback(obj, container),
            this.options
          );
        }
        if (container.length === 1) {
          clipPath = container[0];
        } else {
          clipPath = new fabric2.Group(container);
        }
        gTransform = fabric2.util.multiplyTransformMatrices(
          objTransformInv,
          clipPath.calcTransformMatrix()
        );
        if (clipPath.clipPath) {
          this.resolveClipPath(clipPath, clipPathOwner);
        }
        var options = fabric2.util.qrDecompose(gTransform);
        clipPath.flipX = false;
        clipPath.flipY = false;
        clipPath.set("scaleX", options.scaleX);
        clipPath.set("scaleY", options.scaleY);
        clipPath.angle = options.angle;
        clipPath.skewX = options.skewX;
        clipPath.skewY = 0;
        clipPath.setPositionByOrigin({ x: options.translateX, y: options.translateY }, "center", "center");
        obj.clipPath = clipPath;
      } else {
        delete obj.clipPath;
      }
    };
    proto.checkIfDone = function() {
      if (--this.numElements === 0) {
        this.instances = this.instances.filter(function(el) {
          return el != null;
        });
        this.callback(this.instances, this.elements);
      }
    };
  })(fabric2.ElementsParser.prototype);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {});
    if (fabric3.Point) {
      fabric3.warn("fabric.Point is already defined");
      return;
    }
    fabric3.Point = Point;
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }
    Point.prototype = {
      type: "point",
      constructor: Point,
      add: function(that) {
        return new Point(this.x + that.x, this.y + that.y);
      },
      addEquals: function(that) {
        this.x += that.x;
        this.y += that.y;
        return this;
      },
      scalarAdd: function(scalar) {
        return new Point(this.x + scalar, this.y + scalar);
      },
      scalarAddEquals: function(scalar) {
        this.x += scalar;
        this.y += scalar;
        return this;
      },
      subtract: function(that) {
        return new Point(this.x - that.x, this.y - that.y);
      },
      subtractEquals: function(that) {
        this.x -= that.x;
        this.y -= that.y;
        return this;
      },
      scalarSubtract: function(scalar) {
        return new Point(this.x - scalar, this.y - scalar);
      },
      scalarSubtractEquals: function(scalar) {
        this.x -= scalar;
        this.y -= scalar;
        return this;
      },
      multiply: function(scalar) {
        return new Point(this.x * scalar, this.y * scalar);
      },
      multiplyEquals: function(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
      },
      divide: function(scalar) {
        return new Point(this.x / scalar, this.y / scalar);
      },
      divideEquals: function(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
      },
      eq: function(that) {
        return this.x === that.x && this.y === that.y;
      },
      lt: function(that) {
        return this.x < that.x && this.y < that.y;
      },
      lte: function(that) {
        return this.x <= that.x && this.y <= that.y;
      },
      gt: function(that) {
        return this.x > that.x && this.y > that.y;
      },
      gte: function(that) {
        return this.x >= that.x && this.y >= that.y;
      },
      lerp: function(that, t) {
        if (typeof t === "undefined") {
          t = 0.5;
        }
        t = Math.max(Math.min(1, t), 0);
        return new Point(this.x + (that.x - this.x) * t, this.y + (that.y - this.y) * t);
      },
      distanceFrom: function(that) {
        var dx = this.x - that.x, dy = this.y - that.y;
        return Math.sqrt(dx * dx + dy * dy);
      },
      midPointFrom: function(that) {
        return this.lerp(that);
      },
      min: function(that) {
        return new Point(Math.min(this.x, that.x), Math.min(this.y, that.y));
      },
      max: function(that) {
        return new Point(Math.max(this.x, that.x), Math.max(this.y, that.y));
      },
      toString: function() {
        return this.x + "," + this.y;
      },
      setXY: function(x, y) {
        this.x = x;
        this.y = y;
        return this;
      },
      setX: function(x) {
        this.x = x;
        return this;
      },
      setY: function(y) {
        this.y = y;
        return this;
      },
      setFromPoint: function(that) {
        this.x = that.x;
        this.y = that.y;
        return this;
      },
      swap: function(that) {
        var x = this.x, y = this.y;
        this.x = that.x;
        this.y = that.y;
        that.x = x;
        that.y = y;
      },
      clone: function() {
        return new Point(this.x, this.y);
      }
    };
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {});
    if (fabric3.Intersection) {
      fabric3.warn("fabric.Intersection is already defined");
      return;
    }
    function Intersection(status) {
      this.status = status;
      this.points = [];
    }
    fabric3.Intersection = Intersection;
    fabric3.Intersection.prototype = {
      constructor: Intersection,
      appendPoint: function(point) {
        this.points.push(point);
        return this;
      },
      appendPoints: function(points) {
        this.points = this.points.concat(points);
        return this;
      }
    };
    fabric3.Intersection.intersectLineLine = function(a1, a2, b1, b2) {
      var result, uaT = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x), ubT = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x), uB = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
      if (uB !== 0) {
        var ua = uaT / uB, ub = ubT / uB;
        if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
          result = new Intersection("Intersection");
          result.appendPoint(new fabric3.Point(a1.x + ua * (a2.x - a1.x), a1.y + ua * (a2.y - a1.y)));
        } else {
          result = new Intersection();
        }
      } else {
        if (uaT === 0 || ubT === 0) {
          result = new Intersection("Coincident");
        } else {
          result = new Intersection("Parallel");
        }
      }
      return result;
    };
    fabric3.Intersection.intersectLinePolygon = function(a1, a2, points) {
      var result = new Intersection(), length = points.length, b1, b2, inter, i;
      for (i = 0; i < length; i++) {
        b1 = points[i];
        b2 = points[(i + 1) % length];
        inter = Intersection.intersectLineLine(a1, a2, b1, b2);
        result.appendPoints(inter.points);
      }
      if (result.points.length > 0) {
        result.status = "Intersection";
      }
      return result;
    };
    fabric3.Intersection.intersectPolygonPolygon = function(points1, points2) {
      var result = new Intersection(), length = points1.length, i;
      for (i = 0; i < length; i++) {
        var a1 = points1[i], a2 = points1[(i + 1) % length], inter = Intersection.intersectLinePolygon(a1, a2, points2);
        result.appendPoints(inter.points);
      }
      if (result.points.length > 0) {
        result.status = "Intersection";
      }
      return result;
    };
    fabric3.Intersection.intersectPolygonRectangle = function(points, r1, r2) {
      var min = r1.min(r2), max = r1.max(r2), topRight = new fabric3.Point(max.x, min.y), bottomLeft = new fabric3.Point(min.x, max.y), inter1 = Intersection.intersectLinePolygon(min, topRight, points), inter2 = Intersection.intersectLinePolygon(topRight, max, points), inter3 = Intersection.intersectLinePolygon(max, bottomLeft, points), inter4 = Intersection.intersectLinePolygon(bottomLeft, min, points), result = new Intersection();
      result.appendPoints(inter1.points);
      result.appendPoints(inter2.points);
      result.appendPoints(inter3.points);
      result.appendPoints(inter4.points);
      if (result.points.length > 0) {
        result.status = "Intersection";
      }
      return result;
    };
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {});
    if (fabric3.Color) {
      fabric3.warn("fabric.Color is already defined.");
      return;
    }
    function Color(color) {
      if (!color) {
        this.setSource([0, 0, 0, 1]);
      } else {
        this._tryParsingColor(color);
      }
    }
    fabric3.Color = Color;
    fabric3.Color.prototype = {
      _tryParsingColor: function(color) {
        var source;
        if (color in Color.colorNameMap) {
          color = Color.colorNameMap[color];
        }
        if (color === "transparent") {
          source = [255, 255, 255, 0];
        }
        if (!source) {
          source = Color.sourceFromHex(color);
        }
        if (!source) {
          source = Color.sourceFromRgb(color);
        }
        if (!source) {
          source = Color.sourceFromHsl(color);
        }
        if (!source) {
          source = [0, 0, 0, 1];
        }
        if (source) {
          this.setSource(source);
        }
      },
      _rgbToHsl: function(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        var h, s, l, max = fabric3.util.array.max([r, g, b]), min = fabric3.util.array.min([r, g, b]);
        l = (max + min) / 2;
        if (max === min) {
          h = s = 0;
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }
        return [
          Math.round(h * 360),
          Math.round(s * 100),
          Math.round(l * 100)
        ];
      },
      getSource: function() {
        return this._source;
      },
      setSource: function(source) {
        this._source = source;
      },
      toRgb: function() {
        var source = this.getSource();
        return "rgb(" + source[0] + "," + source[1] + "," + source[2] + ")";
      },
      toRgba: function() {
        var source = this.getSource();
        return "rgba(" + source[0] + "," + source[1] + "," + source[2] + "," + source[3] + ")";
      },
      toHsl: function() {
        var source = this.getSource(), hsl = this._rgbToHsl(source[0], source[1], source[2]);
        return "hsl(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%)";
      },
      toHsla: function() {
        var source = this.getSource(), hsl = this._rgbToHsl(source[0], source[1], source[2]);
        return "hsla(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%," + source[3] + ")";
      },
      toHex: function() {
        var source = this.getSource(), r, g, b;
        r = source[0].toString(16);
        r = r.length === 1 ? "0" + r : r;
        g = source[1].toString(16);
        g = g.length === 1 ? "0" + g : g;
        b = source[2].toString(16);
        b = b.length === 1 ? "0" + b : b;
        return r.toUpperCase() + g.toUpperCase() + b.toUpperCase();
      },
      toHexa: function() {
        var source = this.getSource(), a;
        a = Math.round(source[3] * 255);
        a = a.toString(16);
        a = a.length === 1 ? "0" + a : a;
        return this.toHex() + a.toUpperCase();
      },
      getAlpha: function() {
        return this.getSource()[3];
      },
      setAlpha: function(alpha) {
        var source = this.getSource();
        source[3] = alpha;
        this.setSource(source);
        return this;
      },
      toGrayscale: function() {
        var source = this.getSource(), average = parseInt((source[0] * 0.3 + source[1] * 0.59 + source[2] * 0.11).toFixed(0), 10), currentAlpha = source[3];
        this.setSource([average, average, average, currentAlpha]);
        return this;
      },
      toBlackWhite: function(threshold) {
        var source = this.getSource(), average = (source[0] * 0.3 + source[1] * 0.59 + source[2] * 0.11).toFixed(0), currentAlpha = source[3];
        threshold = threshold || 127;
        average = Number(average) < Number(threshold) ? 0 : 255;
        this.setSource([average, average, average, currentAlpha]);
        return this;
      },
      overlayWith: function(otherColor) {
        if (!(otherColor instanceof Color)) {
          otherColor = new Color(otherColor);
        }
        var result = [], alpha = this.getAlpha(), otherAlpha = 0.5, source = this.getSource(), otherSource = otherColor.getSource(), i;
        for (i = 0; i < 3; i++) {
          result.push(Math.round(source[i] * (1 - otherAlpha) + otherSource[i] * otherAlpha));
        }
        result[3] = alpha;
        this.setSource(result);
        return this;
      }
    };
    fabric3.Color.reRGBa = /^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*((?:\d*\.?\d+)?)\s*)?\)$/i;
    fabric3.Color.reHSLa = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/i;
    fabric3.Color.reHex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;
    fabric3.Color.colorNameMap = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aqua: "#00FFFF",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blue: "#0000FF",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgrey: "#A9A9A9",
      darkgreen: "#006400",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      fuchsia: "#FF00FF",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      gray: "#808080",
      grey: "#808080",
      green: "#008000",
      greenyellow: "#ADFF2F",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgray: "#D3D3D3",
      lightgrey: "#D3D3D3",
      lightgreen: "#90EE90",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      lime: "#00FF00",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      maroon: "#800000",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      navy: "#000080",
      oldlace: "#FDF5E6",
      olive: "#808000",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#FF0000",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      silver: "#C0C0C0",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      teal: "#008080",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      white: "#FFFFFF",
      whitesmoke: "#F5F5F5",
      yellow: "#FFFF00",
      yellowgreen: "#9ACD32"
    };
    function hue2rgb(p, q, t) {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    }
    fabric3.Color.fromRgb = function(color) {
      return Color.fromSource(Color.sourceFromRgb(color));
    };
    fabric3.Color.sourceFromRgb = function(color) {
      var match = color.match(Color.reRGBa);
      if (match) {
        var r = parseInt(match[1], 10) / (/%$/.test(match[1]) ? 100 : 1) * (/%$/.test(match[1]) ? 255 : 1), g = parseInt(match[2], 10) / (/%$/.test(match[2]) ? 100 : 1) * (/%$/.test(match[2]) ? 255 : 1), b = parseInt(match[3], 10) / (/%$/.test(match[3]) ? 100 : 1) * (/%$/.test(match[3]) ? 255 : 1);
        return [
          parseInt(r, 10),
          parseInt(g, 10),
          parseInt(b, 10),
          match[4] ? parseFloat(match[4]) : 1
        ];
      }
    };
    fabric3.Color.fromRgba = Color.fromRgb;
    fabric3.Color.fromHsl = function(color) {
      return Color.fromSource(Color.sourceFromHsl(color));
    };
    fabric3.Color.sourceFromHsl = function(color) {
      var match = color.match(Color.reHSLa);
      if (!match) {
        return;
      }
      var h = (parseFloat(match[1]) % 360 + 360) % 360 / 360, s = parseFloat(match[2]) / (/%$/.test(match[2]) ? 100 : 1), l = parseFloat(match[3]) / (/%$/.test(match[3]) ? 100 : 1), r, g, b;
      if (s === 0) {
        r = g = b = l;
      } else {
        var q = l <= 0.5 ? l * (s + 1) : l + s - l * s, p = l * 2 - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        match[4] ? parseFloat(match[4]) : 1
      ];
    };
    fabric3.Color.fromHsla = Color.fromHsl;
    fabric3.Color.fromHex = function(color) {
      return Color.fromSource(Color.sourceFromHex(color));
    };
    fabric3.Color.sourceFromHex = function(color) {
      if (color.match(Color.reHex)) {
        var value = color.slice(color.indexOf("#") + 1), isShortNotation = value.length === 3 || value.length === 4, isRGBa = value.length === 8 || value.length === 4, r = isShortNotation ? value.charAt(0) + value.charAt(0) : value.substring(0, 2), g = isShortNotation ? value.charAt(1) + value.charAt(1) : value.substring(2, 4), b = isShortNotation ? value.charAt(2) + value.charAt(2) : value.substring(4, 6), a = isRGBa ? isShortNotation ? value.charAt(3) + value.charAt(3) : value.substring(6, 8) : "FF";
        return [
          parseInt(r, 16),
          parseInt(g, 16),
          parseInt(b, 16),
          parseFloat((parseInt(a, 16) / 255).toFixed(2))
        ];
      }
    };
    fabric3.Color.fromSource = function(source) {
      var oColor = new Color();
      oColor.setSource(source);
      return oColor;
    };
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), scaleMap = ["e", "se", "s", "sw", "w", "nw", "n", "ne", "e"], skewMap = ["ns", "nesw", "ew", "nwse"], controls = {}, LEFT = "left", TOP = "top", RIGHT = "right", BOTTOM = "bottom", CENTER = "center", opposite = {
      top: BOTTOM,
      bottom: TOP,
      left: RIGHT,
      right: LEFT,
      center: CENTER
    }, radiansToDegrees = fabric3.util.radiansToDegrees, sign = Math.sign || function(x) {
      return (x > 0) - (x < 0) || +x;
    };
    function findCornerQuadrant(fabricObject, control) {
      var cornerAngle = fabricObject.angle + radiansToDegrees(Math.atan2(control.y, control.x)) + 360;
      return Math.round(cornerAngle % 360 / 45);
    }
    function fireEvent(eventName, options) {
      var target = options.transform.target, canvas2 = target.canvas, canvasOptions = fabric3.util.object.clone(options);
      canvasOptions.target = target;
      canvas2 && canvas2.fire("object:" + eventName, canvasOptions);
      target.fire(eventName, options);
    }
    function scaleIsProportional(eventData, fabricObject) {
      var canvas2 = fabricObject.canvas, uniScaleKey = canvas2.uniScaleKey, uniformIsToggled = eventData[uniScaleKey];
      return canvas2.uniformScaling && !uniformIsToggled || !canvas2.uniformScaling && uniformIsToggled;
    }
    function isTransformCentered(transform) {
      return transform.originX === CENTER && transform.originY === CENTER;
    }
    function scalingIsForbidden(fabricObject, by, scaleProportionally) {
      var lockX = fabricObject.lockScalingX, lockY = fabricObject.lockScalingY;
      if (lockX && lockY) {
        return true;
      }
      if (!by && (lockX || lockY) && scaleProportionally) {
        return true;
      }
      if (lockX && by === "x") {
        return true;
      }
      if (lockY && by === "y") {
        return true;
      }
      return false;
    }
    function scaleCursorStyleHandler(eventData, control, fabricObject) {
      var notAllowed = "not-allowed", scaleProportionally = scaleIsProportional(eventData, fabricObject), by = "";
      if (control.x !== 0 && control.y === 0) {
        by = "x";
      } else if (control.x === 0 && control.y !== 0) {
        by = "y";
      }
      if (scalingIsForbidden(fabricObject, by, scaleProportionally)) {
        return notAllowed;
      }
      var n = findCornerQuadrant(fabricObject, control);
      return scaleMap[n] + "-resize";
    }
    function skewCursorStyleHandler(eventData, control, fabricObject) {
      var notAllowed = "not-allowed";
      if (control.x !== 0 && fabricObject.lockSkewingY) {
        return notAllowed;
      }
      if (control.y !== 0 && fabricObject.lockSkewingX) {
        return notAllowed;
      }
      var n = findCornerQuadrant(fabricObject, control) % 4;
      return skewMap[n] + "-resize";
    }
    function scaleSkewCursorStyleHandler(eventData, control, fabricObject) {
      if (eventData[fabricObject.canvas.altActionKey]) {
        return controls.skewCursorStyleHandler(eventData, control, fabricObject);
      }
      return controls.scaleCursorStyleHandler(eventData, control, fabricObject);
    }
    function scaleOrSkewActionName(eventData, control, fabricObject) {
      var isAlternative = eventData[fabricObject.canvas.altActionKey];
      if (control.x === 0) {
        return isAlternative ? "skewX" : "scaleY";
      }
      if (control.y === 0) {
        return isAlternative ? "skewY" : "scaleX";
      }
    }
    function rotationStyleHandler(eventData, control, fabricObject) {
      if (fabricObject.lockRotation) {
        return "not-allowed";
      }
      return control.cursorStyle;
    }
    function commonEventInfo(eventData, transform, x, y) {
      return {
        e: eventData,
        transform,
        pointer: {
          x,
          y
        }
      };
    }
    function wrapWithFixedAnchor(actionHandler) {
      return function(eventData, transform, x, y) {
        var target = transform.target, centerPoint = target.getCenterPoint(), constraint = target.translateToOriginPoint(centerPoint, transform.originX, transform.originY), actionPerformed = actionHandler(eventData, transform, x, y);
        target.setPositionByOrigin(constraint, transform.originX, transform.originY);
        return actionPerformed;
      };
    }
    function wrapWithFireEvent(eventName, actionHandler) {
      return function(eventData, transform, x, y) {
        var actionPerformed = actionHandler(eventData, transform, x, y);
        if (actionPerformed) {
          fireEvent(eventName, commonEventInfo(eventData, transform, x, y));
        }
        return actionPerformed;
      };
    }
    function getLocalPoint(transform, originX, originY, x, y) {
      var target = transform.target, control = target.controls[transform.corner], zoom = target.canvas.getZoom(), padding = target.padding / zoom, localPoint = target.toLocalPoint(new fabric3.Point(x, y), originX, originY);
      if (localPoint.x >= padding) {
        localPoint.x -= padding;
      }
      if (localPoint.x <= -padding) {
        localPoint.x += padding;
      }
      if (localPoint.y >= padding) {
        localPoint.y -= padding;
      }
      if (localPoint.y <= padding) {
        localPoint.y += padding;
      }
      localPoint.x -= control.offsetX;
      localPoint.y -= control.offsetY;
      return localPoint;
    }
    function targetHasOneFlip(target) {
      return target.flipX !== target.flipY;
    }
    function compensateScaleForSkew(target, oppositeSkew, scaleToCompensate, axis, reference) {
      if (target[oppositeSkew] !== 0) {
        var newDim = target._getTransformedDimensions()[axis];
        var newValue = reference / newDim * target[scaleToCompensate];
        target.set(scaleToCompensate, newValue);
      }
    }
    function skewObjectX(eventData, transform, x, y) {
      var target = transform.target, dimNoSkew = target._getTransformedDimensions(0, target.skewY), localPoint = getLocalPoint(transform, transform.originX, transform.originY, x, y), totalSkewSize = Math.abs(localPoint.x * 2) - dimNoSkew.x, currentSkew = target.skewX, newSkew;
      if (totalSkewSize < 2) {
        newSkew = 0;
      } else {
        newSkew = radiansToDegrees(
          Math.atan2(totalSkewSize / target.scaleX, dimNoSkew.y / target.scaleY)
        );
        if (transform.originX === LEFT && transform.originY === BOTTOM) {
          newSkew = -newSkew;
        }
        if (transform.originX === RIGHT && transform.originY === TOP) {
          newSkew = -newSkew;
        }
        if (targetHasOneFlip(target)) {
          newSkew = -newSkew;
        }
      }
      var hasSkewed = currentSkew !== newSkew;
      if (hasSkewed) {
        var dimBeforeSkewing = target._getTransformedDimensions().y;
        target.set("skewX", newSkew);
        compensateScaleForSkew(target, "skewY", "scaleY", "y", dimBeforeSkewing);
      }
      return hasSkewed;
    }
    function skewObjectY(eventData, transform, x, y) {
      var target = transform.target, dimNoSkew = target._getTransformedDimensions(target.skewX, 0), localPoint = getLocalPoint(transform, transform.originX, transform.originY, x, y), totalSkewSize = Math.abs(localPoint.y * 2) - dimNoSkew.y, currentSkew = target.skewY, newSkew;
      if (totalSkewSize < 2) {
        newSkew = 0;
      } else {
        newSkew = radiansToDegrees(
          Math.atan2(totalSkewSize / target.scaleY, dimNoSkew.x / target.scaleX)
        );
        if (transform.originX === LEFT && transform.originY === BOTTOM) {
          newSkew = -newSkew;
        }
        if (transform.originX === RIGHT && transform.originY === TOP) {
          newSkew = -newSkew;
        }
        if (targetHasOneFlip(target)) {
          newSkew = -newSkew;
        }
      }
      var hasSkewed = currentSkew !== newSkew;
      if (hasSkewed) {
        var dimBeforeSkewing = target._getTransformedDimensions().x;
        target.set("skewY", newSkew);
        compensateScaleForSkew(target, "skewX", "scaleX", "x", dimBeforeSkewing);
      }
      return hasSkewed;
    }
    function skewHandlerX(eventData, transform, x, y) {
      var target = transform.target, currentSkew = target.skewX, originX, originY = transform.originY;
      if (target.lockSkewingX) {
        return false;
      }
      if (currentSkew === 0) {
        var localPointFromCenter = getLocalPoint(transform, CENTER, CENTER, x, y);
        if (localPointFromCenter.x > 0) {
          originX = LEFT;
        } else {
          originX = RIGHT;
        }
      } else {
        if (currentSkew > 0) {
          originX = originY === TOP ? LEFT : RIGHT;
        }
        if (currentSkew < 0) {
          originX = originY === TOP ? RIGHT : LEFT;
        }
        if (targetHasOneFlip(target)) {
          originX = originX === LEFT ? RIGHT : LEFT;
        }
      }
      transform.originX = originX;
      var finalHandler = wrapWithFireEvent("skewing", wrapWithFixedAnchor(skewObjectX));
      return finalHandler(eventData, transform, x, y);
    }
    function skewHandlerY(eventData, transform, x, y) {
      var target = transform.target, currentSkew = target.skewY, originY, originX = transform.originX;
      if (target.lockSkewingY) {
        return false;
      }
      if (currentSkew === 0) {
        var localPointFromCenter = getLocalPoint(transform, CENTER, CENTER, x, y);
        if (localPointFromCenter.y > 0) {
          originY = TOP;
        } else {
          originY = BOTTOM;
        }
      } else {
        if (currentSkew > 0) {
          originY = originX === LEFT ? TOP : BOTTOM;
        }
        if (currentSkew < 0) {
          originY = originX === LEFT ? BOTTOM : TOP;
        }
        if (targetHasOneFlip(target)) {
          originY = originY === TOP ? BOTTOM : TOP;
        }
      }
      transform.originY = originY;
      var finalHandler = wrapWithFireEvent("skewing", wrapWithFixedAnchor(skewObjectY));
      return finalHandler(eventData, transform, x, y);
    }
    function rotationWithSnapping(eventData, transform, x, y) {
      var t = transform, target = t.target, pivotPoint = target.translateToOriginPoint(target.getCenterPoint(), t.originX, t.originY);
      if (target.lockRotation) {
        return false;
      }
      var lastAngle = Math.atan2(t.ey - pivotPoint.y, t.ex - pivotPoint.x), curAngle = Math.atan2(y - pivotPoint.y, x - pivotPoint.x), angle = radiansToDegrees(curAngle - lastAngle + t.theta), hasRotated = true;
      if (target.snapAngle > 0) {
        var snapAngle = target.snapAngle, snapThreshold = target.snapThreshold || snapAngle, rightAngleLocked = Math.ceil(angle / snapAngle) * snapAngle, leftAngleLocked = Math.floor(angle / snapAngle) * snapAngle;
        if (Math.abs(angle - leftAngleLocked) < snapThreshold) {
          angle = leftAngleLocked;
        } else if (Math.abs(angle - rightAngleLocked) < snapThreshold) {
          angle = rightAngleLocked;
        }
      }
      if (angle < 0) {
        angle = 360 + angle;
      }
      angle %= 360;
      hasRotated = target.angle !== angle;
      target.angle = angle;
      return hasRotated;
    }
    function scaleObject(eventData, transform, x, y, options) {
      options = options || {};
      var target = transform.target, lockScalingX = target.lockScalingX, lockScalingY = target.lockScalingY, by = options.by, newPoint, scaleX, scaleY, dim, scaleProportionally = scaleIsProportional(eventData, target), forbidScaling = scalingIsForbidden(target, by, scaleProportionally), signX, signY, gestureScale = transform.gestureScale;
      if (forbidScaling) {
        return false;
      }
      if (gestureScale) {
        scaleX = transform.scaleX * gestureScale;
        scaleY = transform.scaleY * gestureScale;
      } else {
        newPoint = getLocalPoint(transform, transform.originX, transform.originY, x, y);
        signX = by !== "y" ? sign(newPoint.x) : 1;
        signY = by !== "x" ? sign(newPoint.y) : 1;
        if (!transform.signX) {
          transform.signX = signX;
        }
        if (!transform.signY) {
          transform.signY = signY;
        }
        if (target.lockScalingFlip && (transform.signX !== signX || transform.signY !== signY)) {
          return false;
        }
        dim = target._getTransformedDimensions();
        if (scaleProportionally && !by) {
          var distance = Math.abs(newPoint.x) + Math.abs(newPoint.y), original = transform.original, originalDistance = Math.abs(dim.x * original.scaleX / target.scaleX) + Math.abs(dim.y * original.scaleY / target.scaleY), scale = distance / originalDistance;
          scaleX = original.scaleX * scale;
          scaleY = original.scaleY * scale;
        } else {
          scaleX = Math.abs(newPoint.x * target.scaleX / dim.x);
          scaleY = Math.abs(newPoint.y * target.scaleY / dim.y);
        }
        if (isTransformCentered(transform)) {
          scaleX *= 2;
          scaleY *= 2;
        }
        if (transform.signX !== signX && by !== "y") {
          transform.originX = opposite[transform.originX];
          scaleX *= -1;
          transform.signX = signX;
        }
        if (transform.signY !== signY && by !== "x") {
          transform.originY = opposite[transform.originY];
          scaleY *= -1;
          transform.signY = signY;
        }
      }
      var oldScaleX = target.scaleX, oldScaleY = target.scaleY;
      if (!by) {
        !lockScalingX && target.set("scaleX", scaleX);
        !lockScalingY && target.set("scaleY", scaleY);
      } else {
        by === "x" && target.set("scaleX", scaleX);
        by === "y" && target.set("scaleY", scaleY);
      }
      return oldScaleX !== target.scaleX || oldScaleY !== target.scaleY;
    }
    function scaleObjectFromCorner(eventData, transform, x, y) {
      return scaleObject(eventData, transform, x, y);
    }
    function scaleObjectX(eventData, transform, x, y) {
      return scaleObject(eventData, transform, x, y, { by: "x" });
    }
    function scaleObjectY(eventData, transform, x, y) {
      return scaleObject(eventData, transform, x, y, { by: "y" });
    }
    function scalingYOrSkewingX(eventData, transform, x, y) {
      if (eventData[transform.target.canvas.altActionKey]) {
        return controls.skewHandlerX(eventData, transform, x, y);
      }
      return controls.scalingY(eventData, transform, x, y);
    }
    function scalingXOrSkewingY(eventData, transform, x, y) {
      if (eventData[transform.target.canvas.altActionKey]) {
        return controls.skewHandlerY(eventData, transform, x, y);
      }
      return controls.scalingX(eventData, transform, x, y);
    }
    function changeWidth(eventData, transform, x, y) {
      var target = transform.target, localPoint = getLocalPoint(transform, transform.originX, transform.originY, x, y), strokePadding = target.strokeWidth / (target.strokeUniform ? target.scaleX : 1), multiplier = isTransformCentered(transform) ? 2 : 1, oldWidth = target.width, newWidth = Math.abs(localPoint.x * multiplier / target.scaleX) - strokePadding;
      target.set("width", Math.max(newWidth, 0));
      return oldWidth !== newWidth;
    }
    function dragHandler(eventData, transform, x, y) {
      var target = transform.target, newLeft = x - transform.offsetX, newTop = y - transform.offsetY, moveX = !target.get("lockMovementX") && target.left !== newLeft, moveY = !target.get("lockMovementY") && target.top !== newTop;
      moveX && target.set("left", newLeft);
      moveY && target.set("top", newTop);
      if (moveX || moveY) {
        fireEvent("moving", commonEventInfo(eventData, transform, x, y));
      }
      return moveX || moveY;
    }
    controls.scaleCursorStyleHandler = scaleCursorStyleHandler;
    controls.skewCursorStyleHandler = skewCursorStyleHandler;
    controls.scaleSkewCursorStyleHandler = scaleSkewCursorStyleHandler;
    controls.rotationWithSnapping = wrapWithFireEvent("rotating", wrapWithFixedAnchor(rotationWithSnapping));
    controls.scalingEqually = wrapWithFireEvent("scaling", wrapWithFixedAnchor(scaleObjectFromCorner));
    controls.scalingX = wrapWithFireEvent("scaling", wrapWithFixedAnchor(scaleObjectX));
    controls.scalingY = wrapWithFireEvent("scaling", wrapWithFixedAnchor(scaleObjectY));
    controls.scalingYOrSkewingX = scalingYOrSkewingX;
    controls.scalingXOrSkewingY = scalingXOrSkewingY;
    controls.changeWidth = wrapWithFireEvent("resizing", wrapWithFixedAnchor(changeWidth));
    controls.skewHandlerX = skewHandlerX;
    controls.skewHandlerY = skewHandlerY;
    controls.dragHandler = dragHandler;
    controls.scaleOrSkewActionName = scaleOrSkewActionName;
    controls.rotationStyleHandler = rotationStyleHandler;
    controls.fireEvent = fireEvent;
    controls.wrapWithFixedAnchor = wrapWithFixedAnchor;
    controls.wrapWithFireEvent = wrapWithFireEvent;
    controls.getLocalPoint = getLocalPoint;
    fabric3.controlsUtils = controls;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), degreesToRadians = fabric3.util.degreesToRadians, controls = fabric3.controlsUtils;
    function renderCircleControl(ctx, left, top, styleOverride, fabricObject) {
      styleOverride = styleOverride || {};
      var xSize = this.sizeX || styleOverride.cornerSize || fabricObject.cornerSize, ySize = this.sizeY || styleOverride.cornerSize || fabricObject.cornerSize, transparentCorners = typeof styleOverride.transparentCorners !== "undefined" ? styleOverride.transparentCorners : fabricObject.transparentCorners, methodName = transparentCorners ? "stroke" : "fill", stroke = !transparentCorners && (styleOverride.cornerStrokeColor || fabricObject.cornerStrokeColor), myLeft = left, myTop = top, size;
      ctx.save();
      ctx.fillStyle = styleOverride.cornerColor || fabricObject.cornerColor;
      ctx.strokeStyle = styleOverride.cornerStrokeColor || fabricObject.cornerStrokeColor;
      if (xSize > ySize) {
        size = xSize;
        ctx.scale(1, ySize / xSize);
        myTop = top * xSize / ySize;
      } else if (ySize > xSize) {
        size = ySize;
        ctx.scale(xSize / ySize, 1);
        myLeft = left * ySize / xSize;
      } else {
        size = xSize;
      }
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(myLeft, myTop, size / 2, 0, 2 * Math.PI, false);
      ctx[methodName]();
      if (stroke) {
        ctx.stroke();
      }
      ctx.restore();
    }
    function renderSquareControl(ctx, left, top, styleOverride, fabricObject) {
      styleOverride = styleOverride || {};
      var xSize = this.sizeX || styleOverride.cornerSize || fabricObject.cornerSize, ySize = this.sizeY || styleOverride.cornerSize || fabricObject.cornerSize, transparentCorners = typeof styleOverride.transparentCorners !== "undefined" ? styleOverride.transparentCorners : fabricObject.transparentCorners, methodName = transparentCorners ? "stroke" : "fill", stroke = !transparentCorners && (styleOverride.cornerStrokeColor || fabricObject.cornerStrokeColor), xSizeBy2 = xSize / 2, ySizeBy2 = ySize / 2;
      ctx.save();
      ctx.fillStyle = styleOverride.cornerColor || fabricObject.cornerColor;
      ctx.strokeStyle = styleOverride.cornerStrokeColor || fabricObject.cornerStrokeColor;
      ctx.lineWidth = 1;
      ctx.translate(left, top);
      ctx.rotate(degreesToRadians(fabricObject.angle));
      ctx[methodName + "Rect"](-xSizeBy2, -ySizeBy2, xSize, ySize);
      if (stroke) {
        ctx.strokeRect(-xSizeBy2, -ySizeBy2, xSize, ySize);
      }
      ctx.restore();
    }
    controls.renderCircleControl = renderCircleControl;
    controls.renderSquareControl = renderSquareControl;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {});
    function Control(options) {
      for (var i in options) {
        this[i] = options[i];
      }
    }
    fabric3.Control = Control;
    fabric3.Control.prototype = {
      visible: true,
      actionName: "scale",
      angle: 0,
      x: 0,
      y: 0,
      offsetX: 0,
      offsetY: 0,
      sizeX: null,
      sizeY: null,
      touchSizeX: null,
      touchSizeY: null,
      cursorStyle: "crosshair",
      withConnection: false,
      actionHandler: function() {
      },
      mouseDownHandler: function() {
      },
      mouseUpHandler: function() {
      },
      getActionHandler: function() {
        return this.actionHandler;
      },
      getMouseDownHandler: function() {
        return this.mouseDownHandler;
      },
      getMouseUpHandler: function() {
        return this.mouseUpHandler;
      },
      cursorStyleHandler: function(eventData, control) {
        return control.cursorStyle;
      },
      getActionName: function(eventData, control) {
        return control.actionName;
      },
      getVisibility: function(fabricObject, controlKey) {
        var objectVisibility = fabricObject._controlsVisibility;
        if (objectVisibility && typeof objectVisibility[controlKey] !== "undefined") {
          return objectVisibility[controlKey];
        }
        return this.visible;
      },
      setVisibility: function(visibility) {
        this.visible = visibility;
      },
      positionHandler: function(dim, finalMatrix) {
        var point = fabric3.util.transformPoint({
          x: this.x * dim.x + this.offsetX,
          y: this.y * dim.y + this.offsetY
        }, finalMatrix);
        return point;
      },
      calcCornerCoords: function(objectAngle, objectCornerSize, centerX, centerY, isTouch) {
        var cosHalfOffset, sinHalfOffset, cosHalfOffsetComp, sinHalfOffsetComp, xSize = isTouch ? this.touchSizeX : this.sizeX, ySize = isTouch ? this.touchSizeY : this.sizeY;
        if (xSize && ySize && xSize !== ySize) {
          var controlTriangleAngle = Math.atan2(ySize, xSize);
          var cornerHypotenuse = Math.sqrt(xSize * xSize + ySize * ySize) / 2;
          var newTheta = controlTriangleAngle - fabric3.util.degreesToRadians(objectAngle);
          var newThetaComp = Math.PI / 2 - controlTriangleAngle - fabric3.util.degreesToRadians(objectAngle);
          cosHalfOffset = cornerHypotenuse * fabric3.util.cos(newTheta);
          sinHalfOffset = cornerHypotenuse * fabric3.util.sin(newTheta);
          cosHalfOffsetComp = cornerHypotenuse * fabric3.util.cos(newThetaComp);
          sinHalfOffsetComp = cornerHypotenuse * fabric3.util.sin(newThetaComp);
        } else {
          var cornerSize = xSize && ySize ? xSize : objectCornerSize;
          cornerHypotenuse = cornerSize * 0.7071067812;
          var newTheta = fabric3.util.degreesToRadians(45 - objectAngle);
          cosHalfOffset = cosHalfOffsetComp = cornerHypotenuse * fabric3.util.cos(newTheta);
          sinHalfOffset = sinHalfOffsetComp = cornerHypotenuse * fabric3.util.sin(newTheta);
        }
        return {
          tl: {
            x: centerX - sinHalfOffsetComp,
            y: centerY - cosHalfOffsetComp
          },
          tr: {
            x: centerX + cosHalfOffset,
            y: centerY - sinHalfOffset
          },
          bl: {
            x: centerX - cosHalfOffset,
            y: centerY + sinHalfOffset
          },
          br: {
            x: centerX + sinHalfOffsetComp,
            y: centerY + cosHalfOffsetComp
          }
        };
      },
      render: function(ctx, left, top, styleOverride, fabricObject) {
        styleOverride = styleOverride || {};
        switch (styleOverride.cornerStyle || fabricObject.cornerStyle) {
          case "circle":
            fabric3.controlsUtils.renderCircleControl.call(this, ctx, left, top, styleOverride, fabricObject);
            break;
          default:
            fabric3.controlsUtils.renderSquareControl.call(this, ctx, left, top, styleOverride, fabricObject);
        }
      }
    };
  })(exports);
  (function() {
    function getColorStop(el, multiplier) {
      var style = el.getAttribute("style"), offset = el.getAttribute("offset") || 0, color, colorAlpha, opacity, i;
      offset = parseFloat(offset) / (/%$/.test(offset) ? 100 : 1);
      offset = offset < 0 ? 0 : offset > 1 ? 1 : offset;
      if (style) {
        var keyValuePairs = style.split(/\s*;\s*/);
        if (keyValuePairs[keyValuePairs.length - 1] === "") {
          keyValuePairs.pop();
        }
        for (i = keyValuePairs.length; i--; ) {
          var split = keyValuePairs[i].split(/\s*:\s*/), key = split[0].trim(), value = split[1].trim();
          if (key === "stop-color") {
            color = value;
          } else if (key === "stop-opacity") {
            opacity = value;
          }
        }
      }
      if (!color) {
        color = el.getAttribute("stop-color") || "rgb(0,0,0)";
      }
      if (!opacity) {
        opacity = el.getAttribute("stop-opacity");
      }
      color = new fabric2.Color(color);
      colorAlpha = color.getAlpha();
      opacity = isNaN(parseFloat(opacity)) ? 1 : parseFloat(opacity);
      opacity *= colorAlpha * multiplier;
      return {
        offset,
        color: color.toRgb(),
        opacity
      };
    }
    function getLinearCoords(el) {
      return {
        x1: el.getAttribute("x1") || 0,
        y1: el.getAttribute("y1") || 0,
        x2: el.getAttribute("x2") || "100%",
        y2: el.getAttribute("y2") || 0
      };
    }
    function getRadialCoords(el) {
      return {
        x1: el.getAttribute("fx") || el.getAttribute("cx") || "50%",
        y1: el.getAttribute("fy") || el.getAttribute("cy") || "50%",
        r1: 0,
        x2: el.getAttribute("cx") || "50%",
        y2: el.getAttribute("cy") || "50%",
        r2: el.getAttribute("r") || "50%"
      };
    }
    var clone = fabric2.util.object.clone;
    fabric2.Gradient = fabric2.util.createClass({
      offsetX: 0,
      offsetY: 0,
      gradientTransform: null,
      gradientUnits: "pixels",
      type: "linear",
      initialize: function(options) {
        options || (options = {});
        options.coords || (options.coords = {});
        var coords, _this = this;
        Object.keys(options).forEach(function(option) {
          _this[option] = options[option];
        });
        if (this.id) {
          this.id += "_" + fabric2.Object.__uid++;
        } else {
          this.id = fabric2.Object.__uid++;
        }
        coords = {
          x1: options.coords.x1 || 0,
          y1: options.coords.y1 || 0,
          x2: options.coords.x2 || 0,
          y2: options.coords.y2 || 0
        };
        if (this.type === "radial") {
          coords.r1 = options.coords.r1 || 0;
          coords.r2 = options.coords.r2 || 0;
        }
        this.coords = coords;
        this.colorStops = options.colorStops.slice();
      },
      addColorStop: function(colorStops) {
        for (var position in colorStops) {
          var color = new fabric2.Color(colorStops[position]);
          this.colorStops.push({
            offset: parseFloat(position),
            color: color.toRgb(),
            opacity: color.getAlpha()
          });
        }
        return this;
      },
      toObject: function(propertiesToInclude) {
        var object = {
          type: this.type,
          coords: this.coords,
          colorStops: this.colorStops,
          offsetX: this.offsetX,
          offsetY: this.offsetY,
          gradientUnits: this.gradientUnits,
          gradientTransform: this.gradientTransform ? this.gradientTransform.concat() : this.gradientTransform
        };
        fabric2.util.populateWithProperties(this, object, propertiesToInclude);
        return object;
      },
      toSVG: function(object, options) {
        var coords = clone(this.coords, true), i, len, options = options || {}, markup, commonAttributes, colorStops = clone(this.colorStops, true), needsSwap = coords.r1 > coords.r2, transform = this.gradientTransform ? this.gradientTransform.concat() : fabric2.iMatrix.concat(), offsetX = -this.offsetX, offsetY = -this.offsetY, withViewport = !!options.additionalTransform, gradientUnits = this.gradientUnits === "pixels" ? "userSpaceOnUse" : "objectBoundingBox";
        colorStops.sort(function(a, b) {
          return a.offset - b.offset;
        });
        if (gradientUnits === "objectBoundingBox") {
          offsetX /= object.width;
          offsetY /= object.height;
        } else {
          offsetX += object.width / 2;
          offsetY += object.height / 2;
        }
        if (object.type === "path" && this.gradientUnits !== "percentage") {
          offsetX -= object.pathOffset.x;
          offsetY -= object.pathOffset.y;
        }
        transform[4] -= offsetX;
        transform[5] -= offsetY;
        commonAttributes = 'id="SVGID_' + this.id + '" gradientUnits="' + gradientUnits + '"';
        commonAttributes += ' gradientTransform="' + (withViewport ? options.additionalTransform + " " : "") + fabric2.util.matrixToSVG(transform) + '" ';
        if (this.type === "linear") {
          markup = [
            "<linearGradient ",
            commonAttributes,
            ' x1="',
            coords.x1,
            '" y1="',
            coords.y1,
            '" x2="',
            coords.x2,
            '" y2="',
            coords.y2,
            '">\n'
          ];
        } else if (this.type === "radial") {
          markup = [
            "<radialGradient ",
            commonAttributes,
            ' cx="',
            needsSwap ? coords.x1 : coords.x2,
            '" cy="',
            needsSwap ? coords.y1 : coords.y2,
            '" r="',
            needsSwap ? coords.r1 : coords.r2,
            '" fx="',
            needsSwap ? coords.x2 : coords.x1,
            '" fy="',
            needsSwap ? coords.y2 : coords.y1,
            '">\n'
          ];
        }
        if (this.type === "radial") {
          if (needsSwap) {
            colorStops = colorStops.concat();
            colorStops.reverse();
            for (i = 0, len = colorStops.length; i < len; i++) {
              colorStops[i].offset = 1 - colorStops[i].offset;
            }
          }
          var minRadius = Math.min(coords.r1, coords.r2);
          if (minRadius > 0) {
            var maxRadius = Math.max(coords.r1, coords.r2), percentageShift = minRadius / maxRadius;
            for (i = 0, len = colorStops.length; i < len; i++) {
              colorStops[i].offset += percentageShift * (1 - colorStops[i].offset);
            }
          }
        }
        for (i = 0, len = colorStops.length; i < len; i++) {
          var colorStop = colorStops[i];
          markup.push(
            "<stop ",
            'offset="',
            colorStop.offset * 100 + "%",
            '" style="stop-color:',
            colorStop.color,
            typeof colorStop.opacity !== "undefined" ? ";stop-opacity: " + colorStop.opacity : ";",
            '"/>\n'
          );
        }
        markup.push(this.type === "linear" ? "</linearGradient>\n" : "</radialGradient>\n");
        return markup.join("");
      },
      toLive: function(ctx) {
        var gradient, coords = fabric2.util.object.clone(this.coords), i, len;
        if (!this.type) {
          return;
        }
        if (this.type === "linear") {
          gradient = ctx.createLinearGradient(
            coords.x1,
            coords.y1,
            coords.x2,
            coords.y2
          );
        } else if (this.type === "radial") {
          gradient = ctx.createRadialGradient(
            coords.x1,
            coords.y1,
            coords.r1,
            coords.x2,
            coords.y2,
            coords.r2
          );
        }
        for (i = 0, len = this.colorStops.length; i < len; i++) {
          var color = this.colorStops[i].color, opacity = this.colorStops[i].opacity, offset = this.colorStops[i].offset;
          if (typeof opacity !== "undefined") {
            color = new fabric2.Color(color).setAlpha(opacity).toRgba();
          }
          gradient.addColorStop(offset, color);
        }
        return gradient;
      }
    });
    fabric2.util.object.extend(fabric2.Gradient, {
      fromElement: function(el, instance, opacityAttr, svgOptions) {
        var multiplier = parseFloat(opacityAttr) / (/%$/.test(opacityAttr) ? 100 : 1);
        multiplier = multiplier < 0 ? 0 : multiplier > 1 ? 1 : multiplier;
        if (isNaN(multiplier)) {
          multiplier = 1;
        }
        var colorStopEls = el.getElementsByTagName("stop"), type, gradientUnits = el.getAttribute("gradientUnits") === "userSpaceOnUse" ? "pixels" : "percentage", gradientTransform = el.getAttribute("gradientTransform") || "", colorStops = [], coords, i, offsetX = 0, offsetY = 0, transformMatrix;
        if (el.nodeName === "linearGradient" || el.nodeName === "LINEARGRADIENT") {
          type = "linear";
          coords = getLinearCoords(el);
        } else {
          type = "radial";
          coords = getRadialCoords(el);
        }
        for (i = colorStopEls.length; i--; ) {
          colorStops.push(getColorStop(colorStopEls[i], multiplier));
        }
        transformMatrix = fabric2.parseTransformAttribute(gradientTransform);
        __convertPercentUnitsToValues(instance, coords, svgOptions, gradientUnits);
        if (gradientUnits === "pixels") {
          offsetX = -instance.left;
          offsetY = -instance.top;
        }
        var gradient = new fabric2.Gradient({
          id: el.getAttribute("id"),
          type,
          coords,
          colorStops,
          gradientUnits,
          gradientTransform: transformMatrix,
          offsetX,
          offsetY
        });
        return gradient;
      }
    });
    function __convertPercentUnitsToValues(instance, options, svgOptions, gradientUnits) {
      var propValue, finalValue;
      Object.keys(options).forEach(function(prop) {
        propValue = options[prop];
        if (propValue === "Infinity") {
          finalValue = 1;
        } else if (propValue === "-Infinity") {
          finalValue = 0;
        } else {
          finalValue = parseFloat(options[prop], 10);
          if (typeof propValue === "string" && /^(\d+\.\d+)%|(\d+)%$/.test(propValue)) {
            finalValue *= 0.01;
            if (gradientUnits === "pixels") {
              if (prop === "x1" || prop === "x2" || prop === "r2") {
                finalValue *= svgOptions.viewBoxWidth || svgOptions.width;
              }
              if (prop === "y1" || prop === "y2") {
                finalValue *= svgOptions.viewBoxHeight || svgOptions.height;
              }
            }
          }
        }
        options[prop] = finalValue;
      });
    }
  })();
  (function() {
    var toFixed = fabric2.util.toFixed;
    fabric2.Pattern = fabric2.util.createClass({
      repeat: "repeat",
      offsetX: 0,
      offsetY: 0,
      crossOrigin: "",
      patternTransform: null,
      initialize: function(options, callback) {
        options || (options = {});
        this.id = fabric2.Object.__uid++;
        this.setOptions(options);
        if (!options.source || options.source && typeof options.source !== "string") {
          callback && callback(this);
          return;
        } else {
          var _this = this;
          this.source = fabric2.util.createImage();
          fabric2.util.loadImage(options.source, function(img, isError) {
            _this.source = img;
            callback && callback(_this, isError);
          }, null, this.crossOrigin);
        }
      },
      toObject: function(propertiesToInclude) {
        var NUM_FRACTION_DIGITS = fabric2.Object.NUM_FRACTION_DIGITS, source, object;
        if (typeof this.source.src === "string") {
          source = this.source.src;
        } else if (typeof this.source === "object" && this.source.toDataURL) {
          source = this.source.toDataURL();
        }
        object = {
          type: "pattern",
          source,
          repeat: this.repeat,
          crossOrigin: this.crossOrigin,
          offsetX: toFixed(this.offsetX, NUM_FRACTION_DIGITS),
          offsetY: toFixed(this.offsetY, NUM_FRACTION_DIGITS),
          patternTransform: this.patternTransform ? this.patternTransform.concat() : null
        };
        fabric2.util.populateWithProperties(this, object, propertiesToInclude);
        return object;
      },
      toSVG: function(object) {
        var patternSource = typeof this.source === "function" ? this.source() : this.source, patternWidth = patternSource.width / object.width, patternHeight = patternSource.height / object.height, patternOffsetX = this.offsetX / object.width, patternOffsetY = this.offsetY / object.height, patternImgSrc = "";
        if (this.repeat === "repeat-x" || this.repeat === "no-repeat") {
          patternHeight = 1;
          if (patternOffsetY) {
            patternHeight += Math.abs(patternOffsetY);
          }
        }
        if (this.repeat === "repeat-y" || this.repeat === "no-repeat") {
          patternWidth = 1;
          if (patternOffsetX) {
            patternWidth += Math.abs(patternOffsetX);
          }
        }
        if (patternSource.src) {
          patternImgSrc = patternSource.src;
        } else if (patternSource.toDataURL) {
          patternImgSrc = patternSource.toDataURL();
        }
        return '<pattern id="SVGID_' + this.id + '" x="' + patternOffsetX + '" y="' + patternOffsetY + '" width="' + patternWidth + '" height="' + patternHeight + '">\n<image x="0" y="0" width="' + patternSource.width + '" height="' + patternSource.height + '" xlink:href="' + patternImgSrc + '"></image>\n</pattern>\n';
      },
      setOptions: function(options) {
        for (var prop in options) {
          this[prop] = options[prop];
        }
      },
      toLive: function(ctx) {
        var source = this.source;
        if (!source) {
          return "";
        }
        if (typeof source.src !== "undefined") {
          if (!source.complete) {
            return "";
          }
          if (source.naturalWidth === 0 || source.naturalHeight === 0) {
            return "";
          }
        }
        return ctx.createPattern(source, this.repeat);
      }
    });
  })();
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), toFixed = fabric3.util.toFixed;
    if (fabric3.Shadow) {
      fabric3.warn("fabric.Shadow is already defined.");
      return;
    }
    fabric3.Shadow = fabric3.util.createClass({
      color: "rgb(0,0,0)",
      blur: 0,
      offsetX: 0,
      offsetY: 0,
      affectStroke: false,
      includeDefaultValues: true,
      nonScaling: false,
      initialize: function(options) {
        if (typeof options === "string") {
          options = this._parseShadow(options);
        }
        for (var prop in options) {
          this[prop] = options[prop];
        }
        this.id = fabric3.Object.__uid++;
      },
      _parseShadow: function(shadow) {
        var shadowStr = shadow.trim(), offsetsAndBlur = fabric3.Shadow.reOffsetsAndBlur.exec(shadowStr) || [], color = shadowStr.replace(fabric3.Shadow.reOffsetsAndBlur, "") || "rgb(0,0,0)";
        return {
          color: color.trim(),
          offsetX: parseFloat(offsetsAndBlur[1], 10) || 0,
          offsetY: parseFloat(offsetsAndBlur[2], 10) || 0,
          blur: parseFloat(offsetsAndBlur[3], 10) || 0
        };
      },
      toString: function() {
        return [this.offsetX, this.offsetY, this.blur, this.color].join("px ");
      },
      toSVG: function(object) {
        var fBoxX = 40, fBoxY = 40, NUM_FRACTION_DIGITS = fabric3.Object.NUM_FRACTION_DIGITS, offset = fabric3.util.rotateVector(
          { x: this.offsetX, y: this.offsetY },
          fabric3.util.degreesToRadians(-object.angle)
        ), BLUR_BOX = 20, color = new fabric3.Color(this.color);
        if (object.width && object.height) {
          fBoxX = toFixed((Math.abs(offset.x) + this.blur) / object.width, NUM_FRACTION_DIGITS) * 100 + BLUR_BOX;
          fBoxY = toFixed((Math.abs(offset.y) + this.blur) / object.height, NUM_FRACTION_DIGITS) * 100 + BLUR_BOX;
        }
        if (object.flipX) {
          offset.x *= -1;
        }
        if (object.flipY) {
          offset.y *= -1;
        }
        return '<filter id="SVGID_' + this.id + '" y="-' + fBoxY + '%" height="' + (100 + 2 * fBoxY) + '%" x="-' + fBoxX + '%" width="' + (100 + 2 * fBoxX) + '%" >\n	<feGaussianBlur in="SourceAlpha" stdDeviation="' + toFixed(this.blur ? this.blur / 2 : 0, NUM_FRACTION_DIGITS) + '"></feGaussianBlur>\n	<feOffset dx="' + toFixed(offset.x, NUM_FRACTION_DIGITS) + '" dy="' + toFixed(offset.y, NUM_FRACTION_DIGITS) + '" result="oBlur" ></feOffset>\n	<feFlood flood-color="' + color.toRgb() + '" flood-opacity="' + color.getAlpha() + '"/>\n	<feComposite in2="oBlur" operator="in" />\n	<feMerge>\n		<feMergeNode></feMergeNode>\n		<feMergeNode in="SourceGraphic"></feMergeNode>\n	</feMerge>\n</filter>\n';
      },
      toObject: function() {
        if (this.includeDefaultValues) {
          return {
            color: this.color,
            blur: this.blur,
            offsetX: this.offsetX,
            offsetY: this.offsetY,
            affectStroke: this.affectStroke,
            nonScaling: this.nonScaling
          };
        }
        var obj = {}, proto = fabric3.Shadow.prototype;
        ["color", "blur", "offsetX", "offsetY", "affectStroke", "nonScaling"].forEach(function(prop) {
          if (this[prop] !== proto[prop]) {
            obj[prop] = this[prop];
          }
        }, this);
        return obj;
      }
    });
    fabric3.Shadow.reOffsetsAndBlur = /(?:\s|^)(-?\d+(?:\.\d*)?(?:px)?(?:\s?|$))?(-?\d+(?:\.\d*)?(?:px)?(?:\s?|$))?(\d+(?:\.\d*)?(?:px)?)?(?:\s?|$)(?:$|\s)/;
  })(exports);
  (function() {
    if (fabric2.StaticCanvas) {
      fabric2.warn("fabric.StaticCanvas is already defined.");
      return;
    }
    var extend = fabric2.util.object.extend, getElementOffset = fabric2.util.getElementOffset, removeFromArray = fabric2.util.removeFromArray, toFixed = fabric2.util.toFixed, transformPoint = fabric2.util.transformPoint, invertTransform = fabric2.util.invertTransform, getNodeCanvas = fabric2.util.getNodeCanvas, createCanvasElement = fabric2.util.createCanvasElement, CANVAS_INIT_ERROR = new Error("Could not initialize `canvas` element");
    fabric2.StaticCanvas = fabric2.util.createClass(fabric2.CommonMethods, {
      initialize: function(el, options) {
        options || (options = {});
        this.renderAndResetBound = this.renderAndReset.bind(this);
        this.requestRenderAllBound = this.requestRenderAll.bind(this);
        this._initStatic(el, options);
      },
      backgroundColor: "",
      backgroundImage: null,
      overlayColor: "",
      overlayImage: null,
      includeDefaultValues: true,
      stateful: false,
      renderOnAddRemove: true,
      controlsAboveOverlay: false,
      allowTouchScrolling: false,
      imageSmoothingEnabled: true,
      viewportTransform: fabric2.iMatrix.concat(),
      backgroundVpt: true,
      overlayVpt: true,
      enableRetinaScaling: true,
      vptCoords: {},
      skipOffscreen: true,
      clipPath: void 0,
      _initStatic: function(el, options) {
        var cb = this.requestRenderAllBound;
        this._objects = [];
        this._createLowerCanvas(el);
        this._initOptions(options);
        if (!this.interactive) {
          this._initRetinaScaling();
        }
        if (options.overlayImage) {
          this.setOverlayImage(options.overlayImage, cb);
        }
        if (options.backgroundImage) {
          this.setBackgroundImage(options.backgroundImage, cb);
        }
        if (options.backgroundColor) {
          this.setBackgroundColor(options.backgroundColor, cb);
        }
        if (options.overlayColor) {
          this.setOverlayColor(options.overlayColor, cb);
        }
        this.calcOffset();
      },
      _isRetinaScaling: function() {
        return fabric2.devicePixelRatio > 1 && this.enableRetinaScaling;
      },
      getRetinaScaling: function() {
        return this._isRetinaScaling() ? Math.max(1, fabric2.devicePixelRatio) : 1;
      },
      _initRetinaScaling: function() {
        if (!this._isRetinaScaling()) {
          return;
        }
        var scaleRatio = fabric2.devicePixelRatio;
        this.__initRetinaScaling(scaleRatio, this.lowerCanvasEl, this.contextContainer);
        if (this.upperCanvasEl) {
          this.__initRetinaScaling(scaleRatio, this.upperCanvasEl, this.contextTop);
        }
      },
      __initRetinaScaling: function(scaleRatio, canvas2, context) {
        canvas2.setAttribute("width", this.width * scaleRatio);
        canvas2.setAttribute("height", this.height * scaleRatio);
        context.scale(scaleRatio, scaleRatio);
      },
      calcOffset: function() {
        this._offset = getElementOffset(this.lowerCanvasEl);
        return this;
      },
      setOverlayImage: function(image, callback, options) {
        return this.__setBgOverlayImage("overlayImage", image, callback, options);
      },
      setBackgroundImage: function(image, callback, options) {
        return this.__setBgOverlayImage("backgroundImage", image, callback, options);
      },
      setOverlayColor: function(overlayColor, callback) {
        return this.__setBgOverlayColor("overlayColor", overlayColor, callback);
      },
      setBackgroundColor: function(backgroundColor, callback) {
        return this.__setBgOverlayColor("backgroundColor", backgroundColor, callback);
      },
      __setBgOverlayImage: function(property, image, callback, options) {
        if (typeof image === "string") {
          fabric2.util.loadImage(image, function(img, isError) {
            if (img) {
              var instance = new fabric2.Image(img, options);
              this[property] = instance;
              instance.canvas = this;
            }
            callback && callback(img, isError);
          }, this, options && options.crossOrigin);
        } else {
          options && image.setOptions(options);
          this[property] = image;
          image && (image.canvas = this);
          callback && callback(image, false);
        }
        return this;
      },
      __setBgOverlayColor: function(property, color, callback) {
        this[property] = color;
        this._initGradient(color, property);
        this._initPattern(color, property, callback);
        return this;
      },
      _createCanvasElement: function() {
        var element = createCanvasElement();
        if (!element) {
          throw CANVAS_INIT_ERROR;
        }
        if (!element.style) {
          element.style = {};
        }
        if (typeof element.getContext === "undefined") {
          throw CANVAS_INIT_ERROR;
        }
        return element;
      },
      _initOptions: function(options) {
        var lowerCanvasEl = this.lowerCanvasEl;
        this._setOptions(options);
        this.width = this.width || parseInt(lowerCanvasEl.width, 10) || 0;
        this.height = this.height || parseInt(lowerCanvasEl.height, 10) || 0;
        if (!this.lowerCanvasEl.style) {
          return;
        }
        lowerCanvasEl.width = this.width;
        lowerCanvasEl.height = this.height;
        lowerCanvasEl.style.width = this.width + "px";
        lowerCanvasEl.style.height = this.height + "px";
        this.viewportTransform = this.viewportTransform.slice();
      },
      _createLowerCanvas: function(canvasEl) {
        if (canvasEl && canvasEl.getContext) {
          this.lowerCanvasEl = canvasEl;
        } else {
          this.lowerCanvasEl = fabric2.util.getById(canvasEl) || this._createCanvasElement();
        }
        fabric2.util.addClass(this.lowerCanvasEl, "lower-canvas");
        this._originalCanvasStyle = this.lowerCanvasEl.style;
        if (this.interactive) {
          this._applyCanvasStyle(this.lowerCanvasEl);
        }
        this.contextContainer = this.lowerCanvasEl.getContext("2d");
      },
      getWidth: function() {
        return this.width;
      },
      getHeight: function() {
        return this.height;
      },
      setWidth: function(value, options) {
        return this.setDimensions({ width: value }, options);
      },
      setHeight: function(value, options) {
        return this.setDimensions({ height: value }, options);
      },
      setDimensions: function(dimensions, options) {
        var cssValue;
        options = options || {};
        for (var prop in dimensions) {
          cssValue = dimensions[prop];
          if (!options.cssOnly) {
            this._setBackstoreDimension(prop, dimensions[prop]);
            cssValue += "px";
            this.hasLostContext = true;
          }
          if (!options.backstoreOnly) {
            this._setCssDimension(prop, cssValue);
          }
        }
        if (this._isCurrentlyDrawing) {
          this.freeDrawingBrush && this.freeDrawingBrush._setBrushStyles(this.contextTop);
        }
        this._initRetinaScaling();
        this.calcOffset();
        if (!options.cssOnly) {
          this.requestRenderAll();
        }
        return this;
      },
      _setBackstoreDimension: function(prop, value) {
        this.lowerCanvasEl[prop] = value;
        if (this.upperCanvasEl) {
          this.upperCanvasEl[prop] = value;
        }
        if (this.cacheCanvasEl) {
          this.cacheCanvasEl[prop] = value;
        }
        this[prop] = value;
        return this;
      },
      _setCssDimension: function(prop, value) {
        this.lowerCanvasEl.style[prop] = value;
        if (this.upperCanvasEl) {
          this.upperCanvasEl.style[prop] = value;
        }
        if (this.wrapperEl) {
          this.wrapperEl.style[prop] = value;
        }
        return this;
      },
      getZoom: function() {
        return this.viewportTransform[0];
      },
      setViewportTransform: function(vpt) {
        var activeObject = this._activeObject, backgroundObject = this.backgroundImage, overlayObject = this.overlayImage, object, i, len;
        this.viewportTransform = vpt;
        for (i = 0, len = this._objects.length; i < len; i++) {
          object = this._objects[i];
          object.group || object.setCoords(true);
        }
        if (activeObject) {
          activeObject.setCoords();
        }
        if (backgroundObject) {
          backgroundObject.setCoords(true);
        }
        if (overlayObject) {
          overlayObject.setCoords(true);
        }
        this.calcViewportBoundaries();
        this.renderOnAddRemove && this.requestRenderAll();
        return this;
      },
      zoomToPoint: function(point, value) {
        var before = point, vpt = this.viewportTransform.slice(0);
        point = transformPoint(point, invertTransform(this.viewportTransform));
        vpt[0] = value;
        vpt[3] = value;
        var after = transformPoint(point, vpt);
        vpt[4] += before.x - after.x;
        vpt[5] += before.y - after.y;
        return this.setViewportTransform(vpt);
      },
      setZoom: function(value) {
        this.zoomToPoint(new fabric2.Point(0, 0), value);
        return this;
      },
      absolutePan: function(point) {
        var vpt = this.viewportTransform.slice(0);
        vpt[4] = -point.x;
        vpt[5] = -point.y;
        return this.setViewportTransform(vpt);
      },
      relativePan: function(point) {
        return this.absolutePan(new fabric2.Point(
          -point.x - this.viewportTransform[4],
          -point.y - this.viewportTransform[5]
        ));
      },
      getElement: function() {
        return this.lowerCanvasEl;
      },
      _onObjectAdded: function(obj) {
        this.stateful && obj.setupState();
        obj._set("canvas", this);
        obj.setCoords();
        this.fire("object:added", { target: obj });
        obj.fire("added");
      },
      _onObjectRemoved: function(obj) {
        this.fire("object:removed", { target: obj });
        obj.fire("removed");
        delete obj.canvas;
      },
      clearContext: function(ctx) {
        ctx.clearRect(0, 0, this.width, this.height);
        return this;
      },
      getContext: function() {
        return this.contextContainer;
      },
      clear: function() {
        this.remove.apply(this, this.getObjects());
        this.backgroundImage = null;
        this.overlayImage = null;
        this.backgroundColor = "";
        this.overlayColor = "";
        if (this._hasITextHandlers) {
          this.off("mouse:up", this._mouseUpITextHandler);
          this._iTextInstances = null;
          this._hasITextHandlers = false;
        }
        this.clearContext(this.contextContainer);
        this.fire("canvas:cleared");
        this.renderOnAddRemove && this.requestRenderAll();
        return this;
      },
      renderAll: function() {
        var canvasToDrawOn = this.contextContainer;
        this.renderCanvas(canvasToDrawOn, this._objects);
        return this;
      },
      renderAndReset: function() {
        this.isRendering = 0;
        this.renderAll();
      },
      requestRenderAll: function() {
        if (!this.isRendering) {
          this.isRendering = fabric2.util.requestAnimFrame(this.renderAndResetBound);
        }
        return this;
      },
      calcViewportBoundaries: function() {
        var points = {}, width = this.width, height = this.height, iVpt = invertTransform(this.viewportTransform);
        points.tl = transformPoint({ x: 0, y: 0 }, iVpt);
        points.br = transformPoint({ x: width, y: height }, iVpt);
        points.tr = new fabric2.Point(points.br.x, points.tl.y);
        points.bl = new fabric2.Point(points.tl.x, points.br.y);
        this.vptCoords = points;
        return points;
      },
      cancelRequestedRender: function() {
        if (this.isRendering) {
          fabric2.util.cancelAnimFrame(this.isRendering);
          this.isRendering = 0;
        }
      },
      renderCanvas: function(ctx, objects) {
        var v = this.viewportTransform, path = this.clipPath;
        this.cancelRequestedRender();
        this.calcViewportBoundaries();
        this.clearContext(ctx);
        fabric2.util.setImageSmoothing(ctx, this.imageSmoothingEnabled);
        this.fire("before:render", { ctx });
        this._renderBackground(ctx);
        ctx.save();
        ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
        this._renderObjects(ctx, objects);
        ctx.restore();
        if (!this.controlsAboveOverlay && this.interactive) {
          this.drawControls(ctx);
        }
        if (path) {
          path.canvas = this;
          path.shouldCache();
          path._transformDone = true;
          path.renderCache({ forClipping: true });
          this.drawClipPathOnCanvas(ctx);
        }
        this._renderOverlay(ctx);
        if (this.controlsAboveOverlay && this.interactive) {
          this.drawControls(ctx);
        }
        this.fire("after:render", { ctx });
      },
      drawClipPathOnCanvas: function(ctx) {
        var v = this.viewportTransform, path = this.clipPath;
        ctx.save();
        ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
        ctx.globalCompositeOperation = "destination-in";
        path.transform(ctx);
        ctx.scale(1 / path.zoomX, 1 / path.zoomY);
        ctx.drawImage(path._cacheCanvas, -path.cacheTranslationX, -path.cacheTranslationY);
        ctx.restore();
      },
      _renderObjects: function(ctx, objects) {
        var i, len;
        for (i = 0, len = objects.length; i < len; ++i) {
          objects[i] && objects[i].render(ctx);
        }
      },
      _renderBackgroundOrOverlay: function(ctx, property) {
        var fill = this[property + "Color"], object = this[property + "Image"], v = this.viewportTransform, needsVpt = this[property + "Vpt"];
        if (!fill && !object) {
          return;
        }
        if (fill) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(this.width, 0);
          ctx.lineTo(this.width, this.height);
          ctx.lineTo(0, this.height);
          ctx.closePath();
          ctx.fillStyle = fill.toLive ? fill.toLive(ctx, this) : fill;
          if (needsVpt) {
            ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
          }
          ctx.transform(1, 0, 0, 1, fill.offsetX || 0, fill.offsetY || 0);
          var m = fill.gradientTransform || fill.patternTransform;
          m && ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
          ctx.fill();
          ctx.restore();
        }
        if (object) {
          ctx.save();
          if (needsVpt) {
            ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
          }
          object.render(ctx);
          ctx.restore();
        }
      },
      _renderBackground: function(ctx) {
        this._renderBackgroundOrOverlay(ctx, "background");
      },
      _renderOverlay: function(ctx) {
        this._renderBackgroundOrOverlay(ctx, "overlay");
      },
      getCenter: function() {
        return {
          top: this.height / 2,
          left: this.width / 2
        };
      },
      getCenterPoint: function() {
        return new fabric2.Point(this.width / 2, this.height / 2);
      },
      centerObjectH: function(object) {
        return this._centerObject(object, new fabric2.Point(this.getCenterPoint().x, object.getCenterPoint().y));
      },
      centerObjectV: function(object) {
        return this._centerObject(object, new fabric2.Point(object.getCenterPoint().x, this.getCenterPoint().y));
      },
      centerObject: function(object) {
        var center = this.getCenterPoint();
        return this._centerObject(object, center);
      },
      viewportCenterObject: function(object) {
        var vpCenter = this.getVpCenter();
        return this._centerObject(object, vpCenter);
      },
      viewportCenterObjectH: function(object) {
        var vpCenter = this.getVpCenter();
        this._centerObject(object, new fabric2.Point(vpCenter.x, object.getCenterPoint().y));
        return this;
      },
      viewportCenterObjectV: function(object) {
        var vpCenter = this.getVpCenter();
        return this._centerObject(object, new fabric2.Point(object.getCenterPoint().x, vpCenter.y));
      },
      getVpCenter: function() {
        var center = this.getCenterPoint(), iVpt = invertTransform(this.viewportTransform);
        return transformPoint(center, iVpt);
      },
      _centerObject: function(object, center) {
        object.setPositionByOrigin(center, "center", "center");
        object.setCoords();
        this.renderOnAddRemove && this.requestRenderAll();
        return this;
      },
      toDatalessJSON: function(propertiesToInclude) {
        return this.toDatalessObject(propertiesToInclude);
      },
      toObject: function(propertiesToInclude) {
        return this._toObjectMethod("toObject", propertiesToInclude);
      },
      toDatalessObject: function(propertiesToInclude) {
        return this._toObjectMethod("toDatalessObject", propertiesToInclude);
      },
      _toObjectMethod: function(methodName, propertiesToInclude) {
        var clipPath = this.clipPath, data = {
          version: fabric2.version,
          objects: this._toObjects(methodName, propertiesToInclude)
        };
        if (clipPath && !clipPath.excludeFromExport) {
          data.clipPath = this._toObject(this.clipPath, methodName, propertiesToInclude);
        }
        extend(data, this.__serializeBgOverlay(methodName, propertiesToInclude));
        fabric2.util.populateWithProperties(this, data, propertiesToInclude);
        return data;
      },
      _toObjects: function(methodName, propertiesToInclude) {
        return this._objects.filter(function(object) {
          return !object.excludeFromExport;
        }).map(function(instance) {
          return this._toObject(instance, methodName, propertiesToInclude);
        }, this);
      },
      _toObject: function(instance, methodName, propertiesToInclude) {
        var originalValue;
        if (!this.includeDefaultValues) {
          originalValue = instance.includeDefaultValues;
          instance.includeDefaultValues = false;
        }
        var object = instance[methodName](propertiesToInclude);
        if (!this.includeDefaultValues) {
          instance.includeDefaultValues = originalValue;
        }
        return object;
      },
      __serializeBgOverlay: function(methodName, propertiesToInclude) {
        var data = {}, bgImage = this.backgroundImage, overlayImage = this.overlayImage, bgColor = this.backgroundColor, overlayColor = this.overlayColor;
        if (bgColor && bgColor.toObject) {
          if (!bgColor.excludeFromExport) {
            data.background = bgColor.toObject(propertiesToInclude);
          }
        } else if (bgColor) {
          data.background = bgColor;
        }
        if (overlayColor && overlayColor.toObject) {
          if (!overlayColor.excludeFromExport) {
            data.overlay = overlayColor.toObject(propertiesToInclude);
          }
        } else if (overlayColor) {
          data.overlay = overlayColor;
        }
        if (bgImage && !bgImage.excludeFromExport) {
          data.backgroundImage = this._toObject(bgImage, methodName, propertiesToInclude);
        }
        if (overlayImage && !overlayImage.excludeFromExport) {
          data.overlayImage = this._toObject(overlayImage, methodName, propertiesToInclude);
        }
        return data;
      },
      svgViewportTransformation: true,
      toSVG: function(options, reviver) {
        options || (options = {});
        options.reviver = reviver;
        var markup = [];
        this._setSVGPreamble(markup, options);
        this._setSVGHeader(markup, options);
        if (this.clipPath) {
          markup.push('<g clip-path="url(#' + this.clipPath.clipPathId + ')" >\n');
        }
        this._setSVGBgOverlayColor(markup, "background");
        this._setSVGBgOverlayImage(markup, "backgroundImage", reviver);
        this._setSVGObjects(markup, reviver);
        if (this.clipPath) {
          markup.push("</g>\n");
        }
        this._setSVGBgOverlayColor(markup, "overlay");
        this._setSVGBgOverlayImage(markup, "overlayImage", reviver);
        markup.push("</svg>");
        return markup.join("");
      },
      _setSVGPreamble: function(markup, options) {
        if (options.suppressPreamble) {
          return;
        }
        markup.push(
          '<?xml version="1.0" encoding="',
          options.encoding || "UTF-8",
          '" standalone="no" ?>\n',
          '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ',
          '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n'
        );
      },
      _setSVGHeader: function(markup, options) {
        var width = options.width || this.width, height = options.height || this.height, vpt, viewBox = 'viewBox="0 0 ' + this.width + " " + this.height + '" ', NUM_FRACTION_DIGITS = fabric2.Object.NUM_FRACTION_DIGITS;
        if (options.viewBox) {
          viewBox = 'viewBox="' + options.viewBox.x + " " + options.viewBox.y + " " + options.viewBox.width + " " + options.viewBox.height + '" ';
        } else {
          if (this.svgViewportTransformation) {
            vpt = this.viewportTransform;
            viewBox = 'viewBox="' + toFixed(-vpt[4] / vpt[0], NUM_FRACTION_DIGITS) + " " + toFixed(-vpt[5] / vpt[3], NUM_FRACTION_DIGITS) + " " + toFixed(this.width / vpt[0], NUM_FRACTION_DIGITS) + " " + toFixed(this.height / vpt[3], NUM_FRACTION_DIGITS) + '" ';
          }
        }
        markup.push(
          "<svg ",
          'xmlns="http://www.w3.org/2000/svg" ',
          'xmlns:xlink="http://www.w3.org/1999/xlink" ',
          'version="1.1" ',
          'width="',
          width,
          '" ',
          'height="',
          height,
          '" ',
          viewBox,
          'xml:space="preserve">\n',
          "<desc>Created with Fabric.js ",
          fabric2.version,
          "</desc>\n",
          "<defs>\n",
          this.createSVGFontFacesMarkup(),
          this.createSVGRefElementsMarkup(),
          this.createSVGClipPathMarkup(options),
          "</defs>\n"
        );
      },
      createSVGClipPathMarkup: function(options) {
        var clipPath = this.clipPath;
        if (clipPath) {
          clipPath.clipPathId = "CLIPPATH_" + fabric2.Object.__uid++;
          return '<clipPath id="' + clipPath.clipPathId + '" >\n' + this.clipPath.toClipPathSVG(options.reviver) + "</clipPath>\n";
        }
        return "";
      },
      createSVGRefElementsMarkup: function() {
        var _this = this, markup = ["background", "overlay"].map(function(prop) {
          var fill = _this[prop + "Color"];
          if (fill && fill.toLive) {
            var shouldTransform = _this[prop + "Vpt"], vpt = _this.viewportTransform, object = {
              width: _this.width / (shouldTransform ? vpt[0] : 1),
              height: _this.height / (shouldTransform ? vpt[3] : 1)
            };
            return fill.toSVG(
              object,
              { additionalTransform: shouldTransform ? fabric2.util.matrixToSVG(vpt) : "" }
            );
          }
        });
        return markup.join("");
      },
      createSVGFontFacesMarkup: function() {
        var markup = "", fontList = {}, obj, fontFamily, style, row, rowIndex, _char, charIndex, i, len, fontPaths = fabric2.fontPaths, objects = [];
        this._objects.forEach(function add(object) {
          objects.push(object);
          if (object._objects) {
            object._objects.forEach(add);
          }
        });
        for (i = 0, len = objects.length; i < len; i++) {
          obj = objects[i];
          fontFamily = obj.fontFamily;
          if (obj.type.indexOf("text") === -1 || fontList[fontFamily] || !fontPaths[fontFamily]) {
            continue;
          }
          fontList[fontFamily] = true;
          if (!obj.styles) {
            continue;
          }
          style = obj.styles;
          for (rowIndex in style) {
            row = style[rowIndex];
            for (charIndex in row) {
              _char = row[charIndex];
              fontFamily = _char.fontFamily;
              if (!fontList[fontFamily] && fontPaths[fontFamily]) {
                fontList[fontFamily] = true;
              }
            }
          }
        }
        for (var j in fontList) {
          markup += [
            "		@font-face {\n",
            "			font-family: '",
            j,
            "';\n",
            "			src: url('",
            fontPaths[j],
            "');\n",
            "		}\n"
          ].join("");
        }
        if (markup) {
          markup = [
            '	<style type="text/css">',
            "<![CDATA[\n",
            markup,
            "]]>",
            "</style>\n"
          ].join("");
        }
        return markup;
      },
      _setSVGObjects: function(markup, reviver) {
        var instance, i, len, objects = this._objects;
        for (i = 0, len = objects.length; i < len; i++) {
          instance = objects[i];
          if (instance.excludeFromExport) {
            continue;
          }
          this._setSVGObject(markup, instance, reviver);
        }
      },
      _setSVGObject: function(markup, instance, reviver) {
        markup.push(instance.toSVG(reviver));
      },
      _setSVGBgOverlayImage: function(markup, property, reviver) {
        if (this[property] && !this[property].excludeFromExport && this[property].toSVG) {
          markup.push(this[property].toSVG(reviver));
        }
      },
      _setSVGBgOverlayColor: function(markup, property) {
        var filler = this[property + "Color"], vpt = this.viewportTransform, finalWidth = this.width, finalHeight = this.height;
        if (!filler) {
          return;
        }
        if (filler.toLive) {
          var repeat = filler.repeat, iVpt = fabric2.util.invertTransform(vpt), shouldInvert = this[property + "Vpt"], additionalTransform = shouldInvert ? fabric2.util.matrixToSVG(iVpt) : "";
          markup.push(
            '<rect transform="' + additionalTransform + " translate(",
            finalWidth / 2,
            ",",
            finalHeight / 2,
            ')"',
            ' x="',
            filler.offsetX - finalWidth / 2,
            '" y="',
            filler.offsetY - finalHeight / 2,
            '" ',
            'width="',
            repeat === "repeat-y" || repeat === "no-repeat" ? filler.source.width : finalWidth,
            '" height="',
            repeat === "repeat-x" || repeat === "no-repeat" ? filler.source.height : finalHeight,
            '" fill="url(#SVGID_' + filler.id + ')"',
            "></rect>\n"
          );
        } else {
          markup.push(
            '<rect x="0" y="0" width="100%" height="100%" ',
            'fill="',
            filler,
            '"',
            "></rect>\n"
          );
        }
      },
      sendToBack: function(object) {
        if (!object) {
          return this;
        }
        var activeSelection = this._activeObject, i, obj, objs;
        if (object === activeSelection && object.type === "activeSelection") {
          objs = activeSelection._objects;
          for (i = objs.length; i--; ) {
            obj = objs[i];
            removeFromArray(this._objects, obj);
            this._objects.unshift(obj);
          }
        } else {
          removeFromArray(this._objects, object);
          this._objects.unshift(object);
        }
        this.renderOnAddRemove && this.requestRenderAll();
        return this;
      },
      bringToFront: function(object) {
        if (!object) {
          return this;
        }
        var activeSelection = this._activeObject, i, obj, objs;
        if (object === activeSelection && object.type === "activeSelection") {
          objs = activeSelection._objects;
          for (i = 0; i < objs.length; i++) {
            obj = objs[i];
            removeFromArray(this._objects, obj);
            this._objects.push(obj);
          }
        } else {
          removeFromArray(this._objects, object);
          this._objects.push(object);
        }
        this.renderOnAddRemove && this.requestRenderAll();
        return this;
      },
      sendBackwards: function(object, intersecting) {
        if (!object) {
          return this;
        }
        var activeSelection = this._activeObject, i, obj, idx, newIdx, objs, objsMoved = 0;
        if (object === activeSelection && object.type === "activeSelection") {
          objs = activeSelection._objects;
          for (i = 0; i < objs.length; i++) {
            obj = objs[i];
            idx = this._objects.indexOf(obj);
            if (idx > 0 + objsMoved) {
              newIdx = idx - 1;
              removeFromArray(this._objects, obj);
              this._objects.splice(newIdx, 0, obj);
            }
            objsMoved++;
          }
        } else {
          idx = this._objects.indexOf(object);
          if (idx !== 0) {
            newIdx = this._findNewLowerIndex(object, idx, intersecting);
            removeFromArray(this._objects, object);
            this._objects.splice(newIdx, 0, object);
          }
        }
        this.renderOnAddRemove && this.requestRenderAll();
        return this;
      },
      _findNewLowerIndex: function(object, idx, intersecting) {
        var newIdx, i;
        if (intersecting) {
          newIdx = idx;
          for (i = idx - 1; i >= 0; --i) {
            var isIntersecting = object.intersectsWithObject(this._objects[i]) || object.isContainedWithinObject(this._objects[i]) || this._objects[i].isContainedWithinObject(object);
            if (isIntersecting) {
              newIdx = i;
              break;
            }
          }
        } else {
          newIdx = idx - 1;
        }
        return newIdx;
      },
      bringForward: function(object, intersecting) {
        if (!object) {
          return this;
        }
        var activeSelection = this._activeObject, i, obj, idx, newIdx, objs, objsMoved = 0;
        if (object === activeSelection && object.type === "activeSelection") {
          objs = activeSelection._objects;
          for (i = objs.length; i--; ) {
            obj = objs[i];
            idx = this._objects.indexOf(obj);
            if (idx < this._objects.length - 1 - objsMoved) {
              newIdx = idx + 1;
              removeFromArray(this._objects, obj);
              this._objects.splice(newIdx, 0, obj);
            }
            objsMoved++;
          }
        } else {
          idx = this._objects.indexOf(object);
          if (idx !== this._objects.length - 1) {
            newIdx = this._findNewUpperIndex(object, idx, intersecting);
            removeFromArray(this._objects, object);
            this._objects.splice(newIdx, 0, object);
          }
        }
        this.renderOnAddRemove && this.requestRenderAll();
        return this;
      },
      _findNewUpperIndex: function(object, idx, intersecting) {
        var newIdx, i, len;
        if (intersecting) {
          newIdx = idx;
          for (i = idx + 1, len = this._objects.length; i < len; ++i) {
            var isIntersecting = object.intersectsWithObject(this._objects[i]) || object.isContainedWithinObject(this._objects[i]) || this._objects[i].isContainedWithinObject(object);
            if (isIntersecting) {
              newIdx = i;
              break;
            }
          }
        } else {
          newIdx = idx + 1;
        }
        return newIdx;
      },
      moveTo: function(object, index) {
        removeFromArray(this._objects, object);
        this._objects.splice(index, 0, object);
        return this.renderOnAddRemove && this.requestRenderAll();
      },
      dispose: function() {
        if (this.isRendering) {
          fabric2.util.cancelAnimFrame(this.isRendering);
          this.isRendering = 0;
        }
        this.forEachObject(function(object) {
          object.dispose && object.dispose();
        });
        this._objects = [];
        if (this.backgroundImage && this.backgroundImage.dispose) {
          this.backgroundImage.dispose();
        }
        this.backgroundImage = null;
        if (this.overlayImage && this.overlayImage.dispose) {
          this.overlayImage.dispose();
        }
        this.overlayImage = null;
        this._iTextInstances = null;
        this.contextContainer = null;
        this.lowerCanvasEl.classList.remove("lower-canvas");
        fabric2.util.setStyle(this.lowerCanvasEl, this._originalCanvasStyle);
        delete this._originalCanvasStyle;
        this.lowerCanvasEl.setAttribute("width", this.width);
        this.lowerCanvasEl.setAttribute("height", this.height);
        fabric2.util.cleanUpJsdomNode(this.lowerCanvasEl);
        this.lowerCanvasEl = void 0;
        return this;
      },
      toString: function() {
        return "#<fabric.Canvas (" + this.complexity() + "): { objects: " + this._objects.length + " }>";
      }
    });
    extend(fabric2.StaticCanvas.prototype, fabric2.Observable);
    extend(fabric2.StaticCanvas.prototype, fabric2.Collection);
    extend(fabric2.StaticCanvas.prototype, fabric2.DataURLExporter);
    extend(fabric2.StaticCanvas, {
      EMPTY_JSON: '{"objects": [], "background": "white"}',
      supports: function(methodName) {
        var el = createCanvasElement();
        if (!el || !el.getContext) {
          return null;
        }
        var ctx = el.getContext("2d");
        if (!ctx) {
          return null;
        }
        switch (methodName) {
          case "setLineDash":
            return typeof ctx.setLineDash !== "undefined";
          default:
            return null;
        }
      }
    });
    fabric2.StaticCanvas.prototype.toJSON = fabric2.StaticCanvas.prototype.toObject;
    if (fabric2.isLikelyNode) {
      fabric2.StaticCanvas.prototype.createPNGStream = function() {
        var impl = getNodeCanvas(this.lowerCanvasEl);
        return impl && impl.createPNGStream();
      };
      fabric2.StaticCanvas.prototype.createJPEGStream = function(opts) {
        var impl = getNodeCanvas(this.lowerCanvasEl);
        return impl && impl.createJPEGStream(opts);
      };
    }
  })();
  fabric2.BaseBrush = fabric2.util.createClass({
    color: "rgb(0, 0, 0)",
    width: 1,
    shadow: null,
    strokeLineCap: "round",
    strokeLineJoin: "round",
    strokeMiterLimit: 10,
    strokeDashArray: null,
    limitedToCanvasSize: false,
    _setBrushStyles: function(ctx) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.width;
      ctx.lineCap = this.strokeLineCap;
      ctx.miterLimit = this.strokeMiterLimit;
      ctx.lineJoin = this.strokeLineJoin;
      ctx.setLineDash(this.strokeDashArray || []);
    },
    _saveAndTransform: function(ctx) {
      var v = this.canvas.viewportTransform;
      ctx.save();
      ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
    },
    _setShadow: function() {
      if (!this.shadow) {
        return;
      }
      var canvas2 = this.canvas, shadow = this.shadow, ctx = canvas2.contextTop, zoom = canvas2.getZoom();
      if (canvas2 && canvas2._isRetinaScaling()) {
        zoom *= fabric2.devicePixelRatio;
      }
      ctx.shadowColor = shadow.color;
      ctx.shadowBlur = shadow.blur * zoom;
      ctx.shadowOffsetX = shadow.offsetX * zoom;
      ctx.shadowOffsetY = shadow.offsetY * zoom;
    },
    needsFullRender: function() {
      var color = new fabric2.Color(this.color);
      return color.getAlpha() < 1 || !!this.shadow;
    },
    _resetShadow: function() {
      var ctx = this.canvas.contextTop;
      ctx.shadowColor = "";
      ctx.shadowBlur = ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
    },
    _isOutSideCanvas: function(pointer) {
      return pointer.x < 0 || pointer.x > this.canvas.getWidth() || pointer.y < 0 || pointer.y > this.canvas.getHeight();
    }
  });
  (function() {
    fabric2.PencilBrush = fabric2.util.createClass(fabric2.BaseBrush, {
      decimate: 0.4,
      drawStraightLine: false,
      straightLineKey: "shiftKey",
      initialize: function(canvas2) {
        this.canvas = canvas2;
        this._points = [];
      },
      needsFullRender: function() {
        return this.callSuper("needsFullRender") || this._hasStraightLine;
      },
      _drawSegment: function(ctx, p1, p2) {
        var midPoint = p1.midPointFrom(p2);
        ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
        return midPoint;
      },
      onMouseDown: function(pointer, options) {
        if (!this.canvas._isMainEvent(options.e)) {
          return;
        }
        this.drawStraightLine = options.e[this.straightLineKey];
        this._prepareForDrawing(pointer);
        this._captureDrawingPath(pointer);
        this._render();
      },
      onMouseMove: function(pointer, options) {
        if (!this.canvas._isMainEvent(options.e)) {
          return;
        }
        this.drawStraightLine = options.e[this.straightLineKey];
        if (this.limitedToCanvasSize === true && this._isOutSideCanvas(pointer)) {
          return;
        }
        if (this._captureDrawingPath(pointer) && this._points.length > 1) {
          if (this.needsFullRender()) {
            this.canvas.clearContext(this.canvas.contextTop);
            this._render();
          } else {
            var points = this._points, length = points.length, ctx = this.canvas.contextTop;
            this._saveAndTransform(ctx);
            if (this.oldEnd) {
              ctx.beginPath();
              ctx.moveTo(this.oldEnd.x, this.oldEnd.y);
            }
            this.oldEnd = this._drawSegment(ctx, points[length - 2], points[length - 1], true);
            ctx.stroke();
            ctx.restore();
          }
        }
      },
      onMouseUp: function(options) {
        if (!this.canvas._isMainEvent(options.e)) {
          return true;
        }
        this.drawStraightLine = false;
        this.oldEnd = void 0;
        this._finalizeAndAddPath();
        return false;
      },
      _prepareForDrawing: function(pointer) {
        var p = new fabric2.Point(pointer.x, pointer.y);
        this._reset();
        this._addPoint(p);
        this.canvas.contextTop.moveTo(p.x, p.y);
      },
      _addPoint: function(point) {
        if (this._points.length > 1 && point.eq(this._points[this._points.length - 1])) {
          return false;
        }
        if (this.drawStraightLine && this._points.length > 1) {
          this._hasStraightLine = true;
          this._points.pop();
        }
        this._points.push(point);
        return true;
      },
      _reset: function() {
        this._points = [];
        this._setBrushStyles(this.canvas.contextTop);
        this._setShadow();
        this._hasStraightLine = false;
      },
      _captureDrawingPath: function(pointer) {
        var pointerPoint = new fabric2.Point(pointer.x, pointer.y);
        return this._addPoint(pointerPoint);
      },
      _render: function(ctx) {
        var i, len, p1 = this._points[0], p2 = this._points[1];
        ctx = ctx || this.canvas.contextTop;
        this._saveAndTransform(ctx);
        ctx.beginPath();
        if (this._points.length === 2 && p1.x === p2.x && p1.y === p2.y) {
          var width = this.width / 1e3;
          p1 = new fabric2.Point(p1.x, p1.y);
          p2 = new fabric2.Point(p2.x, p2.y);
          p1.x -= width;
          p2.x += width;
        }
        ctx.moveTo(p1.x, p1.y);
        for (i = 1, len = this._points.length; i < len; i++) {
          this._drawSegment(ctx, p1, p2);
          p1 = this._points[i];
          p2 = this._points[i + 1];
        }
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        ctx.restore();
      },
      convertPointsToSVGPath: function(points) {
        var correction = this.width / 1e3;
        return fabric2.util.getSmoothPathFromPoints(points, correction);
      },
      _isEmptySVGPath: function(pathData) {
        var pathString = fabric2.util.joinPath(pathData);
        return pathString === "M 0 0 Q 0 0 0 0 L 0 0";
      },
      createPath: function(pathData) {
        var path = new fabric2.Path(pathData, {
          fill: null,
          stroke: this.color,
          strokeWidth: this.width,
          strokeLineCap: this.strokeLineCap,
          strokeMiterLimit: this.strokeMiterLimit,
          strokeLineJoin: this.strokeLineJoin,
          strokeDashArray: this.strokeDashArray
        });
        if (this.shadow) {
          this.shadow.affectStroke = true;
          path.shadow = new fabric2.Shadow(this.shadow);
        }
        return path;
      },
      decimatePoints: function(points, distance) {
        if (points.length <= 2) {
          return points;
        }
        var zoom = this.canvas.getZoom(), adjustedDistance = Math.pow(distance / zoom, 2), i, l = points.length - 1, lastPoint = points[0], newPoints = [lastPoint], cDistance;
        for (i = 1; i < l - 1; i++) {
          cDistance = Math.pow(lastPoint.x - points[i].x, 2) + Math.pow(lastPoint.y - points[i].y, 2);
          if (cDistance >= adjustedDistance) {
            lastPoint = points[i];
            newPoints.push(lastPoint);
          }
        }
        newPoints.push(points[l]);
        return newPoints;
      },
      _finalizeAndAddPath: function() {
        var ctx = this.canvas.contextTop;
        ctx.closePath();
        if (this.decimate) {
          this._points = this.decimatePoints(this._points, this.decimate);
        }
        var pathData = this.convertPointsToSVGPath(this._points);
        if (this._isEmptySVGPath(pathData)) {
          this.canvas.requestRenderAll();
          return;
        }
        var path = this.createPath(pathData);
        this.canvas.clearContext(this.canvas.contextTop);
        this.canvas.fire("before:path:created", { path });
        this.canvas.add(path);
        this.canvas.requestRenderAll();
        path.setCoords();
        this._resetShadow();
        this.canvas.fire("path:created", { path });
      }
    });
  })();
  fabric2.CircleBrush = fabric2.util.createClass(fabric2.BaseBrush, {
    width: 10,
    initialize: function(canvas2) {
      this.canvas = canvas2;
      this.points = [];
    },
    drawDot: function(pointer) {
      var point = this.addPoint(pointer), ctx = this.canvas.contextTop;
      this._saveAndTransform(ctx);
      this.dot(ctx, point);
      ctx.restore();
    },
    dot: function(ctx, point) {
      ctx.fillStyle = point.fill;
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    },
    onMouseDown: function(pointer) {
      this.points.length = 0;
      this.canvas.clearContext(this.canvas.contextTop);
      this._setShadow();
      this.drawDot(pointer);
    },
    _render: function() {
      var ctx = this.canvas.contextTop, i, len, points = this.points;
      this._saveAndTransform(ctx);
      for (i = 0, len = points.length; i < len; i++) {
        this.dot(ctx, points[i]);
      }
      ctx.restore();
    },
    onMouseMove: function(pointer) {
      if (this.limitedToCanvasSize === true && this._isOutSideCanvas(pointer)) {
        return;
      }
      if (this.needsFullRender()) {
        this.canvas.clearContext(this.canvas.contextTop);
        this.addPoint(pointer);
        this._render();
      } else {
        this.drawDot(pointer);
      }
    },
    onMouseUp: function() {
      var originalRenderOnAddRemove = this.canvas.renderOnAddRemove, i, len;
      this.canvas.renderOnAddRemove = false;
      var circles = [];
      for (i = 0, len = this.points.length; i < len; i++) {
        var point = this.points[i], circle = new fabric2.Circle({
          radius: point.radius,
          left: point.x,
          top: point.y,
          originX: "center",
          originY: "center",
          fill: point.fill
        });
        this.shadow && (circle.shadow = new fabric2.Shadow(this.shadow));
        circles.push(circle);
      }
      var group = new fabric2.Group(circles);
      group.canvas = this.canvas;
      this.canvas.fire("before:path:created", { path: group });
      this.canvas.add(group);
      this.canvas.fire("path:created", { path: group });
      this.canvas.clearContext(this.canvas.contextTop);
      this._resetShadow();
      this.canvas.renderOnAddRemove = originalRenderOnAddRemove;
      this.canvas.requestRenderAll();
    },
    addPoint: function(pointer) {
      var pointerPoint = new fabric2.Point(pointer.x, pointer.y), circleRadius = fabric2.util.getRandomInt(
        Math.max(0, this.width - 20),
        this.width + 20
      ) / 2, circleColor = new fabric2.Color(this.color).setAlpha(fabric2.util.getRandomInt(0, 100) / 100).toRgba();
      pointerPoint.radius = circleRadius;
      pointerPoint.fill = circleColor;
      this.points.push(pointerPoint);
      return pointerPoint;
    }
  });
  fabric2.SprayBrush = fabric2.util.createClass(fabric2.BaseBrush, {
    width: 10,
    density: 20,
    dotWidth: 1,
    dotWidthVariance: 1,
    randomOpacity: false,
    optimizeOverlapping: true,
    initialize: function(canvas2) {
      this.canvas = canvas2;
      this.sprayChunks = [];
    },
    onMouseDown: function(pointer) {
      this.sprayChunks.length = 0;
      this.canvas.clearContext(this.canvas.contextTop);
      this._setShadow();
      this.addSprayChunk(pointer);
      this.render(this.sprayChunkPoints);
    },
    onMouseMove: function(pointer) {
      if (this.limitedToCanvasSize === true && this._isOutSideCanvas(pointer)) {
        return;
      }
      this.addSprayChunk(pointer);
      this.render(this.sprayChunkPoints);
    },
    onMouseUp: function() {
      var originalRenderOnAddRemove = this.canvas.renderOnAddRemove;
      this.canvas.renderOnAddRemove = false;
      var rects = [];
      for (var i = 0, ilen = this.sprayChunks.length; i < ilen; i++) {
        var sprayChunk = this.sprayChunks[i];
        for (var j = 0, jlen = sprayChunk.length; j < jlen; j++) {
          var rect = new fabric2.Rect({
            width: sprayChunk[j].width,
            height: sprayChunk[j].width,
            left: sprayChunk[j].x + 1,
            top: sprayChunk[j].y + 1,
            originX: "center",
            originY: "center",
            fill: this.color
          });
          rects.push(rect);
        }
      }
      if (this.optimizeOverlapping) {
        rects = this._getOptimizedRects(rects);
      }
      var group = new fabric2.Group(rects);
      this.shadow && group.set("shadow", new fabric2.Shadow(this.shadow));
      this.canvas.fire("before:path:created", { path: group });
      this.canvas.add(group);
      this.canvas.fire("path:created", { path: group });
      this.canvas.clearContext(this.canvas.contextTop);
      this._resetShadow();
      this.canvas.renderOnAddRemove = originalRenderOnAddRemove;
      this.canvas.requestRenderAll();
    },
    _getOptimizedRects: function(rects) {
      var uniqueRects = {}, key, i, len;
      for (i = 0, len = rects.length; i < len; i++) {
        key = rects[i].left + "" + rects[i].top;
        if (!uniqueRects[key]) {
          uniqueRects[key] = rects[i];
        }
      }
      var uniqueRectsArray = [];
      for (key in uniqueRects) {
        uniqueRectsArray.push(uniqueRects[key]);
      }
      return uniqueRectsArray;
    },
    render: function(sprayChunk) {
      var ctx = this.canvas.contextTop, i, len;
      ctx.fillStyle = this.color;
      this._saveAndTransform(ctx);
      for (i = 0, len = sprayChunk.length; i < len; i++) {
        var point = sprayChunk[i];
        if (typeof point.opacity !== "undefined") {
          ctx.globalAlpha = point.opacity;
        }
        ctx.fillRect(point.x, point.y, point.width, point.width);
      }
      ctx.restore();
    },
    _render: function() {
      var ctx = this.canvas.contextTop, i, ilen;
      ctx.fillStyle = this.color;
      this._saveAndTransform(ctx);
      for (i = 0, ilen = this.sprayChunks.length; i < ilen; i++) {
        this.render(this.sprayChunks[i]);
      }
      ctx.restore();
    },
    addSprayChunk: function(pointer) {
      this.sprayChunkPoints = [];
      var x, y, width, radius = this.width / 2, i;
      for (i = 0; i < this.density; i++) {
        x = fabric2.util.getRandomInt(pointer.x - radius, pointer.x + radius);
        y = fabric2.util.getRandomInt(pointer.y - radius, pointer.y + radius);
        if (this.dotWidthVariance) {
          width = fabric2.util.getRandomInt(
            Math.max(1, this.dotWidth - this.dotWidthVariance),
            this.dotWidth + this.dotWidthVariance
          );
        } else {
          width = this.dotWidth;
        }
        var point = new fabric2.Point(x, y);
        point.width = width;
        if (this.randomOpacity) {
          point.opacity = fabric2.util.getRandomInt(0, 100) / 100;
        }
        this.sprayChunkPoints.push(point);
      }
      this.sprayChunks.push(this.sprayChunkPoints);
    }
  });
  fabric2.PatternBrush = fabric2.util.createClass(fabric2.PencilBrush, {
    getPatternSrc: function() {
      var dotWidth = 20, dotDistance = 5, patternCanvas = fabric2.util.createCanvasElement(), patternCtx = patternCanvas.getContext("2d");
      patternCanvas.width = patternCanvas.height = dotWidth + dotDistance;
      patternCtx.fillStyle = this.color;
      patternCtx.beginPath();
      patternCtx.arc(dotWidth / 2, dotWidth / 2, dotWidth / 2, 0, Math.PI * 2, false);
      patternCtx.closePath();
      patternCtx.fill();
      return patternCanvas;
    },
    getPatternSrcFunction: function() {
      return String(this.getPatternSrc).replace("this.color", '"' + this.color + '"');
    },
    getPattern: function(ctx) {
      return ctx.createPattern(this.source || this.getPatternSrc(), "repeat");
    },
    _setBrushStyles: function(ctx) {
      this.callSuper("_setBrushStyles", ctx);
      ctx.strokeStyle = this.getPattern(ctx);
    },
    createPath: function(pathData) {
      var path = this.callSuper("createPath", pathData), topLeft = path._getLeftTopCoords().scalarAdd(path.strokeWidth / 2);
      path.stroke = new fabric2.Pattern({
        source: this.source || this.getPatternSrcFunction(),
        offsetX: -topLeft.x,
        offsetY: -topLeft.y
      });
      return path;
    }
  });
  (function() {
    var getPointer = fabric2.util.getPointer, degreesToRadians = fabric2.util.degreesToRadians, isTouchEvent = fabric2.util.isTouchEvent;
    fabric2.Canvas = fabric2.util.createClass(fabric2.StaticCanvas, {
      initialize: function(el, options) {
        options || (options = {});
        this.renderAndResetBound = this.renderAndReset.bind(this);
        this.requestRenderAllBound = this.requestRenderAll.bind(this);
        this._initStatic(el, options);
        this._initInteractive();
        this._createCacheCanvas();
      },
      uniformScaling: true,
      uniScaleKey: "shiftKey",
      centeredScaling: false,
      centeredRotation: false,
      centeredKey: "altKey",
      altActionKey: "shiftKey",
      interactive: true,
      selection: true,
      selectionKey: "shiftKey",
      altSelectionKey: null,
      selectionColor: "rgba(100, 100, 255, 0.3)",
      selectionDashArray: [],
      selectionBorderColor: "rgba(255, 255, 255, 0.3)",
      selectionLineWidth: 1,
      selectionFullyContained: false,
      hoverCursor: "move",
      moveCursor: "move",
      defaultCursor: "default",
      freeDrawingCursor: "crosshair",
      notAllowedCursor: "not-allowed",
      containerClass: "canvas-container",
      perPixelTargetFind: false,
      targetFindTolerance: 0,
      skipTargetFind: false,
      isDrawingMode: false,
      preserveObjectStacking: false,
      snapAngle: 0,
      snapThreshold: null,
      stopContextMenu: false,
      fireRightClick: false,
      fireMiddleClick: false,
      targets: [],
      enablePointerEvents: false,
      _hoveredTarget: null,
      _hoveredTargets: [],
      _initInteractive: function() {
        this._currentTransform = null;
        this._groupSelector = null;
        this._initWrapperElement();
        this._createUpperCanvas();
        this._initEventListeners();
        this._initRetinaScaling();
        this.freeDrawingBrush = fabric2.PencilBrush && new fabric2.PencilBrush(this);
        this.calcOffset();
      },
      _chooseObjectsToRender: function() {
        var activeObjects = this.getActiveObjects(), object, objsToRender, activeGroupObjects;
        if (activeObjects.length > 0 && !this.preserveObjectStacking) {
          objsToRender = [];
          activeGroupObjects = [];
          for (var i = 0, length = this._objects.length; i < length; i++) {
            object = this._objects[i];
            if (activeObjects.indexOf(object) === -1) {
              objsToRender.push(object);
            } else {
              activeGroupObjects.push(object);
            }
          }
          if (activeObjects.length > 1) {
            this._activeObject._objects = activeGroupObjects;
          }
          objsToRender.push.apply(objsToRender, activeGroupObjects);
        } else {
          objsToRender = this._objects;
        }
        return objsToRender;
      },
      renderAll: function() {
        if (this.contextTopDirty && !this._groupSelector && !this.isDrawingMode) {
          this.clearContext(this.contextTop);
          this.contextTopDirty = false;
        }
        if (this.hasLostContext) {
          this.renderTopLayer(this.contextTop);
          this.hasLostContext = false;
        }
        var canvasToDrawOn = this.contextContainer;
        this.renderCanvas(canvasToDrawOn, this._chooseObjectsToRender());
        return this;
      },
      renderTopLayer: function(ctx) {
        ctx.save();
        if (this.isDrawingMode && this._isCurrentlyDrawing) {
          this.freeDrawingBrush && this.freeDrawingBrush._render();
          this.contextTopDirty = true;
        }
        if (this.selection && this._groupSelector) {
          this._drawSelection(ctx);
          this.contextTopDirty = true;
        }
        ctx.restore();
      },
      renderTop: function() {
        var ctx = this.contextTop;
        this.clearContext(ctx);
        this.renderTopLayer(ctx);
        this.fire("after:render");
        return this;
      },
      _normalizePointer: function(object, pointer) {
        var m = object.calcTransformMatrix(), invertedM = fabric2.util.invertTransform(m), vptPointer = this.restorePointerVpt(pointer);
        return fabric2.util.transformPoint(vptPointer, invertedM);
      },
      isTargetTransparent: function(target, x, y) {
        if (target.shouldCache() && target._cacheCanvas && target !== this._activeObject) {
          var normalizedPointer = this._normalizePointer(target, { x, y }), targetRelativeX = Math.max(target.cacheTranslationX + normalizedPointer.x * target.zoomX, 0), targetRelativeY = Math.max(target.cacheTranslationY + normalizedPointer.y * target.zoomY, 0);
          var isTransparent = fabric2.util.isTransparent(
            target._cacheContext,
            Math.round(targetRelativeX),
            Math.round(targetRelativeY),
            this.targetFindTolerance
          );
          return isTransparent;
        }
        var ctx = this.contextCache, originalColor = target.selectionBackgroundColor, v = this.viewportTransform;
        target.selectionBackgroundColor = "";
        this.clearContext(ctx);
        ctx.save();
        ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
        target.render(ctx);
        ctx.restore();
        target.selectionBackgroundColor = originalColor;
        var isTransparent = fabric2.util.isTransparent(
          ctx,
          x,
          y,
          this.targetFindTolerance
        );
        return isTransparent;
      },
      _isSelectionKeyPressed: function(e) {
        var selectionKeyPressed = false;
        if (Array.isArray(this.selectionKey)) {
          selectionKeyPressed = !!this.selectionKey.find(function(key) {
            return e[key] === true;
          });
        } else {
          selectionKeyPressed = e[this.selectionKey];
        }
        return selectionKeyPressed;
      },
      _shouldClearSelection: function(e, target) {
        var activeObjects = this.getActiveObjects(), activeObject = this._activeObject;
        return !target || target && activeObject && activeObjects.length > 1 && activeObjects.indexOf(target) === -1 && activeObject !== target && !this._isSelectionKeyPressed(e) || target && !target.evented || target && !target.selectable && activeObject && activeObject !== target;
      },
      _shouldCenterTransform: function(target, action, altKey) {
        if (!target) {
          return;
        }
        var centerTransform;
        if (action === "scale" || action === "scaleX" || action === "scaleY" || action === "resizing") {
          centerTransform = this.centeredScaling || target.centeredScaling;
        } else if (action === "rotate") {
          centerTransform = this.centeredRotation || target.centeredRotation;
        }
        return centerTransform ? !altKey : altKey;
      },
      _getOriginFromCorner: function(target, corner) {
        var origin = {
          x: target.originX,
          y: target.originY
        };
        if (corner === "ml" || corner === "tl" || corner === "bl") {
          origin.x = "right";
        } else if (corner === "mr" || corner === "tr" || corner === "br") {
          origin.x = "left";
        }
        if (corner === "tl" || corner === "mt" || corner === "tr") {
          origin.y = "bottom";
        } else if (corner === "bl" || corner === "mb" || corner === "br") {
          origin.y = "top";
        }
        return origin;
      },
      _getActionFromCorner: function(alreadySelected, corner, e, target) {
        if (!corner || !alreadySelected) {
          return "drag";
        }
        var control = target.controls[corner];
        return control.getActionName(e, control, target);
      },
      _setupCurrentTransform: function(e, target, alreadySelected) {
        if (!target) {
          return;
        }
        var pointer = this.getPointer(e), corner = target.__corner, control = target.controls[corner], actionHandler = alreadySelected && corner ? control.getActionHandler(e, target, control) : fabric2.controlsUtils.dragHandler, action = this._getActionFromCorner(alreadySelected, corner, e, target), origin = this._getOriginFromCorner(target, corner), altKey = e[this.centeredKey], transform = {
          target,
          action,
          actionHandler,
          corner,
          scaleX: target.scaleX,
          scaleY: target.scaleY,
          skewX: target.skewX,
          skewY: target.skewY,
          offsetX: pointer.x - target.left,
          offsetY: pointer.y - target.top,
          originX: origin.x,
          originY: origin.y,
          ex: pointer.x,
          ey: pointer.y,
          lastX: pointer.x,
          lastY: pointer.y,
          theta: degreesToRadians(target.angle),
          width: target.width * target.scaleX,
          shiftKey: e.shiftKey,
          altKey,
          original: fabric2.util.saveObjectTransform(target)
        };
        if (this._shouldCenterTransform(target, action, altKey)) {
          transform.originX = "center";
          transform.originY = "center";
        }
        transform.original.originX = origin.x;
        transform.original.originY = origin.y;
        this._currentTransform = transform;
        this._beforeTransform(e);
      },
      setCursor: function(value) {
        this.upperCanvasEl.style.cursor = value;
      },
      _drawSelection: function(ctx) {
        var selector = this._groupSelector, viewportStart = new fabric2.Point(selector.ex, selector.ey), start = fabric2.util.transformPoint(viewportStart, this.viewportTransform), viewportExtent = new fabric2.Point(selector.ex + selector.left, selector.ey + selector.top), extent = fabric2.util.transformPoint(viewportExtent, this.viewportTransform), minX = Math.min(start.x, extent.x), minY = Math.min(start.y, extent.y), maxX = Math.max(start.x, extent.x), maxY = Math.max(start.y, extent.y), strokeOffset = this.selectionLineWidth / 2;
        if (this.selectionColor) {
          ctx.fillStyle = this.selectionColor;
          ctx.fillRect(minX, minY, maxX - minX, maxY - minY);
        }
        if (!this.selectionLineWidth || !this.selectionBorderColor) {
          return;
        }
        ctx.lineWidth = this.selectionLineWidth;
        ctx.strokeStyle = this.selectionBorderColor;
        minX += strokeOffset;
        minY += strokeOffset;
        maxX -= strokeOffset;
        maxY -= strokeOffset;
        fabric2.Object.prototype._setLineDash.call(this, ctx, this.selectionDashArray);
        ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
      },
      findTarget: function(e, skipGroup) {
        if (this.skipTargetFind) {
          return;
        }
        var ignoreZoom = true, pointer = this.getPointer(e, ignoreZoom), activeObject = this._activeObject, aObjects = this.getActiveObjects(), activeTarget, activeTargetSubs, isTouch = isTouchEvent(e), shouldLookForActive = aObjects.length > 1 && !skipGroup || aObjects.length === 1;
        this.targets = [];
        if (shouldLookForActive && activeObject._findTargetCorner(pointer, isTouch)) {
          return activeObject;
        }
        if (aObjects.length > 1 && !skipGroup && activeObject === this._searchPossibleTargets([activeObject], pointer)) {
          return activeObject;
        }
        if (aObjects.length === 1 && activeObject === this._searchPossibleTargets([activeObject], pointer)) {
          if (!this.preserveObjectStacking) {
            return activeObject;
          } else {
            activeTarget = activeObject;
            activeTargetSubs = this.targets;
            this.targets = [];
          }
        }
        var target = this._searchPossibleTargets(this._objects, pointer);
        if (e[this.altSelectionKey] && target && activeTarget && target !== activeTarget) {
          target = activeTarget;
          this.targets = activeTargetSubs;
        }
        return target;
      },
      _checkTarget: function(pointer, obj, globalPointer) {
        if (obj && obj.visible && obj.evented && obj.containsPoint(pointer)) {
          if ((this.perPixelTargetFind || obj.perPixelTargetFind) && !obj.isEditing) {
            var isTransparent = this.isTargetTransparent(obj, globalPointer.x, globalPointer.y);
            if (!isTransparent) {
              return true;
            }
          } else {
            return true;
          }
        }
      },
      _searchPossibleTargets: function(objects, pointer) {
        var target, i = objects.length, subTarget;
        while (i--) {
          var objToCheck = objects[i];
          var pointerToUse = objToCheck.group ? this._normalizePointer(objToCheck.group, pointer) : pointer;
          if (this._checkTarget(pointerToUse, objToCheck, pointer)) {
            target = objects[i];
            if (target.subTargetCheck && target instanceof fabric2.Group) {
              subTarget = this._searchPossibleTargets(target._objects, pointer);
              subTarget && this.targets.push(subTarget);
            }
            break;
          }
        }
        return target;
      },
      restorePointerVpt: function(pointer) {
        return fabric2.util.transformPoint(
          pointer,
          fabric2.util.invertTransform(this.viewportTransform)
        );
      },
      getPointer: function(e, ignoreZoom) {
        if (this._absolutePointer && !ignoreZoom) {
          return this._absolutePointer;
        }
        if (this._pointer && ignoreZoom) {
          return this._pointer;
        }
        var pointer = getPointer(e), upperCanvasEl = this.upperCanvasEl, bounds = upperCanvasEl.getBoundingClientRect(), boundsWidth = bounds.width || 0, boundsHeight = bounds.height || 0, cssScale;
        if (!boundsWidth || !boundsHeight) {
          if ("top" in bounds && "bottom" in bounds) {
            boundsHeight = Math.abs(bounds.top - bounds.bottom);
          }
          if ("right" in bounds && "left" in bounds) {
            boundsWidth = Math.abs(bounds.right - bounds.left);
          }
        }
        this.calcOffset();
        pointer.x = pointer.x - this._offset.left;
        pointer.y = pointer.y - this._offset.top;
        if (!ignoreZoom) {
          pointer = this.restorePointerVpt(pointer);
        }
        var retinaScaling = this.getRetinaScaling();
        if (retinaScaling !== 1) {
          pointer.x /= retinaScaling;
          pointer.y /= retinaScaling;
        }
        if (boundsWidth === 0 || boundsHeight === 0) {
          cssScale = { width: 1, height: 1 };
        } else {
          cssScale = {
            width: upperCanvasEl.width / boundsWidth,
            height: upperCanvasEl.height / boundsHeight
          };
        }
        return {
          x: pointer.x * cssScale.width,
          y: pointer.y * cssScale.height
        };
      },
      _createUpperCanvas: function() {
        var lowerCanvasClass = this.lowerCanvasEl.className.replace(/\s*lower-canvas\s*/, ""), lowerCanvasEl = this.lowerCanvasEl, upperCanvasEl = this.upperCanvasEl;
        if (upperCanvasEl) {
          upperCanvasEl.className = "";
        } else {
          upperCanvasEl = this._createCanvasElement();
          this.upperCanvasEl = upperCanvasEl;
        }
        fabric2.util.addClass(upperCanvasEl, "upper-canvas " + lowerCanvasClass);
        this.wrapperEl.appendChild(upperCanvasEl);
        this._copyCanvasStyle(lowerCanvasEl, upperCanvasEl);
        this._applyCanvasStyle(upperCanvasEl);
        this.contextTop = upperCanvasEl.getContext("2d");
      },
      getTopContext: function() {
        return this.contextTop;
      },
      _createCacheCanvas: function() {
        this.cacheCanvasEl = this._createCanvasElement();
        this.cacheCanvasEl.setAttribute("width", this.width);
        this.cacheCanvasEl.setAttribute("height", this.height);
        this.contextCache = this.cacheCanvasEl.getContext("2d");
      },
      _initWrapperElement: function() {
        this.wrapperEl = fabric2.util.wrapElement(this.lowerCanvasEl, "div", {
          "class": this.containerClass
        });
        fabric2.util.setStyle(this.wrapperEl, {
          width: this.width + "px",
          height: this.height + "px",
          position: "relative"
        });
        fabric2.util.makeElementUnselectable(this.wrapperEl);
      },
      _applyCanvasStyle: function(element) {
        var width = this.width || element.width, height = this.height || element.height;
        fabric2.util.setStyle(element, {
          position: "absolute",
          width: width + "px",
          height: height + "px",
          left: 0,
          top: 0,
          "touch-action": this.allowTouchScrolling ? "manipulation" : "none",
          "-ms-touch-action": this.allowTouchScrolling ? "manipulation" : "none"
        });
        element.width = width;
        element.height = height;
        fabric2.util.makeElementUnselectable(element);
      },
      _copyCanvasStyle: function(fromEl, toEl) {
        toEl.style.cssText = fromEl.style.cssText;
      },
      getSelectionContext: function() {
        return this.contextTop;
      },
      getSelectionElement: function() {
        return this.upperCanvasEl;
      },
      getActiveObject: function() {
        return this._activeObject;
      },
      getActiveObjects: function() {
        var active = this._activeObject;
        if (active) {
          if (active.type === "activeSelection" && active._objects) {
            return active._objects.slice(0);
          } else {
            return [active];
          }
        }
        return [];
      },
      _onObjectRemoved: function(obj) {
        if (obj === this._activeObject) {
          this.fire("before:selection:cleared", { target: obj });
          this._discardActiveObject();
          this.fire("selection:cleared", { target: obj });
          obj.fire("deselected");
        }
        if (obj === this._hoveredTarget) {
          this._hoveredTarget = null;
          this._hoveredTargets = [];
        }
        this.callSuper("_onObjectRemoved", obj);
      },
      _fireSelectionEvents: function(oldObjects, e) {
        var somethingChanged = false, objects = this.getActiveObjects(), added = [], removed = [];
        oldObjects.forEach(function(oldObject) {
          if (objects.indexOf(oldObject) === -1) {
            somethingChanged = true;
            oldObject.fire("deselected", {
              e,
              target: oldObject
            });
            removed.push(oldObject);
          }
        });
        objects.forEach(function(object) {
          if (oldObjects.indexOf(object) === -1) {
            somethingChanged = true;
            object.fire("selected", {
              e,
              target: object
            });
            added.push(object);
          }
        });
        if (oldObjects.length > 0 && objects.length > 0) {
          somethingChanged && this.fire("selection:updated", {
            e,
            selected: added,
            deselected: removed
          });
        } else if (objects.length > 0) {
          this.fire("selection:created", {
            e,
            selected: added
          });
        } else if (oldObjects.length > 0) {
          this.fire("selection:cleared", {
            e,
            deselected: removed
          });
        }
      },
      setActiveObject: function(object, e) {
        var currentActives = this.getActiveObjects();
        this._setActiveObject(object, e);
        this._fireSelectionEvents(currentActives, e);
        return this;
      },
      _setActiveObject: function(object, e) {
        if (this._activeObject === object) {
          return false;
        }
        if (!this._discardActiveObject(e, object)) {
          return false;
        }
        if (object.onSelect({ e })) {
          return false;
        }
        this._activeObject = object;
        return true;
      },
      _discardActiveObject: function(e, object) {
        var obj = this._activeObject;
        if (obj) {
          if (obj.onDeselect({ e, object })) {
            return false;
          }
          this._activeObject = null;
        }
        return true;
      },
      discardActiveObject: function(e) {
        var currentActives = this.getActiveObjects(), activeObject = this.getActiveObject();
        if (currentActives.length) {
          this.fire("before:selection:cleared", { target: activeObject, e });
        }
        this._discardActiveObject(e);
        this._fireSelectionEvents(currentActives, e);
        return this;
      },
      dispose: function() {
        var wrapper = this.wrapperEl;
        this.removeListeners();
        wrapper.removeChild(this.upperCanvasEl);
        wrapper.removeChild(this.lowerCanvasEl);
        this.contextCache = null;
        this.contextTop = null;
        ["upperCanvasEl", "cacheCanvasEl"].forEach(function(element) {
          fabric2.util.cleanUpJsdomNode(this[element]);
          this[element] = void 0;
        }.bind(this));
        if (wrapper.parentNode) {
          wrapper.parentNode.replaceChild(this.lowerCanvasEl, this.wrapperEl);
        }
        delete this.wrapperEl;
        fabric2.StaticCanvas.prototype.dispose.call(this);
        return this;
      },
      clear: function() {
        this.discardActiveObject();
        this.clearContext(this.contextTop);
        return this.callSuper("clear");
      },
      drawControls: function(ctx) {
        var activeObject = this._activeObject;
        if (activeObject) {
          activeObject._renderControls(ctx);
        }
      },
      _toObject: function(instance, methodName, propertiesToInclude) {
        var originalProperties = this._realizeGroupTransformOnObject(instance), object = this.callSuper("_toObject", instance, methodName, propertiesToInclude);
        this._unwindGroupTransformOnObject(instance, originalProperties);
        return object;
      },
      _realizeGroupTransformOnObject: function(instance) {
        if (instance.group && instance.group.type === "activeSelection" && this._activeObject === instance.group) {
          var layoutProps = ["angle", "flipX", "flipY", "left", "scaleX", "scaleY", "skewX", "skewY", "top"];
          var originalValues = {};
          layoutProps.forEach(function(prop2) {
            originalValues[prop2] = instance[prop2];
          });
          fabric2.util.addTransformToObject(instance, this._activeObject.calcOwnMatrix());
          return originalValues;
        } else {
          return null;
        }
      },
      _unwindGroupTransformOnObject: function(instance, originalValues) {
        if (originalValues) {
          instance.set(originalValues);
        }
      },
      _setSVGObject: function(markup, instance, reviver) {
        var originalProperties = this._realizeGroupTransformOnObject(instance);
        this.callSuper("_setSVGObject", markup, instance, reviver);
        this._unwindGroupTransformOnObject(instance, originalProperties);
      },
      setViewportTransform: function(vpt) {
        if (this.renderOnAddRemove && this._activeObject && this._activeObject.isEditing) {
          this._activeObject.clearContextTop();
        }
        fabric2.StaticCanvas.prototype.setViewportTransform.call(this, vpt);
      }
    });
    for (var prop in fabric2.StaticCanvas) {
      if (prop !== "prototype") {
        fabric2.Canvas[prop] = fabric2.StaticCanvas[prop];
      }
    }
  })();
  (function() {
    var addListener = fabric2.util.addListener, removeListener = fabric2.util.removeListener, RIGHT_CLICK = 3, MIDDLE_CLICK = 2, LEFT_CLICK = 1, addEventOptions = { passive: false };
    function checkClick(e, value) {
      return e.button && e.button === value - 1;
    }
    fabric2.util.object.extend(fabric2.Canvas.prototype, {
      mainTouchId: null,
      _initEventListeners: function() {
        this.removeListeners();
        this._bindEvents();
        this.addOrRemove(addListener, "add");
      },
      _getEventPrefix: function() {
        return this.enablePointerEvents ? "pointer" : "mouse";
      },
      addOrRemove: function(functor, eventjsFunctor) {
        var canvasElement = this.upperCanvasEl, eventTypePrefix = this._getEventPrefix();
        functor(fabric2.window, "resize", this._onResize);
        functor(canvasElement, eventTypePrefix + "down", this._onMouseDown);
        functor(canvasElement, eventTypePrefix + "move", this._onMouseMove, addEventOptions);
        functor(canvasElement, eventTypePrefix + "out", this._onMouseOut);
        functor(canvasElement, eventTypePrefix + "enter", this._onMouseEnter);
        functor(canvasElement, "wheel", this._onMouseWheel);
        functor(canvasElement, "contextmenu", this._onContextMenu);
        functor(canvasElement, "dblclick", this._onDoubleClick);
        functor(canvasElement, "dragover", this._onDragOver);
        functor(canvasElement, "dragenter", this._onDragEnter);
        functor(canvasElement, "dragleave", this._onDragLeave);
        functor(canvasElement, "drop", this._onDrop);
        if (!this.enablePointerEvents) {
          functor(canvasElement, "touchstart", this._onTouchStart, addEventOptions);
        }
        if (typeof eventjs !== "undefined" && eventjsFunctor in eventjs) {
          eventjs[eventjsFunctor](canvasElement, "gesture", this._onGesture);
          eventjs[eventjsFunctor](canvasElement, "drag", this._onDrag);
          eventjs[eventjsFunctor](canvasElement, "orientation", this._onOrientationChange);
          eventjs[eventjsFunctor](canvasElement, "shake", this._onShake);
          eventjs[eventjsFunctor](canvasElement, "longpress", this._onLongPress);
        }
      },
      removeListeners: function() {
        this.addOrRemove(removeListener, "remove");
        var eventTypePrefix = this._getEventPrefix();
        removeListener(fabric2.document, eventTypePrefix + "up", this._onMouseUp);
        removeListener(fabric2.document, "touchend", this._onTouchEnd, addEventOptions);
        removeListener(fabric2.document, eventTypePrefix + "move", this._onMouseMove, addEventOptions);
        removeListener(fabric2.document, "touchmove", this._onMouseMove, addEventOptions);
      },
      _bindEvents: function() {
        if (this.eventsBound) {
          return;
        }
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._onResize = this._onResize.bind(this);
        this._onGesture = this._onGesture.bind(this);
        this._onDrag = this._onDrag.bind(this);
        this._onShake = this._onShake.bind(this);
        this._onLongPress = this._onLongPress.bind(this);
        this._onOrientationChange = this._onOrientationChange.bind(this);
        this._onMouseWheel = this._onMouseWheel.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);
        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onContextMenu = this._onContextMenu.bind(this);
        this._onDoubleClick = this._onDoubleClick.bind(this);
        this._onDragOver = this._onDragOver.bind(this);
        this._onDragEnter = this._simpleEventHandler.bind(this, "dragenter");
        this._onDragLeave = this._simpleEventHandler.bind(this, "dragleave");
        this._onDrop = this._onDrop.bind(this);
        this.eventsBound = true;
      },
      _onGesture: function(e, self) {
        this.__onTransformGesture && this.__onTransformGesture(e, self);
      },
      _onDrag: function(e, self) {
        this.__onDrag && this.__onDrag(e, self);
      },
      _onMouseWheel: function(e) {
        this.__onMouseWheel(e);
      },
      _onMouseOut: function(e) {
        var target = this._hoveredTarget;
        this.fire("mouse:out", { target, e });
        this._hoveredTarget = null;
        target && target.fire("mouseout", { e });
        var _this = this;
        this._hoveredTargets.forEach(function(_target) {
          _this.fire("mouse:out", { target, e });
          _target && target.fire("mouseout", { e });
        });
        this._hoveredTargets = [];
      },
      _onMouseEnter: function(e) {
        if (!this._currentTransform && !this.findTarget(e)) {
          this.fire("mouse:over", { target: null, e });
          this._hoveredTarget = null;
          this._hoveredTargets = [];
        }
      },
      _onOrientationChange: function(e, self) {
        this.__onOrientationChange && this.__onOrientationChange(e, self);
      },
      _onShake: function(e, self) {
        this.__onShake && this.__onShake(e, self);
      },
      _onLongPress: function(e, self) {
        this.__onLongPress && this.__onLongPress(e, self);
      },
      _onDragOver: function(e) {
        e.preventDefault();
        var target = this._simpleEventHandler("dragover", e);
        this._fireEnterLeaveEvents(target, e);
      },
      _onDrop: function(e) {
        this._simpleEventHandler("drop:before", e);
        return this._simpleEventHandler("drop", e);
      },
      _onContextMenu: function(e) {
        if (this.stopContextMenu) {
          e.stopPropagation();
          e.preventDefault();
        }
        return false;
      },
      _onDoubleClick: function(e) {
        this._cacheTransformEventData(e);
        this._handleEvent(e, "dblclick");
        this._resetTransformEventData(e);
      },
      getPointerId: function(evt) {
        var changedTouches = evt.changedTouches;
        if (changedTouches) {
          return changedTouches[0] && changedTouches[0].identifier;
        }
        if (this.enablePointerEvents) {
          return evt.pointerId;
        }
        return -1;
      },
      _isMainEvent: function(evt) {
        if (evt.isPrimary === true) {
          return true;
        }
        if (evt.isPrimary === false) {
          return false;
        }
        if (evt.type === "touchend" && evt.touches.length === 0) {
          return true;
        }
        if (evt.changedTouches) {
          return evt.changedTouches[0].identifier === this.mainTouchId;
        }
        return true;
      },
      _onTouchStart: function(e) {
        e.preventDefault();
        if (this.mainTouchId === null) {
          this.mainTouchId = this.getPointerId(e);
        }
        this.__onMouseDown(e);
        this._resetTransformEventData();
        var canvasElement = this.upperCanvasEl, eventTypePrefix = this._getEventPrefix();
        addListener(fabric2.document, "touchend", this._onTouchEnd, addEventOptions);
        addListener(fabric2.document, "touchmove", this._onMouseMove, addEventOptions);
        removeListener(canvasElement, eventTypePrefix + "down", this._onMouseDown);
      },
      _onMouseDown: function(e) {
        this.__onMouseDown(e);
        this._resetTransformEventData();
        var canvasElement = this.upperCanvasEl, eventTypePrefix = this._getEventPrefix();
        removeListener(canvasElement, eventTypePrefix + "move", this._onMouseMove, addEventOptions);
        addListener(fabric2.document, eventTypePrefix + "up", this._onMouseUp);
        addListener(fabric2.document, eventTypePrefix + "move", this._onMouseMove, addEventOptions);
      },
      _onTouchEnd: function(e) {
        if (e.touches.length > 0) {
          return;
        }
        this.__onMouseUp(e);
        this._resetTransformEventData();
        this.mainTouchId = null;
        var eventTypePrefix = this._getEventPrefix();
        removeListener(fabric2.document, "touchend", this._onTouchEnd, addEventOptions);
        removeListener(fabric2.document, "touchmove", this._onMouseMove, addEventOptions);
        var _this = this;
        if (this._willAddMouseDown) {
          clearTimeout(this._willAddMouseDown);
        }
        this._willAddMouseDown = setTimeout(function() {
          addListener(_this.upperCanvasEl, eventTypePrefix + "down", _this._onMouseDown);
          _this._willAddMouseDown = 0;
        }, 400);
      },
      _onMouseUp: function(e) {
        this.__onMouseUp(e);
        this._resetTransformEventData();
        var canvasElement = this.upperCanvasEl, eventTypePrefix = this._getEventPrefix();
        if (this._isMainEvent(e)) {
          removeListener(fabric2.document, eventTypePrefix + "up", this._onMouseUp);
          removeListener(fabric2.document, eventTypePrefix + "move", this._onMouseMove, addEventOptions);
          addListener(canvasElement, eventTypePrefix + "move", this._onMouseMove, addEventOptions);
        }
      },
      _onMouseMove: function(e) {
        !this.allowTouchScrolling && e.preventDefault && e.preventDefault();
        this.__onMouseMove(e);
      },
      _onResize: function() {
        this.calcOffset();
      },
      _shouldRender: function(target) {
        var activeObject = this._activeObject;
        if (!!activeObject !== !!target || activeObject && target && activeObject !== target) {
          return true;
        } else if (activeObject && activeObject.isEditing) {
          return false;
        }
        return false;
      },
      __onMouseUp: function(e) {
        var target, transform = this._currentTransform, groupSelector = this._groupSelector, shouldRender = false, isClick = !groupSelector || groupSelector.left === 0 && groupSelector.top === 0;
        this._cacheTransformEventData(e);
        target = this._target;
        this._handleEvent(e, "up:before");
        if (checkClick(e, RIGHT_CLICK)) {
          if (this.fireRightClick) {
            this._handleEvent(e, "up", RIGHT_CLICK, isClick);
          }
          return;
        }
        if (checkClick(e, MIDDLE_CLICK)) {
          if (this.fireMiddleClick) {
            this._handleEvent(e, "up", MIDDLE_CLICK, isClick);
          }
          this._resetTransformEventData();
          return;
        }
        if (this.isDrawingMode && this._isCurrentlyDrawing) {
          this._onMouseUpInDrawingMode(e);
          return;
        }
        if (!this._isMainEvent(e)) {
          return;
        }
        if (transform) {
          this._finalizeCurrentTransform(e);
          shouldRender = transform.actionPerformed;
        }
        if (!isClick) {
          var targetWasActive = target === this._activeObject;
          this._maybeGroupObjects(e);
          if (!shouldRender) {
            shouldRender = this._shouldRender(target) || !targetWasActive && target === this._activeObject;
          }
        }
        var corner, pointer;
        if (target) {
          corner = target._findTargetCorner(
            this.getPointer(e, true),
            fabric2.util.isTouchEvent(e)
          );
          if (target.selectable && target !== this._activeObject && target.activeOn === "up") {
            this.setActiveObject(target, e);
            shouldRender = true;
          } else {
            var control = target.controls[corner], mouseUpHandler = control && control.getMouseUpHandler(e, target, control);
            if (mouseUpHandler) {
              pointer = this.getPointer(e);
              mouseUpHandler(e, transform, pointer.x, pointer.y);
            }
          }
          target.isMoving = false;
        }
        if (transform && (transform.target !== target || transform.corner !== corner)) {
          var originalControl = transform.target && transform.target.controls[transform.corner], originalMouseUpHandler = originalControl && originalControl.getMouseUpHandler(e, target, control);
          pointer = pointer || this.getPointer(e);
          originalMouseUpHandler && originalMouseUpHandler(e, transform, pointer.x, pointer.y);
        }
        this._setCursorFromEvent(e, target);
        this._handleEvent(e, "up", LEFT_CLICK, isClick);
        this._groupSelector = null;
        this._currentTransform = null;
        target && (target.__corner = 0);
        if (shouldRender) {
          this.requestRenderAll();
        } else if (!isClick) {
          this.renderTop();
        }
      },
      _simpleEventHandler: function(eventType, e) {
        var target = this.findTarget(e), targets = this.targets, options = {
          e,
          target,
          subTargets: targets
        };
        this.fire(eventType, options);
        target && target.fire(eventType, options);
        if (!targets) {
          return target;
        }
        for (var i = 0; i < targets.length; i++) {
          targets[i].fire(eventType, options);
        }
        return target;
      },
      _handleEvent: function(e, eventType, button, isClick) {
        var target = this._target, targets = this.targets || [], options = {
          e,
          target,
          subTargets: targets,
          button: button || LEFT_CLICK,
          isClick: isClick || false,
          pointer: this._pointer,
          absolutePointer: this._absolutePointer,
          transform: this._currentTransform
        };
        if (eventType === "up") {
          options.currentTarget = this.findTarget(e);
          options.currentSubTargets = this.targets;
        }
        this.fire("mouse:" + eventType, options);
        target && target.fire("mouse" + eventType, options);
        for (var i = 0; i < targets.length; i++) {
          targets[i].fire("mouse" + eventType, options);
        }
      },
      _finalizeCurrentTransform: function(e) {
        var transform = this._currentTransform, target = transform.target, options = {
          e,
          target,
          transform,
          action: transform.action
        };
        if (target._scaling) {
          target._scaling = false;
        }
        target.setCoords();
        if (transform.actionPerformed || this.stateful && target.hasStateChanged()) {
          this._fire("modified", options);
        }
      },
      _onMouseDownInDrawingMode: function(e) {
        this._isCurrentlyDrawing = true;
        if (this.getActiveObject()) {
          this.discardActiveObject(e).requestRenderAll();
        }
        var pointer = this.getPointer(e);
        this.freeDrawingBrush.onMouseDown(pointer, { e, pointer });
        this._handleEvent(e, "down");
      },
      _onMouseMoveInDrawingMode: function(e) {
        if (this._isCurrentlyDrawing) {
          var pointer = this.getPointer(e);
          this.freeDrawingBrush.onMouseMove(pointer, { e, pointer });
        }
        this.setCursor(this.freeDrawingCursor);
        this._handleEvent(e, "move");
      },
      _onMouseUpInDrawingMode: function(e) {
        var pointer = this.getPointer(e);
        this._isCurrentlyDrawing = this.freeDrawingBrush.onMouseUp({ e, pointer });
        this._handleEvent(e, "up");
      },
      __onMouseDown: function(e) {
        this._cacheTransformEventData(e);
        this._handleEvent(e, "down:before");
        var target = this._target;
        if (checkClick(e, RIGHT_CLICK)) {
          if (this.fireRightClick) {
            this._handleEvent(e, "down", RIGHT_CLICK);
          }
          return;
        }
        if (checkClick(e, MIDDLE_CLICK)) {
          if (this.fireMiddleClick) {
            this._handleEvent(e, "down", MIDDLE_CLICK);
          }
          return;
        }
        if (this.isDrawingMode) {
          this._onMouseDownInDrawingMode(e);
          return;
        }
        if (!this._isMainEvent(e)) {
          return;
        }
        if (this._currentTransform) {
          return;
        }
        var pointer = this._pointer;
        this._previousPointer = pointer;
        var shouldRender = this._shouldRender(target), shouldGroup = this._shouldGroup(e, target);
        if (this._shouldClearSelection(e, target)) {
          this.discardActiveObject(e);
        } else if (shouldGroup) {
          this._handleGrouping(e, target);
          target = this._activeObject;
        }
        if (this.selection && (!target || !target.selectable && !target.isEditing && target !== this._activeObject)) {
          this._groupSelector = {
            ex: this._absolutePointer.x,
            ey: this._absolutePointer.y,
            top: 0,
            left: 0
          };
        }
        if (target) {
          var alreadySelected = target === this._activeObject;
          if (target.selectable && target.activeOn === "down") {
            this.setActiveObject(target, e);
          }
          var corner = target._findTargetCorner(
            this.getPointer(e, true),
            fabric2.util.isTouchEvent(e)
          );
          target.__corner = corner;
          if (target === this._activeObject && (corner || !shouldGroup)) {
            this._setupCurrentTransform(e, target, alreadySelected);
            var control = target.controls[corner], pointer = this.getPointer(e), mouseDownHandler = control && control.getMouseDownHandler(e, target, control);
            if (mouseDownHandler) {
              mouseDownHandler(e, this._currentTransform, pointer.x, pointer.y);
            }
          }
        }
        this._handleEvent(e, "down");
        (shouldRender || shouldGroup) && this.requestRenderAll();
      },
      _resetTransformEventData: function() {
        this._target = null;
        this._pointer = null;
        this._absolutePointer = null;
      },
      _cacheTransformEventData: function(e) {
        this._resetTransformEventData();
        this._pointer = this.getPointer(e, true);
        this._absolutePointer = this.restorePointerVpt(this._pointer);
        this._target = this._currentTransform ? this._currentTransform.target : this.findTarget(e) || null;
      },
      _beforeTransform: function(e) {
        var t = this._currentTransform;
        this.stateful && t.target.saveState();
        this.fire("before:transform", {
          e,
          transform: t
        });
      },
      __onMouseMove: function(e) {
        this._handleEvent(e, "move:before");
        this._cacheTransformEventData(e);
        var target, pointer;
        if (this.isDrawingMode) {
          this._onMouseMoveInDrawingMode(e);
          return;
        }
        if (!this._isMainEvent(e)) {
          return;
        }
        var groupSelector = this._groupSelector;
        if (groupSelector) {
          pointer = this._absolutePointer;
          groupSelector.left = pointer.x - groupSelector.ex;
          groupSelector.top = pointer.y - groupSelector.ey;
          this.renderTop();
        } else if (!this._currentTransform) {
          target = this.findTarget(e) || null;
          this._setCursorFromEvent(e, target);
          this._fireOverOutEvents(target, e);
        } else {
          this._transformObject(e);
        }
        this._handleEvent(e, "move");
        this._resetTransformEventData();
      },
      _fireOverOutEvents: function(target, e) {
        var _hoveredTarget = this._hoveredTarget, _hoveredTargets = this._hoveredTargets, targets = this.targets, length = Math.max(_hoveredTargets.length, targets.length);
        this.fireSyntheticInOutEvents(target, e, {
          oldTarget: _hoveredTarget,
          evtOut: "mouseout",
          canvasEvtOut: "mouse:out",
          evtIn: "mouseover",
          canvasEvtIn: "mouse:over"
        });
        for (var i = 0; i < length; i++) {
          this.fireSyntheticInOutEvents(targets[i], e, {
            oldTarget: _hoveredTargets[i],
            evtOut: "mouseout",
            evtIn: "mouseover"
          });
        }
        this._hoveredTarget = target;
        this._hoveredTargets = this.targets.concat();
      },
      _fireEnterLeaveEvents: function(target, e) {
        var _draggedoverTarget = this._draggedoverTarget, _hoveredTargets = this._hoveredTargets, targets = this.targets, length = Math.max(_hoveredTargets.length, targets.length);
        this.fireSyntheticInOutEvents(target, e, {
          oldTarget: _draggedoverTarget,
          evtOut: "dragleave",
          evtIn: "dragenter"
        });
        for (var i = 0; i < length; i++) {
          this.fireSyntheticInOutEvents(targets[i], e, {
            oldTarget: _hoveredTargets[i],
            evtOut: "dragleave",
            evtIn: "dragenter"
          });
        }
        this._draggedoverTarget = target;
      },
      fireSyntheticInOutEvents: function(target, e, config) {
        var inOpt, outOpt, oldTarget = config.oldTarget, outFires, inFires, targetChanged = oldTarget !== target, canvasEvtIn = config.canvasEvtIn, canvasEvtOut = config.canvasEvtOut;
        if (targetChanged) {
          inOpt = { e, target, previousTarget: oldTarget };
          outOpt = { e, target: oldTarget, nextTarget: target };
        }
        inFires = target && targetChanged;
        outFires = oldTarget && targetChanged;
        if (outFires) {
          canvasEvtOut && this.fire(canvasEvtOut, outOpt);
          oldTarget.fire(config.evtOut, outOpt);
        }
        if (inFires) {
          canvasEvtIn && this.fire(canvasEvtIn, inOpt);
          target.fire(config.evtIn, inOpt);
        }
      },
      __onMouseWheel: function(e) {
        this._cacheTransformEventData(e);
        this._handleEvent(e, "wheel");
        this._resetTransformEventData();
      },
      _transformObject: function(e) {
        var pointer = this.getPointer(e), transform = this._currentTransform;
        transform.reset = false;
        transform.shiftKey = e.shiftKey;
        transform.altKey = e[this.centeredKey];
        this._performTransformAction(e, transform, pointer);
        transform.actionPerformed && this.requestRenderAll();
      },
      _performTransformAction: function(e, transform, pointer) {
        var x = pointer.x, y = pointer.y, action = transform.action, actionPerformed = false, actionHandler = transform.actionHandler;
        if (actionHandler) {
          actionPerformed = actionHandler(e, transform, x, y);
        }
        if (action === "drag" && actionPerformed) {
          transform.target.isMoving = true;
          this.setCursor(transform.target.moveCursor || this.moveCursor);
        }
        transform.actionPerformed = transform.actionPerformed || actionPerformed;
      },
      _fire: fabric2.controlsUtils.fireEvent,
      _setCursorFromEvent: function(e, target) {
        if (!target) {
          this.setCursor(this.defaultCursor);
          return false;
        }
        var hoverCursor = target.hoverCursor || this.hoverCursor, activeSelection = this._activeObject && this._activeObject.type === "activeSelection" ? this._activeObject : null, corner = (!activeSelection || !activeSelection.contains(target)) && target._findTargetCorner(this.getPointer(e, true));
        if (!corner) {
          if (target.subTargetCheck) {
            this.targets.concat().reverse().map(function(_target) {
              hoverCursor = _target.hoverCursor || hoverCursor;
            });
          }
          this.setCursor(hoverCursor);
        } else {
          this.setCursor(this.getCornerCursor(corner, target, e));
        }
      },
      getCornerCursor: function(corner, target, e) {
        var control = target.controls[corner];
        return control.cursorStyleHandler(e, control, target);
      }
    });
  })();
  (function() {
    var min = Math.min, max = Math.max;
    fabric2.util.object.extend(fabric2.Canvas.prototype, {
      _shouldGroup: function(e, target) {
        var activeObject = this._activeObject;
        return activeObject && this._isSelectionKeyPressed(e) && target && target.selectable && this.selection && (activeObject !== target || activeObject.type === "activeSelection") && !target.onSelect({ e });
      },
      _handleGrouping: function(e, target) {
        var activeObject = this._activeObject;
        if (activeObject.__corner) {
          return;
        }
        if (target === activeObject) {
          target = this.findTarget(e, true);
          if (!target || !target.selectable) {
            return;
          }
        }
        if (activeObject && activeObject.type === "activeSelection") {
          this._updateActiveSelection(target, e);
        } else {
          this._createActiveSelection(target, e);
        }
      },
      _updateActiveSelection: function(target, e) {
        var activeSelection = this._activeObject, currentActiveObjects = activeSelection._objects.slice(0);
        if (activeSelection.contains(target)) {
          activeSelection.removeWithUpdate(target);
          this._hoveredTarget = target;
          this._hoveredTargets = this.targets.concat();
          if (activeSelection.size() === 1) {
            this._setActiveObject(activeSelection.item(0), e);
          }
        } else {
          activeSelection.addWithUpdate(target);
          this._hoveredTarget = activeSelection;
          this._hoveredTargets = this.targets.concat();
        }
        this._fireSelectionEvents(currentActiveObjects, e);
      },
      _createActiveSelection: function(target, e) {
        var currentActives = this.getActiveObjects(), group = this._createGroup(target);
        this._hoveredTarget = group;
        this._setActiveObject(group, e);
        this._fireSelectionEvents(currentActives, e);
      },
      _createGroup: function(target) {
        var objects = this._objects, isActiveLower = objects.indexOf(this._activeObject) < objects.indexOf(target), groupObjects = isActiveLower ? [this._activeObject, target] : [target, this._activeObject];
        this._activeObject.isEditing && this._activeObject.exitEditing();
        return new fabric2.ActiveSelection(groupObjects, {
          canvas: this
        });
      },
      _groupSelectedObjects: function(e) {
        var group = this._collectObjects(e), aGroup;
        if (group.length === 1) {
          this.setActiveObject(group[0], e);
        } else if (group.length > 1) {
          aGroup = new fabric2.ActiveSelection(group.reverse(), {
            canvas: this
          });
          this.setActiveObject(aGroup, e);
        }
      },
      _collectObjects: function(e) {
        var group = [], currentObject, x1 = this._groupSelector.ex, y1 = this._groupSelector.ey, x2 = x1 + this._groupSelector.left, y2 = y1 + this._groupSelector.top, selectionX1Y1 = new fabric2.Point(min(x1, x2), min(y1, y2)), selectionX2Y2 = new fabric2.Point(max(x1, x2), max(y1, y2)), allowIntersect = !this.selectionFullyContained, isClick = x1 === x2 && y1 === y2;
        for (var i = this._objects.length; i--; ) {
          currentObject = this._objects[i];
          if (!currentObject || !currentObject.selectable || !currentObject.visible) {
            continue;
          }
          if (allowIntersect && currentObject.intersectsWithRect(selectionX1Y1, selectionX2Y2, true) || currentObject.isContainedWithinRect(selectionX1Y1, selectionX2Y2, true) || allowIntersect && currentObject.containsPoint(selectionX1Y1, null, true) || allowIntersect && currentObject.containsPoint(selectionX2Y2, null, true)) {
            group.push(currentObject);
            if (isClick) {
              break;
            }
          }
        }
        if (group.length > 1) {
          group = group.filter(function(object) {
            return !object.onSelect({ e });
          });
        }
        return group;
      },
      _maybeGroupObjects: function(e) {
        if (this.selection && this._groupSelector) {
          this._groupSelectedObjects(e);
        }
        this.setCursor(this.defaultCursor);
        this._groupSelector = null;
      }
    });
  })();
  (function() {
    fabric2.util.object.extend(fabric2.StaticCanvas.prototype, {
      toDataURL: function(options) {
        options || (options = {});
        var format = options.format || "png", quality = options.quality || 1, multiplier = (options.multiplier || 1) * (options.enableRetinaScaling ? this.getRetinaScaling() : 1), canvasEl = this.toCanvasElement(multiplier, options);
        return fabric2.util.toDataURL(canvasEl, format, quality);
      },
      toCanvasElement: function(multiplier, cropping) {
        multiplier = multiplier || 1;
        cropping = cropping || {};
        var scaledWidth = (cropping.width || this.width) * multiplier, scaledHeight = (cropping.height || this.height) * multiplier, zoom = this.getZoom(), originalWidth = this.width, originalHeight = this.height, newZoom = zoom * multiplier, vp = this.viewportTransform, translateX = (vp[4] - (cropping.left || 0)) * multiplier, translateY = (vp[5] - (cropping.top || 0)) * multiplier, originalInteractive = this.interactive, newVp = [newZoom, 0, 0, newZoom, translateX, translateY], originalRetina = this.enableRetinaScaling, canvasEl = fabric2.util.createCanvasElement(), originalContextTop = this.contextTop;
        canvasEl.width = scaledWidth;
        canvasEl.height = scaledHeight;
        this.contextTop = null;
        this.enableRetinaScaling = false;
        this.interactive = false;
        this.viewportTransform = newVp;
        this.width = scaledWidth;
        this.height = scaledHeight;
        this.calcViewportBoundaries();
        this.renderCanvas(canvasEl.getContext("2d"), this._objects);
        this.viewportTransform = vp;
        this.width = originalWidth;
        this.height = originalHeight;
        this.calcViewportBoundaries();
        this.interactive = originalInteractive;
        this.enableRetinaScaling = originalRetina;
        this.contextTop = originalContextTop;
        return canvasEl;
      }
    });
  })();
  fabric2.util.object.extend(fabric2.StaticCanvas.prototype, {
    loadFromJSON: function(json, callback, reviver) {
      if (!json) {
        return;
      }
      var serialized = typeof json === "string" ? JSON.parse(json) : fabric2.util.object.clone(json);
      var _this = this, clipPath = serialized.clipPath, renderOnAddRemove = this.renderOnAddRemove;
      this.renderOnAddRemove = false;
      delete serialized.clipPath;
      this._enlivenObjects(serialized.objects, function(enlivenedObjects) {
        _this.clear();
        _this._setBgOverlay(serialized, function() {
          if (clipPath) {
            _this._enlivenObjects([clipPath], function(enlivenedCanvasClip) {
              _this.clipPath = enlivenedCanvasClip[0];
              _this.__setupCanvas.call(_this, serialized, enlivenedObjects, renderOnAddRemove, callback);
            });
          } else {
            _this.__setupCanvas.call(_this, serialized, enlivenedObjects, renderOnAddRemove, callback);
          }
        });
      }, reviver);
      return this;
    },
    __setupCanvas: function(serialized, enlivenedObjects, renderOnAddRemove, callback) {
      var _this = this;
      enlivenedObjects.forEach(function(obj, index) {
        _this.insertAt(obj, index);
      });
      this.renderOnAddRemove = renderOnAddRemove;
      delete serialized.objects;
      delete serialized.backgroundImage;
      delete serialized.overlayImage;
      delete serialized.background;
      delete serialized.overlay;
      this._setOptions(serialized);
      this.renderAll();
      callback && callback();
    },
    _setBgOverlay: function(serialized, callback) {
      var loaded = {
        backgroundColor: false,
        overlayColor: false,
        backgroundImage: false,
        overlayImage: false
      };
      if (!serialized.backgroundImage && !serialized.overlayImage && !serialized.background && !serialized.overlay) {
        callback && callback();
        return;
      }
      var cbIfLoaded = function() {
        if (loaded.backgroundImage && loaded.overlayImage && loaded.backgroundColor && loaded.overlayColor) {
          callback && callback();
        }
      };
      this.__setBgOverlay("backgroundImage", serialized.backgroundImage, loaded, cbIfLoaded);
      this.__setBgOverlay("overlayImage", serialized.overlayImage, loaded, cbIfLoaded);
      this.__setBgOverlay("backgroundColor", serialized.background, loaded, cbIfLoaded);
      this.__setBgOverlay("overlayColor", serialized.overlay, loaded, cbIfLoaded);
    },
    __setBgOverlay: function(property, value, loaded, callback) {
      var _this = this;
      if (!value) {
        loaded[property] = true;
        callback && callback();
        return;
      }
      if (property === "backgroundImage" || property === "overlayImage") {
        fabric2.util.enlivenObjects([value], function(enlivedObject) {
          _this[property] = enlivedObject[0];
          loaded[property] = true;
          callback && callback();
        });
      } else {
        this["set" + fabric2.util.string.capitalize(property, true)](value, function() {
          loaded[property] = true;
          callback && callback();
        });
      }
    },
    _enlivenObjects: function(objects, callback, reviver) {
      if (!objects || objects.length === 0) {
        callback && callback([]);
        return;
      }
      fabric2.util.enlivenObjects(objects, function(enlivenedObjects) {
        callback && callback(enlivenedObjects);
      }, null, reviver);
    },
    _toDataURL: function(format, callback) {
      this.clone(function(clone) {
        callback(clone.toDataURL(format));
      });
    },
    _toDataURLWithMultiplier: function(format, multiplier, callback) {
      this.clone(function(clone) {
        callback(clone.toDataURLWithMultiplier(format, multiplier));
      });
    },
    clone: function(callback, properties) {
      var data = JSON.stringify(this.toJSON(properties));
      this.cloneWithoutData(function(clone) {
        clone.loadFromJSON(data, function() {
          callback && callback(clone);
        });
      });
    },
    cloneWithoutData: function(callback) {
      var el = fabric2.util.createCanvasElement();
      el.width = this.width;
      el.height = this.height;
      var clone = new fabric2.Canvas(el);
      if (this.backgroundImage) {
        clone.setBackgroundImage(this.backgroundImage.src, function() {
          clone.renderAll();
          callback && callback(clone);
        });
        clone.backgroundImageOpacity = this.backgroundImageOpacity;
        clone.backgroundImageStretch = this.backgroundImageStretch;
      } else {
        callback && callback(clone);
      }
    }
  });
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), extend = fabric3.util.object.extend, clone = fabric3.util.object.clone, toFixed = fabric3.util.toFixed, capitalize = fabric3.util.string.capitalize, degreesToRadians = fabric3.util.degreesToRadians, objectCaching = !fabric3.isLikelyNode, ALIASING_LIMIT = 2;
    if (fabric3.Object) {
      return;
    }
    fabric3.Object = fabric3.util.createClass(fabric3.CommonMethods, {
      type: "object",
      originX: "left",
      originY: "top",
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      scaleX: 1,
      scaleY: 1,
      flipX: false,
      flipY: false,
      opacity: 1,
      angle: 0,
      skewX: 0,
      skewY: 0,
      cornerSize: 13,
      touchCornerSize: 24,
      transparentCorners: true,
      hoverCursor: null,
      moveCursor: null,
      padding: 0,
      borderColor: "rgb(178,204,255)",
      borderDashArray: null,
      cornerColor: "rgb(178,204,255)",
      cornerStrokeColor: null,
      cornerStyle: "rect",
      cornerDashArray: null,
      centeredScaling: false,
      centeredRotation: true,
      fill: "rgb(0,0,0)",
      fillRule: "nonzero",
      globalCompositeOperation: "source-over",
      backgroundColor: "",
      selectionBackgroundColor: "",
      stroke: null,
      strokeWidth: 1,
      strokeDashArray: null,
      strokeDashOffset: 0,
      strokeLineCap: "butt",
      strokeLineJoin: "miter",
      strokeMiterLimit: 4,
      shadow: null,
      borderOpacityWhenMoving: 0.4,
      borderScaleFactor: 1,
      minScaleLimit: 0,
      selectable: true,
      evented: true,
      visible: true,
      hasControls: true,
      hasBorders: true,
      perPixelTargetFind: false,
      includeDefaultValues: true,
      lockMovementX: false,
      lockMovementY: false,
      lockRotation: false,
      lockScalingX: false,
      lockScalingY: false,
      lockSkewingX: false,
      lockSkewingY: false,
      lockScalingFlip: false,
      excludeFromExport: false,
      objectCaching,
      statefullCache: false,
      noScaleCache: true,
      strokeUniform: false,
      dirty: true,
      __corner: 0,
      paintFirst: "fill",
      activeOn: "down",
      stateProperties: "top left width height scaleX scaleY flipX flipY originX originY transformMatrix stroke strokeWidth strokeDashArray strokeLineCap strokeDashOffset strokeLineJoin strokeMiterLimit angle opacity fill globalCompositeOperation shadow visible backgroundColor skewX skewY fillRule paintFirst clipPath strokeUniform".split(" "),
      cacheProperties: "fill stroke strokeWidth strokeDashArray width height paintFirst strokeUniform strokeLineCap strokeDashOffset strokeLineJoin strokeMiterLimit backgroundColor clipPath".split(" "),
      colorProperties: "fill stroke backgroundColor".split(" "),
      clipPath: void 0,
      inverted: false,
      absolutePositioned: false,
      initialize: function(options) {
        if (options) {
          this.setOptions(options);
        }
      },
      _createCacheCanvas: function() {
        this._cacheProperties = {};
        this._cacheCanvas = fabric3.util.createCanvasElement();
        this._cacheContext = this._cacheCanvas.getContext("2d");
        this._updateCacheCanvas();
        this.dirty = true;
      },
      _limitCacheSize: function(dims) {
        var perfLimitSizeTotal = fabric3.perfLimitSizeTotal, width = dims.width, height = dims.height, max = fabric3.maxCacheSideLimit, min = fabric3.minCacheSideLimit;
        if (width <= max && height <= max && width * height <= perfLimitSizeTotal) {
          if (width < min) {
            dims.width = min;
          }
          if (height < min) {
            dims.height = min;
          }
          return dims;
        }
        var ar = width / height, limitedDims = fabric3.util.limitDimsByArea(ar, perfLimitSizeTotal), capValue = fabric3.util.capValue, x = capValue(min, limitedDims.x, max), y = capValue(min, limitedDims.y, max);
        if (width > x) {
          dims.zoomX /= width / x;
          dims.width = x;
          dims.capped = true;
        }
        if (height > y) {
          dims.zoomY /= height / y;
          dims.height = y;
          dims.capped = true;
        }
        return dims;
      },
      _getCacheCanvasDimensions: function() {
        var objectScale = this.getTotalObjectScaling(), dim = this._getTransformedDimensions(0, 0), neededX = dim.x * objectScale.scaleX / this.scaleX, neededY = dim.y * objectScale.scaleY / this.scaleY;
        return {
          width: neededX + ALIASING_LIMIT,
          height: neededY + ALIASING_LIMIT,
          zoomX: objectScale.scaleX,
          zoomY: objectScale.scaleY,
          x: neededX,
          y: neededY
        };
      },
      _updateCacheCanvas: function() {
        var targetCanvas = this.canvas;
        if (this.noScaleCache && targetCanvas && targetCanvas._currentTransform) {
          var target = targetCanvas._currentTransform.target, action = targetCanvas._currentTransform.action;
          if (this === target && action.slice && action.slice(0, 5) === "scale") {
            return false;
          }
        }
        var canvas2 = this._cacheCanvas, dims = this._limitCacheSize(this._getCacheCanvasDimensions()), minCacheSize = fabric3.minCacheSideLimit, width = dims.width, height = dims.height, drawingWidth, drawingHeight, zoomX = dims.zoomX, zoomY = dims.zoomY, dimensionsChanged = width !== this.cacheWidth || height !== this.cacheHeight, zoomChanged = this.zoomX !== zoomX || this.zoomY !== zoomY, shouldRedraw = dimensionsChanged || zoomChanged, additionalWidth = 0, additionalHeight = 0, shouldResizeCanvas = false;
        if (dimensionsChanged) {
          var canvasWidth = this._cacheCanvas.width, canvasHeight = this._cacheCanvas.height, sizeGrowing = width > canvasWidth || height > canvasHeight, sizeShrinking = (width < canvasWidth * 0.9 || height < canvasHeight * 0.9) && canvasWidth > minCacheSize && canvasHeight > minCacheSize;
          shouldResizeCanvas = sizeGrowing || sizeShrinking;
          if (sizeGrowing && !dims.capped && (width > minCacheSize || height > minCacheSize)) {
            additionalWidth = width * 0.1;
            additionalHeight = height * 0.1;
          }
        }
        if (this instanceof fabric3.Text && this.path) {
          shouldRedraw = true;
          shouldResizeCanvas = true;
          additionalWidth += this.getHeightOfLine(0) * this.zoomX;
          additionalHeight += this.getHeightOfLine(0) * this.zoomY;
        }
        if (shouldRedraw) {
          if (shouldResizeCanvas) {
            canvas2.width = Math.ceil(width + additionalWidth);
            canvas2.height = Math.ceil(height + additionalHeight);
          } else {
            this._cacheContext.setTransform(1, 0, 0, 1, 0, 0);
            this._cacheContext.clearRect(0, 0, canvas2.width, canvas2.height);
          }
          drawingWidth = dims.x / 2;
          drawingHeight = dims.y / 2;
          this.cacheTranslationX = Math.round(canvas2.width / 2 - drawingWidth) + drawingWidth;
          this.cacheTranslationY = Math.round(canvas2.height / 2 - drawingHeight) + drawingHeight;
          this.cacheWidth = width;
          this.cacheHeight = height;
          this._cacheContext.translate(this.cacheTranslationX, this.cacheTranslationY);
          this._cacheContext.scale(zoomX, zoomY);
          this.zoomX = zoomX;
          this.zoomY = zoomY;
          return true;
        }
        return false;
      },
      setOptions: function(options) {
        this._setOptions(options);
        this._initGradient(options.fill, "fill");
        this._initGradient(options.stroke, "stroke");
        this._initPattern(options.fill, "fill");
        this._initPattern(options.stroke, "stroke");
      },
      transform: function(ctx) {
        var needFullTransform = this.group && !this.group._transformDone || this.group && this.canvas && ctx === this.canvas.contextTop;
        var m = this.calcTransformMatrix(!needFullTransform);
        ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
      },
      toObject: function(propertiesToInclude) {
        var NUM_FRACTION_DIGITS = fabric3.Object.NUM_FRACTION_DIGITS, object = {
          type: this.type,
          version: fabric3.version,
          originX: this.originX,
          originY: this.originY,
          left: toFixed(this.left, NUM_FRACTION_DIGITS),
          top: toFixed(this.top, NUM_FRACTION_DIGITS),
          width: toFixed(this.width, NUM_FRACTION_DIGITS),
          height: toFixed(this.height, NUM_FRACTION_DIGITS),
          fill: this.fill && this.fill.toObject ? this.fill.toObject() : this.fill,
          stroke: this.stroke && this.stroke.toObject ? this.stroke.toObject() : this.stroke,
          strokeWidth: toFixed(this.strokeWidth, NUM_FRACTION_DIGITS),
          strokeDashArray: this.strokeDashArray ? this.strokeDashArray.concat() : this.strokeDashArray,
          strokeLineCap: this.strokeLineCap,
          strokeDashOffset: this.strokeDashOffset,
          strokeLineJoin: this.strokeLineJoin,
          strokeUniform: this.strokeUniform,
          strokeMiterLimit: toFixed(this.strokeMiterLimit, NUM_FRACTION_DIGITS),
          scaleX: toFixed(this.scaleX, NUM_FRACTION_DIGITS),
          scaleY: toFixed(this.scaleY, NUM_FRACTION_DIGITS),
          angle: toFixed(this.angle, NUM_FRACTION_DIGITS),
          flipX: this.flipX,
          flipY: this.flipY,
          opacity: toFixed(this.opacity, NUM_FRACTION_DIGITS),
          shadow: this.shadow && this.shadow.toObject ? this.shadow.toObject() : this.shadow,
          visible: this.visible,
          backgroundColor: this.backgroundColor,
          fillRule: this.fillRule,
          paintFirst: this.paintFirst,
          globalCompositeOperation: this.globalCompositeOperation,
          skewX: toFixed(this.skewX, NUM_FRACTION_DIGITS),
          skewY: toFixed(this.skewY, NUM_FRACTION_DIGITS)
        };
        if (this.clipPath && !this.clipPath.excludeFromExport) {
          object.clipPath = this.clipPath.toObject(propertiesToInclude);
          object.clipPath.inverted = this.clipPath.inverted;
          object.clipPath.absolutePositioned = this.clipPath.absolutePositioned;
        }
        fabric3.util.populateWithProperties(this, object, propertiesToInclude);
        if (!this.includeDefaultValues) {
          object = this._removeDefaultValues(object);
        }
        return object;
      },
      toDatalessObject: function(propertiesToInclude) {
        return this.toObject(propertiesToInclude);
      },
      _removeDefaultValues: function(object) {
        var prototype = fabric3.util.getKlass(object.type).prototype, stateProperties = prototype.stateProperties;
        stateProperties.forEach(function(prop) {
          if (prop === "left" || prop === "top") {
            return;
          }
          if (object[prop] === prototype[prop]) {
            delete object[prop];
          }
          if (Array.isArray(object[prop]) && Array.isArray(prototype[prop]) && object[prop].length === 0 && prototype[prop].length === 0) {
            delete object[prop];
          }
        });
        return object;
      },
      toString: function() {
        return "#<fabric." + capitalize(this.type) + ">";
      },
      getObjectScaling: function() {
        if (!this.group) {
          return {
            scaleX: this.scaleX,
            scaleY: this.scaleY
          };
        }
        var options = fabric3.util.qrDecompose(this.calcTransformMatrix());
        return { scaleX: Math.abs(options.scaleX), scaleY: Math.abs(options.scaleY) };
      },
      getTotalObjectScaling: function() {
        var scale = this.getObjectScaling(), scaleX = scale.scaleX, scaleY = scale.scaleY;
        if (this.canvas) {
          var zoom = this.canvas.getZoom();
          var retina = this.canvas.getRetinaScaling();
          scaleX *= zoom * retina;
          scaleY *= zoom * retina;
        }
        return { scaleX, scaleY };
      },
      getObjectOpacity: function() {
        var opacity = this.opacity;
        if (this.group) {
          opacity *= this.group.getObjectOpacity();
        }
        return opacity;
      },
      _set: function(key, value) {
        var shouldConstrainValue = key === "scaleX" || key === "scaleY", isChanged = this[key] !== value, groupNeedsUpdate = false;
        if (shouldConstrainValue) {
          value = this._constrainScale(value);
        }
        if (key === "scaleX" && value < 0) {
          this.flipX = !this.flipX;
          value *= -1;
        } else if (key === "scaleY" && value < 0) {
          this.flipY = !this.flipY;
          value *= -1;
        } else if (key === "shadow" && value && !(value instanceof fabric3.Shadow)) {
          value = new fabric3.Shadow(value);
        } else if (key === "dirty" && this.group) {
          this.group.set("dirty", value);
        }
        this[key] = value;
        if (isChanged) {
          groupNeedsUpdate = this.group && this.group.isOnACache();
          if (this.cacheProperties.indexOf(key) > -1) {
            this.dirty = true;
            groupNeedsUpdate && this.group.set("dirty", true);
          } else if (groupNeedsUpdate && this.stateProperties.indexOf(key) > -1) {
            this.group.set("dirty", true);
          }
        }
        return this;
      },
      setOnGroup: function() {
      },
      getViewportTransform: function() {
        if (this.canvas && this.canvas.viewportTransform) {
          return this.canvas.viewportTransform;
        }
        return fabric3.iMatrix.concat();
      },
      isNotVisible: function() {
        return this.opacity === 0 || !this.width && !this.height && this.strokeWidth === 0 || !this.visible;
      },
      render: function(ctx) {
        if (this.isNotVisible()) {
          return;
        }
        if (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen()) {
          return;
        }
        ctx.save();
        this._setupCompositeOperation(ctx);
        this.drawSelectionBackground(ctx);
        this.transform(ctx);
        this._setOpacity(ctx);
        this._setShadow(ctx, this);
        if (this.shouldCache()) {
          this.renderCache();
          this.drawCacheOnCanvas(ctx);
        } else {
          this._removeCacheCanvas();
          this.dirty = false;
          this.drawObject(ctx);
          if (this.objectCaching && this.statefullCache) {
            this.saveState({ propertySet: "cacheProperties" });
          }
        }
        ctx.restore();
      },
      renderCache: function(options) {
        options = options || {};
        if (!this._cacheCanvas || !this._cacheContext) {
          this._createCacheCanvas();
        }
        if (this.isCacheDirty()) {
          this.statefullCache && this.saveState({ propertySet: "cacheProperties" });
          this.drawObject(this._cacheContext, options.forClipping);
          this.dirty = false;
        }
      },
      _removeCacheCanvas: function() {
        this._cacheCanvas = null;
        this._cacheContext = null;
        this.cacheWidth = 0;
        this.cacheHeight = 0;
      },
      hasStroke: function() {
        return this.stroke && this.stroke !== "transparent" && this.strokeWidth !== 0;
      },
      hasFill: function() {
        return this.fill && this.fill !== "transparent";
      },
      needsItsOwnCache: function() {
        if (this.paintFirst === "stroke" && this.hasFill() && this.hasStroke() && typeof this.shadow === "object") {
          return true;
        }
        if (this.clipPath) {
          return true;
        }
        return false;
      },
      shouldCache: function() {
        this.ownCaching = this.needsItsOwnCache() || this.objectCaching && (!this.group || !this.group.isOnACache());
        return this.ownCaching;
      },
      willDrawShadow: function() {
        return !!this.shadow && (this.shadow.offsetX !== 0 || this.shadow.offsetY !== 0);
      },
      drawClipPathOnCache: function(ctx, clipPath) {
        ctx.save();
        if (clipPath.inverted) {
          ctx.globalCompositeOperation = "destination-out";
        } else {
          ctx.globalCompositeOperation = "destination-in";
        }
        if (clipPath.absolutePositioned) {
          var m = fabric3.util.invertTransform(this.calcTransformMatrix());
          ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        }
        clipPath.transform(ctx);
        ctx.scale(1 / clipPath.zoomX, 1 / clipPath.zoomY);
        ctx.drawImage(clipPath._cacheCanvas, -clipPath.cacheTranslationX, -clipPath.cacheTranslationY);
        ctx.restore();
      },
      drawObject: function(ctx, forClipping) {
        var originalFill = this.fill, originalStroke = this.stroke;
        if (forClipping) {
          this.fill = "black";
          this.stroke = "";
          this._setClippingProperties(ctx);
        } else {
          this._renderBackground(ctx);
        }
        this._render(ctx);
        this._drawClipPath(ctx, this.clipPath);
        this.fill = originalFill;
        this.stroke = originalStroke;
      },
      _drawClipPath: function(ctx, clipPath) {
        if (!clipPath) {
          return;
        }
        clipPath.canvas = this.canvas;
        clipPath.shouldCache();
        clipPath._transformDone = true;
        clipPath.renderCache({ forClipping: true });
        this.drawClipPathOnCache(ctx, clipPath);
      },
      drawCacheOnCanvas: function(ctx) {
        ctx.scale(1 / this.zoomX, 1 / this.zoomY);
        ctx.drawImage(this._cacheCanvas, -this.cacheTranslationX, -this.cacheTranslationY);
      },
      isCacheDirty: function(skipCanvas) {
        if (this.isNotVisible()) {
          return false;
        }
        if (this._cacheCanvas && this._cacheContext && !skipCanvas && this._updateCacheCanvas()) {
          return true;
        } else {
          if (this.dirty || this.clipPath && this.clipPath.absolutePositioned || this.statefullCache && this.hasStateChanged("cacheProperties")) {
            if (this._cacheCanvas && this._cacheContext && !skipCanvas) {
              var width = this.cacheWidth / this.zoomX;
              var height = this.cacheHeight / this.zoomY;
              this._cacheContext.clearRect(-width / 2, -height / 2, width, height);
            }
            return true;
          }
        }
        return false;
      },
      _renderBackground: function(ctx) {
        if (!this.backgroundColor) {
          return;
        }
        var dim = this._getNonTransformedDimensions();
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(
          -dim.x / 2,
          -dim.y / 2,
          dim.x,
          dim.y
        );
        this._removeShadow(ctx);
      },
      _setOpacity: function(ctx) {
        if (this.group && !this.group._transformDone) {
          ctx.globalAlpha = this.getObjectOpacity();
        } else {
          ctx.globalAlpha *= this.opacity;
        }
      },
      _setStrokeStyles: function(ctx, decl) {
        var stroke = decl.stroke;
        if (stroke) {
          ctx.lineWidth = decl.strokeWidth;
          ctx.lineCap = decl.strokeLineCap;
          ctx.lineDashOffset = decl.strokeDashOffset;
          ctx.lineJoin = decl.strokeLineJoin;
          ctx.miterLimit = decl.strokeMiterLimit;
          if (stroke.toLive) {
            if (stroke.gradientUnits === "percentage" || stroke.gradientTransform || stroke.patternTransform) {
              this._applyPatternForTransformedGradient(ctx, stroke);
            } else {
              ctx.strokeStyle = stroke.toLive(ctx, this);
              this._applyPatternGradientTransform(ctx, stroke);
            }
          } else {
            ctx.strokeStyle = decl.stroke;
          }
        }
      },
      _setFillStyles: function(ctx, decl) {
        var fill = decl.fill;
        if (fill) {
          if (fill.toLive) {
            ctx.fillStyle = fill.toLive(ctx, this);
            this._applyPatternGradientTransform(ctx, decl.fill);
          } else {
            ctx.fillStyle = fill;
          }
        }
      },
      _setClippingProperties: function(ctx) {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "transparent";
        ctx.fillStyle = "#000000";
      },
      _setLineDash: function(ctx, dashArray) {
        if (!dashArray || dashArray.length === 0) {
          return;
        }
        if (1 & dashArray.length) {
          dashArray.push.apply(dashArray, dashArray);
        }
        ctx.setLineDash(dashArray);
      },
      _renderControls: function(ctx, styleOverride) {
        var vpt = this.getViewportTransform(), matrix = this.calcTransformMatrix(), options, drawBorders, drawControls;
        styleOverride = styleOverride || {};
        drawBorders = typeof styleOverride.hasBorders !== "undefined" ? styleOverride.hasBorders : this.hasBorders;
        drawControls = typeof styleOverride.hasControls !== "undefined" ? styleOverride.hasControls : this.hasControls;
        matrix = fabric3.util.multiplyTransformMatrices(vpt, matrix);
        options = fabric3.util.qrDecompose(matrix);
        ctx.save();
        ctx.translate(options.translateX, options.translateY);
        ctx.lineWidth = 1 * this.borderScaleFactor;
        if (!this.group) {
          ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
        }
        if (this.flipX) {
          options.angle -= 180;
        }
        ctx.rotate(degreesToRadians(this.group ? options.angle : this.angle));
        if (styleOverride.forActiveSelection || this.group) {
          drawBorders && this.drawBordersInGroup(ctx, options, styleOverride);
        } else {
          drawBorders && this.drawBorders(ctx, styleOverride);
        }
        drawControls && this.drawControls(ctx, styleOverride);
        ctx.restore();
      },
      _setShadow: function(ctx) {
        if (!this.shadow) {
          return;
        }
        var shadow = this.shadow, canvas2 = this.canvas, scaling, multX = canvas2 && canvas2.viewportTransform[0] || 1, multY = canvas2 && canvas2.viewportTransform[3] || 1;
        if (shadow.nonScaling) {
          scaling = { scaleX: 1, scaleY: 1 };
        } else {
          scaling = this.getObjectScaling();
        }
        if (canvas2 && canvas2._isRetinaScaling()) {
          multX *= fabric3.devicePixelRatio;
          multY *= fabric3.devicePixelRatio;
        }
        ctx.shadowColor = shadow.color;
        ctx.shadowBlur = shadow.blur * fabric3.browserShadowBlurConstant * (multX + multY) * (scaling.scaleX + scaling.scaleY) / 4;
        ctx.shadowOffsetX = shadow.offsetX * multX * scaling.scaleX;
        ctx.shadowOffsetY = shadow.offsetY * multY * scaling.scaleY;
      },
      _removeShadow: function(ctx) {
        if (!this.shadow) {
          return;
        }
        ctx.shadowColor = "";
        ctx.shadowBlur = ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
      },
      _applyPatternGradientTransform: function(ctx, filler) {
        if (!filler || !filler.toLive) {
          return { offsetX: 0, offsetY: 0 };
        }
        var t = filler.gradientTransform || filler.patternTransform;
        var offsetX = -this.width / 2 + filler.offsetX || 0, offsetY = -this.height / 2 + filler.offsetY || 0;
        if (filler.gradientUnits === "percentage") {
          ctx.transform(this.width, 0, 0, this.height, offsetX, offsetY);
        } else {
          ctx.transform(1, 0, 0, 1, offsetX, offsetY);
        }
        if (t) {
          ctx.transform(t[0], t[1], t[2], t[3], t[4], t[5]);
        }
        return { offsetX, offsetY };
      },
      _renderPaintInOrder: function(ctx) {
        if (this.paintFirst === "stroke") {
          this._renderStroke(ctx);
          this._renderFill(ctx);
        } else {
          this._renderFill(ctx);
          this._renderStroke(ctx);
        }
      },
      _render: function() {
      },
      _renderFill: function(ctx) {
        if (!this.fill) {
          return;
        }
        ctx.save();
        this._setFillStyles(ctx, this);
        if (this.fillRule === "evenodd") {
          ctx.fill("evenodd");
        } else {
          ctx.fill();
        }
        ctx.restore();
      },
      _renderStroke: function(ctx) {
        if (!this.stroke || this.strokeWidth === 0) {
          return;
        }
        if (this.shadow && !this.shadow.affectStroke) {
          this._removeShadow(ctx);
        }
        ctx.save();
        if (this.strokeUniform && this.group) {
          var scaling = this.getObjectScaling();
          ctx.scale(1 / scaling.scaleX, 1 / scaling.scaleY);
        } else if (this.strokeUniform) {
          ctx.scale(1 / this.scaleX, 1 / this.scaleY);
        }
        this._setLineDash(ctx, this.strokeDashArray);
        this._setStrokeStyles(ctx, this);
        ctx.stroke();
        ctx.restore();
      },
      _applyPatternForTransformedGradient: function(ctx, filler) {
        var dims = this._limitCacheSize(this._getCacheCanvasDimensions()), pCanvas = fabric3.util.createCanvasElement(), pCtx, retinaScaling = this.canvas.getRetinaScaling(), width = dims.x / this.scaleX / retinaScaling, height = dims.y / this.scaleY / retinaScaling;
        pCanvas.width = width;
        pCanvas.height = height;
        pCtx = pCanvas.getContext("2d");
        pCtx.beginPath();
        pCtx.moveTo(0, 0);
        pCtx.lineTo(width, 0);
        pCtx.lineTo(width, height);
        pCtx.lineTo(0, height);
        pCtx.closePath();
        pCtx.translate(width / 2, height / 2);
        pCtx.scale(
          dims.zoomX / this.scaleX / retinaScaling,
          dims.zoomY / this.scaleY / retinaScaling
        );
        this._applyPatternGradientTransform(pCtx, filler);
        pCtx.fillStyle = filler.toLive(ctx);
        pCtx.fill();
        ctx.translate(-this.width / 2 - this.strokeWidth / 2, -this.height / 2 - this.strokeWidth / 2);
        ctx.scale(
          retinaScaling * this.scaleX / dims.zoomX,
          retinaScaling * this.scaleY / dims.zoomY
        );
        ctx.strokeStyle = pCtx.createPattern(pCanvas, "no-repeat");
      },
      _findCenterFromElement: function() {
        return { x: this.left + this.width / 2, y: this.top + this.height / 2 };
      },
      _assignTransformMatrixProps: function() {
        if (this.transformMatrix) {
          var options = fabric3.util.qrDecompose(this.transformMatrix);
          this.flipX = false;
          this.flipY = false;
          this.set("scaleX", options.scaleX);
          this.set("scaleY", options.scaleY);
          this.angle = options.angle;
          this.skewX = options.skewX;
          this.skewY = 0;
        }
      },
      _removeTransformMatrix: function(preserveAspectRatioOptions) {
        var center = this._findCenterFromElement();
        if (this.transformMatrix) {
          this._assignTransformMatrixProps();
          center = fabric3.util.transformPoint(center, this.transformMatrix);
        }
        this.transformMatrix = null;
        if (preserveAspectRatioOptions) {
          this.scaleX *= preserveAspectRatioOptions.scaleX;
          this.scaleY *= preserveAspectRatioOptions.scaleY;
          this.cropX = preserveAspectRatioOptions.cropX;
          this.cropY = preserveAspectRatioOptions.cropY;
          center.x += preserveAspectRatioOptions.offsetLeft;
          center.y += preserveAspectRatioOptions.offsetTop;
          this.width = preserveAspectRatioOptions.width;
          this.height = preserveAspectRatioOptions.height;
        }
        this.setPositionByOrigin(center, "center", "center");
      },
      clone: function(callback, propertiesToInclude) {
        var objectForm = this.toObject(propertiesToInclude);
        if (this.constructor.fromObject) {
          this.constructor.fromObject(objectForm, callback);
        } else {
          fabric3.Object._fromObject("Object", objectForm, callback);
        }
      },
      cloneAsImage: function(callback, options) {
        var canvasEl = this.toCanvasElement(options);
        if (callback) {
          callback(new fabric3.Image(canvasEl));
        }
        return this;
      },
      toCanvasElement: function(options) {
        options || (options = {});
        var utils2 = fabric3.util, origParams = utils2.saveObjectTransform(this), originalGroup = this.group, originalShadow = this.shadow, abs = Math.abs, multiplier = (options.multiplier || 1) * (options.enableRetinaScaling ? fabric3.devicePixelRatio : 1);
        delete this.group;
        if (options.withoutTransform) {
          utils2.resetObjectTransform(this);
        }
        if (options.withoutShadow) {
          this.shadow = null;
        }
        var el = fabric3.util.createCanvasElement(), boundingRect = this.getBoundingRect(true, true), shadow = this.shadow, scaling, shadowOffset = { x: 0, y: 0 }, shadowBlur, width, height;
        if (shadow) {
          shadowBlur = shadow.blur;
          if (shadow.nonScaling) {
            scaling = { scaleX: 1, scaleY: 1 };
          } else {
            scaling = this.getObjectScaling();
          }
          shadowOffset.x = 2 * Math.round(abs(shadow.offsetX) + shadowBlur) * abs(scaling.scaleX);
          shadowOffset.y = 2 * Math.round(abs(shadow.offsetY) + shadowBlur) * abs(scaling.scaleY);
        }
        width = boundingRect.width + shadowOffset.x;
        height = boundingRect.height + shadowOffset.y;
        el.width = Math.ceil(width);
        el.height = Math.ceil(height);
        var canvas2 = new fabric3.StaticCanvas(el, {
          enableRetinaScaling: false,
          renderOnAddRemove: false,
          skipOffscreen: false
        });
        if (options.format === "jpeg") {
          canvas2.backgroundColor = "#fff";
        }
        this.setPositionByOrigin(new fabric3.Point(canvas2.width / 2, canvas2.height / 2), "center", "center");
        var originalCanvas = this.canvas;
        canvas2.add(this);
        var canvasEl = canvas2.toCanvasElement(multiplier || 1, options);
        this.shadow = originalShadow;
        this.set("canvas", originalCanvas);
        if (originalGroup) {
          this.group = originalGroup;
        }
        this.set(origParams).setCoords();
        canvas2._objects = [];
        canvas2.dispose();
        canvas2 = null;
        return canvasEl;
      },
      toDataURL: function(options) {
        options || (options = {});
        return fabric3.util.toDataURL(this.toCanvasElement(options), options.format || "png", options.quality || 1);
      },
      isType: function(type) {
        return arguments.length > 1 ? Array.from(arguments).includes(this.type) : this.type === type;
      },
      complexity: function() {
        return 1;
      },
      toJSON: function(propertiesToInclude) {
        return this.toObject(propertiesToInclude);
      },
      rotate: function(angle) {
        var shouldCenterOrigin = (this.originX !== "center" || this.originY !== "center") && this.centeredRotation;
        if (shouldCenterOrigin) {
          this._setOriginToCenter();
        }
        this.set("angle", angle);
        if (shouldCenterOrigin) {
          this._resetOrigin();
        }
        return this;
      },
      centerH: function() {
        this.canvas && this.canvas.centerObjectH(this);
        return this;
      },
      viewportCenterH: function() {
        this.canvas && this.canvas.viewportCenterObjectH(this);
        return this;
      },
      centerV: function() {
        this.canvas && this.canvas.centerObjectV(this);
        return this;
      },
      viewportCenterV: function() {
        this.canvas && this.canvas.viewportCenterObjectV(this);
        return this;
      },
      center: function() {
        this.canvas && this.canvas.centerObject(this);
        return this;
      },
      viewportCenter: function() {
        this.canvas && this.canvas.viewportCenterObject(this);
        return this;
      },
      getLocalPointer: function(e, pointer) {
        pointer = pointer || this.canvas.getPointer(e);
        var pClicked = new fabric3.Point(pointer.x, pointer.y), objectLeftTop = this._getLeftTopCoords();
        if (this.angle) {
          pClicked = fabric3.util.rotatePoint(
            pClicked,
            objectLeftTop,
            degreesToRadians(-this.angle)
          );
        }
        return {
          x: pClicked.x - objectLeftTop.x,
          y: pClicked.y - objectLeftTop.y
        };
      },
      _setupCompositeOperation: function(ctx) {
        if (this.globalCompositeOperation) {
          ctx.globalCompositeOperation = this.globalCompositeOperation;
        }
      },
      dispose: function() {
        if (fabric3.runningAnimations) {
          fabric3.runningAnimations.cancelByTarget(this);
        }
      }
    });
    fabric3.util.createAccessors && fabric3.util.createAccessors(fabric3.Object);
    extend(fabric3.Object.prototype, fabric3.Observable);
    fabric3.Object.NUM_FRACTION_DIGITS = 2;
    fabric3.Object.ENLIVEN_PROPS = ["clipPath"];
    fabric3.Object._fromObject = function(className, object, callback, extraParam) {
      var klass = fabric3[className];
      object = clone(object, true);
      fabric3.util.enlivenPatterns([object.fill, object.stroke], function(patterns) {
        if (typeof patterns[0] !== "undefined") {
          object.fill = patterns[0];
        }
        if (typeof patterns[1] !== "undefined") {
          object.stroke = patterns[1];
        }
        fabric3.util.enlivenObjectEnlivables(object, object, function() {
          var instance = extraParam ? new klass(object[extraParam], object) : new klass(object);
          callback && callback(instance);
        });
      });
    };
    fabric3.Object.__uid = 0;
  })(exports);
  (function() {
    var degreesToRadians = fabric2.util.degreesToRadians, originXOffset = {
      left: -0.5,
      center: 0,
      right: 0.5
    }, originYOffset = {
      top: -0.5,
      center: 0,
      bottom: 0.5
    };
    fabric2.util.object.extend(fabric2.Object.prototype, {
      translateToGivenOrigin: function(point, fromOriginX, fromOriginY, toOriginX, toOriginY) {
        var x = point.x, y = point.y, offsetX, offsetY, dim;
        if (typeof fromOriginX === "string") {
          fromOriginX = originXOffset[fromOriginX];
        } else {
          fromOriginX -= 0.5;
        }
        if (typeof toOriginX === "string") {
          toOriginX = originXOffset[toOriginX];
        } else {
          toOriginX -= 0.5;
        }
        offsetX = toOriginX - fromOriginX;
        if (typeof fromOriginY === "string") {
          fromOriginY = originYOffset[fromOriginY];
        } else {
          fromOriginY -= 0.5;
        }
        if (typeof toOriginY === "string") {
          toOriginY = originYOffset[toOriginY];
        } else {
          toOriginY -= 0.5;
        }
        offsetY = toOriginY - fromOriginY;
        if (offsetX || offsetY) {
          dim = this._getTransformedDimensions();
          x = point.x + offsetX * dim.x;
          y = point.y + offsetY * dim.y;
        }
        return new fabric2.Point(x, y);
      },
      translateToCenterPoint: function(point, originX, originY) {
        var p = this.translateToGivenOrigin(point, originX, originY, "center", "center");
        if (this.angle) {
          return fabric2.util.rotatePoint(p, point, degreesToRadians(this.angle));
        }
        return p;
      },
      translateToOriginPoint: function(center, originX, originY) {
        var p = this.translateToGivenOrigin(center, "center", "center", originX, originY);
        if (this.angle) {
          return fabric2.util.rotatePoint(p, center, degreesToRadians(this.angle));
        }
        return p;
      },
      getCenterPoint: function() {
        var leftTop = new fabric2.Point(this.left, this.top);
        return this.translateToCenterPoint(leftTop, this.originX, this.originY);
      },
      getPointByOrigin: function(originX, originY) {
        var center = this.getCenterPoint();
        return this.translateToOriginPoint(center, originX, originY);
      },
      toLocalPoint: function(point, originX, originY) {
        var center = this.getCenterPoint(), p, p2;
        if (typeof originX !== "undefined" && typeof originY !== "undefined") {
          p = this.translateToGivenOrigin(center, "center", "center", originX, originY);
        } else {
          p = new fabric2.Point(this.left, this.top);
        }
        p2 = new fabric2.Point(point.x, point.y);
        if (this.angle) {
          p2 = fabric2.util.rotatePoint(p2, center, -degreesToRadians(this.angle));
        }
        return p2.subtractEquals(p);
      },
      setPositionByOrigin: function(pos, originX, originY) {
        var center = this.translateToCenterPoint(pos, originX, originY), position = this.translateToOriginPoint(center, this.originX, this.originY);
        this.set("left", position.x);
        this.set("top", position.y);
      },
      adjustPosition: function(to) {
        var angle = degreesToRadians(this.angle), hypotFull = this.getScaledWidth(), xFull = fabric2.util.cos(angle) * hypotFull, yFull = fabric2.util.sin(angle) * hypotFull, offsetFrom, offsetTo;
        if (typeof this.originX === "string") {
          offsetFrom = originXOffset[this.originX];
        } else {
          offsetFrom = this.originX - 0.5;
        }
        if (typeof to === "string") {
          offsetTo = originXOffset[to];
        } else {
          offsetTo = to - 0.5;
        }
        this.left += xFull * (offsetTo - offsetFrom);
        this.top += yFull * (offsetTo - offsetFrom);
        this.setCoords();
        this.originX = to;
      },
      _setOriginToCenter: function() {
        this._originalOriginX = this.originX;
        this._originalOriginY = this.originY;
        var center = this.getCenterPoint();
        this.originX = "center";
        this.originY = "center";
        this.left = center.x;
        this.top = center.y;
      },
      _resetOrigin: function() {
        var originPoint = this.translateToOriginPoint(
          this.getCenterPoint(),
          this._originalOriginX,
          this._originalOriginY
        );
        this.originX = this._originalOriginX;
        this.originY = this._originalOriginY;
        this.left = originPoint.x;
        this.top = originPoint.y;
        this._originalOriginX = null;
        this._originalOriginY = null;
      },
      _getLeftTopCoords: function() {
        return this.translateToOriginPoint(this.getCenterPoint(), "left", "top");
      }
    });
  })();
  (function() {
    function arrayFromCoords(coords) {
      return [
        new fabric2.Point(coords.tl.x, coords.tl.y),
        new fabric2.Point(coords.tr.x, coords.tr.y),
        new fabric2.Point(coords.br.x, coords.br.y),
        new fabric2.Point(coords.bl.x, coords.bl.y)
      ];
    }
    var util = fabric2.util, degreesToRadians = util.degreesToRadians, multiplyMatrices = util.multiplyTransformMatrices, transformPoint = util.transformPoint;
    util.object.extend(fabric2.Object.prototype, {
      oCoords: null,
      aCoords: null,
      lineCoords: null,
      ownMatrixCache: null,
      matrixCache: null,
      controls: {},
      _getCoords: function(absolute, calculate) {
        if (calculate) {
          return absolute ? this.calcACoords() : this.calcLineCoords();
        }
        if (!this.aCoords || !this.lineCoords) {
          this.setCoords(true);
        }
        return absolute ? this.aCoords : this.lineCoords;
      },
      getCoords: function(absolute, calculate) {
        return arrayFromCoords(this._getCoords(absolute, calculate));
      },
      intersectsWithRect: function(pointTL, pointBR, absolute, calculate) {
        var coords = this.getCoords(absolute, calculate), intersection = fabric2.Intersection.intersectPolygonRectangle(
          coords,
          pointTL,
          pointBR
        );
        return intersection.status === "Intersection";
      },
      intersectsWithObject: function(other, absolute, calculate) {
        var intersection = fabric2.Intersection.intersectPolygonPolygon(
          this.getCoords(absolute, calculate),
          other.getCoords(absolute, calculate)
        );
        return intersection.status === "Intersection" || other.isContainedWithinObject(this, absolute, calculate) || this.isContainedWithinObject(other, absolute, calculate);
      },
      isContainedWithinObject: function(other, absolute, calculate) {
        var points = this.getCoords(absolute, calculate), otherCoords = absolute ? other.aCoords : other.lineCoords, i = 0, lines = other._getImageLines(otherCoords);
        for (; i < 4; i++) {
          if (!other.containsPoint(points[i], lines)) {
            return false;
          }
        }
        return true;
      },
      isContainedWithinRect: function(pointTL, pointBR, absolute, calculate) {
        var boundingRect = this.getBoundingRect(absolute, calculate);
        return boundingRect.left >= pointTL.x && boundingRect.left + boundingRect.width <= pointBR.x && boundingRect.top >= pointTL.y && boundingRect.top + boundingRect.height <= pointBR.y;
      },
      containsPoint: function(point, lines, absolute, calculate) {
        var coords = this._getCoords(absolute, calculate), lines = lines || this._getImageLines(coords), xPoints = this._findCrossPoints(point, lines);
        return xPoints !== 0 && xPoints % 2 === 1;
      },
      isOnScreen: function(calculate) {
        if (!this.canvas) {
          return false;
        }
        var pointTL = this.canvas.vptCoords.tl, pointBR = this.canvas.vptCoords.br;
        var points = this.getCoords(true, calculate);
        if (points.some(function(point) {
          return point.x <= pointBR.x && point.x >= pointTL.x && point.y <= pointBR.y && point.y >= pointTL.y;
        })) {
          return true;
        }
        if (this.intersectsWithRect(pointTL, pointBR, true, calculate)) {
          return true;
        }
        return this._containsCenterOfCanvas(pointTL, pointBR, calculate);
      },
      _containsCenterOfCanvas: function(pointTL, pointBR, calculate) {
        var centerPoint = { x: (pointTL.x + pointBR.x) / 2, y: (pointTL.y + pointBR.y) / 2 };
        if (this.containsPoint(centerPoint, null, true, calculate)) {
          return true;
        }
        return false;
      },
      isPartiallyOnScreen: function(calculate) {
        if (!this.canvas) {
          return false;
        }
        var pointTL = this.canvas.vptCoords.tl, pointBR = this.canvas.vptCoords.br;
        if (this.intersectsWithRect(pointTL, pointBR, true, calculate)) {
          return true;
        }
        var allPointsAreOutside = this.getCoords(true, calculate).every(function(point) {
          return (point.x >= pointBR.x || point.x <= pointTL.x) && (point.y >= pointBR.y || point.y <= pointTL.y);
        });
        return allPointsAreOutside && this._containsCenterOfCanvas(pointTL, pointBR, calculate);
      },
      _getImageLines: function(oCoords) {
        var lines = {
          topline: {
            o: oCoords.tl,
            d: oCoords.tr
          },
          rightline: {
            o: oCoords.tr,
            d: oCoords.br
          },
          bottomline: {
            o: oCoords.br,
            d: oCoords.bl
          },
          leftline: {
            o: oCoords.bl,
            d: oCoords.tl
          }
        };
        return lines;
      },
      _findCrossPoints: function(point, lines) {
        var b1, b2, a1, a2, xi, xcount = 0, iLine;
        for (var lineKey in lines) {
          iLine = lines[lineKey];
          if (iLine.o.y < point.y && iLine.d.y < point.y) {
            continue;
          }
          if (iLine.o.y >= point.y && iLine.d.y >= point.y) {
            continue;
          }
          if (iLine.o.x === iLine.d.x && iLine.o.x >= point.x) {
            xi = iLine.o.x;
          } else {
            b1 = 0;
            b2 = (iLine.d.y - iLine.o.y) / (iLine.d.x - iLine.o.x);
            a1 = point.y - b1 * point.x;
            a2 = iLine.o.y - b2 * iLine.o.x;
            xi = -(a1 - a2) / (b1 - b2);
          }
          if (xi >= point.x) {
            xcount += 1;
          }
          if (xcount === 2) {
            break;
          }
        }
        return xcount;
      },
      getBoundingRect: function(absolute, calculate) {
        var coords = this.getCoords(absolute, calculate);
        return util.makeBoundingBoxFromPoints(coords);
      },
      getScaledWidth: function() {
        return this._getTransformedDimensions().x;
      },
      getScaledHeight: function() {
        return this._getTransformedDimensions().y;
      },
      _constrainScale: function(value) {
        if (Math.abs(value) < this.minScaleLimit) {
          if (value < 0) {
            return -this.minScaleLimit;
          } else {
            return this.minScaleLimit;
          }
        } else if (value === 0) {
          return 1e-4;
        }
        return value;
      },
      scale: function(value) {
        this._set("scaleX", value);
        this._set("scaleY", value);
        return this.setCoords();
      },
      scaleToWidth: function(value, absolute) {
        var boundingRectFactor = this.getBoundingRect(absolute).width / this.getScaledWidth();
        return this.scale(value / this.width / boundingRectFactor);
      },
      scaleToHeight: function(value, absolute) {
        var boundingRectFactor = this.getBoundingRect(absolute).height / this.getScaledHeight();
        return this.scale(value / this.height / boundingRectFactor);
      },
      calcLineCoords: function() {
        var vpt = this.getViewportTransform(), padding = this.padding, angle = degreesToRadians(this.angle), cos = util.cos(angle), sin = util.sin(angle), cosP = cos * padding, sinP = sin * padding, cosPSinP = cosP + sinP, cosPMinusSinP = cosP - sinP, aCoords = this.calcACoords();
        var lineCoords = {
          tl: transformPoint(aCoords.tl, vpt),
          tr: transformPoint(aCoords.tr, vpt),
          bl: transformPoint(aCoords.bl, vpt),
          br: transformPoint(aCoords.br, vpt)
        };
        if (padding) {
          lineCoords.tl.x -= cosPMinusSinP;
          lineCoords.tl.y -= cosPSinP;
          lineCoords.tr.x += cosPSinP;
          lineCoords.tr.y -= cosPMinusSinP;
          lineCoords.bl.x -= cosPSinP;
          lineCoords.bl.y += cosPMinusSinP;
          lineCoords.br.x += cosPMinusSinP;
          lineCoords.br.y += cosPSinP;
        }
        return lineCoords;
      },
      calcOCoords: function() {
        var rotateMatrix = this._calcRotateMatrix(), translateMatrix = this._calcTranslateMatrix(), vpt = this.getViewportTransform(), startMatrix = multiplyMatrices(vpt, translateMatrix), finalMatrix = multiplyMatrices(startMatrix, rotateMatrix), finalMatrix = multiplyMatrices(finalMatrix, [1 / vpt[0], 0, 0, 1 / vpt[3], 0, 0]), dim = this._calculateCurrentDimensions(), coords = {};
        this.forEachControl(function(control, key, fabricObject) {
          coords[key] = control.positionHandler(dim, finalMatrix, fabricObject);
        });
        return coords;
      },
      calcACoords: function() {
        var rotateMatrix = this._calcRotateMatrix(), translateMatrix = this._calcTranslateMatrix(), finalMatrix = multiplyMatrices(translateMatrix, rotateMatrix), dim = this._getTransformedDimensions(), w = dim.x / 2, h = dim.y / 2;
        return {
          tl: transformPoint({ x: -w, y: -h }, finalMatrix),
          tr: transformPoint({ x: w, y: -h }, finalMatrix),
          bl: transformPoint({ x: -w, y: h }, finalMatrix),
          br: transformPoint({ x: w, y: h }, finalMatrix)
        };
      },
      setCoords: function(skipCorners) {
        this.aCoords = this.calcACoords();
        this.lineCoords = this.group ? this.aCoords : this.calcLineCoords();
        if (skipCorners) {
          return this;
        }
        this.oCoords = this.calcOCoords();
        this._setCornerCoords && this._setCornerCoords();
        return this;
      },
      _calcRotateMatrix: function() {
        return util.calcRotateMatrix(this);
      },
      _calcTranslateMatrix: function() {
        var center = this.getCenterPoint();
        return [1, 0, 0, 1, center.x, center.y];
      },
      transformMatrixKey: function(skipGroup) {
        var sep = "_", prefix = "";
        if (!skipGroup && this.group) {
          prefix = this.group.transformMatrixKey(skipGroup) + sep;
        }
        return prefix + this.top + sep + this.left + sep + this.scaleX + sep + this.scaleY + sep + this.skewX + sep + this.skewY + sep + this.angle + sep + this.originX + sep + this.originY + sep + this.width + sep + this.height + sep + this.strokeWidth + this.flipX + this.flipY;
      },
      calcTransformMatrix: function(skipGroup) {
        var matrix = this.calcOwnMatrix();
        if (skipGroup || !this.group) {
          return matrix;
        }
        var key = this.transformMatrixKey(skipGroup), cache = this.matrixCache || (this.matrixCache = {});
        if (cache.key === key) {
          return cache.value;
        }
        if (this.group) {
          matrix = multiplyMatrices(this.group.calcTransformMatrix(false), matrix);
        }
        cache.key = key;
        cache.value = matrix;
        return matrix;
      },
      calcOwnMatrix: function() {
        var key = this.transformMatrixKey(true), cache = this.ownMatrixCache || (this.ownMatrixCache = {});
        if (cache.key === key) {
          return cache.value;
        }
        var tMatrix = this._calcTranslateMatrix(), options = {
          angle: this.angle,
          translateX: tMatrix[4],
          translateY: tMatrix[5],
          scaleX: this.scaleX,
          scaleY: this.scaleY,
          skewX: this.skewX,
          skewY: this.skewY,
          flipX: this.flipX,
          flipY: this.flipY
        };
        cache.key = key;
        cache.value = util.composeMatrix(options);
        return cache.value;
      },
      _getNonTransformedDimensions: function() {
        var strokeWidth = this.strokeWidth, w = this.width + strokeWidth, h = this.height + strokeWidth;
        return { x: w, y: h };
      },
      _getTransformedDimensions: function(skewX, skewY) {
        if (typeof skewX === "undefined") {
          skewX = this.skewX;
        }
        if (typeof skewY === "undefined") {
          skewY = this.skewY;
        }
        var dimensions, dimX, dimY, noSkew = skewX === 0 && skewY === 0;
        if (this.strokeUniform) {
          dimX = this.width;
          dimY = this.height;
        } else {
          dimensions = this._getNonTransformedDimensions();
          dimX = dimensions.x;
          dimY = dimensions.y;
        }
        if (noSkew) {
          return this._finalizeDimensions(dimX * this.scaleX, dimY * this.scaleY);
        }
        var bbox = util.sizeAfterTransform(dimX, dimY, {
          scaleX: this.scaleX,
          scaleY: this.scaleY,
          skewX,
          skewY
        });
        return this._finalizeDimensions(bbox.x, bbox.y);
      },
      _finalizeDimensions: function(width, height) {
        return this.strokeUniform ? { x: width + this.strokeWidth, y: height + this.strokeWidth } : { x: width, y: height };
      },
      _calculateCurrentDimensions: function() {
        var vpt = this.getViewportTransform(), dim = this._getTransformedDimensions(), p = transformPoint(dim, vpt, true);
        return p.scalarAdd(2 * this.padding);
      }
    });
  })();
  fabric2.util.object.extend(fabric2.Object.prototype, {
    sendToBack: function() {
      if (this.group) {
        fabric2.StaticCanvas.prototype.sendToBack.call(this.group, this);
      } else if (this.canvas) {
        this.canvas.sendToBack(this);
      }
      return this;
    },
    bringToFront: function() {
      if (this.group) {
        fabric2.StaticCanvas.prototype.bringToFront.call(this.group, this);
      } else if (this.canvas) {
        this.canvas.bringToFront(this);
      }
      return this;
    },
    sendBackwards: function(intersecting) {
      if (this.group) {
        fabric2.StaticCanvas.prototype.sendBackwards.call(this.group, this, intersecting);
      } else if (this.canvas) {
        this.canvas.sendBackwards(this, intersecting);
      }
      return this;
    },
    bringForward: function(intersecting) {
      if (this.group) {
        fabric2.StaticCanvas.prototype.bringForward.call(this.group, this, intersecting);
      } else if (this.canvas) {
        this.canvas.bringForward(this, intersecting);
      }
      return this;
    },
    moveTo: function(index) {
      if (this.group && this.group.type !== "activeSelection") {
        fabric2.StaticCanvas.prototype.moveTo.call(this.group, this, index);
      } else if (this.canvas) {
        this.canvas.moveTo(this, index);
      }
      return this;
    }
  });
  (function() {
    function getSvgColorString(prop, value) {
      if (!value) {
        return prop + ": none; ";
      } else if (value.toLive) {
        return prop + ": url(#SVGID_" + value.id + "); ";
      } else {
        var color = new fabric2.Color(value), str = prop + ": " + color.toRgb() + "; ", opacity = color.getAlpha();
        if (opacity !== 1) {
          str += prop + "-opacity: " + opacity.toString() + "; ";
        }
        return str;
      }
    }
    var toFixed = fabric2.util.toFixed;
    fabric2.util.object.extend(fabric2.Object.prototype, {
      getSvgStyles: function(skipShadow) {
        var fillRule = this.fillRule ? this.fillRule : "nonzero", strokeWidth = this.strokeWidth ? this.strokeWidth : "0", strokeDashArray = this.strokeDashArray ? this.strokeDashArray.join(" ") : "none", strokeDashOffset = this.strokeDashOffset ? this.strokeDashOffset : "0", strokeLineCap = this.strokeLineCap ? this.strokeLineCap : "butt", strokeLineJoin = this.strokeLineJoin ? this.strokeLineJoin : "miter", strokeMiterLimit = this.strokeMiterLimit ? this.strokeMiterLimit : "4", opacity = typeof this.opacity !== "undefined" ? this.opacity : "1", visibility = this.visible ? "" : " visibility: hidden;", filter = skipShadow ? "" : this.getSvgFilter(), fill = getSvgColorString("fill", this.fill), stroke = getSvgColorString("stroke", this.stroke);
        return [
          stroke,
          "stroke-width: ",
          strokeWidth,
          "; ",
          "stroke-dasharray: ",
          strokeDashArray,
          "; ",
          "stroke-linecap: ",
          strokeLineCap,
          "; ",
          "stroke-dashoffset: ",
          strokeDashOffset,
          "; ",
          "stroke-linejoin: ",
          strokeLineJoin,
          "; ",
          "stroke-miterlimit: ",
          strokeMiterLimit,
          "; ",
          fill,
          "fill-rule: ",
          fillRule,
          "; ",
          "opacity: ",
          opacity,
          ";",
          filter,
          visibility
        ].join("");
      },
      getSvgSpanStyles: function(style, useWhiteSpace) {
        var term = "; ";
        var fontFamily = style.fontFamily ? "font-family: " + (style.fontFamily.indexOf("'") === -1 && style.fontFamily.indexOf('"') === -1 ? "'" + style.fontFamily + "'" : style.fontFamily) + term : "";
        var strokeWidth = style.strokeWidth ? "stroke-width: " + style.strokeWidth + term : "", fontFamily = fontFamily, fontSize = style.fontSize ? "font-size: " + style.fontSize + "px" + term : "", fontStyle = style.fontStyle ? "font-style: " + style.fontStyle + term : "", fontWeight = style.fontWeight ? "font-weight: " + style.fontWeight + term : "", fill = style.fill ? getSvgColorString("fill", style.fill) : "", stroke = style.stroke ? getSvgColorString("stroke", style.stroke) : "", textDecoration = this.getSvgTextDecoration(style), deltaY = style.deltaY ? "baseline-shift: " + -style.deltaY + "; " : "";
        if (textDecoration) {
          textDecoration = "text-decoration: " + textDecoration + term;
        }
        return [
          stroke,
          strokeWidth,
          fontFamily,
          fontSize,
          fontStyle,
          fontWeight,
          textDecoration,
          fill,
          deltaY,
          useWhiteSpace ? "white-space: pre; " : ""
        ].join("");
      },
      getSvgTextDecoration: function(style) {
        return ["overline", "underline", "line-through"].filter(function(decoration) {
          return style[decoration.replace("-", "")];
        }).join(" ");
      },
      getSvgFilter: function() {
        return this.shadow ? "filter: url(#SVGID_" + this.shadow.id + ");" : "";
      },
      getSvgCommons: function() {
        return [
          this.id ? 'id="' + this.id + '" ' : "",
          this.clipPath ? 'clip-path="url(#' + this.clipPath.clipPathId + ')" ' : ""
        ].join("");
      },
      getSvgTransform: function(full, additionalTransform) {
        var transform = full ? this.calcTransformMatrix() : this.calcOwnMatrix(), svgTransform = 'transform="' + fabric2.util.matrixToSVG(transform);
        return svgTransform + (additionalTransform || "") + '" ';
      },
      _setSVGBg: function(textBgRects) {
        if (this.backgroundColor) {
          var NUM_FRACTION_DIGITS = fabric2.Object.NUM_FRACTION_DIGITS;
          textBgRects.push(
            "		<rect ",
            this._getFillAttributes(this.backgroundColor),
            ' x="',
            toFixed(-this.width / 2, NUM_FRACTION_DIGITS),
            '" y="',
            toFixed(-this.height / 2, NUM_FRACTION_DIGITS),
            '" width="',
            toFixed(this.width, NUM_FRACTION_DIGITS),
            '" height="',
            toFixed(this.height, NUM_FRACTION_DIGITS),
            '"></rect>\n'
          );
        }
      },
      toSVG: function(reviver) {
        return this._createBaseSVGMarkup(this._toSVG(reviver), { reviver });
      },
      toClipPathSVG: function(reviver) {
        return "	" + this._createBaseClipPathSVGMarkup(this._toSVG(reviver), { reviver });
      },
      _createBaseClipPathSVGMarkup: function(objectMarkup, options) {
        options = options || {};
        var reviver = options.reviver, additionalTransform = options.additionalTransform || "", commonPieces = [
          this.getSvgTransform(true, additionalTransform),
          this.getSvgCommons()
        ].join(""), index = objectMarkup.indexOf("COMMON_PARTS");
        objectMarkup[index] = commonPieces;
        return reviver ? reviver(objectMarkup.join("")) : objectMarkup.join("");
      },
      _createBaseSVGMarkup: function(objectMarkup, options) {
        options = options || {};
        var noStyle = options.noStyle, reviver = options.reviver, styleInfo = noStyle ? "" : 'style="' + this.getSvgStyles() + '" ', shadowInfo = options.withShadow ? 'style="' + this.getSvgFilter() + '" ' : "", clipPath = this.clipPath, vectorEffect = this.strokeUniform ? 'vector-effect="non-scaling-stroke" ' : "", absoluteClipPath = clipPath && clipPath.absolutePositioned, stroke = this.stroke, fill = this.fill, shadow = this.shadow, commonPieces, markup = [], clipPathMarkup, index = objectMarkup.indexOf("COMMON_PARTS"), additionalTransform = options.additionalTransform;
        if (clipPath) {
          clipPath.clipPathId = "CLIPPATH_" + fabric2.Object.__uid++;
          clipPathMarkup = '<clipPath id="' + clipPath.clipPathId + '" >\n' + clipPath.toClipPathSVG(reviver) + "</clipPath>\n";
        }
        if (absoluteClipPath) {
          markup.push(
            "<g ",
            shadowInfo,
            this.getSvgCommons(),
            " >\n"
          );
        }
        markup.push(
          "<g ",
          this.getSvgTransform(false),
          !absoluteClipPath ? shadowInfo + this.getSvgCommons() : "",
          " >\n"
        );
        commonPieces = [
          styleInfo,
          vectorEffect,
          noStyle ? "" : this.addPaintOrder(),
          " ",
          additionalTransform ? 'transform="' + additionalTransform + '" ' : ""
        ].join("");
        objectMarkup[index] = commonPieces;
        if (fill && fill.toLive) {
          markup.push(fill.toSVG(this));
        }
        if (stroke && stroke.toLive) {
          markup.push(stroke.toSVG(this));
        }
        if (shadow) {
          markup.push(shadow.toSVG(this));
        }
        if (clipPath) {
          markup.push(clipPathMarkup);
        }
        markup.push(objectMarkup.join(""));
        markup.push("</g>\n");
        absoluteClipPath && markup.push("</g>\n");
        return reviver ? reviver(markup.join("")) : markup.join("");
      },
      addPaintOrder: function() {
        return this.paintFirst !== "fill" ? ' paint-order="' + this.paintFirst + '" ' : "";
      }
    });
  })();
  (function() {
    var extend = fabric2.util.object.extend, originalSet = "stateProperties";
    function saveProps(origin, destination, props) {
      var tmpObj = {}, deep = true;
      props.forEach(function(prop) {
        tmpObj[prop] = origin[prop];
      });
      extend(origin[destination], tmpObj, deep);
    }
    function _isEqual(origValue, currentValue, firstPass) {
      if (origValue === currentValue) {
        return true;
      } else if (Array.isArray(origValue)) {
        if (!Array.isArray(currentValue) || origValue.length !== currentValue.length) {
          return false;
        }
        for (var i = 0, len = origValue.length; i < len; i++) {
          if (!_isEqual(origValue[i], currentValue[i])) {
            return false;
          }
        }
        return true;
      } else if (origValue && typeof origValue === "object") {
        var keys = Object.keys(origValue), key;
        if (!currentValue || typeof currentValue !== "object" || !firstPass && keys.length !== Object.keys(currentValue).length) {
          return false;
        }
        for (var i = 0, len = keys.length; i < len; i++) {
          key = keys[i];
          if (key === "canvas" || key === "group") {
            continue;
          }
          if (!_isEqual(origValue[key], currentValue[key])) {
            return false;
          }
        }
        return true;
      }
    }
    fabric2.util.object.extend(fabric2.Object.prototype, {
      hasStateChanged: function(propertySet) {
        propertySet = propertySet || originalSet;
        var dashedPropertySet = "_" + propertySet;
        if (Object.keys(this[dashedPropertySet]).length < this[propertySet].length) {
          return true;
        }
        return !_isEqual(this[dashedPropertySet], this, true);
      },
      saveState: function(options) {
        var propertySet = options && options.propertySet || originalSet, destination = "_" + propertySet;
        if (!this[destination]) {
          return this.setupState(options);
        }
        saveProps(this, destination, this[propertySet]);
        if (options && options.stateProperties) {
          saveProps(this, destination, options.stateProperties);
        }
        return this;
      },
      setupState: function(options) {
        options = options || {};
        var propertySet = options.propertySet || originalSet;
        options.propertySet = propertySet;
        this["_" + propertySet] = {};
        this.saveState(options);
        return this;
      }
    });
  })();
  (function() {
    var degreesToRadians = fabric2.util.degreesToRadians;
    fabric2.util.object.extend(fabric2.Object.prototype, {
      _findTargetCorner: function(pointer, forTouch) {
        if (!this.hasControls || this.group || (!this.canvas || this.canvas._activeObject !== this)) {
          return false;
        }
        var ex = pointer.x, ey = pointer.y, xPoints, lines, keys = Object.keys(this.oCoords), j = keys.length - 1, i;
        this.__corner = 0;
        for (; j >= 0; j--) {
          i = keys[j];
          if (!this.isControlVisible(i)) {
            continue;
          }
          lines = this._getImageLines(forTouch ? this.oCoords[i].touchCorner : this.oCoords[i].corner);
          xPoints = this._findCrossPoints({ x: ex, y: ey }, lines);
          if (xPoints !== 0 && xPoints % 2 === 1) {
            this.__corner = i;
            return i;
          }
        }
        return false;
      },
      forEachControl: function(fn) {
        for (var i in this.controls) {
          fn(this.controls[i], i, this);
        }
      },
      _setCornerCoords: function() {
        var coords = this.oCoords;
        for (var control in coords) {
          var controlObject = this.controls[control];
          coords[control].corner = controlObject.calcCornerCoords(
            this.angle,
            this.cornerSize,
            coords[control].x,
            coords[control].y,
            false
          );
          coords[control].touchCorner = controlObject.calcCornerCoords(
            this.angle,
            this.touchCornerSize,
            coords[control].x,
            coords[control].y,
            true
          );
        }
      },
      drawSelectionBackground: function(ctx) {
        if (!this.selectionBackgroundColor || this.canvas && !this.canvas.interactive || this.canvas && this.canvas._activeObject !== this) {
          return this;
        }
        ctx.save();
        var center = this.getCenterPoint(), wh = this._calculateCurrentDimensions(), vpt = this.canvas.viewportTransform;
        ctx.translate(center.x, center.y);
        ctx.scale(1 / vpt[0], 1 / vpt[3]);
        ctx.rotate(degreesToRadians(this.angle));
        ctx.fillStyle = this.selectionBackgroundColor;
        ctx.fillRect(-wh.x / 2, -wh.y / 2, wh.x, wh.y);
        ctx.restore();
        return this;
      },
      drawBorders: function(ctx, styleOverride) {
        styleOverride = styleOverride || {};
        var wh = this._calculateCurrentDimensions(), strokeWidth = this.borderScaleFactor, width = wh.x + strokeWidth, height = wh.y + strokeWidth, hasControls = typeof styleOverride.hasControls !== "undefined" ? styleOverride.hasControls : this.hasControls, shouldStroke = false;
        ctx.save();
        ctx.strokeStyle = styleOverride.borderColor || this.borderColor;
        this._setLineDash(ctx, styleOverride.borderDashArray || this.borderDashArray);
        ctx.strokeRect(
          -width / 2,
          -height / 2,
          width,
          height
        );
        if (hasControls) {
          ctx.beginPath();
          this.forEachControl(function(control, key, fabricObject) {
            if (control.withConnection && control.getVisibility(fabricObject, key)) {
              shouldStroke = true;
              ctx.moveTo(control.x * width, control.y * height);
              ctx.lineTo(
                control.x * width + control.offsetX,
                control.y * height + control.offsetY
              );
            }
          });
          if (shouldStroke) {
            ctx.stroke();
          }
        }
        ctx.restore();
        return this;
      },
      drawBordersInGroup: function(ctx, options, styleOverride) {
        styleOverride = styleOverride || {};
        var bbox = fabric2.util.sizeAfterTransform(this.width, this.height, options), strokeWidth = this.strokeWidth, strokeUniform = this.strokeUniform, borderScaleFactor = this.borderScaleFactor, width = bbox.x + strokeWidth * (strokeUniform ? this.canvas.getZoom() : options.scaleX) + borderScaleFactor, height = bbox.y + strokeWidth * (strokeUniform ? this.canvas.getZoom() : options.scaleY) + borderScaleFactor;
        ctx.save();
        this._setLineDash(ctx, styleOverride.borderDashArray || this.borderDashArray);
        ctx.strokeStyle = styleOverride.borderColor || this.borderColor;
        ctx.strokeRect(
          -width / 2,
          -height / 2,
          width,
          height
        );
        ctx.restore();
        return this;
      },
      drawControls: function(ctx, styleOverride) {
        styleOverride = styleOverride || {};
        ctx.save();
        var retinaScaling = this.canvas.getRetinaScaling(), matrix, p;
        ctx.setTransform(retinaScaling, 0, 0, retinaScaling, 0, 0);
        ctx.strokeStyle = ctx.fillStyle = styleOverride.cornerColor || this.cornerColor;
        if (!this.transparentCorners) {
          ctx.strokeStyle = styleOverride.cornerStrokeColor || this.cornerStrokeColor;
        }
        this._setLineDash(ctx, styleOverride.cornerDashArray || this.cornerDashArray);
        this.setCoords();
        if (this.group) {
          matrix = this.group.calcTransformMatrix();
        }
        this.forEachControl(function(control, key, fabricObject) {
          p = fabricObject.oCoords[key];
          if (control.getVisibility(fabricObject, key)) {
            if (matrix) {
              p = fabric2.util.transformPoint(p, matrix);
            }
            control.render(ctx, p.x, p.y, styleOverride, fabricObject);
          }
        });
        ctx.restore();
        return this;
      },
      isControlVisible: function(controlKey) {
        return this.controls[controlKey] && this.controls[controlKey].getVisibility(this, controlKey);
      },
      setControlVisible: function(controlKey, visible) {
        if (!this._controlsVisibility) {
          this._controlsVisibility = {};
        }
        this._controlsVisibility[controlKey] = visible;
        return this;
      },
      setControlsVisibility: function(options) {
        options || (options = {});
        for (var p in options) {
          this.setControlVisible(p, options[p]);
        }
        return this;
      },
      onDeselect: function() {
      },
      onSelect: function() {
      }
    });
  })();
  fabric2.util.object.extend(fabric2.StaticCanvas.prototype, {
    FX_DURATION: 500,
    fxCenterObjectH: function(object, callbacks) {
      callbacks = callbacks || {};
      var empty = function() {
      }, onComplete = callbacks.onComplete || empty, onChange = callbacks.onChange || empty, _this = this;
      return fabric2.util.animate({
        target: this,
        startValue: object.left,
        endValue: this.getCenterPoint().x,
        duration: this.FX_DURATION,
        onChange: function(value) {
          object.set("left", value);
          _this.requestRenderAll();
          onChange();
        },
        onComplete: function() {
          object.setCoords();
          onComplete();
        }
      });
    },
    fxCenterObjectV: function(object, callbacks) {
      callbacks = callbacks || {};
      var empty = function() {
      }, onComplete = callbacks.onComplete || empty, onChange = callbacks.onChange || empty, _this = this;
      return fabric2.util.animate({
        target: this,
        startValue: object.top,
        endValue: this.getCenterPoint().y,
        duration: this.FX_DURATION,
        onChange: function(value) {
          object.set("top", value);
          _this.requestRenderAll();
          onChange();
        },
        onComplete: function() {
          object.setCoords();
          onComplete();
        }
      });
    },
    fxRemove: function(object, callbacks) {
      callbacks = callbacks || {};
      var empty = function() {
      }, onComplete = callbacks.onComplete || empty, onChange = callbacks.onChange || empty, _this = this;
      return fabric2.util.animate({
        target: this,
        startValue: object.opacity,
        endValue: 0,
        duration: this.FX_DURATION,
        onChange: function(value) {
          object.set("opacity", value);
          _this.requestRenderAll();
          onChange();
        },
        onComplete: function() {
          _this.remove(object);
          onComplete();
        }
      });
    }
  });
  fabric2.util.object.extend(fabric2.Object.prototype, {
    animate: function() {
      if (arguments[0] && typeof arguments[0] === "object") {
        var propsToAnimate = [], prop, skipCallbacks, out = [];
        for (prop in arguments[0]) {
          propsToAnimate.push(prop);
        }
        for (var i = 0, len = propsToAnimate.length; i < len; i++) {
          prop = propsToAnimate[i];
          skipCallbacks = i !== len - 1;
          out.push(this._animate(prop, arguments[0][prop], arguments[1], skipCallbacks));
        }
        return out;
      } else {
        return this._animate.apply(this, arguments);
      }
    },
    _animate: function(property, to, options, skipCallbacks) {
      var _this = this, propPair;
      to = to.toString();
      if (!options) {
        options = {};
      } else {
        options = fabric2.util.object.clone(options);
      }
      if (~property.indexOf(".")) {
        propPair = property.split(".");
      }
      var propIsColor = _this.colorProperties.indexOf(property) > -1 || propPair && _this.colorProperties.indexOf(propPair[1]) > -1;
      var currentValue = propPair ? this.get(propPair[0])[propPair[1]] : this.get(property);
      if (!("from" in options)) {
        options.from = currentValue;
      }
      if (!propIsColor) {
        if (~to.indexOf("=")) {
          to = currentValue + parseFloat(to.replace("=", ""));
        } else {
          to = parseFloat(to);
        }
      }
      var _options = {
        target: this,
        startValue: options.from,
        endValue: to,
        byValue: options.by,
        easing: options.easing,
        duration: options.duration,
        abort: options.abort && function(value, valueProgress, timeProgress) {
          return options.abort.call(_this, value, valueProgress, timeProgress);
        },
        onChange: function(value, valueProgress, timeProgress) {
          if (propPair) {
            _this[propPair[0]][propPair[1]] = value;
          } else {
            _this.set(property, value);
          }
          if (skipCallbacks) {
            return;
          }
          options.onChange && options.onChange(value, valueProgress, timeProgress);
        },
        onComplete: function(value, valueProgress, timeProgress) {
          if (skipCallbacks) {
            return;
          }
          _this.setCoords();
          options.onComplete && options.onComplete(value, valueProgress, timeProgress);
        }
      };
      if (propIsColor) {
        return fabric2.util.animateColor(_options.startValue, _options.endValue, _options.duration, _options);
      } else {
        return fabric2.util.animate(_options);
      }
    }
  });
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), extend = fabric3.util.object.extend, clone = fabric3.util.object.clone, coordProps = { x1: 1, x2: 1, y1: 1, y2: 1 };
    if (fabric3.Line) {
      fabric3.warn("fabric.Line is already defined");
      return;
    }
    fabric3.Line = fabric3.util.createClass(fabric3.Object, {
      type: "line",
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      cacheProperties: fabric3.Object.prototype.cacheProperties.concat("x1", "x2", "y1", "y2"),
      initialize: function(points, options) {
        if (!points) {
          points = [0, 0, 0, 0];
        }
        this.callSuper("initialize", options);
        this.set("x1", points[0]);
        this.set("y1", points[1]);
        this.set("x2", points[2]);
        this.set("y2", points[3]);
        this._setWidthHeight(options);
      },
      _setWidthHeight: function(options) {
        options || (options = {});
        this.width = Math.abs(this.x2 - this.x1);
        this.height = Math.abs(this.y2 - this.y1);
        this.left = "left" in options ? options.left : this._getLeftToOriginX();
        this.top = "top" in options ? options.top : this._getTopToOriginY();
      },
      _set: function(key, value) {
        this.callSuper("_set", key, value);
        if (typeof coordProps[key] !== "undefined") {
          this._setWidthHeight();
        }
        return this;
      },
      _getLeftToOriginX: makeEdgeToOriginGetter(
        {
          origin: "originX",
          axis1: "x1",
          axis2: "x2",
          dimension: "width"
        },
        {
          nearest: "left",
          center: "center",
          farthest: "right"
        }
      ),
      _getTopToOriginY: makeEdgeToOriginGetter(
        {
          origin: "originY",
          axis1: "y1",
          axis2: "y2",
          dimension: "height"
        },
        {
          nearest: "top",
          center: "center",
          farthest: "bottom"
        }
      ),
      _render: function(ctx) {
        ctx.beginPath();
        var p = this.calcLinePoints();
        ctx.moveTo(p.x1, p.y1);
        ctx.lineTo(p.x2, p.y2);
        ctx.lineWidth = this.strokeWidth;
        var origStrokeStyle = ctx.strokeStyle;
        ctx.strokeStyle = this.stroke || ctx.fillStyle;
        this.stroke && this._renderStroke(ctx);
        ctx.strokeStyle = origStrokeStyle;
      },
      _findCenterFromElement: function() {
        return {
          x: (this.x1 + this.x2) / 2,
          y: (this.y1 + this.y2) / 2
        };
      },
      toObject: function(propertiesToInclude) {
        return extend(this.callSuper("toObject", propertiesToInclude), this.calcLinePoints());
      },
      _getNonTransformedDimensions: function() {
        var dim = this.callSuper("_getNonTransformedDimensions");
        if (this.strokeLineCap === "butt") {
          if (this.width === 0) {
            dim.y -= this.strokeWidth;
          }
          if (this.height === 0) {
            dim.x -= this.strokeWidth;
          }
        }
        return dim;
      },
      calcLinePoints: function() {
        var xMult = this.x1 <= this.x2 ? -1 : 1, yMult = this.y1 <= this.y2 ? -1 : 1, x1 = xMult * this.width * 0.5, y1 = yMult * this.height * 0.5, x2 = xMult * this.width * -0.5, y2 = yMult * this.height * -0.5;
        return {
          x1,
          x2,
          y1,
          y2
        };
      },
      _toSVG: function() {
        var p = this.calcLinePoints();
        return [
          "<line ",
          "COMMON_PARTS",
          'x1="',
          p.x1,
          '" y1="',
          p.y1,
          '" x2="',
          p.x2,
          '" y2="',
          p.y2,
          '" />\n'
        ];
      }
    });
    fabric3.Line.ATTRIBUTE_NAMES = fabric3.SHARED_ATTRIBUTES.concat("x1 y1 x2 y2".split(" "));
    fabric3.Line.fromElement = function(element, callback, options) {
      options = options || {};
      var parsedAttributes = fabric3.parseAttributes(element, fabric3.Line.ATTRIBUTE_NAMES), points = [
        parsedAttributes.x1 || 0,
        parsedAttributes.y1 || 0,
        parsedAttributes.x2 || 0,
        parsedAttributes.y2 || 0
      ];
      callback(new fabric3.Line(points, extend(parsedAttributes, options)));
    };
    fabric3.Line.fromObject = function(object, callback) {
      function _callback(instance) {
        delete instance.points;
        callback && callback(instance);
      }
      var options = clone(object, true);
      options.points = [object.x1, object.y1, object.x2, object.y2];
      fabric3.Object._fromObject("Line", options, _callback, "points");
    };
    function makeEdgeToOriginGetter(propertyNames, originValues) {
      var origin = propertyNames.origin, axis1 = propertyNames.axis1, axis2 = propertyNames.axis2, dimension = propertyNames.dimension, nearest = originValues.nearest, center = originValues.center, farthest = originValues.farthest;
      return function() {
        switch (this.get(origin)) {
          case nearest:
            return Math.min(this.get(axis1), this.get(axis2));
          case center:
            return Math.min(this.get(axis1), this.get(axis2)) + 0.5 * this.get(dimension);
          case farthest:
            return Math.max(this.get(axis1), this.get(axis2));
        }
      };
    }
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), degreesToRadians = fabric3.util.degreesToRadians;
    if (fabric3.Circle) {
      fabric3.warn("fabric.Circle is already defined.");
      return;
    }
    fabric3.Circle = fabric3.util.createClass(fabric3.Object, {
      type: "circle",
      radius: 0,
      startAngle: 0,
      endAngle: 360,
      cacheProperties: fabric3.Object.prototype.cacheProperties.concat("radius", "startAngle", "endAngle"),
      _set: function(key, value) {
        this.callSuper("_set", key, value);
        if (key === "radius") {
          this.setRadius(value);
        }
        return this;
      },
      toObject: function(propertiesToInclude) {
        return this.callSuper("toObject", ["radius", "startAngle", "endAngle"].concat(propertiesToInclude));
      },
      _toSVG: function() {
        var svgString, x = 0, y = 0, angle = (this.endAngle - this.startAngle) % 360;
        if (angle === 0) {
          svgString = [
            "<circle ",
            "COMMON_PARTS",
            'cx="' + x + '" cy="' + y + '" ',
            'r="',
            this.radius,
            '" />\n'
          ];
        } else {
          var start = degreesToRadians(this.startAngle), end = degreesToRadians(this.endAngle), radius = this.radius, startX = fabric3.util.cos(start) * radius, startY = fabric3.util.sin(start) * radius, endX = fabric3.util.cos(end) * radius, endY = fabric3.util.sin(end) * radius, largeFlag = angle > 180 ? "1" : "0";
          svgString = [
            '<path d="M ' + startX + " " + startY,
            " A " + radius + " " + radius,
            " 0 ",
            +largeFlag + " 1",
            " " + endX + " " + endY,
            '" ',
            "COMMON_PARTS",
            " />\n"
          ];
        }
        return svgString;
      },
      _render: function(ctx) {
        ctx.beginPath();
        ctx.arc(
          0,
          0,
          this.radius,
          degreesToRadians(this.startAngle),
          degreesToRadians(this.endAngle),
          false
        );
        this._renderPaintInOrder(ctx);
      },
      getRadiusX: function() {
        return this.get("radius") * this.get("scaleX");
      },
      getRadiusY: function() {
        return this.get("radius") * this.get("scaleY");
      },
      setRadius: function(value) {
        this.radius = value;
        return this.set("width", value * 2).set("height", value * 2);
      }
    });
    fabric3.Circle.ATTRIBUTE_NAMES = fabric3.SHARED_ATTRIBUTES.concat("cx cy r".split(" "));
    fabric3.Circle.fromElement = function(element, callback) {
      var parsedAttributes = fabric3.parseAttributes(element, fabric3.Circle.ATTRIBUTE_NAMES);
      if (!isValidRadius(parsedAttributes)) {
        throw new Error("value of `r` attribute is required and can not be negative");
      }
      parsedAttributes.left = (parsedAttributes.left || 0) - parsedAttributes.radius;
      parsedAttributes.top = (parsedAttributes.top || 0) - parsedAttributes.radius;
      callback(new fabric3.Circle(parsedAttributes));
    };
    function isValidRadius(attributes) {
      return "radius" in attributes && attributes.radius >= 0;
    }
    fabric3.Circle.fromObject = function(object, callback) {
      fabric3.Object._fromObject("Circle", object, callback);
    };
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {});
    if (fabric3.Triangle) {
      fabric3.warn("fabric.Triangle is already defined");
      return;
    }
    fabric3.Triangle = fabric3.util.createClass(fabric3.Object, {
      type: "triangle",
      width: 100,
      height: 100,
      _render: function(ctx) {
        var widthBy2 = this.width / 2, heightBy2 = this.height / 2;
        ctx.beginPath();
        ctx.moveTo(-widthBy2, heightBy2);
        ctx.lineTo(0, -heightBy2);
        ctx.lineTo(widthBy2, heightBy2);
        ctx.closePath();
        this._renderPaintInOrder(ctx);
      },
      _toSVG: function() {
        var widthBy2 = this.width / 2, heightBy2 = this.height / 2, points = [
          -widthBy2 + " " + heightBy2,
          "0 " + -heightBy2,
          widthBy2 + " " + heightBy2
        ].join(",");
        return [
          "<polygon ",
          "COMMON_PARTS",
          'points="',
          points,
          '" />'
        ];
      }
    });
    fabric3.Triangle.fromObject = function(object, callback) {
      return fabric3.Object._fromObject("Triangle", object, callback);
    };
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), piBy2 = Math.PI * 2;
    if (fabric3.Ellipse) {
      fabric3.warn("fabric.Ellipse is already defined.");
      return;
    }
    fabric3.Ellipse = fabric3.util.createClass(fabric3.Object, {
      type: "ellipse",
      rx: 0,
      ry: 0,
      cacheProperties: fabric3.Object.prototype.cacheProperties.concat("rx", "ry"),
      initialize: function(options) {
        this.callSuper("initialize", options);
        this.set("rx", options && options.rx || 0);
        this.set("ry", options && options.ry || 0);
      },
      _set: function(key, value) {
        this.callSuper("_set", key, value);
        switch (key) {
          case "rx":
            this.rx = value;
            this.set("width", value * 2);
            break;
          case "ry":
            this.ry = value;
            this.set("height", value * 2);
            break;
        }
        return this;
      },
      getRx: function() {
        return this.get("rx") * this.get("scaleX");
      },
      getRy: function() {
        return this.get("ry") * this.get("scaleY");
      },
      toObject: function(propertiesToInclude) {
        return this.callSuper("toObject", ["rx", "ry"].concat(propertiesToInclude));
      },
      _toSVG: function() {
        return [
          "<ellipse ",
          "COMMON_PARTS",
          'cx="0" cy="0" ',
          'rx="',
          this.rx,
          '" ry="',
          this.ry,
          '" />\n'
        ];
      },
      _render: function(ctx) {
        ctx.beginPath();
        ctx.save();
        ctx.transform(1, 0, 0, this.ry / this.rx, 0, 0);
        ctx.arc(
          0,
          0,
          this.rx,
          0,
          piBy2,
          false
        );
        ctx.restore();
        this._renderPaintInOrder(ctx);
      }
    });
    fabric3.Ellipse.ATTRIBUTE_NAMES = fabric3.SHARED_ATTRIBUTES.concat("cx cy rx ry".split(" "));
    fabric3.Ellipse.fromElement = function(element, callback) {
      var parsedAttributes = fabric3.parseAttributes(element, fabric3.Ellipse.ATTRIBUTE_NAMES);
      parsedAttributes.left = (parsedAttributes.left || 0) - parsedAttributes.rx;
      parsedAttributes.top = (parsedAttributes.top || 0) - parsedAttributes.ry;
      callback(new fabric3.Ellipse(parsedAttributes));
    };
    fabric3.Ellipse.fromObject = function(object, callback) {
      fabric3.Object._fromObject("Ellipse", object, callback);
    };
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), extend = fabric3.util.object.extend;
    if (fabric3.Rect) {
      fabric3.warn("fabric.Rect is already defined");
      return;
    }
    fabric3.Rect = fabric3.util.createClass(fabric3.Object, {
      stateProperties: fabric3.Object.prototype.stateProperties.concat("rx", "ry"),
      type: "rect",
      rx: 0,
      ry: 0,
      cacheProperties: fabric3.Object.prototype.cacheProperties.concat("rx", "ry"),
      initialize: function(options) {
        this.callSuper("initialize", options);
        this._initRxRy();
      },
      _initRxRy: function() {
        if (this.rx && !this.ry) {
          this.ry = this.rx;
        } else if (this.ry && !this.rx) {
          this.rx = this.ry;
        }
      },
      _render: function(ctx) {
        var rx = this.rx ? Math.min(this.rx, this.width / 2) : 0, ry = this.ry ? Math.min(this.ry, this.height / 2) : 0, w = this.width, h = this.height, x = -this.width / 2, y = -this.height / 2, isRounded = rx !== 0 || ry !== 0, k = 1 - 0.5522847498;
        ctx.beginPath();
        ctx.moveTo(x + rx, y);
        ctx.lineTo(x + w - rx, y);
        isRounded && ctx.bezierCurveTo(x + w - k * rx, y, x + w, y + k * ry, x + w, y + ry);
        ctx.lineTo(x + w, y + h - ry);
        isRounded && ctx.bezierCurveTo(x + w, y + h - k * ry, x + w - k * rx, y + h, x + w - rx, y + h);
        ctx.lineTo(x + rx, y + h);
        isRounded && ctx.bezierCurveTo(x + k * rx, y + h, x, y + h - k * ry, x, y + h - ry);
        ctx.lineTo(x, y + ry);
        isRounded && ctx.bezierCurveTo(x, y + k * ry, x + k * rx, y, x + rx, y);
        ctx.closePath();
        this._renderPaintInOrder(ctx);
      },
      toObject: function(propertiesToInclude) {
        return this.callSuper("toObject", ["rx", "ry"].concat(propertiesToInclude));
      },
      _toSVG: function() {
        var x = -this.width / 2, y = -this.height / 2;
        return [
          "<rect ",
          "COMMON_PARTS",
          'x="',
          x,
          '" y="',
          y,
          '" rx="',
          this.rx,
          '" ry="',
          this.ry,
          '" width="',
          this.width,
          '" height="',
          this.height,
          '" />\n'
        ];
      }
    });
    fabric3.Rect.ATTRIBUTE_NAMES = fabric3.SHARED_ATTRIBUTES.concat("x y rx ry width height".split(" "));
    fabric3.Rect.fromElement = function(element, callback, options) {
      if (!element) {
        return callback(null);
      }
      options = options || {};
      var parsedAttributes = fabric3.parseAttributes(element, fabric3.Rect.ATTRIBUTE_NAMES);
      parsedAttributes.left = parsedAttributes.left || 0;
      parsedAttributes.top = parsedAttributes.top || 0;
      parsedAttributes.height = parsedAttributes.height || 0;
      parsedAttributes.width = parsedAttributes.width || 0;
      var rect = new fabric3.Rect(extend(options ? fabric3.util.object.clone(options) : {}, parsedAttributes));
      rect.visible = rect.visible && rect.width > 0 && rect.height > 0;
      callback(rect);
    };
    fabric3.Rect.fromObject = function(object, callback) {
      return fabric3.Object._fromObject("Rect", object, callback);
    };
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), extend = fabric3.util.object.extend, min = fabric3.util.array.min, max = fabric3.util.array.max, toFixed = fabric3.util.toFixed, projectStrokeOnPoints = fabric3.util.projectStrokeOnPoints;
    if (fabric3.Polyline) {
      fabric3.warn("fabric.Polyline is already defined");
      return;
    }
    fabric3.Polyline = fabric3.util.createClass(fabric3.Object, {
      type: "polyline",
      points: null,
      exactBoundingBox: false,
      cacheProperties: fabric3.Object.prototype.cacheProperties.concat("points"),
      initialize: function(points, options) {
        options = options || {};
        this.points = points || [];
        this.callSuper("initialize", options);
        this._setPositionDimensions(options);
      },
      _projectStrokeOnPoints: function() {
        return projectStrokeOnPoints(this.points, this, true);
      },
      _setPositionDimensions: function(options) {
        var calcDim = this._calcDimensions(options), correctLeftTop, correctSize = this.exactBoundingBox ? this.strokeWidth : 0;
        this.width = calcDim.width - correctSize;
        this.height = calcDim.height - correctSize;
        if (!options.fromSVG) {
          correctLeftTop = this.translateToGivenOrigin(
            {
              x: calcDim.left - this.strokeWidth / 2 + correctSize / 2,
              y: calcDim.top - this.strokeWidth / 2 + correctSize / 2
            },
            "left",
            "top",
            this.originX,
            this.originY
          );
        }
        if (typeof options.left === "undefined") {
          this.left = options.fromSVG ? calcDim.left : correctLeftTop.x;
        }
        if (typeof options.top === "undefined") {
          this.top = options.fromSVG ? calcDim.top : correctLeftTop.y;
        }
        this.pathOffset = {
          x: calcDim.left + this.width / 2 + correctSize / 2,
          y: calcDim.top + this.height / 2 + correctSize / 2
        };
      },
      _calcDimensions: function() {
        var points = this.exactBoundingBox ? this._projectStrokeOnPoints() : this.points, minX = min(points, "x") || 0, minY = min(points, "y") || 0, maxX = max(points, "x") || 0, maxY = max(points, "y") || 0, width = maxX - minX, height = maxY - minY;
        return {
          left: minX,
          top: minY,
          width,
          height
        };
      },
      toObject: function(propertiesToInclude) {
        return extend(this.callSuper("toObject", propertiesToInclude), {
          points: this.points.concat()
        });
      },
      _toSVG: function() {
        var points = [], diffX = this.pathOffset.x, diffY = this.pathOffset.y, NUM_FRACTION_DIGITS = fabric3.Object.NUM_FRACTION_DIGITS;
        for (var i = 0, len = this.points.length; i < len; i++) {
          points.push(
            toFixed(this.points[i].x - diffX, NUM_FRACTION_DIGITS),
            ",",
            toFixed(this.points[i].y - diffY, NUM_FRACTION_DIGITS),
            " "
          );
        }
        return [
          "<" + this.type + " ",
          "COMMON_PARTS",
          'points="',
          points.join(""),
          '" />\n'
        ];
      },
      commonRender: function(ctx) {
        var point, len = this.points.length, x = this.pathOffset.x, y = this.pathOffset.y;
        if (!len || isNaN(this.points[len - 1].y)) {
          return false;
        }
        ctx.beginPath();
        ctx.moveTo(this.points[0].x - x, this.points[0].y - y);
        for (var i = 0; i < len; i++) {
          point = this.points[i];
          ctx.lineTo(point.x - x, point.y - y);
        }
        return true;
      },
      _render: function(ctx) {
        if (!this.commonRender(ctx)) {
          return;
        }
        this._renderPaintInOrder(ctx);
      },
      complexity: function() {
        return this.get("points").length;
      }
    });
    fabric3.Polyline.ATTRIBUTE_NAMES = fabric3.SHARED_ATTRIBUTES.concat();
    fabric3.Polyline.fromElementGenerator = function(_class) {
      return function(element, callback, options) {
        if (!element) {
          return callback(null);
        }
        options || (options = {});
        var points = fabric3.parsePointsAttribute(element.getAttribute("points")), parsedAttributes = fabric3.parseAttributes(element, fabric3[_class].ATTRIBUTE_NAMES);
        parsedAttributes.fromSVG = true;
        callback(new fabric3[_class](points, extend(parsedAttributes, options)));
      };
    };
    fabric3.Polyline.fromElement = fabric3.Polyline.fromElementGenerator("Polyline");
    fabric3.Polyline.fromObject = function(object, callback) {
      return fabric3.Object._fromObject("Polyline", object, callback, "points");
    };
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), projectStrokeOnPoints = fabric3.util.projectStrokeOnPoints;
    if (fabric3.Polygon) {
      fabric3.warn("fabric.Polygon is already defined");
      return;
    }
    fabric3.Polygon = fabric3.util.createClass(fabric3.Polyline, {
      type: "polygon",
      _projectStrokeOnPoints: function() {
        return projectStrokeOnPoints(this.points, this);
      },
      _render: function(ctx) {
        if (!this.commonRender(ctx)) {
          return;
        }
        ctx.closePath();
        this._renderPaintInOrder(ctx);
      }
    });
    fabric3.Polygon.ATTRIBUTE_NAMES = fabric3.SHARED_ATTRIBUTES.concat();
    fabric3.Polygon.fromElement = fabric3.Polyline.fromElementGenerator("Polygon");
    fabric3.Polygon.fromObject = function(object, callback) {
      fabric3.Object._fromObject("Polygon", object, callback, "points");
    };
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), min = fabric3.util.array.min, max = fabric3.util.array.max, extend = fabric3.util.object.extend, clone = fabric3.util.object.clone, toFixed = fabric3.util.toFixed;
    if (fabric3.Path) {
      fabric3.warn("fabric.Path is already defined");
      return;
    }
    fabric3.Path = fabric3.util.createClass(fabric3.Object, {
      type: "path",
      path: null,
      cacheProperties: fabric3.Object.prototype.cacheProperties.concat("path", "fillRule"),
      stateProperties: fabric3.Object.prototype.stateProperties.concat("path"),
      initialize: function(path, options) {
        options = clone(options || {});
        delete options.path;
        this.callSuper("initialize", options);
        this._setPath(path || [], options);
      },
      _setPath: function(path, options) {
        this.path = fabric3.util.makePathSimpler(
          Array.isArray(path) ? path : fabric3.util.parsePath(path)
        );
        fabric3.Polyline.prototype._setPositionDimensions.call(this, options || {});
      },
      _renderPathCommands: function(ctx) {
        var current, subpathStartX = 0, subpathStartY = 0, x = 0, y = 0, controlX = 0, controlY = 0, l = -this.pathOffset.x, t = -this.pathOffset.y;
        ctx.beginPath();
        for (var i = 0, len = this.path.length; i < len; ++i) {
          current = this.path[i];
          switch (current[0]) {
            case "L":
              x = current[1];
              y = current[2];
              ctx.lineTo(x + l, y + t);
              break;
            case "M":
              x = current[1];
              y = current[2];
              subpathStartX = x;
              subpathStartY = y;
              ctx.moveTo(x + l, y + t);
              break;
            case "C":
              x = current[5];
              y = current[6];
              controlX = current[3];
              controlY = current[4];
              ctx.bezierCurveTo(
                current[1] + l,
                current[2] + t,
                controlX + l,
                controlY + t,
                x + l,
                y + t
              );
              break;
            case "Q":
              ctx.quadraticCurveTo(
                current[1] + l,
                current[2] + t,
                current[3] + l,
                current[4] + t
              );
              x = current[3];
              y = current[4];
              controlX = current[1];
              controlY = current[2];
              break;
            case "z":
            case "Z":
              x = subpathStartX;
              y = subpathStartY;
              ctx.closePath();
              break;
          }
        }
      },
      _render: function(ctx) {
        this._renderPathCommands(ctx);
        this._renderPaintInOrder(ctx);
      },
      toString: function() {
        return "#<fabric.Path (" + this.complexity() + '): { "top": ' + this.top + ', "left": ' + this.left + " }>";
      },
      toObject: function(propertiesToInclude) {
        return extend(this.callSuper("toObject", propertiesToInclude), {
          path: this.path.map(function(item) {
            return item.slice();
          })
        });
      },
      toDatalessObject: function(propertiesToInclude) {
        var o = this.toObject(["sourcePath"].concat(propertiesToInclude));
        if (o.sourcePath) {
          delete o.path;
        }
        return o;
      },
      _toSVG: function() {
        var path = fabric3.util.joinPath(this.path);
        return [
          "<path ",
          "COMMON_PARTS",
          'd="',
          path,
          '" stroke-linecap="round" ',
          "/>\n"
        ];
      },
      _getOffsetTransform: function() {
        var digits = fabric3.Object.NUM_FRACTION_DIGITS;
        return " translate(" + toFixed(-this.pathOffset.x, digits) + ", " + toFixed(-this.pathOffset.y, digits) + ")";
      },
      toClipPathSVG: function(reviver) {
        var additionalTransform = this._getOffsetTransform();
        return "	" + this._createBaseClipPathSVGMarkup(
          this._toSVG(),
          { reviver, additionalTransform }
        );
      },
      toSVG: function(reviver) {
        var additionalTransform = this._getOffsetTransform();
        return this._createBaseSVGMarkup(this._toSVG(), { reviver, additionalTransform });
      },
      complexity: function() {
        return this.path.length;
      },
      _calcDimensions: function() {
        var aX = [], aY = [], current, subpathStartX = 0, subpathStartY = 0, x = 0, y = 0, bounds;
        for (var i = 0, len = this.path.length; i < len; ++i) {
          current = this.path[i];
          switch (current[0]) {
            case "L":
              x = current[1];
              y = current[2];
              bounds = [];
              break;
            case "M":
              x = current[1];
              y = current[2];
              subpathStartX = x;
              subpathStartY = y;
              bounds = [];
              break;
            case "C":
              bounds = fabric3.util.getBoundsOfCurve(
                x,
                y,
                current[1],
                current[2],
                current[3],
                current[4],
                current[5],
                current[6]
              );
              x = current[5];
              y = current[6];
              break;
            case "Q":
              bounds = fabric3.util.getBoundsOfCurve(
                x,
                y,
                current[1],
                current[2],
                current[1],
                current[2],
                current[3],
                current[4]
              );
              x = current[3];
              y = current[4];
              break;
            case "z":
            case "Z":
              x = subpathStartX;
              y = subpathStartY;
              break;
          }
          bounds.forEach(function(point) {
            aX.push(point.x);
            aY.push(point.y);
          });
          aX.push(x);
          aY.push(y);
        }
        var minX = min(aX) || 0, minY = min(aY) || 0, maxX = max(aX) || 0, maxY = max(aY) || 0, deltaX = maxX - minX, deltaY = maxY - minY;
        return {
          left: minX,
          top: minY,
          width: deltaX,
          height: deltaY
        };
      }
    });
    fabric3.Path.fromObject = function(object, callback) {
      if (typeof object.sourcePath === "string") {
        var pathUrl = object.sourcePath;
        fabric3.loadSVGFromURL(pathUrl, function(elements) {
          var path = elements[0];
          path.setOptions(object);
          if (object.clipPath) {
            fabric3.util.enlivenObjects([object.clipPath], function(elivenedObjects) {
              path.clipPath = elivenedObjects[0];
              callback && callback(path);
            });
          } else {
            callback && callback(path);
          }
        });
      } else {
        fabric3.Object._fromObject("Path", object, callback, "path");
      }
    };
    fabric3.Path.ATTRIBUTE_NAMES = fabric3.SHARED_ATTRIBUTES.concat(["d"]);
    fabric3.Path.fromElement = function(element, callback, options) {
      var parsedAttributes = fabric3.parseAttributes(element, fabric3.Path.ATTRIBUTE_NAMES);
      parsedAttributes.fromSVG = true;
      callback(new fabric3.Path(parsedAttributes.d, extend(parsedAttributes, options)));
    };
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), min = fabric3.util.array.min, max = fabric3.util.array.max;
    if (fabric3.Group) {
      return;
    }
    fabric3.Group = fabric3.util.createClass(fabric3.Object, fabric3.Collection, {
      type: "group",
      strokeWidth: 0,
      subTargetCheck: false,
      cacheProperties: [],
      useSetOnGroup: false,
      initialize: function(objects, options, isAlreadyGrouped) {
        options = options || {};
        this._objects = [];
        isAlreadyGrouped && this.callSuper("initialize", options);
        this._objects = objects || [];
        for (var i = this._objects.length; i--; ) {
          this._objects[i].group = this;
        }
        if (!isAlreadyGrouped) {
          var center = options && options.centerPoint;
          if (options.originX !== void 0) {
            this.originX = options.originX;
          }
          if (options.originY !== void 0) {
            this.originY = options.originY;
          }
          center || this._calcBounds();
          this._updateObjectsCoords(center);
          delete options.centerPoint;
          this.callSuper("initialize", options);
        } else {
          this._updateObjectsACoords();
        }
        this.setCoords();
      },
      _updateObjectsACoords: function() {
        var skipControls = true;
        for (var i = this._objects.length; i--; ) {
          this._objects[i].setCoords(skipControls);
        }
      },
      _updateObjectsCoords: function(center) {
        var center = center || this.getCenterPoint();
        for (var i = this._objects.length; i--; ) {
          this._updateObjectCoords(this._objects[i], center);
        }
      },
      _updateObjectCoords: function(object, center) {
        var objectLeft = object.left, objectTop = object.top, skipControls = true;
        object.set({
          left: objectLeft - center.x,
          top: objectTop - center.y
        });
        object.group = this;
        object.setCoords(skipControls);
      },
      toString: function() {
        return "#<fabric.Group: (" + this.complexity() + ")>";
      },
      addWithUpdate: function(object) {
        var nested = !!this.group;
        this._restoreObjectsState();
        fabric3.util.resetObjectTransform(this);
        if (object) {
          if (nested) {
            fabric3.util.removeTransformFromObject(object, this.group.calcTransformMatrix());
          }
          this._objects.push(object);
          object.group = this;
          object._set("canvas", this.canvas);
        }
        this._calcBounds();
        this._updateObjectsCoords();
        this.dirty = true;
        if (nested) {
          this.group.addWithUpdate();
        } else {
          this.setCoords();
        }
        return this;
      },
      removeWithUpdate: function(object) {
        this._restoreObjectsState();
        fabric3.util.resetObjectTransform(this);
        this.remove(object);
        this._calcBounds();
        this._updateObjectsCoords();
        this.setCoords();
        this.dirty = true;
        return this;
      },
      _onObjectAdded: function(object) {
        this.dirty = true;
        object.group = this;
        object._set("canvas", this.canvas);
      },
      _onObjectRemoved: function(object) {
        this.dirty = true;
        delete object.group;
      },
      _set: function(key, value) {
        var i = this._objects.length;
        if (this.useSetOnGroup) {
          while (i--) {
            this._objects[i].setOnGroup(key, value);
          }
        }
        if (key === "canvas") {
          while (i--) {
            this._objects[i]._set(key, value);
          }
        }
        fabric3.Object.prototype._set.call(this, key, value);
      },
      toObject: function(propertiesToInclude) {
        var _includeDefaultValues = this.includeDefaultValues;
        var objsToObject = this._objects.filter(function(obj2) {
          return !obj2.excludeFromExport;
        }).map(function(obj2) {
          var originalDefaults = obj2.includeDefaultValues;
          obj2.includeDefaultValues = _includeDefaultValues;
          var _obj = obj2.toObject(propertiesToInclude);
          obj2.includeDefaultValues = originalDefaults;
          return _obj;
        });
        var obj = fabric3.Object.prototype.toObject.call(this, propertiesToInclude);
        obj.objects = objsToObject;
        return obj;
      },
      toDatalessObject: function(propertiesToInclude) {
        var objsToObject, sourcePath = this.sourcePath;
        if (sourcePath) {
          objsToObject = sourcePath;
        } else {
          var _includeDefaultValues = this.includeDefaultValues;
          objsToObject = this._objects.map(function(obj2) {
            var originalDefaults = obj2.includeDefaultValues;
            obj2.includeDefaultValues = _includeDefaultValues;
            var _obj = obj2.toDatalessObject(propertiesToInclude);
            obj2.includeDefaultValues = originalDefaults;
            return _obj;
          });
        }
        var obj = fabric3.Object.prototype.toDatalessObject.call(this, propertiesToInclude);
        obj.objects = objsToObject;
        return obj;
      },
      render: function(ctx) {
        this._transformDone = true;
        this.callSuper("render", ctx);
        this._transformDone = false;
      },
      shouldCache: function() {
        var ownCache = fabric3.Object.prototype.shouldCache.call(this);
        if (ownCache) {
          for (var i = 0, len = this._objects.length; i < len; i++) {
            if (this._objects[i].willDrawShadow()) {
              this.ownCaching = false;
              return false;
            }
          }
        }
        return ownCache;
      },
      willDrawShadow: function() {
        if (fabric3.Object.prototype.willDrawShadow.call(this)) {
          return true;
        }
        for (var i = 0, len = this._objects.length; i < len; i++) {
          if (this._objects[i].willDrawShadow()) {
            return true;
          }
        }
        return false;
      },
      isOnACache: function() {
        return this.ownCaching || this.group && this.group.isOnACache();
      },
      drawObject: function(ctx) {
        for (var i = 0, len = this._objects.length; i < len; i++) {
          this._objects[i].render(ctx);
        }
        this._drawClipPath(ctx, this.clipPath);
      },
      isCacheDirty: function(skipCanvas) {
        if (this.callSuper("isCacheDirty", skipCanvas)) {
          return true;
        }
        if (!this.statefullCache) {
          return false;
        }
        for (var i = 0, len = this._objects.length; i < len; i++) {
          if (this._objects[i].isCacheDirty(true)) {
            if (this._cacheCanvas) {
              var x = this.cacheWidth / this.zoomX, y = this.cacheHeight / this.zoomY;
              this._cacheContext.clearRect(-x / 2, -y / 2, x, y);
            }
            return true;
          }
        }
        return false;
      },
      _restoreObjectsState: function() {
        var groupMatrix = this.calcOwnMatrix();
        this._objects.forEach(function(object) {
          fabric3.util.addTransformToObject(object, groupMatrix);
          delete object.group;
          object.setCoords();
        });
        return this;
      },
      destroy: function() {
        this._objects.forEach(function(object) {
          object.set("dirty", true);
        });
        return this._restoreObjectsState();
      },
      dispose: function() {
        this.callSuper("dispose");
        this.forEachObject(function(object) {
          object.dispose && object.dispose();
        });
        this._objects = [];
      },
      toActiveSelection: function() {
        if (!this.canvas) {
          return;
        }
        var objects = this._objects, canvas2 = this.canvas;
        this._objects = [];
        var options = this.toObject();
        delete options.objects;
        var activeSelection = new fabric3.ActiveSelection([]);
        activeSelection.set(options);
        activeSelection.type = "activeSelection";
        canvas2.remove(this);
        objects.forEach(function(object) {
          object.group = activeSelection;
          object.dirty = true;
          canvas2.add(object);
        });
        activeSelection.canvas = canvas2;
        activeSelection._objects = objects;
        canvas2._activeObject = activeSelection;
        activeSelection.setCoords();
        return activeSelection;
      },
      ungroupOnCanvas: function() {
        return this._restoreObjectsState();
      },
      setObjectsCoords: function() {
        var skipControls = true;
        this.forEachObject(function(object) {
          object.setCoords(skipControls);
        });
        return this;
      },
      _calcBounds: function(onlyWidthHeight) {
        var aX = [], aY = [], o, prop, coords, props = ["tr", "br", "bl", "tl"], i = 0, iLen = this._objects.length, j, jLen = props.length;
        for (; i < iLen; ++i) {
          o = this._objects[i];
          coords = o.calcACoords();
          for (j = 0; j < jLen; j++) {
            prop = props[j];
            aX.push(coords[prop].x);
            aY.push(coords[prop].y);
          }
          o.aCoords = coords;
        }
        this._getBounds(aX, aY, onlyWidthHeight);
      },
      _getBounds: function(aX, aY, onlyWidthHeight) {
        var minXY = new fabric3.Point(min(aX), min(aY)), maxXY = new fabric3.Point(max(aX), max(aY)), top = minXY.y || 0, left = minXY.x || 0, width = maxXY.x - minXY.x || 0, height = maxXY.y - minXY.y || 0;
        this.width = width;
        this.height = height;
        if (!onlyWidthHeight) {
          this.setPositionByOrigin({ x: left, y: top }, "left", "top");
        }
      },
      _toSVG: function(reviver) {
        var svgString = ["<g ", "COMMON_PARTS", " >\n"];
        for (var i = 0, len = this._objects.length; i < len; i++) {
          svgString.push("		", this._objects[i].toSVG(reviver));
        }
        svgString.push("</g>\n");
        return svgString;
      },
      getSvgStyles: function() {
        var opacity = typeof this.opacity !== "undefined" && this.opacity !== 1 ? "opacity: " + this.opacity + ";" : "", visibility = this.visible ? "" : " visibility: hidden;";
        return [
          opacity,
          this.getSvgFilter(),
          visibility
        ].join("");
      },
      toClipPathSVG: function(reviver) {
        var svgString = [];
        for (var i = 0, len = this._objects.length; i < len; i++) {
          svgString.push("	", this._objects[i].toClipPathSVG(reviver));
        }
        return this._createBaseClipPathSVGMarkup(svgString, { reviver });
      }
    });
    fabric3.Group.fromObject = function(object, callback) {
      var objects = object.objects, options = fabric3.util.object.clone(object, true);
      delete options.objects;
      if (typeof objects === "string") {
        fabric3.loadSVGFromURL(objects, function(elements) {
          var group = fabric3.util.groupSVGElements(elements, object, objects);
          var clipPath = options.clipPath;
          delete options.clipPath;
          group.set(options);
          if (clipPath) {
            fabric3.util.enlivenObjects([clipPath], function(elivenedObjects) {
              group.clipPath = elivenedObjects[0];
              callback && callback(group);
            });
          } else {
            callback && callback(group);
          }
        });
        return;
      }
      fabric3.util.enlivenObjects(objects, function(enlivenedObjects) {
        fabric3.util.enlivenObjectEnlivables(object, options, function() {
          callback && callback(new fabric3.Group(enlivenedObjects, options, true));
        });
      });
    };
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {});
    if (fabric3.ActiveSelection) {
      return;
    }
    fabric3.ActiveSelection = fabric3.util.createClass(fabric3.Group, {
      type: "activeSelection",
      initialize: function(objects, options) {
        options = options || {};
        this._objects = objects || [];
        for (var i = this._objects.length; i--; ) {
          this._objects[i].group = this;
        }
        if (options.originX) {
          this.originX = options.originX;
        }
        if (options.originY) {
          this.originY = options.originY;
        }
        this._calcBounds();
        this._updateObjectsCoords();
        fabric3.Object.prototype.initialize.call(this, options);
        this.setCoords();
      },
      toGroup: function() {
        var objects = this._objects.concat();
        this._objects = [];
        var options = fabric3.Object.prototype.toObject.call(this);
        var newGroup = new fabric3.Group([]);
        delete options.type;
        newGroup.set(options);
        objects.forEach(function(object) {
          object.canvas.remove(object);
          object.group = newGroup;
        });
        newGroup._objects = objects;
        if (!this.canvas) {
          return newGroup;
        }
        var canvas2 = this.canvas;
        canvas2.add(newGroup);
        canvas2._activeObject = newGroup;
        newGroup.setCoords();
        return newGroup;
      },
      onDeselect: function() {
        this.destroy();
        return false;
      },
      toString: function() {
        return "#<fabric.ActiveSelection: (" + this.complexity() + ")>";
      },
      shouldCache: function() {
        return false;
      },
      isOnACache: function() {
        return false;
      },
      _renderControls: function(ctx, styleOverride, childrenOverride) {
        ctx.save();
        ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
        this.callSuper("_renderControls", ctx, styleOverride);
        childrenOverride = childrenOverride || {};
        if (typeof childrenOverride.hasControls === "undefined") {
          childrenOverride.hasControls = false;
        }
        childrenOverride.forActiveSelection = true;
        for (var i = 0, len = this._objects.length; i < len; i++) {
          this._objects[i]._renderControls(ctx, childrenOverride);
        }
        ctx.restore();
      }
    });
    fabric3.ActiveSelection.fromObject = function(object, callback) {
      fabric3.util.enlivenObjects(object.objects, function(enlivenedObjects) {
        delete object.objects;
        callback && callback(new fabric3.ActiveSelection(enlivenedObjects, object, true));
      });
    };
  })(exports);
  (function(global) {
    var extend = fabric2.util.object.extend;
    if (!global.fabric) {
      global.fabric = {};
    }
    if (global.fabric.Image) {
      fabric2.warn("fabric.Image is already defined.");
      return;
    }
    fabric2.Image = fabric2.util.createClass(fabric2.Object, {
      type: "image",
      strokeWidth: 0,
      srcFromAttribute: false,
      _lastScaleX: 1,
      _lastScaleY: 1,
      _filterScalingX: 1,
      _filterScalingY: 1,
      minimumScaleTrigger: 0.5,
      stateProperties: fabric2.Object.prototype.stateProperties.concat("cropX", "cropY"),
      cacheProperties: fabric2.Object.prototype.cacheProperties.concat("cropX", "cropY"),
      cacheKey: "",
      cropX: 0,
      cropY: 0,
      imageSmoothing: true,
      initialize: function(element, options) {
        options || (options = {});
        this.filters = [];
        this.cacheKey = "texture" + fabric2.Object.__uid++;
        this.callSuper("initialize", options);
        this._initElement(element, options);
      },
      getElement: function() {
        return this._element || {};
      },
      setElement: function(element, options) {
        this.removeTexture(this.cacheKey);
        this.removeTexture(this.cacheKey + "_filtered");
        this._element = element;
        this._originalElement = element;
        this._initConfig(options);
        if (this.filters.length !== 0) {
          this.applyFilters();
        }
        if (this.resizeFilter) {
          this.applyResizeFilters();
        }
        return this;
      },
      removeTexture: function(key) {
        var backend = fabric2.filterBackend;
        if (backend && backend.evictCachesForKey) {
          backend.evictCachesForKey(key);
        }
      },
      dispose: function() {
        this.callSuper("dispose");
        this.removeTexture(this.cacheKey);
        this.removeTexture(this.cacheKey + "_filtered");
        this._cacheContext = void 0;
        ["_originalElement", "_element", "_filteredEl", "_cacheCanvas"].forEach(function(element) {
          fabric2.util.cleanUpJsdomNode(this[element]);
          this[element] = void 0;
        }.bind(this));
      },
      getCrossOrigin: function() {
        return this._originalElement && (this._originalElement.crossOrigin || null);
      },
      getOriginalSize: function() {
        var element = this.getElement();
        return {
          width: element.naturalWidth || element.width,
          height: element.naturalHeight || element.height
        };
      },
      _stroke: function(ctx) {
        if (!this.stroke || this.strokeWidth === 0) {
          return;
        }
        var w = this.width / 2, h = this.height / 2;
        ctx.beginPath();
        ctx.moveTo(-w, -h);
        ctx.lineTo(w, -h);
        ctx.lineTo(w, h);
        ctx.lineTo(-w, h);
        ctx.lineTo(-w, -h);
        ctx.closePath();
      },
      toObject: function(propertiesToInclude) {
        var filters = [];
        this.filters.forEach(function(filterObj) {
          if (filterObj) {
            filters.push(filterObj.toObject());
          }
        });
        var object = extend(
          this.callSuper(
            "toObject",
            ["cropX", "cropY"].concat(propertiesToInclude)
          ),
          {
            src: this.getSrc(),
            crossOrigin: this.getCrossOrigin(),
            filters
          }
        );
        if (this.resizeFilter) {
          object.resizeFilter = this.resizeFilter.toObject();
        }
        return object;
      },
      hasCrop: function() {
        return this.cropX || this.cropY || this.width < this._element.width || this.height < this._element.height;
      },
      _toSVG: function() {
        var svgString = [], imageMarkup = [], strokeSvg, element = this._element, x = -this.width / 2, y = -this.height / 2, clipPath = "", imageRendering = "";
        if (!element) {
          return [];
        }
        if (this.hasCrop()) {
          var clipPathId = fabric2.Object.__uid++;
          svgString.push(
            '<clipPath id="imageCrop_' + clipPathId + '">\n',
            '	<rect x="' + x + '" y="' + y + '" width="' + this.width + '" height="' + this.height + '" />\n',
            "</clipPath>\n"
          );
          clipPath = ' clip-path="url(#imageCrop_' + clipPathId + ')" ';
        }
        if (!this.imageSmoothing) {
          imageRendering = '" image-rendering="optimizeSpeed';
        }
        imageMarkup.push(
          "	<image ",
          "COMMON_PARTS",
          'xlink:href="',
          this.getSvgSrc(true),
          '" x="',
          x - this.cropX,
          '" y="',
          y - this.cropY,
          '" width="',
          element.width || element.naturalWidth,
          '" height="',
          element.height || element.height,
          imageRendering,
          '"',
          clipPath,
          "></image>\n"
        );
        if (this.stroke || this.strokeDashArray) {
          var origFill = this.fill;
          this.fill = null;
          strokeSvg = [
            "	<rect ",
            'x="',
            x,
            '" y="',
            y,
            '" width="',
            this.width,
            '" height="',
            this.height,
            '" style="',
            this.getSvgStyles(),
            '"/>\n'
          ];
          this.fill = origFill;
        }
        if (this.paintFirst !== "fill") {
          svgString = svgString.concat(strokeSvg, imageMarkup);
        } else {
          svgString = svgString.concat(imageMarkup, strokeSvg);
        }
        return svgString;
      },
      getSrc: function(filtered) {
        var element = filtered ? this._element : this._originalElement;
        if (element) {
          if (element.toDataURL) {
            return element.toDataURL();
          }
          if (this.srcFromAttribute) {
            return element.getAttribute("src");
          } else {
            return element.src;
          }
        } else {
          return this.src || "";
        }
      },
      setSrc: function(src, callback, options) {
        fabric2.util.loadImage(src, function(img, isError) {
          this.setElement(img, options);
          this._setWidthHeight();
          callback && callback(this, isError);
        }, this, options && options.crossOrigin);
        return this;
      },
      toString: function() {
        return '#<fabric.Image: { src: "' + this.getSrc() + '" }>';
      },
      applyResizeFilters: function() {
        var filter = this.resizeFilter, minimumScale = this.minimumScaleTrigger, objectScale = this.getTotalObjectScaling(), scaleX = objectScale.scaleX, scaleY = objectScale.scaleY, elementToFilter = this._filteredEl || this._originalElement;
        if (this.group) {
          this.set("dirty", true);
        }
        if (!filter || scaleX > minimumScale && scaleY > minimumScale) {
          this._element = elementToFilter;
          this._filterScalingX = 1;
          this._filterScalingY = 1;
          this._lastScaleX = scaleX;
          this._lastScaleY = scaleY;
          return;
        }
        if (!fabric2.filterBackend) {
          fabric2.filterBackend = fabric2.initFilterBackend();
        }
        var canvasEl = fabric2.util.createCanvasElement(), cacheKey = this._filteredEl ? this.cacheKey + "_filtered" : this.cacheKey, sourceWidth = elementToFilter.width, sourceHeight = elementToFilter.height;
        canvasEl.width = sourceWidth;
        canvasEl.height = sourceHeight;
        this._element = canvasEl;
        this._lastScaleX = filter.scaleX = scaleX;
        this._lastScaleY = filter.scaleY = scaleY;
        fabric2.filterBackend.applyFilters(
          [filter],
          elementToFilter,
          sourceWidth,
          sourceHeight,
          this._element,
          cacheKey
        );
        this._filterScalingX = canvasEl.width / this._originalElement.width;
        this._filterScalingY = canvasEl.height / this._originalElement.height;
      },
      applyFilters: function(filters) {
        filters = filters || this.filters || [];
        filters = filters.filter(function(filter) {
          return filter && !filter.isNeutralState();
        });
        this.set("dirty", true);
        this.removeTexture(this.cacheKey + "_filtered");
        if (filters.length === 0) {
          this._element = this._originalElement;
          this._filteredEl = null;
          this._filterScalingX = 1;
          this._filterScalingY = 1;
          return this;
        }
        var imgElement = this._originalElement, sourceWidth = imgElement.naturalWidth || imgElement.width, sourceHeight = imgElement.naturalHeight || imgElement.height;
        if (this._element === this._originalElement) {
          var canvasEl = fabric2.util.createCanvasElement();
          canvasEl.width = sourceWidth;
          canvasEl.height = sourceHeight;
          this._element = canvasEl;
          this._filteredEl = canvasEl;
        } else {
          this._element = this._filteredEl;
          this._filteredEl.getContext("2d").clearRect(0, 0, sourceWidth, sourceHeight);
          this._lastScaleX = 1;
          this._lastScaleY = 1;
        }
        if (!fabric2.filterBackend) {
          fabric2.filterBackend = fabric2.initFilterBackend();
        }
        fabric2.filterBackend.applyFilters(
          filters,
          this._originalElement,
          sourceWidth,
          sourceHeight,
          this._element,
          this.cacheKey
        );
        if (this._originalElement.width !== this._element.width || this._originalElement.height !== this._element.height) {
          this._filterScalingX = this._element.width / this._originalElement.width;
          this._filterScalingY = this._element.height / this._originalElement.height;
        }
        return this;
      },
      _render: function(ctx) {
        fabric2.util.setImageSmoothing(ctx, this.imageSmoothing);
        if (this.isMoving !== true && this.resizeFilter && this._needsResize()) {
          this.applyResizeFilters();
        }
        this._stroke(ctx);
        this._renderPaintInOrder(ctx);
      },
      drawCacheOnCanvas: function(ctx) {
        fabric2.util.setImageSmoothing(ctx, this.imageSmoothing);
        fabric2.Object.prototype.drawCacheOnCanvas.call(this, ctx);
      },
      shouldCache: function() {
        return this.needsItsOwnCache();
      },
      _renderFill: function(ctx) {
        var elementToDraw = this._element;
        if (!elementToDraw) {
          return;
        }
        var scaleX = this._filterScalingX, scaleY = this._filterScalingY, w = this.width, h = this.height, min = Math.min, max = Math.max, cropX = max(this.cropX, 0), cropY = max(this.cropY, 0), elWidth = elementToDraw.naturalWidth || elementToDraw.width, elHeight = elementToDraw.naturalHeight || elementToDraw.height, sX = cropX * scaleX, sY = cropY * scaleY, sW = min(w * scaleX, elWidth - sX), sH = min(h * scaleY, elHeight - sY), x = -w / 2, y = -h / 2, maxDestW = min(w, elWidth / scaleX - cropX), maxDestH = min(h, elHeight / scaleY - cropY);
        elementToDraw && ctx.drawImage(elementToDraw, sX, sY, sW, sH, x, y, maxDestW, maxDestH);
      },
      _needsResize: function() {
        var scale = this.getTotalObjectScaling();
        return scale.scaleX !== this._lastScaleX || scale.scaleY !== this._lastScaleY;
      },
      _resetWidthHeight: function() {
        this.set(this.getOriginalSize());
      },
      _initElement: function(element, options) {
        this.setElement(fabric2.util.getById(element), options);
        fabric2.util.addClass(this.getElement(), fabric2.Image.CSS_CANVAS);
      },
      _initConfig: function(options) {
        options || (options = {});
        this.setOptions(options);
        this._setWidthHeight(options);
      },
      _initFilters: function(filters, callback) {
        if (filters && filters.length) {
          fabric2.util.enlivenObjects(filters, function(enlivenedObjects) {
            callback && callback(enlivenedObjects);
          }, "fabric.Image.filters");
        } else {
          callback && callback();
        }
      },
      _setWidthHeight: function(options) {
        options || (options = {});
        var el = this.getElement();
        this.width = options.width || el.naturalWidth || el.width || 0;
        this.height = options.height || el.naturalHeight || el.height || 0;
      },
      parsePreserveAspectRatioAttribute: function() {
        var pAR = fabric2.util.parsePreserveAspectRatioAttribute(this.preserveAspectRatio || ""), rWidth = this._element.width, rHeight = this._element.height, scaleX = 1, scaleY = 1, offsetLeft = 0, offsetTop = 0, cropX = 0, cropY = 0, offset, pWidth = this.width, pHeight = this.height, parsedAttributes = { width: pWidth, height: pHeight };
        if (pAR && (pAR.alignX !== "none" || pAR.alignY !== "none")) {
          if (pAR.meetOrSlice === "meet") {
            scaleX = scaleY = fabric2.util.findScaleToFit(this._element, parsedAttributes);
            offset = (pWidth - rWidth * scaleX) / 2;
            if (pAR.alignX === "Min") {
              offsetLeft = -offset;
            }
            if (pAR.alignX === "Max") {
              offsetLeft = offset;
            }
            offset = (pHeight - rHeight * scaleY) / 2;
            if (pAR.alignY === "Min") {
              offsetTop = -offset;
            }
            if (pAR.alignY === "Max") {
              offsetTop = offset;
            }
          }
          if (pAR.meetOrSlice === "slice") {
            scaleX = scaleY = fabric2.util.findScaleToCover(this._element, parsedAttributes);
            offset = rWidth - pWidth / scaleX;
            if (pAR.alignX === "Mid") {
              cropX = offset / 2;
            }
            if (pAR.alignX === "Max") {
              cropX = offset;
            }
            offset = rHeight - pHeight / scaleY;
            if (pAR.alignY === "Mid") {
              cropY = offset / 2;
            }
            if (pAR.alignY === "Max") {
              cropY = offset;
            }
            rWidth = pWidth / scaleX;
            rHeight = pHeight / scaleY;
          }
        } else {
          scaleX = pWidth / rWidth;
          scaleY = pHeight / rHeight;
        }
        return {
          width: rWidth,
          height: rHeight,
          scaleX,
          scaleY,
          offsetLeft,
          offsetTop,
          cropX,
          cropY
        };
      }
    });
    fabric2.Image.CSS_CANVAS = "canvas-img";
    fabric2.Image.prototype.getSvgSrc = fabric2.Image.prototype.getSrc;
    fabric2.Image.fromObject = function(_object, callback) {
      var object = fabric2.util.object.clone(_object);
      fabric2.util.loadImage(object.src, function(img, isError) {
        if (isError) {
          callback && callback(null, true);
          return;
        }
        fabric2.Image.prototype._initFilters.call(object, object.filters, function(filters) {
          object.filters = filters || [];
          fabric2.Image.prototype._initFilters.call(object, [object.resizeFilter], function(resizeFilters) {
            object.resizeFilter = resizeFilters[0];
            fabric2.util.enlivenObjectEnlivables(object, object, function() {
              var image = new fabric2.Image(img, object);
              callback(image, false);
            });
          });
        });
      }, null, object.crossOrigin);
    };
    fabric2.Image.fromURL = function(url, callback, imgOptions) {
      fabric2.util.loadImage(url, function(img, isError) {
        callback && callback(new fabric2.Image(img, imgOptions), isError);
      }, null, imgOptions && imgOptions.crossOrigin);
    };
    fabric2.Image.ATTRIBUTE_NAMES = fabric2.SHARED_ATTRIBUTES.concat(
      "x y width height preserveAspectRatio xlink:href crossOrigin image-rendering".split(" ")
    );
    fabric2.Image.fromElement = function(element, callback, options) {
      var parsedAttributes = fabric2.parseAttributes(element, fabric2.Image.ATTRIBUTE_NAMES);
      fabric2.Image.fromURL(
        parsedAttributes["xlink:href"],
        callback,
        extend(options ? fabric2.util.object.clone(options) : {}, parsedAttributes)
      );
    };
  })(exports);
  fabric2.util.object.extend(fabric2.Object.prototype, {
    _getAngleValueForStraighten: function() {
      var angle = this.angle % 360;
      if (angle > 0) {
        return Math.round((angle - 1) / 90) * 90;
      }
      return Math.round(angle / 90) * 90;
    },
    straighten: function() {
      return this.rotate(this._getAngleValueForStraighten());
    },
    fxStraighten: function(callbacks) {
      callbacks = callbacks || {};
      var empty = function() {
      }, onComplete = callbacks.onComplete || empty, onChange = callbacks.onChange || empty, _this = this;
      return fabric2.util.animate({
        target: this,
        startValue: this.get("angle"),
        endValue: this._getAngleValueForStraighten(),
        duration: this.FX_DURATION,
        onChange: function(value) {
          _this.rotate(value);
          onChange();
        },
        onComplete: function() {
          _this.setCoords();
          onComplete();
        }
      });
    }
  });
  fabric2.util.object.extend(fabric2.StaticCanvas.prototype, {
    straightenObject: function(object) {
      object.straighten();
      this.requestRenderAll();
      return this;
    },
    fxStraightenObject: function(object) {
      return object.fxStraighten({
        onChange: this.requestRenderAllBound
      });
    }
  });
  (function() {
    function testPrecision(gl, precision) {
      var fragmentSource = "precision " + precision + " float;\nvoid main(){}";
      var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragmentSource);
      gl.compileShader(fragmentShader);
      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        return false;
      }
      return true;
    }
    fabric2.isWebglSupported = function(tileSize) {
      if (fabric2.isLikelyNode) {
        return false;
      }
      tileSize = tileSize || fabric2.WebglFilterBackend.prototype.tileSize;
      var canvas2 = document.createElement("canvas");
      var gl = canvas2.getContext("webgl") || canvas2.getContext("experimental-webgl");
      var isSupported2 = false;
      if (gl) {
        fabric2.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        isSupported2 = fabric2.maxTextureSize >= tileSize;
        var precisions = ["highp", "mediump", "lowp"];
        for (var i = 0; i < 3; i++) {
          if (testPrecision(gl, precisions[i])) {
            fabric2.webGlPrecision = precisions[i];
            break;
          }
        }
      }
      this.isSupported = isSupported2;
      return isSupported2;
    };
    fabric2.WebglFilterBackend = WebglFilterBackend;
    function WebglFilterBackend(options) {
      if (options && options.tileSize) {
        this.tileSize = options.tileSize;
      }
      this.setupGLContext(this.tileSize, this.tileSize);
      this.captureGPUInfo();
    }
    WebglFilterBackend.prototype = {
      tileSize: 2048,
      resources: {},
      setupGLContext: function(width, height) {
        this.dispose();
        this.createWebGLCanvas(width, height);
        this.aPosition = new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]);
        this.chooseFastestCopyGLTo2DMethod(width, height);
      },
      chooseFastestCopyGLTo2DMethod: function(width, height) {
        var canMeasurePerf = typeof window.performance !== "undefined", canUseImageData;
        try {
          new ImageData(1, 1);
          canUseImageData = true;
        } catch (e) {
          canUseImageData = false;
        }
        var canUseArrayBuffer = typeof ArrayBuffer !== "undefined";
        var canUseUint8Clamped = typeof Uint8ClampedArray !== "undefined";
        if (!(canMeasurePerf && canUseImageData && canUseArrayBuffer && canUseUint8Clamped)) {
          return;
        }
        var targetCanvas = fabric2.util.createCanvasElement();
        var imageBuffer = new ArrayBuffer(width * height * 4);
        if (fabric2.forceGLPutImageData) {
          this.imageBuffer = imageBuffer;
          this.copyGLTo2D = copyGLTo2DPutImageData;
          return;
        }
        var testContext = {
          imageBuffer,
          destinationWidth: width,
          destinationHeight: height,
          targetCanvas
        };
        var startTime, drawImageTime, putImageDataTime;
        targetCanvas.width = width;
        targetCanvas.height = height;
        startTime = window.performance.now();
        copyGLTo2DDrawImage.call(testContext, this.gl, testContext);
        drawImageTime = window.performance.now() - startTime;
        startTime = window.performance.now();
        copyGLTo2DPutImageData.call(testContext, this.gl, testContext);
        putImageDataTime = window.performance.now() - startTime;
        if (drawImageTime > putImageDataTime) {
          this.imageBuffer = imageBuffer;
          this.copyGLTo2D = copyGLTo2DPutImageData;
        } else {
          this.copyGLTo2D = copyGLTo2DDrawImage;
        }
      },
      createWebGLCanvas: function(width, height) {
        var canvas2 = fabric2.util.createCanvasElement();
        canvas2.width = width;
        canvas2.height = height;
        var glOptions = {
          alpha: true,
          premultipliedAlpha: false,
          depth: false,
          stencil: false,
          antialias: false
        }, gl = canvas2.getContext("webgl", glOptions);
        if (!gl) {
          gl = canvas2.getContext("experimental-webgl", glOptions);
        }
        if (!gl) {
          return;
        }
        gl.clearColor(0, 0, 0, 0);
        this.canvas = canvas2;
        this.gl = gl;
      },
      applyFilters: function(filters, source, width, height, targetCanvas, cacheKey) {
        var gl = this.gl;
        var cachedTexture;
        if (cacheKey) {
          cachedTexture = this.getCachedTexture(cacheKey, source);
        }
        var pipelineState = {
          originalWidth: source.width || source.originalWidth,
          originalHeight: source.height || source.originalHeight,
          sourceWidth: width,
          sourceHeight: height,
          destinationWidth: width,
          destinationHeight: height,
          context: gl,
          sourceTexture: this.createTexture(gl, width, height, !cachedTexture && source),
          targetTexture: this.createTexture(gl, width, height),
          originalTexture: cachedTexture || this.createTexture(gl, width, height, !cachedTexture && source),
          passes: filters.length,
          webgl: true,
          aPosition: this.aPosition,
          programCache: this.programCache,
          pass: 0,
          filterBackend: this,
          targetCanvas
        };
        var tempFbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, tempFbo);
        filters.forEach(function(filter) {
          filter && filter.applyTo(pipelineState);
        });
        resizeCanvasIfNeeded(pipelineState);
        this.copyGLTo2D(gl, pipelineState);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.deleteTexture(pipelineState.sourceTexture);
        gl.deleteTexture(pipelineState.targetTexture);
        gl.deleteFramebuffer(tempFbo);
        targetCanvas.getContext("2d").setTransform(1, 0, 0, 1, 0, 0);
        return pipelineState;
      },
      dispose: function() {
        if (this.canvas) {
          this.canvas = null;
          this.gl = null;
        }
        this.clearWebGLCaches();
      },
      clearWebGLCaches: function() {
        this.programCache = {};
        this.textureCache = {};
      },
      createTexture: function(gl, width, height, textureImageSource, filterType) {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterType || gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filterType || gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        if (textureImageSource) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImageSource);
        } else {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        }
        return texture;
      },
      getCachedTexture: function(uniqueId, textureImageSource) {
        if (this.textureCache[uniqueId]) {
          return this.textureCache[uniqueId];
        } else {
          var texture = this.createTexture(
            this.gl,
            textureImageSource.width,
            textureImageSource.height,
            textureImageSource
          );
          this.textureCache[uniqueId] = texture;
          return texture;
        }
      },
      evictCachesForKey: function(cacheKey) {
        if (this.textureCache[cacheKey]) {
          this.gl.deleteTexture(this.textureCache[cacheKey]);
          delete this.textureCache[cacheKey];
        }
      },
      copyGLTo2D: copyGLTo2DDrawImage,
      captureGPUInfo: function() {
        if (this.gpuInfo) {
          return this.gpuInfo;
        }
        var gl = this.gl, gpuInfo = { renderer: "", vendor: "" };
        if (!gl) {
          return gpuInfo;
        }
        var ext = gl.getExtension("WEBGL_debug_renderer_info");
        if (ext) {
          var renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
          var vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL);
          if (renderer) {
            gpuInfo.renderer = renderer.toLowerCase();
          }
          if (vendor) {
            gpuInfo.vendor = vendor.toLowerCase();
          }
        }
        this.gpuInfo = gpuInfo;
        return gpuInfo;
      }
    };
  })();
  function resizeCanvasIfNeeded(pipelineState) {
    var targetCanvas = pipelineState.targetCanvas, width = targetCanvas.width, height = targetCanvas.height, dWidth = pipelineState.destinationWidth, dHeight = pipelineState.destinationHeight;
    if (width !== dWidth || height !== dHeight) {
      targetCanvas.width = dWidth;
      targetCanvas.height = dHeight;
    }
  }
  function copyGLTo2DDrawImage(gl, pipelineState) {
    var glCanvas = gl.canvas, targetCanvas = pipelineState.targetCanvas, ctx = targetCanvas.getContext("2d");
    ctx.translate(0, targetCanvas.height);
    ctx.scale(1, -1);
    var sourceY = glCanvas.height - targetCanvas.height;
    ctx.drawImage(
      glCanvas,
      0,
      sourceY,
      targetCanvas.width,
      targetCanvas.height,
      0,
      0,
      targetCanvas.width,
      targetCanvas.height
    );
  }
  function copyGLTo2DPutImageData(gl, pipelineState) {
    var targetCanvas = pipelineState.targetCanvas, ctx = targetCanvas.getContext("2d"), dWidth = pipelineState.destinationWidth, dHeight = pipelineState.destinationHeight, numBytes = dWidth * dHeight * 4;
    var u8 = new Uint8Array(this.imageBuffer, 0, numBytes);
    var u8Clamped = new Uint8ClampedArray(this.imageBuffer, 0, numBytes);
    gl.readPixels(0, 0, dWidth, dHeight, gl.RGBA, gl.UNSIGNED_BYTE, u8);
    var imgData = new ImageData(u8Clamped, dWidth, dHeight);
    ctx.putImageData(imgData, 0, 0);
  }
  (function() {
    var noop = function() {
    };
    fabric2.Canvas2dFilterBackend = Canvas2dFilterBackend;
    function Canvas2dFilterBackend() {
    }
    Canvas2dFilterBackend.prototype = {
      evictCachesForKey: noop,
      dispose: noop,
      clearWebGLCaches: noop,
      resources: {},
      applyFilters: function(filters, sourceElement, sourceWidth, sourceHeight, targetCanvas) {
        var ctx = targetCanvas.getContext("2d");
        ctx.drawImage(sourceElement, 0, 0, sourceWidth, sourceHeight);
        var imageData = ctx.getImageData(0, 0, sourceWidth, sourceHeight);
        var originalImageData = ctx.getImageData(0, 0, sourceWidth, sourceHeight);
        var pipelineState = {
          sourceWidth,
          sourceHeight,
          imageData,
          originalEl: sourceElement,
          originalImageData,
          canvasEl: targetCanvas,
          ctx,
          filterBackend: this
        };
        filters.forEach(function(filter) {
          filter.applyTo(pipelineState);
        });
        if (pipelineState.imageData.width !== sourceWidth || pipelineState.imageData.height !== sourceHeight) {
          targetCanvas.width = pipelineState.imageData.width;
          targetCanvas.height = pipelineState.imageData.height;
        }
        ctx.putImageData(pipelineState.imageData, 0, 0);
        return pipelineState;
      }
    };
  })();
  fabric2.Image = fabric2.Image || {};
  fabric2.Image.filters = fabric2.Image.filters || {};
  fabric2.Image.filters.BaseFilter = fabric2.util.createClass({
    type: "BaseFilter",
    vertexSource: "attribute vec2 aPosition;\nvarying vec2 vTexCoord;\nvoid main() {\nvTexCoord = aPosition;\ngl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);\n}",
    fragmentSource: "precision highp float;\nvarying vec2 vTexCoord;\nuniform sampler2D uTexture;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\n}",
    initialize: function(options) {
      if (options) {
        this.setOptions(options);
      }
    },
    setOptions: function(options) {
      for (var prop in options) {
        this[prop] = options[prop];
      }
    },
    createProgram: function(gl, fragmentSource, vertexSource) {
      fragmentSource = fragmentSource || this.fragmentSource;
      vertexSource = vertexSource || this.vertexSource;
      if (fabric2.webGlPrecision !== "highp") {
        fragmentSource = fragmentSource.replace(
          /precision highp float/g,
          "precision " + fabric2.webGlPrecision + " float"
        );
      }
      var vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vertexSource);
      gl.compileShader(vertexShader);
      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        throw new Error(
          "Vertex shader compile error for " + this.type + ": " + gl.getShaderInfoLog(vertexShader)
        );
      }
      var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragmentSource);
      gl.compileShader(fragmentShader);
      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        throw new Error(
          "Fragment shader compile error for " + this.type + ": " + gl.getShaderInfoLog(fragmentShader)
        );
      }
      var program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(
          'Shader link error for "${this.type}" ' + gl.getProgramInfoLog(program)
        );
      }
      var attributeLocations = this.getAttributeLocations(gl, program);
      var uniformLocations = this.getUniformLocations(gl, program) || {};
      uniformLocations.uStepW = gl.getUniformLocation(program, "uStepW");
      uniformLocations.uStepH = gl.getUniformLocation(program, "uStepH");
      return {
        program,
        attributeLocations,
        uniformLocations
      };
    },
    getAttributeLocations: function(gl, program) {
      return {
        aPosition: gl.getAttribLocation(program, "aPosition")
      };
    },
    getUniformLocations: function() {
      return {};
    },
    sendAttributeData: function(gl, attributeLocations, aPositionData) {
      var attributeLocation = attributeLocations.aPosition;
      var buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(attributeLocation);
      gl.vertexAttribPointer(attributeLocation, 2, gl.FLOAT, false, 0, 0);
      gl.bufferData(gl.ARRAY_BUFFER, aPositionData, gl.STATIC_DRAW);
    },
    _setupFrameBuffer: function(options) {
      var gl = options.context, width, height;
      if (options.passes > 1) {
        width = options.destinationWidth;
        height = options.destinationHeight;
        if (options.sourceWidth !== width || options.sourceHeight !== height) {
          gl.deleteTexture(options.targetTexture);
          options.targetTexture = options.filterBackend.createTexture(gl, width, height);
        }
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          options.targetTexture,
          0
        );
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.finish();
      }
    },
    _swapTextures: function(options) {
      options.passes--;
      options.pass++;
      var temp = options.targetTexture;
      options.targetTexture = options.sourceTexture;
      options.sourceTexture = temp;
    },
    isNeutralState: function() {
      var main = this.mainParameter, _class = fabric2.Image.filters[this.type].prototype;
      if (main) {
        if (Array.isArray(_class[main])) {
          for (var i = _class[main].length; i--; ) {
            if (this[main][i] !== _class[main][i]) {
              return false;
            }
          }
          return true;
        } else {
          return _class[main] === this[main];
        }
      } else {
        return false;
      }
    },
    applyTo: function(options) {
      if (options.webgl) {
        this._setupFrameBuffer(options);
        this.applyToWebGL(options);
        this._swapTextures(options);
      } else {
        this.applyTo2d(options);
      }
    },
    retrieveShader: function(options) {
      if (!options.programCache.hasOwnProperty(this.type)) {
        options.programCache[this.type] = this.createProgram(options.context);
      }
      return options.programCache[this.type];
    },
    applyToWebGL: function(options) {
      var gl = options.context;
      var shader = this.retrieveShader(options);
      if (options.pass === 0 && options.originalTexture) {
        gl.bindTexture(gl.TEXTURE_2D, options.originalTexture);
      } else {
        gl.bindTexture(gl.TEXTURE_2D, options.sourceTexture);
      }
      gl.useProgram(shader.program);
      this.sendAttributeData(gl, shader.attributeLocations, options.aPosition);
      gl.uniform1f(shader.uniformLocations.uStepW, 1 / options.sourceWidth);
      gl.uniform1f(shader.uniformLocations.uStepH, 1 / options.sourceHeight);
      this.sendUniformData(gl, shader.uniformLocations);
      gl.viewport(0, 0, options.destinationWidth, options.destinationHeight);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    bindAdditionalTexture: function(gl, texture, textureUnit) {
      gl.activeTexture(textureUnit);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.activeTexture(gl.TEXTURE0);
    },
    unbindAdditionalTexture: function(gl, textureUnit) {
      gl.activeTexture(textureUnit);
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.activeTexture(gl.TEXTURE0);
    },
    getMainParameter: function() {
      return this[this.mainParameter];
    },
    setMainParameter: function(value) {
      this[this.mainParameter] = value;
    },
    sendUniformData: function() {
    },
    createHelpLayer: function(options) {
      if (!options.helpLayer) {
        var helpLayer = document.createElement("canvas");
        helpLayer.width = options.sourceWidth;
        helpLayer.height = options.sourceHeight;
        options.helpLayer = helpLayer;
      }
    },
    toObject: function() {
      var object = { type: this.type }, mainP = this.mainParameter;
      if (mainP) {
        object[mainP] = this[mainP];
      }
      return object;
    },
    toJSON: function() {
      return this.toObject();
    }
  });
  fabric2.Image.filters.BaseFilter.fromObject = function(object, callback) {
    var filter = new fabric2.Image.filters[object.type](object);
    callback && callback(filter);
    return filter;
  };
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.ColorMatrix = createClass(filters.BaseFilter, {
      type: "ColorMatrix",
      fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nvarying vec2 vTexCoord;\nuniform mat4 uColorMatrix;\nuniform vec4 uConstants;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor *= uColorMatrix;\ncolor += uConstants;\ngl_FragColor = color;\n}",
      matrix: [
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ],
      mainParameter: "matrix",
      colorsOnly: true,
      initialize: function(options) {
        this.callSuper("initialize", options);
        this.matrix = this.matrix.slice(0);
      },
      applyTo2d: function(options) {
        var imageData = options.imageData, data = imageData.data, iLen = data.length, m = this.matrix, r, g, b, a, i, colorsOnly = this.colorsOnly;
        for (i = 0; i < iLen; i += 4) {
          r = data[i];
          g = data[i + 1];
          b = data[i + 2];
          if (colorsOnly) {
            data[i] = r * m[0] + g * m[1] + b * m[2] + m[4] * 255;
            data[i + 1] = r * m[5] + g * m[6] + b * m[7] + m[9] * 255;
            data[i + 2] = r * m[10] + g * m[11] + b * m[12] + m[14] * 255;
          } else {
            a = data[i + 3];
            data[i] = r * m[0] + g * m[1] + b * m[2] + a * m[3] + m[4] * 255;
            data[i + 1] = r * m[5] + g * m[6] + b * m[7] + a * m[8] + m[9] * 255;
            data[i + 2] = r * m[10] + g * m[11] + b * m[12] + a * m[13] + m[14] * 255;
            data[i + 3] = r * m[15] + g * m[16] + b * m[17] + a * m[18] + m[19] * 255;
          }
        }
      },
      getUniformLocations: function(gl, program) {
        return {
          uColorMatrix: gl.getUniformLocation(program, "uColorMatrix"),
          uConstants: gl.getUniformLocation(program, "uConstants")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        var m = this.matrix, matrix = [
          m[0],
          m[1],
          m[2],
          m[3],
          m[5],
          m[6],
          m[7],
          m[8],
          m[10],
          m[11],
          m[12],
          m[13],
          m[15],
          m[16],
          m[17],
          m[18]
        ], constants = [m[4], m[9], m[14], m[19]];
        gl.uniformMatrix4fv(uniformLocations.uColorMatrix, false, matrix);
        gl.uniform4fv(uniformLocations.uConstants, constants);
      }
    });
    fabric3.Image.filters.ColorMatrix.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.Brightness = createClass(filters.BaseFilter, {
      type: "Brightness",
      fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uBrightness;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb += uBrightness;\ngl_FragColor = color;\n}",
      brightness: 0,
      mainParameter: "brightness",
      applyTo2d: function(options) {
        if (this.brightness === 0) {
          return;
        }
        var imageData = options.imageData, data = imageData.data, i, len = data.length, brightness = Math.round(this.brightness * 255);
        for (i = 0; i < len; i += 4) {
          data[i] = data[i] + brightness;
          data[i + 1] = data[i + 1] + brightness;
          data[i + 2] = data[i + 2] + brightness;
        }
      },
      getUniformLocations: function(gl, program) {
        return {
          uBrightness: gl.getUniformLocation(program, "uBrightness")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        gl.uniform1f(uniformLocations.uBrightness, this.brightness);
      }
    });
    fabric3.Image.filters.Brightness.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), extend = fabric3.util.object.extend, filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.Convolute = createClass(filters.BaseFilter, {
      type: "Convolute",
      opaque: false,
      matrix: [0, 0, 0, 0, 1, 0, 0, 0, 0],
      fragmentSource: {
        Convolute_3_1: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[9];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 3.0; h+=1.0) {\nfor (float w = 0.0; w < 3.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 1), uStepH * (h - 1));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 3.0 + w)];\n}\n}\ngl_FragColor = color;\n}",
        Convolute_3_0: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[9];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 3.0; h+=1.0) {\nfor (float w = 0.0; w < 3.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 1.0), uStepH * (h - 1.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 3.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",
        Convolute_5_1: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[25];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 5.0; h+=1.0) {\nfor (float w = 0.0; w < 5.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 5.0 + w)];\n}\n}\ngl_FragColor = color;\n}",
        Convolute_5_0: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[25];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 5.0; h+=1.0) {\nfor (float w = 0.0; w < 5.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 5.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",
        Convolute_7_1: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[49];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 7.0; h+=1.0) {\nfor (float w = 0.0; w < 7.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 7.0 + w)];\n}\n}\ngl_FragColor = color;\n}",
        Convolute_7_0: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[49];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 7.0; h+=1.0) {\nfor (float w = 0.0; w < 7.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 7.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",
        Convolute_9_1: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[81];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 9.0; h+=1.0) {\nfor (float w = 0.0; w < 9.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 9.0 + w)];\n}\n}\ngl_FragColor = color;\n}",
        Convolute_9_0: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[81];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 9.0; h+=1.0) {\nfor (float w = 0.0; w < 9.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 9.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}"
      },
      retrieveShader: function(options) {
        var size = Math.sqrt(this.matrix.length);
        var cacheKey = this.type + "_" + size + "_" + (this.opaque ? 1 : 0);
        var shaderSource = this.fragmentSource[cacheKey];
        if (!options.programCache.hasOwnProperty(cacheKey)) {
          options.programCache[cacheKey] = this.createProgram(options.context, shaderSource);
        }
        return options.programCache[cacheKey];
      },
      applyTo2d: function(options) {
        var imageData = options.imageData, data = imageData.data, weights = this.matrix, side = Math.round(Math.sqrt(weights.length)), halfSide = Math.floor(side / 2), sw = imageData.width, sh = imageData.height, output = options.ctx.createImageData(sw, sh), dst = output.data, alphaFac = this.opaque ? 1 : 0, r, g, b, a, dstOff, scx, scy, srcOff, wt, x, y, cx, cy;
        for (y = 0; y < sh; y++) {
          for (x = 0; x < sw; x++) {
            dstOff = (y * sw + x) * 4;
            r = 0;
            g = 0;
            b = 0;
            a = 0;
            for (cy = 0; cy < side; cy++) {
              for (cx = 0; cx < side; cx++) {
                scy = y + cy - halfSide;
                scx = x + cx - halfSide;
                if (scy < 0 || scy >= sh || scx < 0 || scx >= sw) {
                  continue;
                }
                srcOff = (scy * sw + scx) * 4;
                wt = weights[cy * side + cx];
                r += data[srcOff] * wt;
                g += data[srcOff + 1] * wt;
                b += data[srcOff + 2] * wt;
                if (!alphaFac) {
                  a += data[srcOff + 3] * wt;
                }
              }
            }
            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            if (!alphaFac) {
              dst[dstOff + 3] = a;
            } else {
              dst[dstOff + 3] = data[dstOff + 3];
            }
          }
        }
        options.imageData = output;
      },
      getUniformLocations: function(gl, program) {
        return {
          uMatrix: gl.getUniformLocation(program, "uMatrix"),
          uOpaque: gl.getUniformLocation(program, "uOpaque"),
          uHalfSize: gl.getUniformLocation(program, "uHalfSize"),
          uSize: gl.getUniformLocation(program, "uSize")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        gl.uniform1fv(uniformLocations.uMatrix, this.matrix);
      },
      toObject: function() {
        return extend(this.callSuper("toObject"), {
          opaque: this.opaque,
          matrix: this.matrix
        });
      }
    });
    fabric3.Image.filters.Convolute.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.Grayscale = createClass(filters.BaseFilter, {
      type: "Grayscale",
      fragmentSource: {
        average: "precision highp float;\nuniform sampler2D uTexture;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat average = (color.r + color.b + color.g) / 3.0;\ngl_FragColor = vec4(average, average, average, color.a);\n}",
        lightness: "precision highp float;\nuniform sampler2D uTexture;\nuniform int uMode;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 col = texture2D(uTexture, vTexCoord);\nfloat average = (max(max(col.r, col.g),col.b) + min(min(col.r, col.g),col.b)) / 2.0;\ngl_FragColor = vec4(average, average, average, col.a);\n}",
        luminosity: "precision highp float;\nuniform sampler2D uTexture;\nuniform int uMode;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 col = texture2D(uTexture, vTexCoord);\nfloat average = 0.21 * col.r + 0.72 * col.g + 0.07 * col.b;\ngl_FragColor = vec4(average, average, average, col.a);\n}"
      },
      mode: "average",
      mainParameter: "mode",
      applyTo2d: function(options) {
        var imageData = options.imageData, data = imageData.data, i, len = data.length, value, mode2 = this.mode;
        for (i = 0; i < len; i += 4) {
          if (mode2 === "average") {
            value = (data[i] + data[i + 1] + data[i + 2]) / 3;
          } else if (mode2 === "lightness") {
            value = (Math.min(data[i], data[i + 1], data[i + 2]) + Math.max(data[i], data[i + 1], data[i + 2])) / 2;
          } else if (mode2 === "luminosity") {
            value = 0.21 * data[i] + 0.72 * data[i + 1] + 0.07 * data[i + 2];
          }
          data[i] = value;
          data[i + 1] = value;
          data[i + 2] = value;
        }
      },
      retrieveShader: function(options) {
        var cacheKey = this.type + "_" + this.mode;
        if (!options.programCache.hasOwnProperty(cacheKey)) {
          var shaderSource = this.fragmentSource[this.mode];
          options.programCache[cacheKey] = this.createProgram(options.context, shaderSource);
        }
        return options.programCache[cacheKey];
      },
      getUniformLocations: function(gl, program) {
        return {
          uMode: gl.getUniformLocation(program, "uMode")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        var mode2 = 1;
        gl.uniform1i(uniformLocations.uMode, mode2);
      },
      isNeutralState: function() {
        return false;
      }
    });
    fabric3.Image.filters.Grayscale.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.Invert = createClass(filters.BaseFilter, {
      type: "Invert",
      fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform int uInvert;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nif (uInvert == 1) {\ngl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,color.a);\n} else {\ngl_FragColor = color;\n}\n}",
      invert: true,
      mainParameter: "invert",
      applyTo2d: function(options) {
        var imageData = options.imageData, data = imageData.data, i, len = data.length;
        for (i = 0; i < len; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
      },
      isNeutralState: function() {
        return !this.invert;
      },
      getUniformLocations: function(gl, program) {
        return {
          uInvert: gl.getUniformLocation(program, "uInvert")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        gl.uniform1i(uniformLocations.uInvert, this.invert);
      }
    });
    fabric3.Image.filters.Invert.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), extend = fabric3.util.object.extend, filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.Noise = createClass(filters.BaseFilter, {
      type: "Noise",
      fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uStepH;\nuniform float uNoise;\nuniform float uSeed;\nvarying vec2 vTexCoord;\nfloat rand(vec2 co, float seed, float vScale) {\nreturn fract(sin(dot(co.xy * vScale ,vec2(12.9898 , 78.233))) * 43758.5453 * (seed + 0.01) / 2.0);\n}\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb += (0.5 - rand(vTexCoord, uSeed, 0.1 / uStepH)) * uNoise;\ngl_FragColor = color;\n}",
      mainParameter: "noise",
      noise: 0,
      applyTo2d: function(options) {
        if (this.noise === 0) {
          return;
        }
        var imageData = options.imageData, data = imageData.data, i, len = data.length, noise = this.noise, rand;
        for (i = 0, len = data.length; i < len; i += 4) {
          rand = (0.5 - Math.random()) * noise;
          data[i] += rand;
          data[i + 1] += rand;
          data[i + 2] += rand;
        }
      },
      getUniformLocations: function(gl, program) {
        return {
          uNoise: gl.getUniformLocation(program, "uNoise"),
          uSeed: gl.getUniformLocation(program, "uSeed")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        gl.uniform1f(uniformLocations.uNoise, this.noise / 255);
        gl.uniform1f(uniformLocations.uSeed, Math.random());
      },
      toObject: function() {
        return extend(this.callSuper("toObject"), {
          noise: this.noise
        });
      }
    });
    fabric3.Image.filters.Noise.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.Pixelate = createClass(filters.BaseFilter, {
      type: "Pixelate",
      blocksize: 4,
      mainParameter: "blocksize",
      fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uBlocksize;\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nfloat blockW = uBlocksize * uStepW;\nfloat blockH = uBlocksize * uStepW;\nint posX = int(vTexCoord.x / blockW);\nint posY = int(vTexCoord.y / blockH);\nfloat fposX = float(posX);\nfloat fposY = float(posY);\nvec2 squareCoords = vec2(fposX * blockW, fposY * blockH);\nvec4 color = texture2D(uTexture, squareCoords);\ngl_FragColor = color;\n}",
      applyTo2d: function(options) {
        var imageData = options.imageData, data = imageData.data, iLen = imageData.height, jLen = imageData.width, index, i, j, r, g, b, a, _i, _j, _iLen, _jLen;
        for (i = 0; i < iLen; i += this.blocksize) {
          for (j = 0; j < jLen; j += this.blocksize) {
            index = i * 4 * jLen + j * 4;
            r = data[index];
            g = data[index + 1];
            b = data[index + 2];
            a = data[index + 3];
            _iLen = Math.min(i + this.blocksize, iLen);
            _jLen = Math.min(j + this.blocksize, jLen);
            for (_i = i; _i < _iLen; _i++) {
              for (_j = j; _j < _jLen; _j++) {
                index = _i * 4 * jLen + _j * 4;
                data[index] = r;
                data[index + 1] = g;
                data[index + 2] = b;
                data[index + 3] = a;
              }
            }
          }
        }
      },
      isNeutralState: function() {
        return this.blocksize === 1;
      },
      getUniformLocations: function(gl, program) {
        return {
          uBlocksize: gl.getUniformLocation(program, "uBlocksize"),
          uStepW: gl.getUniformLocation(program, "uStepW"),
          uStepH: gl.getUniformLocation(program, "uStepH")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        gl.uniform1f(uniformLocations.uBlocksize, this.blocksize);
      }
    });
    fabric3.Image.filters.Pixelate.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), extend = fabric3.util.object.extend, filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.RemoveColor = createClass(filters.BaseFilter, {
      type: "RemoveColor",
      color: "#FFFFFF",
      fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uLow;\nuniform vec4 uHigh;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\nif(all(greaterThan(gl_FragColor.rgb,uLow.rgb)) && all(greaterThan(uHigh.rgb,gl_FragColor.rgb))) {\ngl_FragColor.a = 0.0;\n}\n}",
      distance: 0.02,
      useAlpha: false,
      applyTo2d: function(options) {
        var imageData = options.imageData, data = imageData.data, i, distance = this.distance * 255, r, g, b, source = new fabric3.Color(this.color).getSource(), lowC = [
          source[0] - distance,
          source[1] - distance,
          source[2] - distance
        ], highC = [
          source[0] + distance,
          source[1] + distance,
          source[2] + distance
        ];
        for (i = 0; i < data.length; i += 4) {
          r = data[i];
          g = data[i + 1];
          b = data[i + 2];
          if (r > lowC[0] && g > lowC[1] && b > lowC[2] && r < highC[0] && g < highC[1] && b < highC[2]) {
            data[i + 3] = 0;
          }
        }
      },
      getUniformLocations: function(gl, program) {
        return {
          uLow: gl.getUniformLocation(program, "uLow"),
          uHigh: gl.getUniformLocation(program, "uHigh")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        var source = new fabric3.Color(this.color).getSource(), distance = parseFloat(this.distance), lowC = [
          0 + source[0] / 255 - distance,
          0 + source[1] / 255 - distance,
          0 + source[2] / 255 - distance,
          1
        ], highC = [
          source[0] / 255 + distance,
          source[1] / 255 + distance,
          source[2] / 255 + distance,
          1
        ];
        gl.uniform4fv(uniformLocations.uLow, lowC);
        gl.uniform4fv(uniformLocations.uHigh, highC);
      },
      toObject: function() {
        return extend(this.callSuper("toObject"), {
          color: this.color,
          distance: this.distance
        });
      }
    });
    fabric3.Image.filters.RemoveColor.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    var matrices = {
      Brownie: [
        0.5997,
        0.34553,
        -0.27082,
        0,
        0.186,
        -0.0377,
        0.86095,
        0.15059,
        0,
        -0.1449,
        0.24113,
        -0.07441,
        0.44972,
        0,
        -0.02965,
        0,
        0,
        0,
        1,
        0
      ],
      Vintage: [
        0.62793,
        0.32021,
        -0.03965,
        0,
        0.03784,
        0.02578,
        0.64411,
        0.03259,
        0,
        0.02926,
        0.0466,
        -0.08512,
        0.52416,
        0,
        0.02023,
        0,
        0,
        0,
        1,
        0
      ],
      Kodachrome: [
        1.12855,
        -0.39673,
        -0.03992,
        0,
        0.24991,
        -0.16404,
        1.08352,
        -0.05498,
        0,
        0.09698,
        -0.16786,
        -0.56034,
        1.60148,
        0,
        0.13972,
        0,
        0,
        0,
        1,
        0
      ],
      Technicolor: [
        1.91252,
        -0.85453,
        -0.09155,
        0,
        0.04624,
        -0.30878,
        1.76589,
        -0.10601,
        0,
        -0.27589,
        -0.2311,
        -0.75018,
        1.84759,
        0,
        0.12137,
        0,
        0,
        0,
        1,
        0
      ],
      Polaroid: [
        1.438,
        -0.062,
        -0.062,
        0,
        0,
        -0.122,
        1.378,
        -0.122,
        0,
        0,
        -0.016,
        -0.016,
        1.483,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ],
      Sepia: [
        0.393,
        0.769,
        0.189,
        0,
        0,
        0.349,
        0.686,
        0.168,
        0,
        0,
        0.272,
        0.534,
        0.131,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ],
      BlackWhite: [
        1.5,
        1.5,
        1.5,
        0,
        -1,
        1.5,
        1.5,
        1.5,
        0,
        -1,
        1.5,
        1.5,
        1.5,
        0,
        -1,
        0,
        0,
        0,
        1,
        0
      ]
    };
    for (var key in matrices) {
      filters[key] = createClass(filters.ColorMatrix, {
        type: key,
        matrix: matrices[key],
        mainParameter: false,
        colorsOnly: true
      });
      fabric3.Image.filters[key].fromObject = fabric3.Image.filters.BaseFilter.fromObject;
    }
  })(exports);
  (function(global) {
    var fabric3 = global.fabric, filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.BlendColor = createClass(filters.BaseFilter, {
      type: "BlendColor",
      color: "#F95C63",
      mode: "multiply",
      alpha: 1,
      fragmentSource: {
        multiply: "gl_FragColor.rgb *= uColor.rgb;\n",
        screen: "gl_FragColor.rgb = 1.0 - (1.0 - gl_FragColor.rgb) * (1.0 - uColor.rgb);\n",
        add: "gl_FragColor.rgb += uColor.rgb;\n",
        diff: "gl_FragColor.rgb = abs(gl_FragColor.rgb - uColor.rgb);\n",
        subtract: "gl_FragColor.rgb -= uColor.rgb;\n",
        lighten: "gl_FragColor.rgb = max(gl_FragColor.rgb, uColor.rgb);\n",
        darken: "gl_FragColor.rgb = min(gl_FragColor.rgb, uColor.rgb);\n",
        exclusion: "gl_FragColor.rgb += uColor.rgb - 2.0 * (uColor.rgb * gl_FragColor.rgb);\n",
        overlay: "if (uColor.r < 0.5) {\ngl_FragColor.r *= 2.0 * uColor.r;\n} else {\ngl_FragColor.r = 1.0 - 2.0 * (1.0 - gl_FragColor.r) * (1.0 - uColor.r);\n}\nif (uColor.g < 0.5) {\ngl_FragColor.g *= 2.0 * uColor.g;\n} else {\ngl_FragColor.g = 1.0 - 2.0 * (1.0 - gl_FragColor.g) * (1.0 - uColor.g);\n}\nif (uColor.b < 0.5) {\ngl_FragColor.b *= 2.0 * uColor.b;\n} else {\ngl_FragColor.b = 1.0 - 2.0 * (1.0 - gl_FragColor.b) * (1.0 - uColor.b);\n}\n",
        tint: "gl_FragColor.rgb *= (1.0 - uColor.a);\ngl_FragColor.rgb += uColor.rgb;\n"
      },
      buildSource: function(mode2) {
        return "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ngl_FragColor = color;\nif (color.a > 0.0) {\n" + this.fragmentSource[mode2] + "}\n}";
      },
      retrieveShader: function(options) {
        var cacheKey = this.type + "_" + this.mode, shaderSource;
        if (!options.programCache.hasOwnProperty(cacheKey)) {
          shaderSource = this.buildSource(this.mode);
          options.programCache[cacheKey] = this.createProgram(options.context, shaderSource);
        }
        return options.programCache[cacheKey];
      },
      applyTo2d: function(options) {
        var imageData = options.imageData, data = imageData.data, iLen = data.length, tr, tg, tb, r, g, b, source, alpha1 = 1 - this.alpha;
        source = new fabric3.Color(this.color).getSource();
        tr = source[0] * this.alpha;
        tg = source[1] * this.alpha;
        tb = source[2] * this.alpha;
        for (var i = 0; i < iLen; i += 4) {
          r = data[i];
          g = data[i + 1];
          b = data[i + 2];
          switch (this.mode) {
            case "multiply":
              data[i] = r * tr / 255;
              data[i + 1] = g * tg / 255;
              data[i + 2] = b * tb / 255;
              break;
            case "screen":
              data[i] = 255 - (255 - r) * (255 - tr) / 255;
              data[i + 1] = 255 - (255 - g) * (255 - tg) / 255;
              data[i + 2] = 255 - (255 - b) * (255 - tb) / 255;
              break;
            case "add":
              data[i] = r + tr;
              data[i + 1] = g + tg;
              data[i + 2] = b + tb;
              break;
            case "diff":
            case "difference":
              data[i] = Math.abs(r - tr);
              data[i + 1] = Math.abs(g - tg);
              data[i + 2] = Math.abs(b - tb);
              break;
            case "subtract":
              data[i] = r - tr;
              data[i + 1] = g - tg;
              data[i + 2] = b - tb;
              break;
            case "darken":
              data[i] = Math.min(r, tr);
              data[i + 1] = Math.min(g, tg);
              data[i + 2] = Math.min(b, tb);
              break;
            case "lighten":
              data[i] = Math.max(r, tr);
              data[i + 1] = Math.max(g, tg);
              data[i + 2] = Math.max(b, tb);
              break;
            case "overlay":
              data[i] = tr < 128 ? 2 * r * tr / 255 : 255 - 2 * (255 - r) * (255 - tr) / 255;
              data[i + 1] = tg < 128 ? 2 * g * tg / 255 : 255 - 2 * (255 - g) * (255 - tg) / 255;
              data[i + 2] = tb < 128 ? 2 * b * tb / 255 : 255 - 2 * (255 - b) * (255 - tb) / 255;
              break;
            case "exclusion":
              data[i] = tr + r - 2 * tr * r / 255;
              data[i + 1] = tg + g - 2 * tg * g / 255;
              data[i + 2] = tb + b - 2 * tb * b / 255;
              break;
            case "tint":
              data[i] = tr + r * alpha1;
              data[i + 1] = tg + g * alpha1;
              data[i + 2] = tb + b * alpha1;
          }
        }
      },
      getUniformLocations: function(gl, program) {
        return {
          uColor: gl.getUniformLocation(program, "uColor")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        var source = new fabric3.Color(this.color).getSource();
        source[0] = this.alpha * source[0] / 255;
        source[1] = this.alpha * source[1] / 255;
        source[2] = this.alpha * source[2] / 255;
        source[3] = this.alpha;
        gl.uniform4fv(uniformLocations.uColor, source);
      },
      toObject: function() {
        return {
          type: this.type,
          color: this.color,
          mode: this.mode,
          alpha: this.alpha
        };
      }
    });
    fabric3.Image.filters.BlendColor.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric, filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.BlendImage = createClass(filters.BaseFilter, {
      type: "BlendImage",
      image: null,
      mode: "multiply",
      alpha: 1,
      vertexSource: "attribute vec2 aPosition;\nvarying vec2 vTexCoord;\nvarying vec2 vTexCoord2;\nuniform mat3 uTransformMatrix;\nvoid main() {\nvTexCoord = aPosition;\nvTexCoord2 = (uTransformMatrix * vec3(aPosition, 1.0)).xy;\ngl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);\n}",
      fragmentSource: {
        multiply: "precision highp float;\nuniform sampler2D uTexture;\nuniform sampler2D uImage;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvarying vec2 vTexCoord2;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nvec4 color2 = texture2D(uImage, vTexCoord2);\ncolor.rgba *= color2.rgba;\ngl_FragColor = color;\n}",
        mask: "precision highp float;\nuniform sampler2D uTexture;\nuniform sampler2D uImage;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvarying vec2 vTexCoord2;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nvec4 color2 = texture2D(uImage, vTexCoord2);\ncolor.a = color2.a;\ngl_FragColor = color;\n}"
      },
      retrieveShader: function(options) {
        var cacheKey = this.type + "_" + this.mode;
        var shaderSource = this.fragmentSource[this.mode];
        if (!options.programCache.hasOwnProperty(cacheKey)) {
          options.programCache[cacheKey] = this.createProgram(options.context, shaderSource);
        }
        return options.programCache[cacheKey];
      },
      applyToWebGL: function(options) {
        var gl = options.context, texture = this.createTexture(options.filterBackend, this.image);
        this.bindAdditionalTexture(gl, texture, gl.TEXTURE1);
        this.callSuper("applyToWebGL", options);
        this.unbindAdditionalTexture(gl, gl.TEXTURE1);
      },
      createTexture: function(backend, image) {
        return backend.getCachedTexture(image.cacheKey, image._element);
      },
      calculateMatrix: function() {
        var image = this.image, width = image._element.width, height = image._element.height;
        return [
          1 / image.scaleX,
          0,
          0,
          0,
          1 / image.scaleY,
          0,
          -image.left / width,
          -image.top / height,
          1
        ];
      },
      applyTo2d: function(options) {
        var imageData = options.imageData, resources = options.filterBackend.resources, data = imageData.data, iLen = data.length, width = imageData.width, height = imageData.height, tr, tg, tb, ta, r, g, b, a, canvas1, context, image = this.image, blendData;
        if (!resources.blendImage) {
          resources.blendImage = fabric3.util.createCanvasElement();
        }
        canvas1 = resources.blendImage;
        context = canvas1.getContext("2d");
        if (canvas1.width !== width || canvas1.height !== height) {
          canvas1.width = width;
          canvas1.height = height;
        } else {
          context.clearRect(0, 0, width, height);
        }
        context.setTransform(image.scaleX, 0, 0, image.scaleY, image.left, image.top);
        context.drawImage(image._element, 0, 0, width, height);
        blendData = context.getImageData(0, 0, width, height).data;
        for (var i = 0; i < iLen; i += 4) {
          r = data[i];
          g = data[i + 1];
          b = data[i + 2];
          a = data[i + 3];
          tr = blendData[i];
          tg = blendData[i + 1];
          tb = blendData[i + 2];
          ta = blendData[i + 3];
          switch (this.mode) {
            case "multiply":
              data[i] = r * tr / 255;
              data[i + 1] = g * tg / 255;
              data[i + 2] = b * tb / 255;
              data[i + 3] = a * ta / 255;
              break;
            case "mask":
              data[i + 3] = ta;
              break;
          }
        }
      },
      getUniformLocations: function(gl, program) {
        return {
          uTransformMatrix: gl.getUniformLocation(program, "uTransformMatrix"),
          uImage: gl.getUniformLocation(program, "uImage")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        var matrix = this.calculateMatrix();
        gl.uniform1i(uniformLocations.uImage, 1);
        gl.uniformMatrix3fv(uniformLocations.uTransformMatrix, false, matrix);
      },
      toObject: function() {
        return {
          type: this.type,
          image: this.image && this.image.toObject(),
          mode: this.mode,
          alpha: this.alpha
        };
      }
    });
    fabric3.Image.filters.BlendImage.fromObject = function(object, callback) {
      fabric3.Image.fromObject(object.image, function(image) {
        var options = fabric3.util.object.clone(object);
        options.image = image;
        callback(new fabric3.Image.filters.BlendImage(options));
      });
    };
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), pow = Math.pow, floor = Math.floor, sqrt = Math.sqrt, abs = Math.abs, round = Math.round, sin = Math.sin, ceil = Math.ceil, filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.Resize = createClass(filters.BaseFilter, {
      type: "Resize",
      resizeType: "hermite",
      scaleX: 1,
      scaleY: 1,
      lanczosLobes: 3,
      getUniformLocations: function(gl, program) {
        return {
          uDelta: gl.getUniformLocation(program, "uDelta"),
          uTaps: gl.getUniformLocation(program, "uTaps")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        gl.uniform2fv(uniformLocations.uDelta, this.horizontal ? [1 / this.width, 0] : [0, 1 / this.height]);
        gl.uniform1fv(uniformLocations.uTaps, this.taps);
      },
      retrieveShader: function(options) {
        var filterWindow = this.getFilterWindow(), cacheKey = this.type + "_" + filterWindow;
        if (!options.programCache.hasOwnProperty(cacheKey)) {
          var fragmentShader = this.generateShader(filterWindow);
          options.programCache[cacheKey] = this.createProgram(options.context, fragmentShader);
        }
        return options.programCache[cacheKey];
      },
      getFilterWindow: function() {
        var scale = this.tempScale;
        return Math.ceil(this.lanczosLobes / scale);
      },
      getTaps: function() {
        var lobeFunction = this.lanczosCreate(this.lanczosLobes), scale = this.tempScale, filterWindow = this.getFilterWindow(), taps = new Array(filterWindow);
        for (var i = 1; i <= filterWindow; i++) {
          taps[i - 1] = lobeFunction(i * scale);
        }
        return taps;
      },
      generateShader: function(filterWindow) {
        var offsets = new Array(filterWindow), fragmentShader = this.fragmentSourceTOP, filterWindow;
        for (var i = 1; i <= filterWindow; i++) {
          offsets[i - 1] = i + ".0 * uDelta";
        }
        fragmentShader += "uniform float uTaps[" + filterWindow + "];\n";
        fragmentShader += "void main() {\n";
        fragmentShader += "  vec4 color = texture2D(uTexture, vTexCoord);\n";
        fragmentShader += "  float sum = 1.0;\n";
        offsets.forEach(function(offset, i2) {
          fragmentShader += "  color += texture2D(uTexture, vTexCoord + " + offset + ") * uTaps[" + i2 + "];\n";
          fragmentShader += "  color += texture2D(uTexture, vTexCoord - " + offset + ") * uTaps[" + i2 + "];\n";
          fragmentShader += "  sum += 2.0 * uTaps[" + i2 + "];\n";
        });
        fragmentShader += "  gl_FragColor = color / sum;\n";
        fragmentShader += "}";
        return fragmentShader;
      },
      fragmentSourceTOP: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec2 uDelta;\nvarying vec2 vTexCoord;\n",
      applyTo: function(options) {
        if (options.webgl) {
          options.passes++;
          this.width = options.sourceWidth;
          this.horizontal = true;
          this.dW = Math.round(this.width * this.scaleX);
          this.dH = options.sourceHeight;
          this.tempScale = this.dW / this.width;
          this.taps = this.getTaps();
          options.destinationWidth = this.dW;
          this._setupFrameBuffer(options);
          this.applyToWebGL(options);
          this._swapTextures(options);
          options.sourceWidth = options.destinationWidth;
          this.height = options.sourceHeight;
          this.horizontal = false;
          this.dH = Math.round(this.height * this.scaleY);
          this.tempScale = this.dH / this.height;
          this.taps = this.getTaps();
          options.destinationHeight = this.dH;
          this._setupFrameBuffer(options);
          this.applyToWebGL(options);
          this._swapTextures(options);
          options.sourceHeight = options.destinationHeight;
        } else {
          this.applyTo2d(options);
        }
      },
      isNeutralState: function() {
        return this.scaleX === 1 && this.scaleY === 1;
      },
      lanczosCreate: function(lobes) {
        return function(x) {
          if (x >= lobes || x <= -lobes) {
            return 0;
          }
          if (x < 11920929e-14 && x > -11920929e-14) {
            return 1;
          }
          x *= Math.PI;
          var xx = x / lobes;
          return sin(x) / x * sin(xx) / xx;
        };
      },
      applyTo2d: function(options) {
        var imageData = options.imageData, scaleX = this.scaleX, scaleY = this.scaleY;
        this.rcpScaleX = 1 / scaleX;
        this.rcpScaleY = 1 / scaleY;
        var oW = imageData.width, oH = imageData.height, dW = round(oW * scaleX), dH = round(oH * scaleY), newData;
        if (this.resizeType === "sliceHack") {
          newData = this.sliceByTwo(options, oW, oH, dW, dH);
        } else if (this.resizeType === "hermite") {
          newData = this.hermiteFastResize(options, oW, oH, dW, dH);
        } else if (this.resizeType === "bilinear") {
          newData = this.bilinearFiltering(options, oW, oH, dW, dH);
        } else if (this.resizeType === "lanczos") {
          newData = this.lanczosResize(options, oW, oH, dW, dH);
        }
        options.imageData = newData;
      },
      sliceByTwo: function(options, oW, oH, dW, dH) {
        var imageData = options.imageData, mult = 0.5, doneW = false, doneH = false, stepW = oW * mult, stepH = oH * mult, resources = fabric3.filterBackend.resources, tmpCanvas, ctx, sX = 0, sY = 0, dX = oW, dY = 0;
        if (!resources.sliceByTwo) {
          resources.sliceByTwo = document.createElement("canvas");
        }
        tmpCanvas = resources.sliceByTwo;
        if (tmpCanvas.width < oW * 1.5 || tmpCanvas.height < oH) {
          tmpCanvas.width = oW * 1.5;
          tmpCanvas.height = oH;
        }
        ctx = tmpCanvas.getContext("2d");
        ctx.clearRect(0, 0, oW * 1.5, oH);
        ctx.putImageData(imageData, 0, 0);
        dW = floor(dW);
        dH = floor(dH);
        while (!doneW || !doneH) {
          oW = stepW;
          oH = stepH;
          if (dW < floor(stepW * mult)) {
            stepW = floor(stepW * mult);
          } else {
            stepW = dW;
            doneW = true;
          }
          if (dH < floor(stepH * mult)) {
            stepH = floor(stepH * mult);
          } else {
            stepH = dH;
            doneH = true;
          }
          ctx.drawImage(tmpCanvas, sX, sY, oW, oH, dX, dY, stepW, stepH);
          sX = dX;
          sY = dY;
          dY += stepH;
        }
        return ctx.getImageData(sX, sY, dW, dH);
      },
      lanczosResize: function(options, oW, oH, dW, dH) {
        function process(u) {
          var v, i, weight, idx, a, red, green, blue, alpha, fX, fY;
          center.x = (u + 0.5) * ratioX;
          icenter.x = floor(center.x);
          for (v = 0; v < dH; v++) {
            center.y = (v + 0.5) * ratioY;
            icenter.y = floor(center.y);
            a = 0;
            red = 0;
            green = 0;
            blue = 0;
            alpha = 0;
            for (i = icenter.x - range2X; i <= icenter.x + range2X; i++) {
              if (i < 0 || i >= oW) {
                continue;
              }
              fX = floor(1e3 * abs(i - center.x));
              if (!cacheLanc[fX]) {
                cacheLanc[fX] = {};
              }
              for (var j = icenter.y - range2Y; j <= icenter.y + range2Y; j++) {
                if (j < 0 || j >= oH) {
                  continue;
                }
                fY = floor(1e3 * abs(j - center.y));
                if (!cacheLanc[fX][fY]) {
                  cacheLanc[fX][fY] = lanczos(sqrt(pow(fX * rcpRatioX, 2) + pow(fY * rcpRatioY, 2)) / 1e3);
                }
                weight = cacheLanc[fX][fY];
                if (weight > 0) {
                  idx = (j * oW + i) * 4;
                  a += weight;
                  red += weight * srcData[idx];
                  green += weight * srcData[idx + 1];
                  blue += weight * srcData[idx + 2];
                  alpha += weight * srcData[idx + 3];
                }
              }
            }
            idx = (v * dW + u) * 4;
            destData[idx] = red / a;
            destData[idx + 1] = green / a;
            destData[idx + 2] = blue / a;
            destData[idx + 3] = alpha / a;
          }
          if (++u < dW) {
            return process(u);
          } else {
            return destImg;
          }
        }
        var srcData = options.imageData.data, destImg = options.ctx.createImageData(dW, dH), destData = destImg.data, lanczos = this.lanczosCreate(this.lanczosLobes), ratioX = this.rcpScaleX, ratioY = this.rcpScaleY, rcpRatioX = 2 / this.rcpScaleX, rcpRatioY = 2 / this.rcpScaleY, range2X = ceil(ratioX * this.lanczosLobes / 2), range2Y = ceil(ratioY * this.lanczosLobes / 2), cacheLanc = {}, center = {}, icenter = {};
        return process(0);
      },
      bilinearFiltering: function(options, oW, oH, dW, dH) {
        var a, b, c, d, x, y, i, j, xDiff, yDiff, chnl, color, offset = 0, origPix, ratioX = this.rcpScaleX, ratioY = this.rcpScaleY, w4 = 4 * (oW - 1), img = options.imageData, pixels = img.data, destImage = options.ctx.createImageData(dW, dH), destPixels = destImage.data;
        for (i = 0; i < dH; i++) {
          for (j = 0; j < dW; j++) {
            x = floor(ratioX * j);
            y = floor(ratioY * i);
            xDiff = ratioX * j - x;
            yDiff = ratioY * i - y;
            origPix = 4 * (y * oW + x);
            for (chnl = 0; chnl < 4; chnl++) {
              a = pixels[origPix + chnl];
              b = pixels[origPix + 4 + chnl];
              c = pixels[origPix + w4 + chnl];
              d = pixels[origPix + w4 + 4 + chnl];
              color = a * (1 - xDiff) * (1 - yDiff) + b * xDiff * (1 - yDiff) + c * yDiff * (1 - xDiff) + d * xDiff * yDiff;
              destPixels[offset++] = color;
            }
          }
        }
        return destImage;
      },
      hermiteFastResize: function(options, oW, oH, dW, dH) {
        var ratioW = this.rcpScaleX, ratioH = this.rcpScaleY, ratioWHalf = ceil(ratioW / 2), ratioHHalf = ceil(ratioH / 2), img = options.imageData, data = img.data, img2 = options.ctx.createImageData(dW, dH), data2 = img2.data;
        for (var j = 0; j < dH; j++) {
          for (var i = 0; i < dW; i++) {
            var x2 = (i + j * dW) * 4, weight = 0, weights = 0, weightsAlpha = 0, gxR = 0, gxG = 0, gxB = 0, gxA = 0, centerY = (j + 0.5) * ratioH;
            for (var yy = floor(j * ratioH); yy < (j + 1) * ratioH; yy++) {
              var dy = abs(centerY - (yy + 0.5)) / ratioHHalf, centerX = (i + 0.5) * ratioW, w0 = dy * dy;
              for (var xx = floor(i * ratioW); xx < (i + 1) * ratioW; xx++) {
                var dx = abs(centerX - (xx + 0.5)) / ratioWHalf, w = sqrt(w0 + dx * dx);
                if (w > 1 && w < -1) {
                  continue;
                }
                weight = 2 * w * w * w - 3 * w * w + 1;
                if (weight > 0) {
                  dx = 4 * (xx + yy * oW);
                  gxA += weight * data[dx + 3];
                  weightsAlpha += weight;
                  if (data[dx + 3] < 255) {
                    weight = weight * data[dx + 3] / 250;
                  }
                  gxR += weight * data[dx];
                  gxG += weight * data[dx + 1];
                  gxB += weight * data[dx + 2];
                  weights += weight;
                }
              }
            }
            data2[x2] = gxR / weights;
            data2[x2 + 1] = gxG / weights;
            data2[x2 + 2] = gxB / weights;
            data2[x2 + 3] = gxA / weightsAlpha;
          }
        }
        return img2;
      },
      toObject: function() {
        return {
          type: this.type,
          scaleX: this.scaleX,
          scaleY: this.scaleY,
          resizeType: this.resizeType,
          lanczosLobes: this.lanczosLobes
        };
      }
    });
    fabric3.Image.filters.Resize.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.Contrast = createClass(filters.BaseFilter, {
      type: "Contrast",
      fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uContrast;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat contrastF = 1.015 * (uContrast + 1.0) / (1.0 * (1.015 - uContrast));\ncolor.rgb = contrastF * (color.rgb - 0.5) + 0.5;\ngl_FragColor = color;\n}",
      contrast: 0,
      mainParameter: "contrast",
      applyTo2d: function(options) {
        if (this.contrast === 0) {
          return;
        }
        var imageData = options.imageData, i, len, data = imageData.data, len = data.length, contrast = Math.floor(this.contrast * 255), contrastF = 259 * (contrast + 255) / (255 * (259 - contrast));
        for (i = 0; i < len; i += 4) {
          data[i] = contrastF * (data[i] - 128) + 128;
          data[i + 1] = contrastF * (data[i + 1] - 128) + 128;
          data[i + 2] = contrastF * (data[i + 2] - 128) + 128;
        }
      },
      getUniformLocations: function(gl, program) {
        return {
          uContrast: gl.getUniformLocation(program, "uContrast")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        gl.uniform1f(uniformLocations.uContrast, this.contrast);
      }
    });
    fabric3.Image.filters.Contrast.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.Saturation = createClass(filters.BaseFilter, {
      type: "Saturation",
      fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uSaturation;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat rgMax = max(color.r, color.g);\nfloat rgbMax = max(rgMax, color.b);\ncolor.r += rgbMax != color.r ? (rgbMax - color.r) * uSaturation : 0.00;\ncolor.g += rgbMax != color.g ? (rgbMax - color.g) * uSaturation : 0.00;\ncolor.b += rgbMax != color.b ? (rgbMax - color.b) * uSaturation : 0.00;\ngl_FragColor = color;\n}",
      saturation: 0,
      mainParameter: "saturation",
      applyTo2d: function(options) {
        if (this.saturation === 0) {
          return;
        }
        var imageData = options.imageData, data = imageData.data, len = data.length, adjust = -this.saturation, i, max;
        for (i = 0; i < len; i += 4) {
          max = Math.max(data[i], data[i + 1], data[i + 2]);
          data[i] += max !== data[i] ? (max - data[i]) * adjust : 0;
          data[i + 1] += max !== data[i + 1] ? (max - data[i + 1]) * adjust : 0;
          data[i + 2] += max !== data[i + 2] ? (max - data[i + 2]) * adjust : 0;
        }
      },
      getUniformLocations: function(gl, program) {
        return {
          uSaturation: gl.getUniformLocation(program, "uSaturation")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        gl.uniform1f(uniformLocations.uSaturation, -this.saturation);
      }
    });
    fabric3.Image.filters.Saturation.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.Vibrance = createClass(filters.BaseFilter, {
      type: "Vibrance",
      fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uVibrance;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat max = max(color.r, max(color.g, color.b));\nfloat avg = (color.r + color.g + color.b) / 3.0;\nfloat amt = (abs(max - avg) * 2.0) * uVibrance;\ncolor.r += max != color.r ? (max - color.r) * amt : 0.00;\ncolor.g += max != color.g ? (max - color.g) * amt : 0.00;\ncolor.b += max != color.b ? (max - color.b) * amt : 0.00;\ngl_FragColor = color;\n}",
      vibrance: 0,
      mainParameter: "vibrance",
      applyTo2d: function(options) {
        if (this.vibrance === 0) {
          return;
        }
        var imageData = options.imageData, data = imageData.data, len = data.length, adjust = -this.vibrance, i, max, avg, amt;
        for (i = 0; i < len; i += 4) {
          max = Math.max(data[i], data[i + 1], data[i + 2]);
          avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          amt = Math.abs(max - avg) * 2 / 255 * adjust;
          data[i] += max !== data[i] ? (max - data[i]) * amt : 0;
          data[i + 1] += max !== data[i + 1] ? (max - data[i + 1]) * amt : 0;
          data[i + 2] += max !== data[i + 2] ? (max - data[i + 2]) * amt : 0;
        }
      },
      getUniformLocations: function(gl, program) {
        return {
          uVibrance: gl.getUniformLocation(program, "uVibrance")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        gl.uniform1f(uniformLocations.uVibrance, -this.vibrance);
      }
    });
    fabric3.Image.filters.Vibrance.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.Blur = createClass(filters.BaseFilter, {
      type: "Blur",
      fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec2 uDelta;\nvarying vec2 vTexCoord;\nconst float nSamples = 15.0;\nvec3 v3offset = vec3(12.9898, 78.233, 151.7182);\nfloat random(vec3 scale) {\nreturn fract(sin(dot(gl_FragCoord.xyz, scale)) * 43758.5453);\n}\nvoid main() {\nvec4 color = vec4(0.0);\nfloat total = 0.0;\nfloat offset = random(v3offset);\nfor (float t = -nSamples; t <= nSamples; t++) {\nfloat percent = (t + offset - 0.5) / nSamples;\nfloat weight = 1.0 - abs(percent);\ncolor += texture2D(uTexture, vTexCoord + uDelta * percent) * weight;\ntotal += weight;\n}\ngl_FragColor = color / total;\n}",
      blur: 0,
      mainParameter: "blur",
      applyTo: function(options) {
        if (options.webgl) {
          this.aspectRatio = options.sourceWidth / options.sourceHeight;
          options.passes++;
          this._setupFrameBuffer(options);
          this.horizontal = true;
          this.applyToWebGL(options);
          this._swapTextures(options);
          this._setupFrameBuffer(options);
          this.horizontal = false;
          this.applyToWebGL(options);
          this._swapTextures(options);
        } else {
          this.applyTo2d(options);
        }
      },
      applyTo2d: function(options) {
        options.imageData = this.simpleBlur(options);
      },
      simpleBlur: function(options) {
        var resources = options.filterBackend.resources, canvas1, canvas2, width = options.imageData.width, height = options.imageData.height;
        if (!resources.blurLayer1) {
          resources.blurLayer1 = fabric3.util.createCanvasElement();
          resources.blurLayer2 = fabric3.util.createCanvasElement();
        }
        canvas1 = resources.blurLayer1;
        canvas2 = resources.blurLayer2;
        if (canvas1.width !== width || canvas1.height !== height) {
          canvas2.width = canvas1.width = width;
          canvas2.height = canvas1.height = height;
        }
        var ctx1 = canvas1.getContext("2d"), ctx2 = canvas2.getContext("2d"), nSamples = 15, random, percent, j, i, blur = this.blur * 0.06 * 0.5;
        ctx1.putImageData(options.imageData, 0, 0);
        ctx2.clearRect(0, 0, width, height);
        for (i = -nSamples; i <= nSamples; i++) {
          random = (Math.random() - 0.5) / 4;
          percent = i / nSamples;
          j = blur * percent * width + random;
          ctx2.globalAlpha = 1 - Math.abs(percent);
          ctx2.drawImage(canvas1, j, random);
          ctx1.drawImage(canvas2, 0, 0);
          ctx2.globalAlpha = 1;
          ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        }
        for (i = -nSamples; i <= nSamples; i++) {
          random = (Math.random() - 0.5) / 4;
          percent = i / nSamples;
          j = blur * percent * height + random;
          ctx2.globalAlpha = 1 - Math.abs(percent);
          ctx2.drawImage(canvas1, random, j);
          ctx1.drawImage(canvas2, 0, 0);
          ctx2.globalAlpha = 1;
          ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        }
        options.ctx.drawImage(canvas1, 0, 0);
        var newImageData = options.ctx.getImageData(0, 0, canvas1.width, canvas1.height);
        ctx1.globalAlpha = 1;
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        return newImageData;
      },
      getUniformLocations: function(gl, program) {
        return {
          delta: gl.getUniformLocation(program, "uDelta")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        var delta = this.chooseRightDelta();
        gl.uniform2fv(uniformLocations.delta, delta);
      },
      chooseRightDelta: function() {
        var blurScale = 1, delta = [0, 0], blur;
        if (this.horizontal) {
          if (this.aspectRatio > 1) {
            blurScale = 1 / this.aspectRatio;
          }
        } else {
          if (this.aspectRatio < 1) {
            blurScale = this.aspectRatio;
          }
        }
        blur = blurScale * this.blur * 0.12;
        if (this.horizontal) {
          delta[0] = blur;
        } else {
          delta[1] = blur;
        }
        return delta;
      }
    });
    filters.Blur.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.Gamma = createClass(filters.BaseFilter, {
      type: "Gamma",
      fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec3 uGamma;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nvec3 correction = (1.0 / uGamma);\ncolor.r = pow(color.r, correction.r);\ncolor.g = pow(color.g, correction.g);\ncolor.b = pow(color.b, correction.b);\ngl_FragColor = color;\ngl_FragColor.rgb *= color.a;\n}",
      gamma: [1, 1, 1],
      mainParameter: "gamma",
      initialize: function(options) {
        this.gamma = [1, 1, 1];
        filters.BaseFilter.prototype.initialize.call(this, options);
      },
      applyTo2d: function(options) {
        var imageData = options.imageData, data = imageData.data, gamma = this.gamma, len = data.length, rInv = 1 / gamma[0], gInv = 1 / gamma[1], bInv = 1 / gamma[2], i;
        if (!this.rVals) {
          this.rVals = new Uint8Array(256);
          this.gVals = new Uint8Array(256);
          this.bVals = new Uint8Array(256);
        }
        for (i = 0, len = 256; i < len; i++) {
          this.rVals[i] = Math.pow(i / 255, rInv) * 255;
          this.gVals[i] = Math.pow(i / 255, gInv) * 255;
          this.bVals[i] = Math.pow(i / 255, bInv) * 255;
        }
        for (i = 0, len = data.length; i < len; i += 4) {
          data[i] = this.rVals[data[i]];
          data[i + 1] = this.gVals[data[i + 1]];
          data[i + 2] = this.bVals[data[i + 2]];
        }
      },
      getUniformLocations: function(gl, program) {
        return {
          uGamma: gl.getUniformLocation(program, "uGamma")
        };
      },
      sendUniformData: function(gl, uniformLocations) {
        gl.uniform3fv(uniformLocations.uGamma, this.gamma);
      }
    });
    fabric3.Image.filters.Gamma.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.Composed = createClass(filters.BaseFilter, {
      type: "Composed",
      subFilters: [],
      initialize: function(options) {
        this.callSuper("initialize", options);
        this.subFilters = this.subFilters.slice(0);
      },
      applyTo: function(options) {
        options.passes += this.subFilters.length - 1;
        this.subFilters.forEach(function(filter) {
          filter.applyTo(options);
        });
      },
      toObject: function() {
        return fabric3.util.object.extend(this.callSuper("toObject"), {
          subFilters: this.subFilters.map(function(filter) {
            return filter.toObject();
          })
        });
      },
      isNeutralState: function() {
        return !this.subFilters.some(function(filter) {
          return !filter.isNeutralState();
        });
      }
    });
    fabric3.Image.filters.Composed.fromObject = function(object, callback) {
      var filters2 = object.subFilters || [], subFilters = filters2.map(function(filter) {
        return new fabric3.Image.filters[filter.type](filter);
      }), instance = new fabric3.Image.filters.Composed({ subFilters });
      callback && callback(instance);
      return instance;
    };
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), filters = fabric3.Image.filters, createClass = fabric3.util.createClass;
    filters.HueRotation = createClass(filters.ColorMatrix, {
      type: "HueRotation",
      rotation: 0,
      mainParameter: "rotation",
      calculateMatrix: function() {
        var rad = this.rotation * Math.PI, cos = fabric3.util.cos(rad), sin = fabric3.util.sin(rad), aThird = 1 / 3, aThirdSqtSin = Math.sqrt(aThird) * sin, OneMinusCos = 1 - cos;
        this.matrix = [
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0
        ];
        this.matrix[0] = cos + OneMinusCos / 3;
        this.matrix[1] = aThird * OneMinusCos - aThirdSqtSin;
        this.matrix[2] = aThird * OneMinusCos + aThirdSqtSin;
        this.matrix[5] = aThird * OneMinusCos + aThirdSqtSin;
        this.matrix[6] = cos + aThird * OneMinusCos;
        this.matrix[7] = aThird * OneMinusCos - aThirdSqtSin;
        this.matrix[10] = aThird * OneMinusCos - aThirdSqtSin;
        this.matrix[11] = aThird * OneMinusCos + aThirdSqtSin;
        this.matrix[12] = cos + aThird * OneMinusCos;
      },
      isNeutralState: function(options) {
        this.calculateMatrix();
        return filters.BaseFilter.prototype.isNeutralState.call(this, options);
      },
      applyTo: function(options) {
        this.calculateMatrix();
        filters.BaseFilter.prototype.applyTo.call(this, options);
      }
    });
    fabric3.Image.filters.HueRotation.fromObject = fabric3.Image.filters.BaseFilter.fromObject;
  })(exports);
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {}), clone = fabric3.util.object.clone;
    if (fabric3.Text) {
      fabric3.warn("fabric.Text is already defined");
      return;
    }
    var additionalProps = "fontFamily fontWeight fontSize text underline overline linethrough textAlign fontStyle lineHeight textBackgroundColor charSpacing styles direction path pathStartOffset pathSide pathAlign".split(" ");
    fabric3.Text = fabric3.util.createClass(fabric3.Object, {
      _dimensionAffectingProps: [
        "fontSize",
        "fontWeight",
        "fontFamily",
        "fontStyle",
        "lineHeight",
        "text",
        "charSpacing",
        "textAlign",
        "styles",
        "path",
        "pathStartOffset",
        "pathSide",
        "pathAlign"
      ],
      _reNewline: /\r?\n/,
      _reSpacesAndTabs: /[ \t\r]/g,
      _reSpaceAndTab: /[ \t\r]/,
      _reWords: /\S+/g,
      type: "text",
      fontSize: 40,
      fontWeight: "normal",
      fontFamily: "Times New Roman",
      underline: false,
      overline: false,
      linethrough: false,
      textAlign: "left",
      fontStyle: "normal",
      lineHeight: 1.16,
      superscript: {
        size: 0.6,
        baseline: -0.35
      },
      subscript: {
        size: 0.6,
        baseline: 0.11
      },
      textBackgroundColor: "",
      stateProperties: fabric3.Object.prototype.stateProperties.concat(additionalProps),
      cacheProperties: fabric3.Object.prototype.cacheProperties.concat(additionalProps),
      stroke: null,
      shadow: null,
      path: null,
      pathStartOffset: 0,
      pathSide: "left",
      pathAlign: "baseline",
      _fontSizeFraction: 0.222,
      offsets: {
        underline: 0.1,
        linethrough: -0.315,
        overline: -0.88
      },
      _fontSizeMult: 1.13,
      charSpacing: 0,
      styles: null,
      _measuringContext: null,
      deltaY: 0,
      direction: "ltr",
      _styleProperties: [
        "stroke",
        "strokeWidth",
        "fill",
        "fontFamily",
        "fontSize",
        "fontWeight",
        "fontStyle",
        "underline",
        "overline",
        "linethrough",
        "deltaY",
        "textBackgroundColor"
      ],
      __charBounds: [],
      CACHE_FONT_SIZE: 400,
      MIN_TEXT_WIDTH: 2,
      initialize: function(text, options) {
        this.styles = options ? options.styles || {} : {};
        this.text = text;
        this.__skipDimension = true;
        this.callSuper("initialize", options);
        if (this.path) {
          this.setPathInfo();
        }
        this.__skipDimension = false;
        this.initDimensions();
        this.setCoords();
        this.setupState({ propertySet: "_dimensionAffectingProps" });
      },
      setPathInfo: function() {
        var path = this.path;
        if (path) {
          path.segmentsInfo = fabric3.util.getPathSegmentsInfo(path.path);
        }
      },
      getMeasuringContext: function() {
        if (!fabric3._measuringContext) {
          fabric3._measuringContext = this.canvas && this.canvas.contextCache || fabric3.util.createCanvasElement().getContext("2d");
        }
        return fabric3._measuringContext;
      },
      _splitText: function() {
        var newLines = this._splitTextIntoLines(this.text);
        this.textLines = newLines.lines;
        this._textLines = newLines.graphemeLines;
        this._unwrappedTextLines = newLines._unwrappedLines;
        this._text = newLines.graphemeText;
        return newLines;
      },
      initDimensions: function() {
        if (this.__skipDimension) {
          return;
        }
        this._splitText();
        this._clearCache();
        if (this.path) {
          this.width = this.path.width;
          this.height = this.path.height;
        } else {
          this.width = this.calcTextWidth() || this.cursorWidth || this.MIN_TEXT_WIDTH;
          this.height = this.calcTextHeight();
        }
        if (this.textAlign.indexOf("justify") !== -1) {
          this.enlargeSpaces();
        }
        this.saveState({ propertySet: "_dimensionAffectingProps" });
      },
      enlargeSpaces: function() {
        var diffSpace, currentLineWidth, numberOfSpaces, accumulatedSpace, line, charBound, spaces;
        for (var i = 0, len = this._textLines.length; i < len; i++) {
          if (this.textAlign !== "justify" && (i === len - 1 || this.isEndOfWrapping(i))) {
            continue;
          }
          accumulatedSpace = 0;
          line = this._textLines[i];
          currentLineWidth = this.getLineWidth(i);
          if (currentLineWidth < this.width && (spaces = this.textLines[i].match(this._reSpacesAndTabs))) {
            numberOfSpaces = spaces.length;
            diffSpace = (this.width - currentLineWidth) / numberOfSpaces;
            for (var j = 0, jlen = line.length; j <= jlen; j++) {
              charBound = this.__charBounds[i][j];
              if (this._reSpaceAndTab.test(line[j])) {
                charBound.width += diffSpace;
                charBound.kernedWidth += diffSpace;
                charBound.left += accumulatedSpace;
                accumulatedSpace += diffSpace;
              } else {
                charBound.left += accumulatedSpace;
              }
            }
          }
        }
      },
      isEndOfWrapping: function(lineIndex) {
        return lineIndex === this._textLines.length - 1;
      },
      missingNewlineOffset: function() {
        return 1;
      },
      toString: function() {
        return "#<fabric.Text (" + this.complexity() + '): { "text": "' + this.text + '", "fontFamily": "' + this.fontFamily + '" }>';
      },
      _getCacheCanvasDimensions: function() {
        var dims = this.callSuper("_getCacheCanvasDimensions");
        var fontSize = this.fontSize;
        dims.width += fontSize * dims.zoomX;
        dims.height += fontSize * dims.zoomY;
        return dims;
      },
      _render: function(ctx) {
        var path = this.path;
        path && !path.isNotVisible() && path._render(ctx);
        this._setTextStyles(ctx);
        this._renderTextLinesBackground(ctx);
        this._renderTextDecoration(ctx, "underline");
        this._renderText(ctx);
        this._renderTextDecoration(ctx, "overline");
        this._renderTextDecoration(ctx, "linethrough");
      },
      _renderText: function(ctx) {
        if (this.paintFirst === "stroke") {
          this._renderTextStroke(ctx);
          this._renderTextFill(ctx);
        } else {
          this._renderTextFill(ctx);
          this._renderTextStroke(ctx);
        }
      },
      _setTextStyles: function(ctx, charStyle, forMeasuring) {
        ctx.textBaseline = "alphabetical";
        if (this.path) {
          switch (this.pathAlign) {
            case "center":
              ctx.textBaseline = "middle";
              break;
            case "ascender":
              ctx.textBaseline = "top";
              break;
            case "descender":
              ctx.textBaseline = "bottom";
              break;
          }
        }
        ctx.font = this._getFontDeclaration(charStyle, forMeasuring);
      },
      calcTextWidth: function() {
        var maxWidth = this.getLineWidth(0);
        for (var i = 1, len = this._textLines.length; i < len; i++) {
          var currentLineWidth = this.getLineWidth(i);
          if (currentLineWidth > maxWidth) {
            maxWidth = currentLineWidth;
          }
        }
        return maxWidth;
      },
      _renderTextLine: function(method, ctx, line, left, top, lineIndex) {
        this._renderChars(method, ctx, line, left, top, lineIndex);
      },
      _renderTextLinesBackground: function(ctx) {
        if (!this.textBackgroundColor && !this.styleHas("textBackgroundColor")) {
          return;
        }
        var heightOfLine, lineLeftOffset, originalFill = ctx.fillStyle, line, lastColor, leftOffset = this._getLeftOffset(), lineTopOffset = this._getTopOffset(), boxStart = 0, boxWidth = 0, charBox, currentColor, path = this.path, drawStart;
        for (var i = 0, len = this._textLines.length; i < len; i++) {
          heightOfLine = this.getHeightOfLine(i);
          if (!this.textBackgroundColor && !this.styleHas("textBackgroundColor", i)) {
            lineTopOffset += heightOfLine;
            continue;
          }
          line = this._textLines[i];
          lineLeftOffset = this._getLineLeftOffset(i);
          boxWidth = 0;
          boxStart = 0;
          lastColor = this.getValueOfPropertyAt(i, 0, "textBackgroundColor");
          for (var j = 0, jlen = line.length; j < jlen; j++) {
            charBox = this.__charBounds[i][j];
            currentColor = this.getValueOfPropertyAt(i, j, "textBackgroundColor");
            if (path) {
              ctx.save();
              ctx.translate(charBox.renderLeft, charBox.renderTop);
              ctx.rotate(charBox.angle);
              ctx.fillStyle = currentColor;
              currentColor && ctx.fillRect(
                -charBox.width / 2,
                -heightOfLine / this.lineHeight * (1 - this._fontSizeFraction),
                charBox.width,
                heightOfLine / this.lineHeight
              );
              ctx.restore();
            } else if (currentColor !== lastColor) {
              drawStart = leftOffset + lineLeftOffset + boxStart;
              if (this.direction === "rtl") {
                drawStart = this.width - drawStart - boxWidth;
              }
              ctx.fillStyle = lastColor;
              lastColor && ctx.fillRect(
                drawStart,
                lineTopOffset,
                boxWidth,
                heightOfLine / this.lineHeight
              );
              boxStart = charBox.left;
              boxWidth = charBox.width;
              lastColor = currentColor;
            } else {
              boxWidth += charBox.kernedWidth;
            }
          }
          if (currentColor && !path) {
            drawStart = leftOffset + lineLeftOffset + boxStart;
            if (this.direction === "rtl") {
              drawStart = this.width - drawStart - boxWidth;
            }
            ctx.fillStyle = currentColor;
            ctx.fillRect(
              drawStart,
              lineTopOffset,
              boxWidth,
              heightOfLine / this.lineHeight
            );
          }
          lineTopOffset += heightOfLine;
        }
        ctx.fillStyle = originalFill;
        this._removeShadow(ctx);
      },
      getFontCache: function(decl) {
        var fontFamily = decl.fontFamily.toLowerCase();
        if (!fabric3.charWidthsCache[fontFamily]) {
          fabric3.charWidthsCache[fontFamily] = {};
        }
        var cache = fabric3.charWidthsCache[fontFamily], cacheProp = decl.fontStyle.toLowerCase() + "_" + (decl.fontWeight + "").toLowerCase();
        if (!cache[cacheProp]) {
          cache[cacheProp] = {};
        }
        return cache[cacheProp];
      },
      _measureChar: function(_char, charStyle, previousChar, prevCharStyle) {
        var fontCache = this.getFontCache(charStyle), fontDeclaration = this._getFontDeclaration(charStyle), previousFontDeclaration = this._getFontDeclaration(prevCharStyle), couple = previousChar + _char, stylesAreEqual = fontDeclaration === previousFontDeclaration, width, coupleWidth, previousWidth, fontMultiplier = charStyle.fontSize / this.CACHE_FONT_SIZE, kernedWidth;
        if (previousChar && fontCache[previousChar] !== void 0) {
          previousWidth = fontCache[previousChar];
        }
        if (fontCache[_char] !== void 0) {
          kernedWidth = width = fontCache[_char];
        }
        if (stylesAreEqual && fontCache[couple] !== void 0) {
          coupleWidth = fontCache[couple];
          kernedWidth = coupleWidth - previousWidth;
        }
        if (width === void 0 || previousWidth === void 0 || coupleWidth === void 0) {
          var ctx = this.getMeasuringContext();
          this._setTextStyles(ctx, charStyle, true);
        }
        if (width === void 0) {
          kernedWidth = width = ctx.measureText(_char).width;
          fontCache[_char] = width;
        }
        if (previousWidth === void 0 && stylesAreEqual && previousChar) {
          previousWidth = ctx.measureText(previousChar).width;
          fontCache[previousChar] = previousWidth;
        }
        if (stylesAreEqual && coupleWidth === void 0) {
          coupleWidth = ctx.measureText(couple).width;
          fontCache[couple] = coupleWidth;
          kernedWidth = coupleWidth - previousWidth;
        }
        return { width: width * fontMultiplier, kernedWidth: kernedWidth * fontMultiplier };
      },
      getHeightOfChar: function(line, _char) {
        return this.getValueOfPropertyAt(line, _char, "fontSize");
      },
      measureLine: function(lineIndex) {
        var lineInfo = this._measureLine(lineIndex);
        if (this.charSpacing !== 0) {
          lineInfo.width -= this._getWidthOfCharSpacing();
        }
        if (lineInfo.width < 0) {
          lineInfo.width = 0;
        }
        return lineInfo;
      },
      _measureLine: function(lineIndex) {
        var width = 0, i, grapheme, line = this._textLines[lineIndex], prevGrapheme, graphemeInfo, numOfSpaces = 0, lineBounds = new Array(line.length), positionInPath = 0, startingPoint, totalPathLength, path = this.path, reverse = this.pathSide === "right";
        this.__charBounds[lineIndex] = lineBounds;
        for (i = 0; i < line.length; i++) {
          grapheme = line[i];
          graphemeInfo = this._getGraphemeBox(grapheme, lineIndex, i, prevGrapheme);
          lineBounds[i] = graphemeInfo;
          width += graphemeInfo.kernedWidth;
          prevGrapheme = grapheme;
        }
        lineBounds[i] = {
          left: graphemeInfo ? graphemeInfo.left + graphemeInfo.width : 0,
          width: 0,
          kernedWidth: 0,
          height: this.fontSize
        };
        if (path) {
          totalPathLength = path.segmentsInfo[path.segmentsInfo.length - 1].length;
          startingPoint = fabric3.util.getPointOnPath(path.path, 0, path.segmentsInfo);
          startingPoint.x += path.pathOffset.x;
          startingPoint.y += path.pathOffset.y;
          switch (this.textAlign) {
            case "left":
              positionInPath = reverse ? totalPathLength - width : 0;
              break;
            case "center":
              positionInPath = (totalPathLength - width) / 2;
              break;
            case "right":
              positionInPath = reverse ? 0 : totalPathLength - width;
              break;
          }
          positionInPath += this.pathStartOffset * (reverse ? -1 : 1);
          for (i = reverse ? line.length - 1 : 0; reverse ? i >= 0 : i < line.length; reverse ? i-- : i++) {
            graphemeInfo = lineBounds[i];
            if (positionInPath > totalPathLength) {
              positionInPath %= totalPathLength;
            } else if (positionInPath < 0) {
              positionInPath += totalPathLength;
            }
            this._setGraphemeOnPath(positionInPath, graphemeInfo, startingPoint);
            positionInPath += graphemeInfo.kernedWidth;
          }
        }
        return { width, numOfSpaces };
      },
      _setGraphemeOnPath: function(positionInPath, graphemeInfo, startingPoint) {
        var centerPosition = positionInPath + graphemeInfo.kernedWidth / 2, path = this.path;
        var info = fabric3.util.getPointOnPath(path.path, centerPosition, path.segmentsInfo);
        graphemeInfo.renderLeft = info.x - startingPoint.x;
        graphemeInfo.renderTop = info.y - startingPoint.y;
        graphemeInfo.angle = info.angle + (this.pathSide === "right" ? Math.PI : 0);
      },
      _getGraphemeBox: function(grapheme, lineIndex, charIndex, prevGrapheme, skipLeft) {
        var style = this.getCompleteStyleDeclaration(lineIndex, charIndex), prevStyle = prevGrapheme ? this.getCompleteStyleDeclaration(lineIndex, charIndex - 1) : {}, info = this._measureChar(grapheme, style, prevGrapheme, prevStyle), kernedWidth = info.kernedWidth, width = info.width, charSpacing;
        if (this.charSpacing !== 0) {
          charSpacing = this._getWidthOfCharSpacing();
          width += charSpacing;
          kernedWidth += charSpacing;
        }
        var box = {
          width,
          left: 0,
          height: style.fontSize,
          kernedWidth,
          deltaY: style.deltaY
        };
        if (charIndex > 0 && !skipLeft) {
          var previousBox = this.__charBounds[lineIndex][charIndex - 1];
          box.left = previousBox.left + previousBox.width + info.kernedWidth - info.width;
        }
        return box;
      },
      getHeightOfLine: function(lineIndex) {
        if (this.__lineHeights[lineIndex]) {
          return this.__lineHeights[lineIndex];
        }
        var line = this._textLines[lineIndex], maxHeight = this.getHeightOfChar(lineIndex, 0);
        for (var i = 1, len = line.length; i < len; i++) {
          maxHeight = Math.max(this.getHeightOfChar(lineIndex, i), maxHeight);
        }
        return this.__lineHeights[lineIndex] = maxHeight * this.lineHeight * this._fontSizeMult;
      },
      calcTextHeight: function() {
        var lineHeight, height = 0;
        for (var i = 0, len = this._textLines.length; i < len; i++) {
          lineHeight = this.getHeightOfLine(i);
          height += i === len - 1 ? lineHeight / this.lineHeight : lineHeight;
        }
        return height;
      },
      _getLeftOffset: function() {
        return this.direction === "ltr" ? -this.width / 2 : this.width / 2;
      },
      _getTopOffset: function() {
        return -this.height / 2;
      },
      _renderTextCommon: function(ctx, method) {
        ctx.save();
        var lineHeights = 0, left = this._getLeftOffset(), top = this._getTopOffset();
        for (var i = 0, len = this._textLines.length; i < len; i++) {
          var heightOfLine = this.getHeightOfLine(i), maxHeight = heightOfLine / this.lineHeight, leftOffset = this._getLineLeftOffset(i);
          this._renderTextLine(
            method,
            ctx,
            this._textLines[i],
            left + leftOffset,
            top + lineHeights + maxHeight,
            i
          );
          lineHeights += heightOfLine;
        }
        ctx.restore();
      },
      _renderTextFill: function(ctx) {
        if (!this.fill && !this.styleHas("fill")) {
          return;
        }
        this._renderTextCommon(ctx, "fillText");
      },
      _renderTextStroke: function(ctx) {
        if ((!this.stroke || this.strokeWidth === 0) && this.isEmptyStyles()) {
          return;
        }
        if (this.shadow && !this.shadow.affectStroke) {
          this._removeShadow(ctx);
        }
        ctx.save();
        this._setLineDash(ctx, this.strokeDashArray);
        ctx.beginPath();
        this._renderTextCommon(ctx, "strokeText");
        ctx.closePath();
        ctx.restore();
      },
      _renderChars: function(method, ctx, line, left, top, lineIndex) {
        var lineHeight = this.getHeightOfLine(lineIndex), isJustify = this.textAlign.indexOf("justify") !== -1, actualStyle, nextStyle, charsToRender = "", charBox, boxWidth = 0, timeToRender, path = this.path, shortCut = !isJustify && this.charSpacing === 0 && this.isEmptyStyles(lineIndex) && !path, isLtr = this.direction === "ltr", sign = this.direction === "ltr" ? 1 : -1, drawingLeft, currentDirection = ctx.canvas.getAttribute("dir");
        ctx.save();
        if (currentDirection !== this.direction) {
          ctx.canvas.setAttribute("dir", isLtr ? "ltr" : "rtl");
          ctx.direction = isLtr ? "ltr" : "rtl";
          ctx.textAlign = isLtr ? "left" : "right";
        }
        top -= lineHeight * this._fontSizeFraction / this.lineHeight;
        if (shortCut) {
          this._renderChar(method, ctx, lineIndex, 0, line.join(""), left, top, lineHeight);
          ctx.restore();
          return;
        }
        for (var i = 0, len = line.length - 1; i <= len; i++) {
          timeToRender = i === len || this.charSpacing || path;
          charsToRender += line[i];
          charBox = this.__charBounds[lineIndex][i];
          if (boxWidth === 0) {
            left += sign * (charBox.kernedWidth - charBox.width);
            boxWidth += charBox.width;
          } else {
            boxWidth += charBox.kernedWidth;
          }
          if (isJustify && !timeToRender) {
            if (this._reSpaceAndTab.test(line[i])) {
              timeToRender = true;
            }
          }
          if (!timeToRender) {
            actualStyle = actualStyle || this.getCompleteStyleDeclaration(lineIndex, i);
            nextStyle = this.getCompleteStyleDeclaration(lineIndex, i + 1);
            timeToRender = fabric3.util.hasStyleChanged(actualStyle, nextStyle, false);
          }
          if (timeToRender) {
            if (path) {
              ctx.save();
              ctx.translate(charBox.renderLeft, charBox.renderTop);
              ctx.rotate(charBox.angle);
              this._renderChar(method, ctx, lineIndex, i, charsToRender, -boxWidth / 2, 0, lineHeight);
              ctx.restore();
            } else {
              drawingLeft = left;
              this._renderChar(method, ctx, lineIndex, i, charsToRender, drawingLeft, top, lineHeight);
            }
            charsToRender = "";
            actualStyle = nextStyle;
            left += sign * boxWidth;
            boxWidth = 0;
          }
        }
        ctx.restore();
      },
      _applyPatternGradientTransformText: function(filler) {
        var pCanvas = fabric3.util.createCanvasElement(), pCtx, width = this.width + this.strokeWidth, height = this.height + this.strokeWidth;
        pCanvas.width = width;
        pCanvas.height = height;
        pCtx = pCanvas.getContext("2d");
        pCtx.beginPath();
        pCtx.moveTo(0, 0);
        pCtx.lineTo(width, 0);
        pCtx.lineTo(width, height);
        pCtx.lineTo(0, height);
        pCtx.closePath();
        pCtx.translate(width / 2, height / 2);
        pCtx.fillStyle = filler.toLive(pCtx);
        this._applyPatternGradientTransform(pCtx, filler);
        pCtx.fill();
        return pCtx.createPattern(pCanvas, "no-repeat");
      },
      handleFiller: function(ctx, property, filler) {
        var offsetX, offsetY;
        if (filler.toLive) {
          if (filler.gradientUnits === "percentage" || filler.gradientTransform || filler.patternTransform) {
            offsetX = -this.width / 2;
            offsetY = -this.height / 2;
            ctx.translate(offsetX, offsetY);
            ctx[property] = this._applyPatternGradientTransformText(filler);
            return { offsetX, offsetY };
          } else {
            ctx[property] = filler.toLive(ctx, this);
            return this._applyPatternGradientTransform(ctx, filler);
          }
        } else {
          ctx[property] = filler;
        }
        return { offsetX: 0, offsetY: 0 };
      },
      _setStrokeStyles: function(ctx, decl) {
        ctx.lineWidth = decl.strokeWidth;
        ctx.lineCap = this.strokeLineCap;
        ctx.lineDashOffset = this.strokeDashOffset;
        ctx.lineJoin = this.strokeLineJoin;
        ctx.miterLimit = this.strokeMiterLimit;
        return this.handleFiller(ctx, "strokeStyle", decl.stroke);
      },
      _setFillStyles: function(ctx, decl) {
        return this.handleFiller(ctx, "fillStyle", decl.fill);
      },
      _renderChar: function(method, ctx, lineIndex, charIndex, _char, left, top) {
        var decl = this._getStyleDeclaration(lineIndex, charIndex), fullDecl = this.getCompleteStyleDeclaration(lineIndex, charIndex), shouldFill = method === "fillText" && fullDecl.fill, shouldStroke = method === "strokeText" && fullDecl.stroke && fullDecl.strokeWidth, fillOffsets, strokeOffsets;
        if (!shouldStroke && !shouldFill) {
          return;
        }
        ctx.save();
        shouldFill && (fillOffsets = this._setFillStyles(ctx, fullDecl));
        shouldStroke && (strokeOffsets = this._setStrokeStyles(ctx, fullDecl));
        ctx.font = this._getFontDeclaration(fullDecl);
        if (decl && decl.textBackgroundColor) {
          this._removeShadow(ctx);
        }
        if (decl && decl.deltaY) {
          top += decl.deltaY;
        }
        shouldFill && ctx.fillText(_char, left - fillOffsets.offsetX, top - fillOffsets.offsetY);
        shouldStroke && ctx.strokeText(_char, left - strokeOffsets.offsetX, top - strokeOffsets.offsetY);
        ctx.restore();
      },
      setSuperscript: function(start, end) {
        return this._setScript(start, end, this.superscript);
      },
      setSubscript: function(start, end) {
        return this._setScript(start, end, this.subscript);
      },
      _setScript: function(start, end, schema) {
        var loc = this.get2DCursorLocation(start, true), fontSize = this.getValueOfPropertyAt(loc.lineIndex, loc.charIndex, "fontSize"), dy = this.getValueOfPropertyAt(loc.lineIndex, loc.charIndex, "deltaY"), style = { fontSize: fontSize * schema.size, deltaY: dy + fontSize * schema.baseline };
        this.setSelectionStyles(style, start, end);
        return this;
      },
      _getLineLeftOffset: function(lineIndex) {
        var lineWidth = this.getLineWidth(lineIndex), lineDiff = this.width - lineWidth, textAlign = this.textAlign, direction = this.direction, isEndOfWrapping, leftOffset = 0, isEndOfWrapping = this.isEndOfWrapping(lineIndex);
        if (textAlign === "justify" || textAlign === "justify-center" && !isEndOfWrapping || textAlign === "justify-right" && !isEndOfWrapping || textAlign === "justify-left" && !isEndOfWrapping) {
          return 0;
        }
        if (textAlign === "center") {
          leftOffset = lineDiff / 2;
        }
        if (textAlign === "right") {
          leftOffset = lineDiff;
        }
        if (textAlign === "justify-center") {
          leftOffset = lineDiff / 2;
        }
        if (textAlign === "justify-right") {
          leftOffset = lineDiff;
        }
        if (direction === "rtl") {
          leftOffset -= lineDiff;
        }
        return leftOffset;
      },
      _clearCache: function() {
        this.__lineWidths = [];
        this.__lineHeights = [];
        this.__charBounds = [];
      },
      _shouldClearDimensionCache: function() {
        var shouldClear = this._forceClearCache;
        shouldClear || (shouldClear = this.hasStateChanged("_dimensionAffectingProps"));
        if (shouldClear) {
          this.dirty = true;
          this._forceClearCache = false;
        }
        return shouldClear;
      },
      getLineWidth: function(lineIndex) {
        if (this.__lineWidths[lineIndex] !== void 0) {
          return this.__lineWidths[lineIndex];
        }
        var lineInfo = this.measureLine(lineIndex);
        var width = lineInfo.width;
        this.__lineWidths[lineIndex] = width;
        return width;
      },
      _getWidthOfCharSpacing: function() {
        if (this.charSpacing !== 0) {
          return this.fontSize * this.charSpacing / 1e3;
        }
        return 0;
      },
      getValueOfPropertyAt: function(lineIndex, charIndex, property) {
        var charStyle = this._getStyleDeclaration(lineIndex, charIndex);
        if (charStyle && typeof charStyle[property] !== "undefined") {
          return charStyle[property];
        }
        return this[property];
      },
      _renderTextDecoration: function(ctx, type) {
        if (!this[type] && !this.styleHas(type)) {
          return;
        }
        var heightOfLine, size, _size, lineLeftOffset, dy, _dy, line, lastDecoration, leftOffset = this._getLeftOffset(), topOffset = this._getTopOffset(), top, boxStart, boxWidth, charBox, currentDecoration, maxHeight, currentFill, lastFill, path = this.path, charSpacing = this._getWidthOfCharSpacing(), offsetY = this.offsets[type];
        for (var i = 0, len = this._textLines.length; i < len; i++) {
          heightOfLine = this.getHeightOfLine(i);
          if (!this[type] && !this.styleHas(type, i)) {
            topOffset += heightOfLine;
            continue;
          }
          line = this._textLines[i];
          maxHeight = heightOfLine / this.lineHeight;
          lineLeftOffset = this._getLineLeftOffset(i);
          boxStart = 0;
          boxWidth = 0;
          lastDecoration = this.getValueOfPropertyAt(i, 0, type);
          lastFill = this.getValueOfPropertyAt(i, 0, "fill");
          top = topOffset + maxHeight * (1 - this._fontSizeFraction);
          size = this.getHeightOfChar(i, 0);
          dy = this.getValueOfPropertyAt(i, 0, "deltaY");
          for (var j = 0, jlen = line.length; j < jlen; j++) {
            charBox = this.__charBounds[i][j];
            currentDecoration = this.getValueOfPropertyAt(i, j, type);
            currentFill = this.getValueOfPropertyAt(i, j, "fill");
            _size = this.getHeightOfChar(i, j);
            _dy = this.getValueOfPropertyAt(i, j, "deltaY");
            if (path && currentDecoration && currentFill) {
              ctx.save();
              ctx.fillStyle = lastFill;
              ctx.translate(charBox.renderLeft, charBox.renderTop);
              ctx.rotate(charBox.angle);
              ctx.fillRect(
                -charBox.kernedWidth / 2,
                offsetY * _size + _dy,
                charBox.kernedWidth,
                this.fontSize / 15
              );
              ctx.restore();
            } else if ((currentDecoration !== lastDecoration || currentFill !== lastFill || _size !== size || _dy !== dy) && boxWidth > 0) {
              var drawStart = leftOffset + lineLeftOffset + boxStart;
              if (this.direction === "rtl") {
                drawStart = this.width - drawStart - boxWidth;
              }
              if (lastDecoration && lastFill) {
                ctx.fillStyle = lastFill;
                ctx.fillRect(
                  drawStart,
                  top + offsetY * size + dy,
                  boxWidth,
                  this.fontSize / 15
                );
              }
              boxStart = charBox.left;
              boxWidth = charBox.width;
              lastDecoration = currentDecoration;
              lastFill = currentFill;
              size = _size;
              dy = _dy;
            } else {
              boxWidth += charBox.kernedWidth;
            }
          }
          var drawStart = leftOffset + lineLeftOffset + boxStart;
          if (this.direction === "rtl") {
            drawStart = this.width - drawStart - boxWidth;
          }
          ctx.fillStyle = currentFill;
          currentDecoration && currentFill && ctx.fillRect(
            drawStart,
            top + offsetY * size + dy,
            boxWidth - charSpacing,
            this.fontSize / 15
          );
          topOffset += heightOfLine;
        }
        this._removeShadow(ctx);
      },
      _getFontDeclaration: function(styleObject, forMeasuring) {
        var style = styleObject || this, family = this.fontFamily, fontIsGeneric = fabric3.Text.genericFonts.indexOf(family.toLowerCase()) > -1;
        var fontFamily = family === void 0 || family.indexOf("'") > -1 || family.indexOf(",") > -1 || family.indexOf('"') > -1 || fontIsGeneric ? style.fontFamily : '"' + style.fontFamily + '"';
        return [
          fabric3.isLikelyNode ? style.fontWeight : style.fontStyle,
          fabric3.isLikelyNode ? style.fontStyle : style.fontWeight,
          forMeasuring ? this.CACHE_FONT_SIZE + "px" : style.fontSize + "px",
          fontFamily
        ].join(" ");
      },
      render: function(ctx) {
        if (!this.visible) {
          return;
        }
        if (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen()) {
          return;
        }
        if (this._shouldClearDimensionCache()) {
          this.initDimensions();
        }
        this.callSuper("render", ctx);
      },
      _splitTextIntoLines: function(text) {
        var lines = text.split(this._reNewline), newLines = new Array(lines.length), newLine = ["\n"], newText = [];
        for (var i = 0; i < lines.length; i++) {
          newLines[i] = fabric3.util.string.graphemeSplit(lines[i]);
          newText = newText.concat(newLines[i], newLine);
        }
        newText.pop();
        return { _unwrappedLines: newLines, lines, graphemeText: newText, graphemeLines: newLines };
      },
      toObject: function(propertiesToInclude) {
        var allProperties = additionalProps.concat(propertiesToInclude);
        var obj = this.callSuper("toObject", allProperties);
        obj.styles = fabric3.util.stylesToArray(this.styles, this.text);
        if (obj.path) {
          obj.path = this.path.toObject();
        }
        return obj;
      },
      set: function(key, value) {
        this.callSuper("set", key, value);
        var needsDims = false;
        var isAddingPath = false;
        if (typeof key === "object") {
          for (var _key in key) {
            if (_key === "path") {
              this.setPathInfo();
            }
            needsDims = needsDims || this._dimensionAffectingProps.indexOf(_key) !== -1;
            isAddingPath = isAddingPath || _key === "path";
          }
        } else {
          needsDims = this._dimensionAffectingProps.indexOf(key) !== -1;
          isAddingPath = key === "path";
        }
        if (isAddingPath) {
          this.setPathInfo();
        }
        if (needsDims) {
          this.initDimensions();
          this.setCoords();
        }
        return this;
      },
      complexity: function() {
        return 1;
      }
    });
    fabric3.Text.ATTRIBUTE_NAMES = fabric3.SHARED_ATTRIBUTES.concat(
      "x y dx dy font-family font-style font-weight font-size letter-spacing text-decoration text-anchor".split(" ")
    );
    fabric3.Text.DEFAULT_SVG_FONT_SIZE = 16;
    fabric3.Text.fromElement = function(element, callback, options) {
      if (!element) {
        return callback(null);
      }
      var parsedAttributes = fabric3.parseAttributes(element, fabric3.Text.ATTRIBUTE_NAMES), parsedAnchor = parsedAttributes.textAnchor || "left";
      options = fabric3.util.object.extend(options ? clone(options) : {}, parsedAttributes);
      options.top = options.top || 0;
      options.left = options.left || 0;
      if (parsedAttributes.textDecoration) {
        var textDecoration = parsedAttributes.textDecoration;
        if (textDecoration.indexOf("underline") !== -1) {
          options.underline = true;
        }
        if (textDecoration.indexOf("overline") !== -1) {
          options.overline = true;
        }
        if (textDecoration.indexOf("line-through") !== -1) {
          options.linethrough = true;
        }
        delete options.textDecoration;
      }
      if ("dx" in parsedAttributes) {
        options.left += parsedAttributes.dx;
      }
      if ("dy" in parsedAttributes) {
        options.top += parsedAttributes.dy;
      }
      if (!("fontSize" in options)) {
        options.fontSize = fabric3.Text.DEFAULT_SVG_FONT_SIZE;
      }
      var textContent = "";
      if (!("textContent" in element)) {
        if ("firstChild" in element && element.firstChild !== null) {
          if ("data" in element.firstChild && element.firstChild.data !== null) {
            textContent = element.firstChild.data;
          }
        }
      } else {
        textContent = element.textContent;
      }
      textContent = textContent.replace(/^\s+|\s+$|\n+/g, "").replace(/\s+/g, " ");
      var originalStrokeWidth = options.strokeWidth;
      options.strokeWidth = 0;
      var text = new fabric3.Text(textContent, options), textHeightScaleFactor = text.getScaledHeight() / text.height, lineHeightDiff = (text.height + text.strokeWidth) * text.lineHeight - text.height, scaledDiff = lineHeightDiff * textHeightScaleFactor, textHeight = text.getScaledHeight() + scaledDiff, offX = 0;
      if (parsedAnchor === "center") {
        offX = text.getScaledWidth() / 2;
      }
      if (parsedAnchor === "right") {
        offX = text.getScaledWidth();
      }
      text.set({
        left: text.left - offX,
        top: text.top - (textHeight - text.fontSize * (0.07 + text._fontSizeFraction)) / text.lineHeight,
        strokeWidth: typeof originalStrokeWidth !== "undefined" ? originalStrokeWidth : 1
      });
      callback(text);
    };
    fabric3.Text.fromObject = function(object, callback) {
      var objectCopy = clone(object), path = object.path;
      delete objectCopy.path;
      return fabric3.Object._fromObject("Text", objectCopy, function(textInstance) {
        textInstance.styles = fabric3.util.stylesFromArray(object.styles, object.text);
        if (path) {
          fabric3.Object._fromObject("Path", path, function(pathInstance) {
            textInstance.set("path", pathInstance);
            callback(textInstance);
          }, "path");
        } else {
          callback(textInstance);
        }
      }, "text");
    };
    fabric3.Text.genericFonts = ["sans-serif", "serif", "cursive", "fantasy", "monospace"];
    fabric3.util.createAccessors && fabric3.util.createAccessors(fabric3.Text);
  })(exports);
  (function() {
    fabric2.util.object.extend(fabric2.Text.prototype, {
      isEmptyStyles: function(lineIndex) {
        if (!this.styles) {
          return true;
        }
        if (typeof lineIndex !== "undefined" && !this.styles[lineIndex]) {
          return true;
        }
        var obj = typeof lineIndex === "undefined" ? this.styles : { line: this.styles[lineIndex] };
        for (var p1 in obj) {
          for (var p2 in obj[p1]) {
            for (var p3 in obj[p1][p2]) {
              return false;
            }
          }
        }
        return true;
      },
      styleHas: function(property, lineIndex) {
        if (!this.styles || !property || property === "") {
          return false;
        }
        if (typeof lineIndex !== "undefined" && !this.styles[lineIndex]) {
          return false;
        }
        var obj = typeof lineIndex === "undefined" ? this.styles : { 0: this.styles[lineIndex] };
        for (var p1 in obj) {
          for (var p2 in obj[p1]) {
            if (typeof obj[p1][p2][property] !== "undefined") {
              return true;
            }
          }
        }
        return false;
      },
      cleanStyle: function(property) {
        if (!this.styles || !property || property === "") {
          return false;
        }
        var obj = this.styles, stylesCount = 0, letterCount, stylePropertyValue, allStyleObjectPropertiesMatch = true, graphemeCount = 0, styleObject;
        for (var p1 in obj) {
          letterCount = 0;
          for (var p2 in obj[p1]) {
            var styleObject = obj[p1][p2], stylePropertyHasBeenSet = styleObject.hasOwnProperty(property);
            stylesCount++;
            if (stylePropertyHasBeenSet) {
              if (!stylePropertyValue) {
                stylePropertyValue = styleObject[property];
              } else if (styleObject[property] !== stylePropertyValue) {
                allStyleObjectPropertiesMatch = false;
              }
              if (styleObject[property] === this[property]) {
                delete styleObject[property];
              }
            } else {
              allStyleObjectPropertiesMatch = false;
            }
            if (Object.keys(styleObject).length !== 0) {
              letterCount++;
            } else {
              delete obj[p1][p2];
            }
          }
          if (letterCount === 0) {
            delete obj[p1];
          }
        }
        for (var i = 0; i < this._textLines.length; i++) {
          graphemeCount += this._textLines[i].length;
        }
        if (allStyleObjectPropertiesMatch && stylesCount === graphemeCount) {
          this[property] = stylePropertyValue;
          this.removeStyle(property);
        }
      },
      removeStyle: function(property) {
        if (!this.styles || !property || property === "") {
          return;
        }
        var obj = this.styles, line, lineNum, charNum;
        for (lineNum in obj) {
          line = obj[lineNum];
          for (charNum in line) {
            delete line[charNum][property];
            if (Object.keys(line[charNum]).length === 0) {
              delete line[charNum];
            }
          }
          if (Object.keys(line).length === 0) {
            delete obj[lineNum];
          }
        }
      },
      _extendStyles: function(index, styles) {
        var loc = this.get2DCursorLocation(index);
        if (!this._getLineStyle(loc.lineIndex)) {
          this._setLineStyle(loc.lineIndex);
        }
        if (!this._getStyleDeclaration(loc.lineIndex, loc.charIndex)) {
          this._setStyleDeclaration(loc.lineIndex, loc.charIndex, {});
        }
        fabric2.util.object.extend(this._getStyleDeclaration(loc.lineIndex, loc.charIndex), styles);
      },
      get2DCursorLocation: function(selectionStart, skipWrapping) {
        if (typeof selectionStart === "undefined") {
          selectionStart = this.selectionStart;
        }
        var lines = skipWrapping ? this._unwrappedTextLines : this._textLines, len = lines.length;
        for (var i = 0; i < len; i++) {
          if (selectionStart <= lines[i].length) {
            return {
              lineIndex: i,
              charIndex: selectionStart
            };
          }
          selectionStart -= lines[i].length + this.missingNewlineOffset(i);
        }
        return {
          lineIndex: i - 1,
          charIndex: lines[i - 1].length < selectionStart ? lines[i - 1].length : selectionStart
        };
      },
      getSelectionStyles: function(startIndex, endIndex, complete) {
        if (typeof startIndex === "undefined") {
          startIndex = this.selectionStart || 0;
        }
        if (typeof endIndex === "undefined") {
          endIndex = this.selectionEnd || startIndex;
        }
        var styles = [];
        for (var i = startIndex; i < endIndex; i++) {
          styles.push(this.getStyleAtPosition(i, complete));
        }
        return styles;
      },
      getStyleAtPosition: function(position, complete) {
        var loc = this.get2DCursorLocation(position), style = complete ? this.getCompleteStyleDeclaration(loc.lineIndex, loc.charIndex) : this._getStyleDeclaration(loc.lineIndex, loc.charIndex);
        return style || {};
      },
      setSelectionStyles: function(styles, startIndex, endIndex) {
        if (typeof startIndex === "undefined") {
          startIndex = this.selectionStart || 0;
        }
        if (typeof endIndex === "undefined") {
          endIndex = this.selectionEnd || startIndex;
        }
        for (var i = startIndex; i < endIndex; i++) {
          this._extendStyles(i, styles);
        }
        this._forceClearCache = true;
        return this;
      },
      _getStyleDeclaration: function(lineIndex, charIndex) {
        var lineStyle = this.styles && this.styles[lineIndex];
        if (!lineStyle) {
          return null;
        }
        return lineStyle[charIndex];
      },
      getCompleteStyleDeclaration: function(lineIndex, charIndex) {
        var style = this._getStyleDeclaration(lineIndex, charIndex) || {}, styleObject = {}, prop;
        for (var i = 0; i < this._styleProperties.length; i++) {
          prop = this._styleProperties[i];
          styleObject[prop] = typeof style[prop] === "undefined" ? this[prop] : style[prop];
        }
        return styleObject;
      },
      _setStyleDeclaration: function(lineIndex, charIndex, style) {
        this.styles[lineIndex][charIndex] = style;
      },
      _deleteStyleDeclaration: function(lineIndex, charIndex) {
        delete this.styles[lineIndex][charIndex];
      },
      _getLineStyle: function(lineIndex) {
        return !!this.styles[lineIndex];
      },
      _setLineStyle: function(lineIndex) {
        this.styles[lineIndex] = {};
      },
      _deleteLineStyle: function(lineIndex) {
        delete this.styles[lineIndex];
      }
    });
  })();
  (function() {
    function parseDecoration(object) {
      if (object.textDecoration) {
        object.textDecoration.indexOf("underline") > -1 && (object.underline = true);
        object.textDecoration.indexOf("line-through") > -1 && (object.linethrough = true);
        object.textDecoration.indexOf("overline") > -1 && (object.overline = true);
        delete object.textDecoration;
      }
    }
    fabric2.IText = fabric2.util.createClass(fabric2.Text, fabric2.Observable, {
      type: "i-text",
      selectionStart: 0,
      selectionEnd: 0,
      selectionColor: "rgba(17,119,255,0.3)",
      isEditing: false,
      editable: true,
      editingBorderColor: "rgba(102,153,255,0.25)",
      cursorWidth: 2,
      cursorColor: "",
      cursorDelay: 1e3,
      cursorDuration: 600,
      caching: true,
      hiddenTextareaContainer: null,
      _reSpace: /\s|\n/,
      _currentCursorOpacity: 0,
      _selectionDirection: null,
      _abortCursorAnimation: false,
      __widthOfSpace: [],
      inCompositionMode: false,
      initialize: function(text, options) {
        this.callSuper("initialize", text, options);
        this.initBehavior();
      },
      setSelectionStart: function(index) {
        index = Math.max(index, 0);
        this._updateAndFire("selectionStart", index);
      },
      setSelectionEnd: function(index) {
        index = Math.min(index, this.text.length);
        this._updateAndFire("selectionEnd", index);
      },
      _updateAndFire: function(property, index) {
        if (this[property] !== index) {
          this._fireSelectionChanged();
          this[property] = index;
        }
        this._updateTextarea();
      },
      _fireSelectionChanged: function() {
        this.fire("selection:changed");
        this.canvas && this.canvas.fire("text:selection:changed", { target: this });
      },
      initDimensions: function() {
        this.isEditing && this.initDelayedCursor();
        this.clearContextTop();
        this.callSuper("initDimensions");
      },
      render: function(ctx) {
        this.clearContextTop();
        this.callSuper("render", ctx);
        this.cursorOffsetCache = {};
        this.renderCursorOrSelection();
      },
      _render: function(ctx) {
        this.callSuper("_render", ctx);
      },
      clearContextTop: function(skipRestore) {
        if (!this.isEditing || !this.canvas || !this.canvas.contextTop) {
          return;
        }
        var ctx = this.canvas.contextTop, v = this.canvas.viewportTransform;
        ctx.save();
        ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
        this.transform(ctx);
        this._clearTextArea(ctx);
        skipRestore || ctx.restore();
      },
      renderCursorOrSelection: function() {
        if (!this.isEditing || !this.canvas || !this.canvas.contextTop) {
          return;
        }
        var boundaries = this._getCursorBoundaries(), ctx = this.canvas.contextTop;
        this.clearContextTop(true);
        if (this.selectionStart === this.selectionEnd) {
          this.renderCursor(boundaries, ctx);
        } else {
          this.renderSelection(boundaries, ctx);
        }
        ctx.restore();
      },
      _clearTextArea: function(ctx) {
        var width = this.width + 4, height = this.height + 4;
        ctx.clearRect(-width / 2, -height / 2, width, height);
      },
      _getCursorBoundaries: function(position) {
        if (typeof position === "undefined") {
          position = this.selectionStart;
        }
        var left = this._getLeftOffset(), top = this._getTopOffset(), offsets = this._getCursorBoundariesOffsets(position);
        return {
          left,
          top,
          leftOffset: offsets.left,
          topOffset: offsets.top
        };
      },
      _getCursorBoundariesOffsets: function(position) {
        if (this.cursorOffsetCache && "top" in this.cursorOffsetCache) {
          return this.cursorOffsetCache;
        }
        var lineLeftOffset, lineIndex, charIndex, topOffset = 0, leftOffset = 0, boundaries, cursorPosition = this.get2DCursorLocation(position);
        charIndex = cursorPosition.charIndex;
        lineIndex = cursorPosition.lineIndex;
        for (var i = 0; i < lineIndex; i++) {
          topOffset += this.getHeightOfLine(i);
        }
        lineLeftOffset = this._getLineLeftOffset(lineIndex);
        var bound = this.__charBounds[lineIndex][charIndex];
        bound && (leftOffset = bound.left);
        if (this.charSpacing !== 0 && charIndex === this._textLines[lineIndex].length) {
          leftOffset -= this._getWidthOfCharSpacing();
        }
        boundaries = {
          top: topOffset,
          left: lineLeftOffset + (leftOffset > 0 ? leftOffset : 0)
        };
        if (this.direction === "rtl") {
          boundaries.left *= -1;
        }
        this.cursorOffsetCache = boundaries;
        return this.cursorOffsetCache;
      },
      renderCursor: function(boundaries, ctx) {
        var cursorLocation = this.get2DCursorLocation(), lineIndex = cursorLocation.lineIndex, charIndex = cursorLocation.charIndex > 0 ? cursorLocation.charIndex - 1 : 0, charHeight = this.getValueOfPropertyAt(lineIndex, charIndex, "fontSize"), multiplier = this.scaleX * this.canvas.getZoom(), cursorWidth = this.cursorWidth / multiplier, topOffset = boundaries.topOffset, dy = this.getValueOfPropertyAt(lineIndex, charIndex, "deltaY");
        topOffset += (1 - this._fontSizeFraction) * this.getHeightOfLine(lineIndex) / this.lineHeight - charHeight * (1 - this._fontSizeFraction);
        if (this.inCompositionMode) {
          this.renderSelection(boundaries, ctx);
        }
        ctx.fillStyle = this.cursorColor || this.getValueOfPropertyAt(lineIndex, charIndex, "fill");
        ctx.globalAlpha = this.__isMousedown ? 1 : this._currentCursorOpacity;
        ctx.fillRect(
          boundaries.left + boundaries.leftOffset - cursorWidth / 2,
          topOffset + boundaries.top + dy,
          cursorWidth,
          charHeight
        );
      },
      renderSelection: function(boundaries, ctx) {
        var selectionStart = this.inCompositionMode ? this.hiddenTextarea.selectionStart : this.selectionStart, selectionEnd = this.inCompositionMode ? this.hiddenTextarea.selectionEnd : this.selectionEnd, isJustify = this.textAlign.indexOf("justify") !== -1, start = this.get2DCursorLocation(selectionStart), end = this.get2DCursorLocation(selectionEnd), startLine = start.lineIndex, endLine = end.lineIndex, startChar = start.charIndex < 0 ? 0 : start.charIndex, endChar = end.charIndex < 0 ? 0 : end.charIndex;
        for (var i = startLine; i <= endLine; i++) {
          var lineOffset = this._getLineLeftOffset(i) || 0, lineHeight = this.getHeightOfLine(i), realLineHeight = 0, boxStart = 0, boxEnd = 0;
          if (i === startLine) {
            boxStart = this.__charBounds[startLine][startChar].left;
          }
          if (i >= startLine && i < endLine) {
            boxEnd = isJustify && !this.isEndOfWrapping(i) ? this.width : this.getLineWidth(i) || 5;
          } else if (i === endLine) {
            if (endChar === 0) {
              boxEnd = this.__charBounds[endLine][endChar].left;
            } else {
              var charSpacing = this._getWidthOfCharSpacing();
              boxEnd = this.__charBounds[endLine][endChar - 1].left + this.__charBounds[endLine][endChar - 1].width - charSpacing;
            }
          }
          realLineHeight = lineHeight;
          if (this.lineHeight < 1 || i === endLine && this.lineHeight > 1) {
            lineHeight /= this.lineHeight;
          }
          var drawStart = boundaries.left + lineOffset + boxStart, drawWidth = boxEnd - boxStart, drawHeight = lineHeight, extraTop = 0;
          if (this.inCompositionMode) {
            ctx.fillStyle = this.compositionColor || "black";
            drawHeight = 1;
            extraTop = lineHeight;
          } else {
            ctx.fillStyle = this.selectionColor;
          }
          if (this.direction === "rtl") {
            drawStart = this.width - drawStart - drawWidth;
          }
          ctx.fillRect(
            drawStart,
            boundaries.top + boundaries.topOffset + extraTop,
            drawWidth,
            drawHeight
          );
          boundaries.topOffset += realLineHeight;
        }
      },
      getCurrentCharFontSize: function() {
        var cp = this._getCurrentCharIndex();
        return this.getValueOfPropertyAt(cp.l, cp.c, "fontSize");
      },
      getCurrentCharColor: function() {
        var cp = this._getCurrentCharIndex();
        return this.getValueOfPropertyAt(cp.l, cp.c, "fill");
      },
      _getCurrentCharIndex: function() {
        var cursorPosition = this.get2DCursorLocation(this.selectionStart, true), charIndex = cursorPosition.charIndex > 0 ? cursorPosition.charIndex - 1 : 0;
        return { l: cursorPosition.lineIndex, c: charIndex };
      }
    });
    fabric2.IText.fromObject = function(object, callback) {
      var styles = fabric2.util.stylesFromArray(object.styles, object.text);
      var objCopy = Object.assign({}, object, { styles });
      parseDecoration(objCopy);
      if (objCopy.styles) {
        for (var i in objCopy.styles) {
          for (var j in objCopy.styles[i]) {
            parseDecoration(objCopy.styles[i][j]);
          }
        }
      }
      fabric2.Object._fromObject("IText", objCopy, callback, "text");
    };
  })();
  (function() {
    var clone = fabric2.util.object.clone;
    fabric2.util.object.extend(fabric2.IText.prototype, {
      initBehavior: function() {
        this.initAddedHandler();
        this.initRemovedHandler();
        this.initCursorSelectionHandlers();
        this.initDoubleClickSimulation();
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
      },
      onDeselect: function() {
        this.isEditing && this.exitEditing();
        this.selected = false;
      },
      initAddedHandler: function() {
        var _this = this;
        this.on("added", function() {
          var canvas2 = _this.canvas;
          if (canvas2) {
            if (!canvas2._hasITextHandlers) {
              canvas2._hasITextHandlers = true;
              _this._initCanvasHandlers(canvas2);
            }
            canvas2._iTextInstances = canvas2._iTextInstances || [];
            canvas2._iTextInstances.push(_this);
          }
        });
      },
      initRemovedHandler: function() {
        var _this = this;
        this.on("removed", function() {
          var canvas2 = _this.canvas;
          if (canvas2) {
            canvas2._iTextInstances = canvas2._iTextInstances || [];
            fabric2.util.removeFromArray(canvas2._iTextInstances, _this);
            if (canvas2._iTextInstances.length === 0) {
              canvas2._hasITextHandlers = false;
              _this._removeCanvasHandlers(canvas2);
            }
          }
        });
      },
      _initCanvasHandlers: function(canvas2) {
        canvas2._mouseUpITextHandler = function() {
          if (canvas2._iTextInstances) {
            canvas2._iTextInstances.forEach(function(obj) {
              obj.__isMousedown = false;
            });
          }
        };
        canvas2.on("mouse:up", canvas2._mouseUpITextHandler);
      },
      _removeCanvasHandlers: function(canvas2) {
        canvas2.off("mouse:up", canvas2._mouseUpITextHandler);
      },
      _tick: function() {
        this._currentTickState = this._animateCursor(this, 1, this.cursorDuration, "_onTickComplete");
      },
      _animateCursor: function(obj, targetOpacity, duration, completeMethod) {
        var tickState;
        tickState = {
          isAborted: false,
          abort: function() {
            this.isAborted = true;
          }
        };
        obj.animate("_currentCursorOpacity", targetOpacity, {
          duration,
          onComplete: function() {
            if (!tickState.isAborted) {
              obj[completeMethod]();
            }
          },
          onChange: function() {
            if (obj.canvas && obj.selectionStart === obj.selectionEnd) {
              obj.renderCursorOrSelection();
            }
          },
          abort: function() {
            return tickState.isAborted;
          }
        });
        return tickState;
      },
      _onTickComplete: function() {
        var _this = this;
        if (this._cursorTimeout1) {
          clearTimeout(this._cursorTimeout1);
        }
        this._cursorTimeout1 = setTimeout(function() {
          _this._currentTickCompleteState = _this._animateCursor(_this, 0, this.cursorDuration / 2, "_tick");
        }, 100);
      },
      initDelayedCursor: function(restart) {
        var _this = this, delay = restart ? 0 : this.cursorDelay;
        this.abortCursorAnimation();
        this._currentCursorOpacity = 1;
        this._cursorTimeout2 = setTimeout(function() {
          _this._tick();
        }, delay);
      },
      abortCursorAnimation: function() {
        var shouldClear = this._currentTickState || this._currentTickCompleteState, canvas2 = this.canvas;
        this._currentTickState && this._currentTickState.abort();
        this._currentTickCompleteState && this._currentTickCompleteState.abort();
        clearTimeout(this._cursorTimeout1);
        clearTimeout(this._cursorTimeout2);
        this._currentCursorOpacity = 0;
        if (shouldClear && canvas2) {
          canvas2.clearContext(canvas2.contextTop || canvas2.contextContainer);
        }
      },
      selectAll: function() {
        this.selectionStart = 0;
        this.selectionEnd = this._text.length;
        this._fireSelectionChanged();
        this._updateTextarea();
        return this;
      },
      getSelectedText: function() {
        return this._text.slice(this.selectionStart, this.selectionEnd).join("");
      },
      findWordBoundaryLeft: function(startFrom) {
        var offset = 0, index = startFrom - 1;
        if (this._reSpace.test(this._text[index])) {
          while (this._reSpace.test(this._text[index])) {
            offset++;
            index--;
          }
        }
        while (/\S/.test(this._text[index]) && index > -1) {
          offset++;
          index--;
        }
        return startFrom - offset;
      },
      findWordBoundaryRight: function(startFrom) {
        var offset = 0, index = startFrom;
        if (this._reSpace.test(this._text[index])) {
          while (this._reSpace.test(this._text[index])) {
            offset++;
            index++;
          }
        }
        while (/\S/.test(this._text[index]) && index < this._text.length) {
          offset++;
          index++;
        }
        return startFrom + offset;
      },
      findLineBoundaryLeft: function(startFrom) {
        var offset = 0, index = startFrom - 1;
        while (!/\n/.test(this._text[index]) && index > -1) {
          offset++;
          index--;
        }
        return startFrom - offset;
      },
      findLineBoundaryRight: function(startFrom) {
        var offset = 0, index = startFrom;
        while (!/\n/.test(this._text[index]) && index < this._text.length) {
          offset++;
          index++;
        }
        return startFrom + offset;
      },
      searchWordBoundary: function(selectionStart, direction) {
        var text = this._text, index = this._reSpace.test(text[selectionStart]) ? selectionStart - 1 : selectionStart, _char = text[index], reNonWord = fabric2.reNonWord;
        while (!reNonWord.test(_char) && index > 0 && index < text.length) {
          index += direction;
          _char = text[index];
        }
        if (reNonWord.test(_char)) {
          index += direction === 1 ? 0 : 1;
        }
        return index;
      },
      selectWord: function(selectionStart) {
        selectionStart = selectionStart || this.selectionStart;
        var newSelectionStart = this.searchWordBoundary(selectionStart, -1), newSelectionEnd = this.searchWordBoundary(selectionStart, 1);
        this.selectionStart = newSelectionStart;
        this.selectionEnd = newSelectionEnd;
        this._fireSelectionChanged();
        this._updateTextarea();
        this.renderCursorOrSelection();
      },
      selectLine: function(selectionStart) {
        selectionStart = selectionStart || this.selectionStart;
        var newSelectionStart = this.findLineBoundaryLeft(selectionStart), newSelectionEnd = this.findLineBoundaryRight(selectionStart);
        this.selectionStart = newSelectionStart;
        this.selectionEnd = newSelectionEnd;
        this._fireSelectionChanged();
        this._updateTextarea();
        return this;
      },
      enterEditing: function(e) {
        if (this.isEditing || !this.editable) {
          return;
        }
        if (this.canvas) {
          this.canvas.calcOffset();
          this.exitEditingOnOthers(this.canvas);
        }
        this.isEditing = true;
        this.initHiddenTextarea(e);
        this.hiddenTextarea.focus();
        this.hiddenTextarea.value = this.text;
        this._updateTextarea();
        this._saveEditingProps();
        this._setEditingProps();
        this._textBeforeEdit = this.text;
        this._tick();
        this.fire("editing:entered");
        this._fireSelectionChanged();
        if (!this.canvas) {
          return this;
        }
        this.canvas.fire("text:editing:entered", { target: this });
        this.initMouseMoveHandler();
        this.canvas.requestRenderAll();
        return this;
      },
      exitEditingOnOthers: function(canvas2) {
        if (canvas2._iTextInstances) {
          canvas2._iTextInstances.forEach(function(obj) {
            obj.selected = false;
            if (obj.isEditing) {
              obj.exitEditing();
            }
          });
        }
      },
      initMouseMoveHandler: function() {
        this.canvas.on("mouse:move", this.mouseMoveHandler);
      },
      mouseMoveHandler: function(options) {
        if (!this.__isMousedown || !this.isEditing) {
          return;
        }
        document.activeElement !== this.hiddenTextarea && this.hiddenTextarea.focus();
        var newSelectionStart = this.getSelectionStartFromPointer(options.e), currentStart = this.selectionStart, currentEnd = this.selectionEnd;
        if ((newSelectionStart !== this.__selectionStartOnMouseDown || currentStart === currentEnd) && (currentStart === newSelectionStart || currentEnd === newSelectionStart)) {
          return;
        }
        if (newSelectionStart > this.__selectionStartOnMouseDown) {
          this.selectionStart = this.__selectionStartOnMouseDown;
          this.selectionEnd = newSelectionStart;
        } else {
          this.selectionStart = newSelectionStart;
          this.selectionEnd = this.__selectionStartOnMouseDown;
        }
        if (this.selectionStart !== currentStart || this.selectionEnd !== currentEnd) {
          this.restartCursorIfNeeded();
          this._fireSelectionChanged();
          this._updateTextarea();
          this.renderCursorOrSelection();
        }
      },
      _setEditingProps: function() {
        this.hoverCursor = "text";
        if (this.canvas) {
          this.canvas.defaultCursor = this.canvas.moveCursor = "text";
        }
        this.borderColor = this.editingBorderColor;
        this.hasControls = this.selectable = false;
        this.lockMovementX = this.lockMovementY = true;
      },
      fromStringToGraphemeSelection: function(start, end, text) {
        var smallerTextStart = text.slice(0, start), graphemeStart = fabric2.util.string.graphemeSplit(smallerTextStart).length;
        if (start === end) {
          return { selectionStart: graphemeStart, selectionEnd: graphemeStart };
        }
        var smallerTextEnd = text.slice(start, end), graphemeEnd = fabric2.util.string.graphemeSplit(smallerTextEnd).length;
        return { selectionStart: graphemeStart, selectionEnd: graphemeStart + graphemeEnd };
      },
      fromGraphemeToStringSelection: function(start, end, _text) {
        var smallerTextStart = _text.slice(0, start), graphemeStart = smallerTextStart.join("").length;
        if (start === end) {
          return { selectionStart: graphemeStart, selectionEnd: graphemeStart };
        }
        var smallerTextEnd = _text.slice(start, end), graphemeEnd = smallerTextEnd.join("").length;
        return { selectionStart: graphemeStart, selectionEnd: graphemeStart + graphemeEnd };
      },
      _updateTextarea: function() {
        this.cursorOffsetCache = {};
        if (!this.hiddenTextarea) {
          return;
        }
        if (!this.inCompositionMode) {
          var newSelection = this.fromGraphemeToStringSelection(this.selectionStart, this.selectionEnd, this._text);
          this.hiddenTextarea.selectionStart = newSelection.selectionStart;
          this.hiddenTextarea.selectionEnd = newSelection.selectionEnd;
        }
        this.updateTextareaPosition();
      },
      updateFromTextArea: function() {
        if (!this.hiddenTextarea) {
          return;
        }
        this.cursorOffsetCache = {};
        this.text = this.hiddenTextarea.value;
        if (this._shouldClearDimensionCache()) {
          this.initDimensions();
          this.setCoords();
        }
        var newSelection = this.fromStringToGraphemeSelection(
          this.hiddenTextarea.selectionStart,
          this.hiddenTextarea.selectionEnd,
          this.hiddenTextarea.value
        );
        this.selectionEnd = this.selectionStart = newSelection.selectionEnd;
        if (!this.inCompositionMode) {
          this.selectionStart = newSelection.selectionStart;
        }
        this.updateTextareaPosition();
      },
      updateTextareaPosition: function() {
        if (this.selectionStart === this.selectionEnd) {
          var style = this._calcTextareaPosition();
          this.hiddenTextarea.style.left = style.left;
          this.hiddenTextarea.style.top = style.top;
        }
      },
      _calcTextareaPosition: function() {
        if (!this.canvas) {
          return { x: 1, y: 1 };
        }
        var desiredPosition = this.inCompositionMode ? this.compositionStart : this.selectionStart, boundaries = this._getCursorBoundaries(desiredPosition), cursorLocation = this.get2DCursorLocation(desiredPosition), lineIndex = cursorLocation.lineIndex, charIndex = cursorLocation.charIndex, charHeight = this.getValueOfPropertyAt(lineIndex, charIndex, "fontSize") * this.lineHeight, leftOffset = boundaries.leftOffset, m = this.calcTransformMatrix(), p = {
          x: boundaries.left + leftOffset,
          y: boundaries.top + boundaries.topOffset + charHeight
        }, retinaScaling = this.canvas.getRetinaScaling(), upperCanvas = this.canvas.upperCanvasEl, upperCanvasWidth = upperCanvas.width / retinaScaling, upperCanvasHeight = upperCanvas.height / retinaScaling, maxWidth = upperCanvasWidth - charHeight, maxHeight = upperCanvasHeight - charHeight, scaleX = upperCanvas.clientWidth / upperCanvasWidth, scaleY = upperCanvas.clientHeight / upperCanvasHeight;
        p = fabric2.util.transformPoint(p, m);
        p = fabric2.util.transformPoint(p, this.canvas.viewportTransform);
        p.x *= scaleX;
        p.y *= scaleY;
        if (p.x < 0) {
          p.x = 0;
        }
        if (p.x > maxWidth) {
          p.x = maxWidth;
        }
        if (p.y < 0) {
          p.y = 0;
        }
        if (p.y > maxHeight) {
          p.y = maxHeight;
        }
        p.x += this.canvas._offset.left;
        p.y += this.canvas._offset.top;
        return { left: p.x + "px", top: p.y + "px", fontSize: charHeight + "px", charHeight };
      },
      _saveEditingProps: function() {
        this._savedProps = {
          hasControls: this.hasControls,
          borderColor: this.borderColor,
          lockMovementX: this.lockMovementX,
          lockMovementY: this.lockMovementY,
          hoverCursor: this.hoverCursor,
          selectable: this.selectable,
          defaultCursor: this.canvas && this.canvas.defaultCursor,
          moveCursor: this.canvas && this.canvas.moveCursor
        };
      },
      _restoreEditingProps: function() {
        if (!this._savedProps) {
          return;
        }
        this.hoverCursor = this._savedProps.hoverCursor;
        this.hasControls = this._savedProps.hasControls;
        this.borderColor = this._savedProps.borderColor;
        this.selectable = this._savedProps.selectable;
        this.lockMovementX = this._savedProps.lockMovementX;
        this.lockMovementY = this._savedProps.lockMovementY;
        if (this.canvas) {
          this.canvas.defaultCursor = this._savedProps.defaultCursor;
          this.canvas.moveCursor = this._savedProps.moveCursor;
        }
      },
      exitEditing: function() {
        var isTextChanged = this._textBeforeEdit !== this.text;
        var hiddenTextarea = this.hiddenTextarea;
        this.selected = false;
        this.isEditing = false;
        this.selectionEnd = this.selectionStart;
        if (hiddenTextarea) {
          hiddenTextarea.blur && hiddenTextarea.blur();
          hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
        }
        this.hiddenTextarea = null;
        this.abortCursorAnimation();
        this._restoreEditingProps();
        this._currentCursorOpacity = 0;
        if (this._shouldClearDimensionCache()) {
          this.initDimensions();
          this.setCoords();
        }
        this.fire("editing:exited");
        isTextChanged && this.fire("modified");
        if (this.canvas) {
          this.canvas.off("mouse:move", this.mouseMoveHandler);
          this.canvas.fire("text:editing:exited", { target: this });
          isTextChanged && this.canvas.fire("object:modified", { target: this });
        }
        return this;
      },
      _removeExtraneousStyles: function() {
        for (var prop in this.styles) {
          if (!this._textLines[prop]) {
            delete this.styles[prop];
          }
        }
      },
      removeStyleFromTo: function(start, end) {
        var cursorStart = this.get2DCursorLocation(start, true), cursorEnd = this.get2DCursorLocation(end, true), lineStart = cursorStart.lineIndex, charStart = cursorStart.charIndex, lineEnd = cursorEnd.lineIndex, charEnd = cursorEnd.charIndex, i, styleObj;
        if (lineStart !== lineEnd) {
          if (this.styles[lineStart]) {
            for (i = charStart; i < this._unwrappedTextLines[lineStart].length; i++) {
              delete this.styles[lineStart][i];
            }
          }
          if (this.styles[lineEnd]) {
            for (i = charEnd; i < this._unwrappedTextLines[lineEnd].length; i++) {
              styleObj = this.styles[lineEnd][i];
              if (styleObj) {
                this.styles[lineStart] || (this.styles[lineStart] = {});
                this.styles[lineStart][charStart + i - charEnd] = styleObj;
              }
            }
          }
          for (i = lineStart + 1; i <= lineEnd; i++) {
            delete this.styles[i];
          }
          this.shiftLineStyles(lineEnd, lineStart - lineEnd);
        } else {
          if (this.styles[lineStart]) {
            styleObj = this.styles[lineStart];
            var diff = charEnd - charStart, numericChar, _char;
            for (i = charStart; i < charEnd; i++) {
              delete styleObj[i];
            }
            for (_char in this.styles[lineStart]) {
              numericChar = parseInt(_char, 10);
              if (numericChar >= charEnd) {
                styleObj[numericChar - diff] = styleObj[_char];
                delete styleObj[_char];
              }
            }
          }
        }
      },
      shiftLineStyles: function(lineIndex, offset) {
        var clonedStyles = clone(this.styles);
        for (var line in this.styles) {
          var numericLine = parseInt(line, 10);
          if (numericLine > lineIndex) {
            this.styles[numericLine + offset] = clonedStyles[numericLine];
            if (!clonedStyles[numericLine - offset]) {
              delete this.styles[numericLine];
            }
          }
        }
      },
      restartCursorIfNeeded: function() {
        if (!this._currentTickState || this._currentTickState.isAborted || !this._currentTickCompleteState || this._currentTickCompleteState.isAborted) {
          this.initDelayedCursor();
        }
      },
      insertNewlineStyleObject: function(lineIndex, charIndex, qty, copiedStyle) {
        var currentCharStyle, newLineStyles = {}, somethingAdded = false, isEndOfLine = this._unwrappedTextLines[lineIndex].length === charIndex;
        qty || (qty = 1);
        this.shiftLineStyles(lineIndex, qty);
        if (this.styles[lineIndex]) {
          currentCharStyle = this.styles[lineIndex][charIndex === 0 ? charIndex : charIndex - 1];
        }
        for (var index in this.styles[lineIndex]) {
          var numIndex = parseInt(index, 10);
          if (numIndex >= charIndex) {
            somethingAdded = true;
            newLineStyles[numIndex - charIndex] = this.styles[lineIndex][index];
            if (!(isEndOfLine && charIndex === 0)) {
              delete this.styles[lineIndex][index];
            }
          }
        }
        var styleCarriedOver = false;
        if (somethingAdded && !isEndOfLine) {
          this.styles[lineIndex + qty] = newLineStyles;
          styleCarriedOver = true;
        }
        if (styleCarriedOver) {
          qty--;
        }
        while (qty > 0) {
          if (copiedStyle && copiedStyle[qty - 1]) {
            this.styles[lineIndex + qty] = { 0: clone(copiedStyle[qty - 1]) };
          } else if (currentCharStyle) {
            this.styles[lineIndex + qty] = { 0: clone(currentCharStyle) };
          } else {
            delete this.styles[lineIndex + qty];
          }
          qty--;
        }
        this._forceClearCache = true;
      },
      insertCharStyleObject: function(lineIndex, charIndex, quantity, copiedStyle) {
        if (!this.styles) {
          this.styles = {};
        }
        var currentLineStyles = this.styles[lineIndex], currentLineStylesCloned = currentLineStyles ? clone(currentLineStyles) : {};
        quantity || (quantity = 1);
        for (var index in currentLineStylesCloned) {
          var numericIndex = parseInt(index, 10);
          if (numericIndex >= charIndex) {
            currentLineStyles[numericIndex + quantity] = currentLineStylesCloned[numericIndex];
            if (!currentLineStylesCloned[numericIndex - quantity]) {
              delete currentLineStyles[numericIndex];
            }
          }
        }
        this._forceClearCache = true;
        if (copiedStyle) {
          while (quantity--) {
            if (!Object.keys(copiedStyle[quantity]).length) {
              continue;
            }
            if (!this.styles[lineIndex]) {
              this.styles[lineIndex] = {};
            }
            this.styles[lineIndex][charIndex + quantity] = clone(copiedStyle[quantity]);
          }
          return;
        }
        if (!currentLineStyles) {
          return;
        }
        var newStyle = currentLineStyles[charIndex ? charIndex - 1 : 1];
        while (newStyle && quantity--) {
          this.styles[lineIndex][charIndex + quantity] = clone(newStyle);
        }
      },
      insertNewStyleBlock: function(insertedText, start, copiedStyle) {
        var cursorLoc = this.get2DCursorLocation(start, true), addedLines = [0], linesLength = 0;
        for (var i = 0; i < insertedText.length; i++) {
          if (insertedText[i] === "\n") {
            linesLength++;
            addedLines[linesLength] = 0;
          } else {
            addedLines[linesLength]++;
          }
        }
        if (addedLines[0] > 0) {
          this.insertCharStyleObject(cursorLoc.lineIndex, cursorLoc.charIndex, addedLines[0], copiedStyle);
          copiedStyle = copiedStyle && copiedStyle.slice(addedLines[0] + 1);
        }
        linesLength && this.insertNewlineStyleObject(
          cursorLoc.lineIndex,
          cursorLoc.charIndex + addedLines[0],
          linesLength
        );
        for (var i = 1; i < linesLength; i++) {
          if (addedLines[i] > 0) {
            this.insertCharStyleObject(cursorLoc.lineIndex + i, 0, addedLines[i], copiedStyle);
          } else if (copiedStyle) {
            if (this.styles[cursorLoc.lineIndex + i] && copiedStyle[0]) {
              this.styles[cursorLoc.lineIndex + i][0] = copiedStyle[0];
            }
          }
          copiedStyle = copiedStyle && copiedStyle.slice(addedLines[i] + 1);
        }
        if (addedLines[i] > 0) {
          this.insertCharStyleObject(cursorLoc.lineIndex + i, 0, addedLines[i], copiedStyle);
        }
      },
      setSelectionStartEndWithShift: function(start, end, newSelection) {
        if (newSelection <= start) {
          if (end === start) {
            this._selectionDirection = "left";
          } else if (this._selectionDirection === "right") {
            this._selectionDirection = "left";
            this.selectionEnd = start;
          }
          this.selectionStart = newSelection;
        } else if (newSelection > start && newSelection < end) {
          if (this._selectionDirection === "right") {
            this.selectionEnd = newSelection;
          } else {
            this.selectionStart = newSelection;
          }
        } else {
          if (end === start) {
            this._selectionDirection = "right";
          } else if (this._selectionDirection === "left") {
            this._selectionDirection = "right";
            this.selectionStart = end;
          }
          this.selectionEnd = newSelection;
        }
      },
      setSelectionInBoundaries: function() {
        var length = this.text.length;
        if (this.selectionStart > length) {
          this.selectionStart = length;
        } else if (this.selectionStart < 0) {
          this.selectionStart = 0;
        }
        if (this.selectionEnd > length) {
          this.selectionEnd = length;
        } else if (this.selectionEnd < 0) {
          this.selectionEnd = 0;
        }
      }
    });
  })();
  fabric2.util.object.extend(fabric2.IText.prototype, {
    initDoubleClickSimulation: function() {
      this.__lastClickTime = +new Date();
      this.__lastLastClickTime = +new Date();
      this.__lastPointer = {};
      this.on("mousedown", this.onMouseDown);
    },
    onMouseDown: function(options) {
      if (!this.canvas) {
        return;
      }
      this.__newClickTime = +new Date();
      var newPointer = options.pointer;
      if (this.isTripleClick(newPointer)) {
        this.fire("tripleclick", options);
        this._stopEvent(options.e);
      }
      this.__lastLastClickTime = this.__lastClickTime;
      this.__lastClickTime = this.__newClickTime;
      this.__lastPointer = newPointer;
      this.__lastIsEditing = this.isEditing;
      this.__lastSelected = this.selected;
    },
    isTripleClick: function(newPointer) {
      return this.__newClickTime - this.__lastClickTime < 500 && this.__lastClickTime - this.__lastLastClickTime < 500 && this.__lastPointer.x === newPointer.x && this.__lastPointer.y === newPointer.y;
    },
    _stopEvent: function(e) {
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
    },
    initCursorSelectionHandlers: function() {
      this.initMousedownHandler();
      this.initMouseupHandler();
      this.initClicks();
    },
    doubleClickHandler: function(options) {
      if (!this.isEditing) {
        return;
      }
      this.selectWord(this.getSelectionStartFromPointer(options.e));
    },
    tripleClickHandler: function(options) {
      if (!this.isEditing) {
        return;
      }
      this.selectLine(this.getSelectionStartFromPointer(options.e));
    },
    initClicks: function() {
      this.on("mousedblclick", this.doubleClickHandler);
      this.on("tripleclick", this.tripleClickHandler);
    },
    _mouseDownHandler: function(options) {
      if (!this.canvas || !this.editable || options.e.button && options.e.button !== 1) {
        return;
      }
      this.__isMousedown = true;
      if (this.selected) {
        this.inCompositionMode = false;
        this.setCursorByClick(options.e);
      }
      if (this.isEditing) {
        this.__selectionStartOnMouseDown = this.selectionStart;
        if (this.selectionStart === this.selectionEnd) {
          this.abortCursorAnimation();
        }
        this.renderCursorOrSelection();
      }
    },
    _mouseDownHandlerBefore: function(options) {
      if (!this.canvas || !this.editable || options.e.button && options.e.button !== 1) {
        return;
      }
      this.selected = this === this.canvas._activeObject;
    },
    initMousedownHandler: function() {
      this.on("mousedown", this._mouseDownHandler);
      this.on("mousedown:before", this._mouseDownHandlerBefore);
    },
    initMouseupHandler: function() {
      this.on("mouseup", this.mouseUpHandler);
    },
    mouseUpHandler: function(options) {
      this.__isMousedown = false;
      if (!this.editable || this.group || options.transform && options.transform.actionPerformed || options.e.button && options.e.button !== 1) {
        return;
      }
      if (this.canvas) {
        var currentActive = this.canvas._activeObject;
        if (currentActive && currentActive !== this) {
          return;
        }
      }
      if (this.__lastSelected && !this.__corner) {
        this.selected = false;
        this.__lastSelected = false;
        this.enterEditing(options.e);
        if (this.selectionStart === this.selectionEnd) {
          this.initDelayedCursor(true);
        } else {
          this.renderCursorOrSelection();
        }
      } else {
        this.selected = true;
      }
    },
    setCursorByClick: function(e) {
      var newSelection = this.getSelectionStartFromPointer(e), start = this.selectionStart, end = this.selectionEnd;
      if (e.shiftKey) {
        this.setSelectionStartEndWithShift(start, end, newSelection);
      } else {
        this.selectionStart = newSelection;
        this.selectionEnd = newSelection;
      }
      if (this.isEditing) {
        this._fireSelectionChanged();
        this._updateTextarea();
      }
    },
    getSelectionStartFromPointer: function(e) {
      var mouseOffset = this.getLocalPointer(e), prevWidth = 0, width = 0, height = 0, charIndex = 0, lineIndex = 0, lineLeftOffset, line;
      for (var i = 0, len = this._textLines.length; i < len; i++) {
        if (height <= mouseOffset.y) {
          height += this.getHeightOfLine(i) * this.scaleY;
          lineIndex = i;
          if (i > 0) {
            charIndex += this._textLines[i - 1].length + this.missingNewlineOffset(i - 1);
          }
        } else {
          break;
        }
      }
      lineLeftOffset = this._getLineLeftOffset(lineIndex);
      width = lineLeftOffset * this.scaleX;
      line = this._textLines[lineIndex];
      if (this.direction === "rtl") {
        mouseOffset.x = this.width * this.scaleX - mouseOffset.x + width;
      }
      for (var j = 0, jlen = line.length; j < jlen; j++) {
        prevWidth = width;
        width += this.__charBounds[lineIndex][j].kernedWidth * this.scaleX;
        if (width <= mouseOffset.x) {
          charIndex++;
        } else {
          break;
        }
      }
      return this._getNewSelectionStartFromOffset(mouseOffset, prevWidth, width, charIndex, jlen);
    },
    _getNewSelectionStartFromOffset: function(mouseOffset, prevWidth, width, index, jlen) {
      var distanceBtwLastCharAndCursor = mouseOffset.x - prevWidth, distanceBtwNextCharAndCursor = width - mouseOffset.x, offset = distanceBtwNextCharAndCursor > distanceBtwLastCharAndCursor || distanceBtwNextCharAndCursor < 0 ? 0 : 1, newSelectionStart = index + offset;
      if (this.flipX) {
        newSelectionStart = jlen - newSelectionStart;
      }
      if (newSelectionStart > this._text.length) {
        newSelectionStart = this._text.length;
      }
      return newSelectionStart;
    }
  });
  fabric2.util.object.extend(fabric2.IText.prototype, {
    initHiddenTextarea: function() {
      this.hiddenTextarea = fabric2.document.createElement("textarea");
      this.hiddenTextarea.setAttribute("autocapitalize", "off");
      this.hiddenTextarea.setAttribute("autocorrect", "off");
      this.hiddenTextarea.setAttribute("autocomplete", "off");
      this.hiddenTextarea.setAttribute("spellcheck", "false");
      this.hiddenTextarea.setAttribute("data-fabric-hiddentextarea", "");
      this.hiddenTextarea.setAttribute("wrap", "off");
      var style = this._calcTextareaPosition();
      this.hiddenTextarea.style.cssText = "position: absolute; top: " + style.top + "; left: " + style.left + "; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px; padding-top: " + style.fontSize + ";";
      if (this.hiddenTextareaContainer) {
        this.hiddenTextareaContainer.appendChild(this.hiddenTextarea);
      } else {
        fabric2.document.body.appendChild(this.hiddenTextarea);
      }
      fabric2.util.addListener(this.hiddenTextarea, "keydown", this.onKeyDown.bind(this));
      fabric2.util.addListener(this.hiddenTextarea, "keyup", this.onKeyUp.bind(this));
      fabric2.util.addListener(this.hiddenTextarea, "input", this.onInput.bind(this));
      fabric2.util.addListener(this.hiddenTextarea, "copy", this.copy.bind(this));
      fabric2.util.addListener(this.hiddenTextarea, "cut", this.copy.bind(this));
      fabric2.util.addListener(this.hiddenTextarea, "paste", this.paste.bind(this));
      fabric2.util.addListener(this.hiddenTextarea, "compositionstart", this.onCompositionStart.bind(this));
      fabric2.util.addListener(this.hiddenTextarea, "compositionupdate", this.onCompositionUpdate.bind(this));
      fabric2.util.addListener(this.hiddenTextarea, "compositionend", this.onCompositionEnd.bind(this));
      if (!this._clickHandlerInitialized && this.canvas) {
        fabric2.util.addListener(this.canvas.upperCanvasEl, "click", this.onClick.bind(this));
        this._clickHandlerInitialized = true;
      }
    },
    keysMap: {
      9: "exitEditing",
      27: "exitEditing",
      33: "moveCursorUp",
      34: "moveCursorDown",
      35: "moveCursorRight",
      36: "moveCursorLeft",
      37: "moveCursorLeft",
      38: "moveCursorUp",
      39: "moveCursorRight",
      40: "moveCursorDown"
    },
    keysMapRtl: {
      9: "exitEditing",
      27: "exitEditing",
      33: "moveCursorUp",
      34: "moveCursorDown",
      35: "moveCursorLeft",
      36: "moveCursorRight",
      37: "moveCursorRight",
      38: "moveCursorUp",
      39: "moveCursorLeft",
      40: "moveCursorDown"
    },
    ctrlKeysMapUp: {
      67: "copy",
      88: "cut"
    },
    ctrlKeysMapDown: {
      65: "selectAll"
    },
    onClick: function() {
      this.hiddenTextarea && this.hiddenTextarea.focus();
    },
    onKeyDown: function(e) {
      if (!this.isEditing) {
        return;
      }
      var keyMap = this.direction === "rtl" ? this.keysMapRtl : this.keysMap;
      if (e.keyCode in keyMap) {
        this[keyMap[e.keyCode]](e);
      } else if (e.keyCode in this.ctrlKeysMapDown && (e.ctrlKey || e.metaKey)) {
        this[this.ctrlKeysMapDown[e.keyCode]](e);
      } else {
        return;
      }
      e.stopImmediatePropagation();
      e.preventDefault();
      if (e.keyCode >= 33 && e.keyCode <= 40) {
        this.inCompositionMode = false;
        this.clearContextTop();
        this.renderCursorOrSelection();
      } else {
        this.canvas && this.canvas.requestRenderAll();
      }
    },
    onKeyUp: function(e) {
      if (!this.isEditing || this._copyDone || this.inCompositionMode) {
        this._copyDone = false;
        return;
      }
      if (e.keyCode in this.ctrlKeysMapUp && (e.ctrlKey || e.metaKey)) {
        this[this.ctrlKeysMapUp[e.keyCode]](e);
      } else {
        return;
      }
      e.stopImmediatePropagation();
      e.preventDefault();
      this.canvas && this.canvas.requestRenderAll();
    },
    onInput: function(e) {
      var fromPaste = this.fromPaste;
      this.fromPaste = false;
      e && e.stopPropagation();
      if (!this.isEditing) {
        return;
      }
      var nextText = this._splitTextIntoLines(this.hiddenTextarea.value).graphemeText, charCount = this._text.length, nextCharCount = nextText.length, removedText, insertedText, charDiff = nextCharCount - charCount, selectionStart = this.selectionStart, selectionEnd = this.selectionEnd, selection = selectionStart !== selectionEnd, copiedStyle, removeFrom, removeTo;
      if (this.hiddenTextarea.value === "") {
        this.styles = {};
        this.updateFromTextArea();
        this.fire("changed");
        if (this.canvas) {
          this.canvas.fire("text:changed", { target: this });
          this.canvas.requestRenderAll();
        }
        return;
      }
      var textareaSelection = this.fromStringToGraphemeSelection(
        this.hiddenTextarea.selectionStart,
        this.hiddenTextarea.selectionEnd,
        this.hiddenTextarea.value
      );
      var backDelete = selectionStart > textareaSelection.selectionStart;
      if (selection) {
        removedText = this._text.slice(selectionStart, selectionEnd);
        charDiff += selectionEnd - selectionStart;
      } else if (nextCharCount < charCount) {
        if (backDelete) {
          removedText = this._text.slice(selectionEnd + charDiff, selectionEnd);
        } else {
          removedText = this._text.slice(selectionStart, selectionStart - charDiff);
        }
      }
      insertedText = nextText.slice(textareaSelection.selectionEnd - charDiff, textareaSelection.selectionEnd);
      if (removedText && removedText.length) {
        if (insertedText.length) {
          copiedStyle = this.getSelectionStyles(selectionStart, selectionStart + 1, false);
          copiedStyle = insertedText.map(function() {
            return copiedStyle[0];
          });
        }
        if (selection) {
          removeFrom = selectionStart;
          removeTo = selectionEnd;
        } else if (backDelete) {
          removeFrom = selectionEnd - removedText.length;
          removeTo = selectionEnd;
        } else {
          removeFrom = selectionEnd;
          removeTo = selectionEnd + removedText.length;
        }
        this.removeStyleFromTo(removeFrom, removeTo);
      }
      if (insertedText.length) {
        if (fromPaste && insertedText.join("") === fabric2.copiedText && !fabric2.disableStyleCopyPaste) {
          copiedStyle = fabric2.copiedTextStyle;
        }
        this.insertNewStyleBlock(insertedText, selectionStart, copiedStyle);
      }
      this.updateFromTextArea();
      this.fire("changed");
      if (this.canvas) {
        this.canvas.fire("text:changed", { target: this });
        this.canvas.requestRenderAll();
      }
    },
    onCompositionStart: function() {
      this.inCompositionMode = true;
    },
    onCompositionEnd: function() {
      this.inCompositionMode = false;
    },
    onCompositionUpdate: function(e) {
      this.compositionStart = e.target.selectionStart;
      this.compositionEnd = e.target.selectionEnd;
      this.updateTextareaPosition();
    },
    copy: function() {
      if (this.selectionStart === this.selectionEnd) {
        return;
      }
      fabric2.copiedText = this.getSelectedText();
      if (!fabric2.disableStyleCopyPaste) {
        fabric2.copiedTextStyle = this.getSelectionStyles(this.selectionStart, this.selectionEnd, true);
      } else {
        fabric2.copiedTextStyle = null;
      }
      this._copyDone = true;
    },
    paste: function() {
      this.fromPaste = true;
    },
    _getClipboardData: function(e) {
      return e && e.clipboardData || fabric2.window.clipboardData;
    },
    _getWidthBeforeCursor: function(lineIndex, charIndex) {
      var widthBeforeCursor = this._getLineLeftOffset(lineIndex), bound;
      if (charIndex > 0) {
        bound = this.__charBounds[lineIndex][charIndex - 1];
        widthBeforeCursor += bound.left + bound.width;
      }
      return widthBeforeCursor;
    },
    getDownCursorOffset: function(e, isRight) {
      var selectionProp = this._getSelectionForOffset(e, isRight), cursorLocation = this.get2DCursorLocation(selectionProp), lineIndex = cursorLocation.lineIndex;
      if (lineIndex === this._textLines.length - 1 || e.metaKey || e.keyCode === 34) {
        return this._text.length - selectionProp;
      }
      var charIndex = cursorLocation.charIndex, widthBeforeCursor = this._getWidthBeforeCursor(lineIndex, charIndex), indexOnOtherLine = this._getIndexOnLine(lineIndex + 1, widthBeforeCursor), textAfterCursor = this._textLines[lineIndex].slice(charIndex);
      return textAfterCursor.length + indexOnOtherLine + 1 + this.missingNewlineOffset(lineIndex);
    },
    _getSelectionForOffset: function(e, isRight) {
      if (e.shiftKey && this.selectionStart !== this.selectionEnd && isRight) {
        return this.selectionEnd;
      } else {
        return this.selectionStart;
      }
    },
    getUpCursorOffset: function(e, isRight) {
      var selectionProp = this._getSelectionForOffset(e, isRight), cursorLocation = this.get2DCursorLocation(selectionProp), lineIndex = cursorLocation.lineIndex;
      if (lineIndex === 0 || e.metaKey || e.keyCode === 33) {
        return -selectionProp;
      }
      var charIndex = cursorLocation.charIndex, widthBeforeCursor = this._getWidthBeforeCursor(lineIndex, charIndex), indexOnOtherLine = this._getIndexOnLine(lineIndex - 1, widthBeforeCursor), textBeforeCursor = this._textLines[lineIndex].slice(0, charIndex), missingNewlineOffset = this.missingNewlineOffset(lineIndex - 1);
      return -this._textLines[lineIndex - 1].length + indexOnOtherLine - textBeforeCursor.length + (1 - missingNewlineOffset);
    },
    _getIndexOnLine: function(lineIndex, width) {
      var line = this._textLines[lineIndex], lineLeftOffset = this._getLineLeftOffset(lineIndex), widthOfCharsOnLine = lineLeftOffset, indexOnLine = 0, charWidth, foundMatch;
      for (var j = 0, jlen = line.length; j < jlen; j++) {
        charWidth = this.__charBounds[lineIndex][j].width;
        widthOfCharsOnLine += charWidth;
        if (widthOfCharsOnLine > width) {
          foundMatch = true;
          var leftEdge = widthOfCharsOnLine - charWidth, rightEdge = widthOfCharsOnLine, offsetFromLeftEdge = Math.abs(leftEdge - width), offsetFromRightEdge = Math.abs(rightEdge - width);
          indexOnLine = offsetFromRightEdge < offsetFromLeftEdge ? j : j - 1;
          break;
        }
      }
      if (!foundMatch) {
        indexOnLine = line.length - 1;
      }
      return indexOnLine;
    },
    moveCursorDown: function(e) {
      if (this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length) {
        return;
      }
      this._moveCursorUpOrDown("Down", e);
    },
    moveCursorUp: function(e) {
      if (this.selectionStart === 0 && this.selectionEnd === 0) {
        return;
      }
      this._moveCursorUpOrDown("Up", e);
    },
    _moveCursorUpOrDown: function(direction, e) {
      var action = "get" + direction + "CursorOffset", offset = this[action](e, this._selectionDirection === "right");
      if (e.shiftKey) {
        this.moveCursorWithShift(offset);
      } else {
        this.moveCursorWithoutShift(offset);
      }
      if (offset !== 0) {
        this.setSelectionInBoundaries();
        this.abortCursorAnimation();
        this._currentCursorOpacity = 1;
        this.initDelayedCursor();
        this._fireSelectionChanged();
        this._updateTextarea();
      }
    },
    moveCursorWithShift: function(offset) {
      var newSelection = this._selectionDirection === "left" ? this.selectionStart + offset : this.selectionEnd + offset;
      this.setSelectionStartEndWithShift(this.selectionStart, this.selectionEnd, newSelection);
      return offset !== 0;
    },
    moveCursorWithoutShift: function(offset) {
      if (offset < 0) {
        this.selectionStart += offset;
        this.selectionEnd = this.selectionStart;
      } else {
        this.selectionEnd += offset;
        this.selectionStart = this.selectionEnd;
      }
      return offset !== 0;
    },
    moveCursorLeft: function(e) {
      if (this.selectionStart === 0 && this.selectionEnd === 0) {
        return;
      }
      this._moveCursorLeftOrRight("Left", e);
    },
    _move: function(e, prop, direction) {
      var newValue;
      if (e.altKey) {
        newValue = this["findWordBoundary" + direction](this[prop]);
      } else if (e.metaKey || e.keyCode === 35 || e.keyCode === 36) {
        newValue = this["findLineBoundary" + direction](this[prop]);
      } else {
        this[prop] += direction === "Left" ? -1 : 1;
        return true;
      }
      if (typeof newValue !== "undefined" && this[prop] !== newValue) {
        this[prop] = newValue;
        return true;
      }
    },
    _moveLeft: function(e, prop) {
      return this._move(e, prop, "Left");
    },
    _moveRight: function(e, prop) {
      return this._move(e, prop, "Right");
    },
    moveCursorLeftWithoutShift: function(e) {
      var change = true;
      this._selectionDirection = "left";
      if (this.selectionEnd === this.selectionStart && this.selectionStart !== 0) {
        change = this._moveLeft(e, "selectionStart");
      }
      this.selectionEnd = this.selectionStart;
      return change;
    },
    moveCursorLeftWithShift: function(e) {
      if (this._selectionDirection === "right" && this.selectionStart !== this.selectionEnd) {
        return this._moveLeft(e, "selectionEnd");
      } else if (this.selectionStart !== 0) {
        this._selectionDirection = "left";
        return this._moveLeft(e, "selectionStart");
      }
    },
    moveCursorRight: function(e) {
      if (this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length) {
        return;
      }
      this._moveCursorLeftOrRight("Right", e);
    },
    _moveCursorLeftOrRight: function(direction, e) {
      var actionName = "moveCursor" + direction + "With";
      this._currentCursorOpacity = 1;
      if (e.shiftKey) {
        actionName += "Shift";
      } else {
        actionName += "outShift";
      }
      if (this[actionName](e)) {
        this.abortCursorAnimation();
        this.initDelayedCursor();
        this._fireSelectionChanged();
        this._updateTextarea();
      }
    },
    moveCursorRightWithShift: function(e) {
      if (this._selectionDirection === "left" && this.selectionStart !== this.selectionEnd) {
        return this._moveRight(e, "selectionStart");
      } else if (this.selectionEnd !== this._text.length) {
        this._selectionDirection = "right";
        return this._moveRight(e, "selectionEnd");
      }
    },
    moveCursorRightWithoutShift: function(e) {
      var changed = true;
      this._selectionDirection = "right";
      if (this.selectionStart === this.selectionEnd) {
        changed = this._moveRight(e, "selectionStart");
        this.selectionEnd = this.selectionStart;
      } else {
        this.selectionStart = this.selectionEnd;
      }
      return changed;
    },
    removeChars: function(start, end) {
      if (typeof end === "undefined") {
        end = start + 1;
      }
      this.removeStyleFromTo(start, end);
      this._text.splice(start, end - start);
      this.text = this._text.join("");
      this.set("dirty", true);
      if (this._shouldClearDimensionCache()) {
        this.initDimensions();
        this.setCoords();
      }
      this._removeExtraneousStyles();
    },
    insertChars: function(text, style, start, end) {
      if (typeof end === "undefined") {
        end = start;
      }
      if (end > start) {
        this.removeStyleFromTo(start, end);
      }
      var graphemes = fabric2.util.string.graphemeSplit(text);
      this.insertNewStyleBlock(graphemes, start, style);
      this._text = [].concat(this._text.slice(0, start), graphemes, this._text.slice(end));
      this.text = this._text.join("");
      this.set("dirty", true);
      if (this._shouldClearDimensionCache()) {
        this.initDimensions();
        this.setCoords();
      }
      this._removeExtraneousStyles();
    }
  });
  (function() {
    var toFixed = fabric2.util.toFixed, multipleSpacesRegex = /  +/g;
    fabric2.util.object.extend(fabric2.Text.prototype, {
      _toSVG: function() {
        var offsets = this._getSVGLeftTopOffsets(), textAndBg = this._getSVGTextAndBg(offsets.textTop, offsets.textLeft);
        return this._wrapSVGTextAndBg(textAndBg);
      },
      toSVG: function(reviver) {
        return this._createBaseSVGMarkup(
          this._toSVG(),
          { reviver, noStyle: true, withShadow: true }
        );
      },
      _getSVGLeftTopOffsets: function() {
        return {
          textLeft: -this.width / 2,
          textTop: -this.height / 2,
          lineTop: this.getHeightOfLine(0)
        };
      },
      _wrapSVGTextAndBg: function(textAndBg) {
        var noShadow = true, textDecoration = this.getSvgTextDecoration(this);
        return [
          textAndBg.textBgRects.join(""),
          '		<text xml:space="preserve" ',
          this.fontFamily ? 'font-family="' + this.fontFamily.replace(/"/g, "'") + '" ' : "",
          this.fontSize ? 'font-size="' + this.fontSize + '" ' : "",
          this.fontStyle ? 'font-style="' + this.fontStyle + '" ' : "",
          this.fontWeight ? 'font-weight="' + this.fontWeight + '" ' : "",
          textDecoration ? 'text-decoration="' + textDecoration + '" ' : "",
          'style="',
          this.getSvgStyles(noShadow),
          '"',
          this.addPaintOrder(),
          " >",
          textAndBg.textSpans.join(""),
          "</text>\n"
        ];
      },
      _getSVGTextAndBg: function(textTopOffset, textLeftOffset) {
        var textSpans = [], textBgRects = [], height = textTopOffset, lineOffset;
        this._setSVGBg(textBgRects);
        for (var i = 0, len = this._textLines.length; i < len; i++) {
          lineOffset = this._getLineLeftOffset(i);
          if (this.textBackgroundColor || this.styleHas("textBackgroundColor", i)) {
            this._setSVGTextLineBg(textBgRects, i, textLeftOffset + lineOffset, height);
          }
          this._setSVGTextLineText(textSpans, i, textLeftOffset + lineOffset, height);
          height += this.getHeightOfLine(i);
        }
        return {
          textSpans,
          textBgRects
        };
      },
      _createTextCharSpan: function(_char, styleDecl, left, top) {
        var shouldUseWhitespace = _char !== _char.trim() || _char.match(multipleSpacesRegex), styleProps = this.getSvgSpanStyles(styleDecl, shouldUseWhitespace), fillStyles = styleProps ? 'style="' + styleProps + '"' : "", dy = styleDecl.deltaY, dySpan = "", NUM_FRACTION_DIGITS = fabric2.Object.NUM_FRACTION_DIGITS;
        if (dy) {
          dySpan = ' dy="' + toFixed(dy, NUM_FRACTION_DIGITS) + '" ';
        }
        return [
          '<tspan x="',
          toFixed(left, NUM_FRACTION_DIGITS),
          '" y="',
          toFixed(top, NUM_FRACTION_DIGITS),
          '" ',
          dySpan,
          fillStyles,
          ">",
          fabric2.util.string.escapeXml(_char),
          "</tspan>"
        ].join("");
      },
      _setSVGTextLineText: function(textSpans, lineIndex, textLeftOffset, textTopOffset) {
        var lineHeight = this.getHeightOfLine(lineIndex), isJustify = this.textAlign.indexOf("justify") !== -1, actualStyle, nextStyle, charsToRender = "", charBox, style, boxWidth = 0, line = this._textLines[lineIndex], timeToRender;
        textTopOffset += lineHeight * (1 - this._fontSizeFraction) / this.lineHeight;
        for (var i = 0, len = line.length - 1; i <= len; i++) {
          timeToRender = i === len || this.charSpacing;
          charsToRender += line[i];
          charBox = this.__charBounds[lineIndex][i];
          if (boxWidth === 0) {
            textLeftOffset += charBox.kernedWidth - charBox.width;
            boxWidth += charBox.width;
          } else {
            boxWidth += charBox.kernedWidth;
          }
          if (isJustify && !timeToRender) {
            if (this._reSpaceAndTab.test(line[i])) {
              timeToRender = true;
            }
          }
          if (!timeToRender) {
            actualStyle = actualStyle || this.getCompleteStyleDeclaration(lineIndex, i);
            nextStyle = this.getCompleteStyleDeclaration(lineIndex, i + 1);
            timeToRender = fabric2.util.hasStyleChanged(actualStyle, nextStyle, true);
          }
          if (timeToRender) {
            style = this._getStyleDeclaration(lineIndex, i) || {};
            textSpans.push(this._createTextCharSpan(charsToRender, style, textLeftOffset, textTopOffset));
            charsToRender = "";
            actualStyle = nextStyle;
            textLeftOffset += boxWidth;
            boxWidth = 0;
          }
        }
      },
      _pushTextBgRect: function(textBgRects, color, left, top, width, height) {
        var NUM_FRACTION_DIGITS = fabric2.Object.NUM_FRACTION_DIGITS;
        textBgRects.push(
          "		<rect ",
          this._getFillAttributes(color),
          ' x="',
          toFixed(left, NUM_FRACTION_DIGITS),
          '" y="',
          toFixed(top, NUM_FRACTION_DIGITS),
          '" width="',
          toFixed(width, NUM_FRACTION_DIGITS),
          '" height="',
          toFixed(height, NUM_FRACTION_DIGITS),
          '"></rect>\n'
        );
      },
      _setSVGTextLineBg: function(textBgRects, i, leftOffset, textTopOffset) {
        var line = this._textLines[i], heightOfLine = this.getHeightOfLine(i) / this.lineHeight, boxWidth = 0, boxStart = 0, charBox, currentColor, lastColor = this.getValueOfPropertyAt(i, 0, "textBackgroundColor");
        for (var j = 0, jlen = line.length; j < jlen; j++) {
          charBox = this.__charBounds[i][j];
          currentColor = this.getValueOfPropertyAt(i, j, "textBackgroundColor");
          if (currentColor !== lastColor) {
            lastColor && this._pushTextBgRect(
              textBgRects,
              lastColor,
              leftOffset + boxStart,
              textTopOffset,
              boxWidth,
              heightOfLine
            );
            boxStart = charBox.left;
            boxWidth = charBox.width;
            lastColor = currentColor;
          } else {
            boxWidth += charBox.kernedWidth;
          }
        }
        currentColor && this._pushTextBgRect(
          textBgRects,
          currentColor,
          leftOffset + boxStart,
          textTopOffset,
          boxWidth,
          heightOfLine
        );
      },
      _getFillAttributes: function(value) {
        var fillColor = value && typeof value === "string" ? new fabric2.Color(value) : "";
        if (!fillColor || !fillColor.getSource() || fillColor.getAlpha() === 1) {
          return 'fill="' + value + '"';
        }
        return 'opacity="' + fillColor.getAlpha() + '" fill="' + fillColor.setAlpha(1).toRgb() + '"';
      },
      _getSVGLineTopOffset: function(lineIndex) {
        var lineTopOffset = 0, lastHeight = 0;
        for (var j = 0; j < lineIndex; j++) {
          lineTopOffset += this.getHeightOfLine(j);
        }
        lastHeight = this.getHeightOfLine(j);
        return {
          lineTop: lineTopOffset,
          offset: (this._fontSizeMult - this._fontSizeFraction) * lastHeight / (this.lineHeight * this._fontSizeMult)
        };
      },
      getSvgStyles: function(skipShadow) {
        var svgStyle = fabric2.Object.prototype.getSvgStyles.call(this, skipShadow);
        return svgStyle + " white-space: pre;";
      }
    });
  })();
  (function(global) {
    var fabric3 = global.fabric || (global.fabric = {});
    fabric3.Textbox = fabric3.util.createClass(fabric3.IText, fabric3.Observable, {
      type: "textbox",
      minWidth: 20,
      dynamicMinWidth: 2,
      __cachedLines: null,
      lockScalingFlip: true,
      noScaleCache: false,
      _dimensionAffectingProps: fabric3.Text.prototype._dimensionAffectingProps.concat("width"),
      _wordJoiners: /[ \t\r]/,
      splitByGrapheme: false,
      initDimensions: function() {
        if (this.__skipDimension) {
          return;
        }
        this.isEditing && this.initDelayedCursor();
        this.clearContextTop();
        this._clearCache();
        this.dynamicMinWidth = 0;
        this._styleMap = this._generateStyleMap(this._splitText());
        if (this.dynamicMinWidth > this.width) {
          this._set("width", this.dynamicMinWidth);
        }
        if (this.textAlign.indexOf("justify") !== -1) {
          this.enlargeSpaces();
        }
        this.height = this.calcTextHeight();
        this.saveState({ propertySet: "_dimensionAffectingProps" });
      },
      _generateStyleMap: function(textInfo) {
        var realLineCount = 0, realLineCharCount = 0, charCount = 0, map = {};
        for (var i = 0; i < textInfo.graphemeLines.length; i++) {
          if (textInfo.graphemeText[charCount] === "\n" && i > 0) {
            realLineCharCount = 0;
            charCount++;
            realLineCount++;
          } else if (!this.splitByGrapheme && this._reSpaceAndTab.test(textInfo.graphemeText[charCount]) && i > 0) {
            realLineCharCount++;
            charCount++;
          }
          map[i] = { line: realLineCount, offset: realLineCharCount };
          charCount += textInfo.graphemeLines[i].length;
          realLineCharCount += textInfo.graphemeLines[i].length;
        }
        return map;
      },
      styleHas: function(property, lineIndex) {
        if (this._styleMap && !this.isWrapping) {
          var map = this._styleMap[lineIndex];
          if (map) {
            lineIndex = map.line;
          }
        }
        return fabric3.Text.prototype.styleHas.call(this, property, lineIndex);
      },
      isEmptyStyles: function(lineIndex) {
        if (!this.styles) {
          return true;
        }
        var offset = 0, nextLineIndex = lineIndex + 1, nextOffset, obj, shouldLimit = false, map = this._styleMap[lineIndex], mapNextLine = this._styleMap[lineIndex + 1];
        if (map) {
          lineIndex = map.line;
          offset = map.offset;
        }
        if (mapNextLine) {
          nextLineIndex = mapNextLine.line;
          shouldLimit = nextLineIndex === lineIndex;
          nextOffset = mapNextLine.offset;
        }
        obj = typeof lineIndex === "undefined" ? this.styles : { line: this.styles[lineIndex] };
        for (var p1 in obj) {
          for (var p2 in obj[p1]) {
            if (p2 >= offset && (!shouldLimit || p2 < nextOffset)) {
              for (var p3 in obj[p1][p2]) {
                return false;
              }
            }
          }
        }
        return true;
      },
      _getStyleDeclaration: function(lineIndex, charIndex) {
        if (this._styleMap && !this.isWrapping) {
          var map = this._styleMap[lineIndex];
          if (!map) {
            return null;
          }
          lineIndex = map.line;
          charIndex = map.offset + charIndex;
        }
        return this.callSuper("_getStyleDeclaration", lineIndex, charIndex);
      },
      _setStyleDeclaration: function(lineIndex, charIndex, style) {
        var map = this._styleMap[lineIndex];
        lineIndex = map.line;
        charIndex = map.offset + charIndex;
        this.styles[lineIndex][charIndex] = style;
      },
      _deleteStyleDeclaration: function(lineIndex, charIndex) {
        var map = this._styleMap[lineIndex];
        lineIndex = map.line;
        charIndex = map.offset + charIndex;
        delete this.styles[lineIndex][charIndex];
      },
      _getLineStyle: function(lineIndex) {
        var map = this._styleMap[lineIndex];
        return !!this.styles[map.line];
      },
      _setLineStyle: function(lineIndex) {
        var map = this._styleMap[lineIndex];
        this.styles[map.line] = {};
      },
      _wrapText: function(lines, desiredWidth) {
        var wrapped = [], i;
        this.isWrapping = true;
        for (i = 0; i < lines.length; i++) {
          wrapped = wrapped.concat(this._wrapLine(lines[i], i, desiredWidth));
        }
        this.isWrapping = false;
        return wrapped;
      },
      _measureWord: function(word, lineIndex, charOffset) {
        var width = 0, prevGrapheme, skipLeft = true;
        charOffset = charOffset || 0;
        for (var i = 0, len = word.length; i < len; i++) {
          var box = this._getGraphemeBox(word[i], lineIndex, i + charOffset, prevGrapheme, skipLeft);
          width += box.kernedWidth;
          prevGrapheme = word[i];
        }
        return width;
      },
      _wrapLine: function(_line, lineIndex, desiredWidth, reservedSpace) {
        var lineWidth = 0, splitByGrapheme = this.splitByGrapheme, graphemeLines = [], line = [], words = splitByGrapheme ? fabric3.util.string.graphemeSplit(_line) : _line.split(this._wordJoiners), word = "", offset = 0, infix = splitByGrapheme ? "" : " ", wordWidth = 0, infixWidth = 0, largestWordWidth = 0, lineJustStarted = true, additionalSpace = this._getWidthOfCharSpacing(), reservedSpace = reservedSpace || 0;
        if (words.length === 0) {
          words.push([]);
        }
        desiredWidth -= reservedSpace;
        for (var i = 0; i < words.length; i++) {
          word = splitByGrapheme ? words[i] : fabric3.util.string.graphemeSplit(words[i]);
          wordWidth = this._measureWord(word, lineIndex, offset);
          offset += word.length;
          lineWidth += infixWidth + wordWidth - additionalSpace;
          if (lineWidth > desiredWidth && !lineJustStarted) {
            graphemeLines.push(line);
            line = [];
            lineWidth = wordWidth;
            lineJustStarted = true;
          } else {
            lineWidth += additionalSpace;
          }
          if (!lineJustStarted && !splitByGrapheme) {
            line.push(infix);
          }
          line = line.concat(word);
          infixWidth = splitByGrapheme ? 0 : this._measureWord([infix], lineIndex, offset);
          offset++;
          lineJustStarted = false;
          if (wordWidth > largestWordWidth) {
            largestWordWidth = wordWidth;
          }
        }
        i && graphemeLines.push(line);
        if (largestWordWidth + reservedSpace > this.dynamicMinWidth) {
          this.dynamicMinWidth = largestWordWidth - additionalSpace + reservedSpace;
        }
        return graphemeLines;
      },
      isEndOfWrapping: function(lineIndex) {
        if (!this._styleMap[lineIndex + 1]) {
          return true;
        }
        if (this._styleMap[lineIndex + 1].line !== this._styleMap[lineIndex].line) {
          return true;
        }
        return false;
      },
      missingNewlineOffset: function(lineIndex) {
        if (this.splitByGrapheme) {
          return this.isEndOfWrapping(lineIndex) ? 1 : 0;
        }
        return 1;
      },
      _splitTextIntoLines: function(text) {
        var newText = fabric3.Text.prototype._splitTextIntoLines.call(this, text), graphemeLines = this._wrapText(newText.lines, this.width), lines = new Array(graphemeLines.length);
        for (var i = 0; i < graphemeLines.length; i++) {
          lines[i] = graphemeLines[i].join("");
        }
        newText.lines = lines;
        newText.graphemeLines = graphemeLines;
        return newText;
      },
      getMinWidth: function() {
        return Math.max(this.minWidth, this.dynamicMinWidth);
      },
      _removeExtraneousStyles: function() {
        var linesToKeep = {};
        for (var prop in this._styleMap) {
          if (this._textLines[prop]) {
            linesToKeep[this._styleMap[prop].line] = 1;
          }
        }
        for (var prop in this.styles) {
          if (!linesToKeep[prop]) {
            delete this.styles[prop];
          }
        }
      },
      toObject: function(propertiesToInclude) {
        return this.callSuper("toObject", ["minWidth", "splitByGrapheme"].concat(propertiesToInclude));
      }
    });
    fabric3.Textbox.fromObject = function(object, callback) {
      var styles = fabric3.util.stylesFromArray(object.styles, object.text);
      var objCopy = Object.assign({}, object, { styles });
      return fabric3.Object._fromObject("Textbox", objCopy, callback, "text");
    };
  })(exports);
  (function() {
    var controlsUtils = fabric2.controlsUtils, scaleSkewStyleHandler = controlsUtils.scaleSkewCursorStyleHandler, scaleStyleHandler = controlsUtils.scaleCursorStyleHandler, scalingEqually = controlsUtils.scalingEqually, scalingYOrSkewingX = controlsUtils.scalingYOrSkewingX, scalingXOrSkewingY = controlsUtils.scalingXOrSkewingY, scaleOrSkewActionName = controlsUtils.scaleOrSkewActionName, objectControls = fabric2.Object.prototype.controls;
    objectControls.ml = new fabric2.Control({
      x: -0.5,
      y: 0,
      cursorStyleHandler: scaleSkewStyleHandler,
      actionHandler: scalingXOrSkewingY,
      getActionName: scaleOrSkewActionName
    });
    objectControls.mr = new fabric2.Control({
      x: 0.5,
      y: 0,
      cursorStyleHandler: scaleSkewStyleHandler,
      actionHandler: scalingXOrSkewingY,
      getActionName: scaleOrSkewActionName
    });
    objectControls.mb = new fabric2.Control({
      x: 0,
      y: 0.5,
      cursorStyleHandler: scaleSkewStyleHandler,
      actionHandler: scalingYOrSkewingX,
      getActionName: scaleOrSkewActionName
    });
    objectControls.mt = new fabric2.Control({
      x: 0,
      y: -0.5,
      cursorStyleHandler: scaleSkewStyleHandler,
      actionHandler: scalingYOrSkewingX,
      getActionName: scaleOrSkewActionName
    });
    objectControls.tl = new fabric2.Control({
      x: -0.5,
      y: -0.5,
      cursorStyleHandler: scaleStyleHandler,
      actionHandler: scalingEqually
    });
    objectControls.tr = new fabric2.Control({
      x: 0.5,
      y: -0.5,
      cursorStyleHandler: scaleStyleHandler,
      actionHandler: scalingEqually
    });
    objectControls.bl = new fabric2.Control({
      x: -0.5,
      y: 0.5,
      cursorStyleHandler: scaleStyleHandler,
      actionHandler: scalingEqually
    });
    objectControls.br = new fabric2.Control({
      x: 0.5,
      y: 0.5,
      cursorStyleHandler: scaleStyleHandler,
      actionHandler: scalingEqually
    });
    objectControls.mtr = new fabric2.Control({
      x: 0,
      y: -0.5,
      actionHandler: controlsUtils.rotationWithSnapping,
      cursorStyleHandler: controlsUtils.rotationStyleHandler,
      offsetY: -40,
      withConnection: true,
      actionName: "rotate"
    });
    if (fabric2.Textbox) {
      var textBoxControls = fabric2.Textbox.prototype.controls = {};
      textBoxControls.mtr = objectControls.mtr;
      textBoxControls.tr = objectControls.tr;
      textBoxControls.br = objectControls.br;
      textBoxControls.tl = objectControls.tl;
      textBoxControls.bl = objectControls.bl;
      textBoxControls.mt = objectControls.mt;
      textBoxControls.mb = objectControls.mb;
      textBoxControls.mr = new fabric2.Control({
        x: 0.5,
        y: 0,
        actionHandler: controlsUtils.changeWidth,
        cursorStyleHandler: scaleSkewStyleHandler,
        actionName: "resizing"
      });
      textBoxControls.ml = new fabric2.Control({
        x: -0.5,
        y: 0,
        actionHandler: controlsUtils.changeWidth,
        cursorStyleHandler: scaleSkewStyleHandler,
        actionName: "resizing"
      });
    }
  })();
})(fabric);
const scriptRel = "modulepreload";
const seen = {};
const base = "/";
const __vitePreload = function preload(baseModule, deps) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = `${base}${dep}`;
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
const KeepAwake = registerPlugin("KeepAwake", {
  web: () => __vitePreload(() => import("./web.72dbbb21.js"), true ? ["assets/web.72dbbb21.js","assets/statusbar.f6df8738.js","assets/statusbar.48e61afa.css"] : void 0).then((m) => new m.KeepAwakeWeb())
});
const isSupported = async () => {
  const result = await KeepAwake.isSupported();
  return result.isSupported;
};
const keepAwake = async () => {
  if (isSupported) {
    await KeepAwake.keepAwake();
  }
};
var browser = {};
var canPromise$1 = function() {
  return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
};
var qrcode = {};
var utils$1 = {};
let toSJISFunction;
const CODEWORDS_COUNT = [
  0,
  26,
  44,
  70,
  100,
  134,
  172,
  196,
  242,
  292,
  346,
  404,
  466,
  532,
  581,
  655,
  733,
  815,
  901,
  991,
  1085,
  1156,
  1258,
  1364,
  1474,
  1588,
  1706,
  1828,
  1921,
  2051,
  2185,
  2323,
  2465,
  2611,
  2761,
  2876,
  3034,
  3196,
  3362,
  3532,
  3706
];
utils$1.getSymbolSize = function getSymbolSize(version2) {
  if (!version2)
    throw new Error('"version" cannot be null or undefined');
  if (version2 < 1 || version2 > 40)
    throw new Error('"version" should be in range from 1 to 40');
  return version2 * 4 + 17;
};
utils$1.getSymbolTotalCodewords = function getSymbolTotalCodewords(version2) {
  return CODEWORDS_COUNT[version2];
};
utils$1.getBCHDigit = function(data) {
  let digit = 0;
  while (data !== 0) {
    digit++;
    data >>>= 1;
  }
  return digit;
};
utils$1.setToSJISFunction = function setToSJISFunction(f) {
  if (typeof f !== "function") {
    throw new Error('"toSJISFunc" is not a valid function.');
  }
  toSJISFunction = f;
};
utils$1.isKanjiModeEnabled = function() {
  return typeof toSJISFunction !== "undefined";
};
utils$1.toSJIS = function toSJIS(kanji2) {
  return toSJISFunction(kanji2);
};
var errorCorrectionLevel = {};
(function(exports) {
  exports.L = { bit: 1 };
  exports.M = { bit: 0 };
  exports.Q = { bit: 3 };
  exports.H = { bit: 2 };
  function fromString(string) {
    if (typeof string !== "string") {
      throw new Error("Param is not a string");
    }
    const lcStr = string.toLowerCase();
    switch (lcStr) {
      case "l":
      case "low":
        return exports.L;
      case "m":
      case "medium":
        return exports.M;
      case "q":
      case "quartile":
        return exports.Q;
      case "h":
      case "high":
        return exports.H;
      default:
        throw new Error("Unknown EC Level: " + string);
    }
  }
  exports.isValid = function isValid2(level) {
    return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
  };
  exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
      return value;
    }
    try {
      return fromString(value);
    } catch (e) {
      return defaultValue;
    }
  };
})(errorCorrectionLevel);
function BitBuffer$1() {
  this.buffer = [];
  this.length = 0;
}
BitBuffer$1.prototype = {
  get: function(index) {
    const bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
  },
  put: function(num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) === 1);
    }
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(bit) {
    const bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }
    if (bit) {
      this.buffer[bufIndex] |= 128 >>> this.length % 8;
    }
    this.length++;
  }
};
var bitBuffer = BitBuffer$1;
function BitMatrix$1(size) {
  if (!size || size < 1) {
    throw new Error("BitMatrix size must be defined and greater than 0");
  }
  this.size = size;
  this.data = new Uint8Array(size * size);
  this.reservedBit = new Uint8Array(size * size);
}
BitMatrix$1.prototype.set = function(row, col, value, reserved) {
  const index = row * this.size + col;
  this.data[index] = value;
  if (reserved)
    this.reservedBit[index] = true;
};
BitMatrix$1.prototype.get = function(row, col) {
  return this.data[row * this.size + col];
};
BitMatrix$1.prototype.xor = function(row, col, value) {
  this.data[row * this.size + col] ^= value;
};
BitMatrix$1.prototype.isReserved = function(row, col) {
  return this.reservedBit[row * this.size + col];
};
var bitMatrix = BitMatrix$1;
var alignmentPattern = {};
(function(exports) {
  const getSymbolSize3 = utils$1.getSymbolSize;
  exports.getRowColCoords = function getRowColCoords(version2) {
    if (version2 === 1)
      return [];
    const posCount = Math.floor(version2 / 7) + 2;
    const size = getSymbolSize3(version2);
    const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
    const positions = [size - 7];
    for (let i = 1; i < posCount - 1; i++) {
      positions[i] = positions[i - 1] - intervals;
    }
    positions.push(6);
    return positions.reverse();
  };
  exports.getPositions = function getPositions2(version2) {
    const coords = [];
    const pos = exports.getRowColCoords(version2);
    const posLength = pos.length;
    for (let i = 0; i < posLength; i++) {
      for (let j = 0; j < posLength; j++) {
        if (i === 0 && j === 0 || i === 0 && j === posLength - 1 || i === posLength - 1 && j === 0) {
          continue;
        }
        coords.push([pos[i], pos[j]]);
      }
    }
    return coords;
  };
})(alignmentPattern);
var finderPattern = {};
const getSymbolSize2 = utils$1.getSymbolSize;
const FINDER_PATTERN_SIZE = 7;
finderPattern.getPositions = function getPositions(version2) {
  const size = getSymbolSize2(version2);
  return [
    [0, 0],
    [size - FINDER_PATTERN_SIZE, 0],
    [0, size - FINDER_PATTERN_SIZE]
  ];
};
var maskPattern = {};
(function(exports) {
  exports.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  const PenaltyScores = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
  };
  exports.isValid = function isValid2(mask) {
    return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
  };
  exports.from = function from(value) {
    return exports.isValid(value) ? parseInt(value, 10) : void 0;
  };
  exports.getPenaltyN1 = function getPenaltyN1(data) {
    const size = data.size;
    let points = 0;
    let sameCountCol = 0;
    let sameCountRow = 0;
    let lastCol = null;
    let lastRow = null;
    for (let row = 0; row < size; row++) {
      sameCountCol = sameCountRow = 0;
      lastCol = lastRow = null;
      for (let col = 0; col < size; col++) {
        let module = data.get(row, col);
        if (module === lastCol) {
          sameCountCol++;
        } else {
          if (sameCountCol >= 5)
            points += PenaltyScores.N1 + (sameCountCol - 5);
          lastCol = module;
          sameCountCol = 1;
        }
        module = data.get(col, row);
        if (module === lastRow) {
          sameCountRow++;
        } else {
          if (sameCountRow >= 5)
            points += PenaltyScores.N1 + (sameCountRow - 5);
          lastRow = module;
          sameCountRow = 1;
        }
      }
      if (sameCountCol >= 5)
        points += PenaltyScores.N1 + (sameCountCol - 5);
      if (sameCountRow >= 5)
        points += PenaltyScores.N1 + (sameCountRow - 5);
    }
    return points;
  };
  exports.getPenaltyN2 = function getPenaltyN2(data) {
    const size = data.size;
    let points = 0;
    for (let row = 0; row < size - 1; row++) {
      for (let col = 0; col < size - 1; col++) {
        const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
        if (last === 4 || last === 0)
          points++;
      }
    }
    return points * PenaltyScores.N2;
  };
  exports.getPenaltyN3 = function getPenaltyN3(data) {
    const size = data.size;
    let points = 0;
    let bitsCol = 0;
    let bitsRow = 0;
    for (let row = 0; row < size; row++) {
      bitsCol = bitsRow = 0;
      for (let col = 0; col < size; col++) {
        bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
        if (col >= 10 && (bitsCol === 1488 || bitsCol === 93))
          points++;
        bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
        if (col >= 10 && (bitsRow === 1488 || bitsRow === 93))
          points++;
      }
    }
    return points * PenaltyScores.N3;
  };
  exports.getPenaltyN4 = function getPenaltyN4(data) {
    let darkCount = 0;
    const modulesCount = data.data.length;
    for (let i = 0; i < modulesCount; i++)
      darkCount += data.data[i];
    const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
    return k * PenaltyScores.N4;
  };
  function getMaskAt(maskPattern2, i, j) {
    switch (maskPattern2) {
      case exports.Patterns.PATTERN000:
        return (i + j) % 2 === 0;
      case exports.Patterns.PATTERN001:
        return i % 2 === 0;
      case exports.Patterns.PATTERN010:
        return j % 3 === 0;
      case exports.Patterns.PATTERN011:
        return (i + j) % 3 === 0;
      case exports.Patterns.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
      case exports.Patterns.PATTERN101:
        return i * j % 2 + i * j % 3 === 0;
      case exports.Patterns.PATTERN110:
        return (i * j % 2 + i * j % 3) % 2 === 0;
      case exports.Patterns.PATTERN111:
        return (i * j % 3 + (i + j) % 2) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + maskPattern2);
    }
  }
  exports.applyMask = function applyMask(pattern, data) {
    const size = data.size;
    for (let col = 0; col < size; col++) {
      for (let row = 0; row < size; row++) {
        if (data.isReserved(row, col))
          continue;
        data.xor(row, col, getMaskAt(pattern, row, col));
      }
    }
  };
  exports.getBestMask = function getBestMask(data, setupFormatFunc) {
    const numPatterns = Object.keys(exports.Patterns).length;
    let bestPattern = 0;
    let lowerPenalty = Infinity;
    for (let p = 0; p < numPatterns; p++) {
      setupFormatFunc(p);
      exports.applyMask(p, data);
      const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
      exports.applyMask(p, data);
      if (penalty < lowerPenalty) {
        lowerPenalty = penalty;
        bestPattern = p;
      }
    }
    return bestPattern;
  };
})(maskPattern);
var errorCorrectionCode = {};
const ECLevel$1 = errorCorrectionLevel;
const EC_BLOCKS_TABLE = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  2,
  2,
  4,
  1,
  2,
  4,
  4,
  2,
  4,
  4,
  4,
  2,
  4,
  6,
  5,
  2,
  4,
  6,
  6,
  2,
  5,
  8,
  8,
  4,
  5,
  8,
  8,
  4,
  5,
  8,
  11,
  4,
  8,
  10,
  11,
  4,
  9,
  12,
  16,
  4,
  9,
  16,
  16,
  6,
  10,
  12,
  18,
  6,
  10,
  17,
  16,
  6,
  11,
  16,
  19,
  6,
  13,
  18,
  21,
  7,
  14,
  21,
  25,
  8,
  16,
  20,
  25,
  8,
  17,
  23,
  25,
  9,
  17,
  23,
  34,
  9,
  18,
  25,
  30,
  10,
  20,
  27,
  32,
  12,
  21,
  29,
  35,
  12,
  23,
  34,
  37,
  12,
  25,
  34,
  40,
  13,
  26,
  35,
  42,
  14,
  28,
  38,
  45,
  15,
  29,
  40,
  48,
  16,
  31,
  43,
  51,
  17,
  33,
  45,
  54,
  18,
  35,
  48,
  57,
  19,
  37,
  51,
  60,
  19,
  38,
  53,
  63,
  20,
  40,
  56,
  66,
  21,
  43,
  59,
  70,
  22,
  45,
  62,
  74,
  24,
  47,
  65,
  77,
  25,
  49,
  68,
  81
];
const EC_CODEWORDS_TABLE = [
  7,
  10,
  13,
  17,
  10,
  16,
  22,
  28,
  15,
  26,
  36,
  44,
  20,
  36,
  52,
  64,
  26,
  48,
  72,
  88,
  36,
  64,
  96,
  112,
  40,
  72,
  108,
  130,
  48,
  88,
  132,
  156,
  60,
  110,
  160,
  192,
  72,
  130,
  192,
  224,
  80,
  150,
  224,
  264,
  96,
  176,
  260,
  308,
  104,
  198,
  288,
  352,
  120,
  216,
  320,
  384,
  132,
  240,
  360,
  432,
  144,
  280,
  408,
  480,
  168,
  308,
  448,
  532,
  180,
  338,
  504,
  588,
  196,
  364,
  546,
  650,
  224,
  416,
  600,
  700,
  224,
  442,
  644,
  750,
  252,
  476,
  690,
  816,
  270,
  504,
  750,
  900,
  300,
  560,
  810,
  960,
  312,
  588,
  870,
  1050,
  336,
  644,
  952,
  1110,
  360,
  700,
  1020,
  1200,
  390,
  728,
  1050,
  1260,
  420,
  784,
  1140,
  1350,
  450,
  812,
  1200,
  1440,
  480,
  868,
  1290,
  1530,
  510,
  924,
  1350,
  1620,
  540,
  980,
  1440,
  1710,
  570,
  1036,
  1530,
  1800,
  570,
  1064,
  1590,
  1890,
  600,
  1120,
  1680,
  1980,
  630,
  1204,
  1770,
  2100,
  660,
  1260,
  1860,
  2220,
  720,
  1316,
  1950,
  2310,
  750,
  1372,
  2040,
  2430
];
errorCorrectionCode.getBlocksCount = function getBlocksCount(version2, errorCorrectionLevel2) {
  switch (errorCorrectionLevel2) {
    case ECLevel$1.L:
      return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 0];
    case ECLevel$1.M:
      return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 1];
    case ECLevel$1.Q:
      return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 2];
    case ECLevel$1.H:
      return EC_BLOCKS_TABLE[(version2 - 1) * 4 + 3];
    default:
      return void 0;
  }
};
errorCorrectionCode.getTotalCodewordsCount = function getTotalCodewordsCount(version2, errorCorrectionLevel2) {
  switch (errorCorrectionLevel2) {
    case ECLevel$1.L:
      return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 0];
    case ECLevel$1.M:
      return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 1];
    case ECLevel$1.Q:
      return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 2];
    case ECLevel$1.H:
      return EC_CODEWORDS_TABLE[(version2 - 1) * 4 + 3];
    default:
      return void 0;
  }
};
var polynomial = {};
var galoisField = {};
const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);
(function initTables() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;
    x <<= 1;
    if (x & 256) {
      x ^= 285;
    }
  }
  for (let i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255];
  }
})();
galoisField.log = function log(n) {
  if (n < 1)
    throw new Error("log(" + n + ")");
  return LOG_TABLE[n];
};
galoisField.exp = function exp(n) {
  return EXP_TABLE[n];
};
galoisField.mul = function mul(x, y) {
  if (x === 0 || y === 0)
    return 0;
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};
(function(exports) {
  const GF = galoisField;
  exports.mul = function mul2(p1, p2) {
    const coeff = new Uint8Array(p1.length + p2.length - 1);
    for (let i = 0; i < p1.length; i++) {
      for (let j = 0; j < p2.length; j++) {
        coeff[i + j] ^= GF.mul(p1[i], p2[j]);
      }
    }
    return coeff;
  };
  exports.mod = function mod(divident, divisor) {
    let result = new Uint8Array(divident);
    while (result.length - divisor.length >= 0) {
      const coeff = result[0];
      for (let i = 0; i < divisor.length; i++) {
        result[i] ^= GF.mul(divisor[i], coeff);
      }
      let offset = 0;
      while (offset < result.length && result[offset] === 0)
        offset++;
      result = result.slice(offset);
    }
    return result;
  };
  exports.generateECPolynomial = function generateECPolynomial(degree) {
    let poly = new Uint8Array([1]);
    for (let i = 0; i < degree; i++) {
      poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
    }
    return poly;
  };
})(polynomial);
const Polynomial = polynomial;
function ReedSolomonEncoder$1(degree) {
  this.genPoly = void 0;
  this.degree = degree;
  if (this.degree)
    this.initialize(this.degree);
}
ReedSolomonEncoder$1.prototype.initialize = function initialize(degree) {
  this.degree = degree;
  this.genPoly = Polynomial.generateECPolynomial(this.degree);
};
ReedSolomonEncoder$1.prototype.encode = function encode(data) {
  if (!this.genPoly) {
    throw new Error("Encoder not initialized");
  }
  const paddedData = new Uint8Array(data.length + this.degree);
  paddedData.set(data);
  const remainder = Polynomial.mod(paddedData, this.genPoly);
  const start = this.degree - remainder.length;
  if (start > 0) {
    const buff = new Uint8Array(this.degree);
    buff.set(remainder, start);
    return buff;
  }
  return remainder;
};
var reedSolomonEncoder = ReedSolomonEncoder$1;
var version = {};
var mode = {};
var versionCheck = {};
versionCheck.isValid = function isValid(version2) {
  return !isNaN(version2) && version2 >= 1 && version2 <= 40;
};
var regex = {};
const numeric = "[0-9]+";
const alphanumeric = "[A-Z $%*+\\-./:]+";
let kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
kanji = kanji.replace(/u/g, "\\u");
const byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
regex.KANJI = new RegExp(kanji, "g");
regex.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
regex.BYTE = new RegExp(byte, "g");
regex.NUMERIC = new RegExp(numeric, "g");
regex.ALPHANUMERIC = new RegExp(alphanumeric, "g");
const TEST_KANJI = new RegExp("^" + kanji + "$");
const TEST_NUMERIC = new RegExp("^" + numeric + "$");
const TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
regex.testKanji = function testKanji(str) {
  return TEST_KANJI.test(str);
};
regex.testNumeric = function testNumeric(str) {
  return TEST_NUMERIC.test(str);
};
regex.testAlphanumeric = function testAlphanumeric(str) {
  return TEST_ALPHANUMERIC.test(str);
};
(function(exports) {
  const VersionCheck = versionCheck;
  const Regex = regex;
  exports.NUMERIC = {
    id: "Numeric",
    bit: 1 << 0,
    ccBits: [10, 12, 14]
  };
  exports.ALPHANUMERIC = {
    id: "Alphanumeric",
    bit: 1 << 1,
    ccBits: [9, 11, 13]
  };
  exports.BYTE = {
    id: "Byte",
    bit: 1 << 2,
    ccBits: [8, 16, 16]
  };
  exports.KANJI = {
    id: "Kanji",
    bit: 1 << 3,
    ccBits: [8, 10, 12]
  };
  exports.MIXED = {
    bit: -1
  };
  exports.getCharCountIndicator = function getCharCountIndicator(mode2, version2) {
    if (!mode2.ccBits)
      throw new Error("Invalid mode: " + mode2);
    if (!VersionCheck.isValid(version2)) {
      throw new Error("Invalid version: " + version2);
    }
    if (version2 >= 1 && version2 < 10)
      return mode2.ccBits[0];
    else if (version2 < 27)
      return mode2.ccBits[1];
    return mode2.ccBits[2];
  };
  exports.getBestModeForData = function getBestModeForData(dataStr) {
    if (Regex.testNumeric(dataStr))
      return exports.NUMERIC;
    else if (Regex.testAlphanumeric(dataStr))
      return exports.ALPHANUMERIC;
    else if (Regex.testKanji(dataStr))
      return exports.KANJI;
    else
      return exports.BYTE;
  };
  exports.toString = function toString(mode2) {
    if (mode2 && mode2.id)
      return mode2.id;
    throw new Error("Invalid mode");
  };
  exports.isValid = function isValid2(mode2) {
    return mode2 && mode2.bit && mode2.ccBits;
  };
  function fromString(string) {
    if (typeof string !== "string") {
      throw new Error("Param is not a string");
    }
    const lcStr = string.toLowerCase();
    switch (lcStr) {
      case "numeric":
        return exports.NUMERIC;
      case "alphanumeric":
        return exports.ALPHANUMERIC;
      case "kanji":
        return exports.KANJI;
      case "byte":
        return exports.BYTE;
      default:
        throw new Error("Unknown mode: " + string);
    }
  }
  exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) {
      return value;
    }
    try {
      return fromString(value);
    } catch (e) {
      return defaultValue;
    }
  };
})(mode);
(function(exports) {
  const Utils2 = utils$1;
  const ECCode2 = errorCorrectionCode;
  const ECLevel2 = errorCorrectionLevel;
  const Mode2 = mode;
  const VersionCheck = versionCheck;
  const G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
  const G18_BCH = Utils2.getBCHDigit(G18);
  function getBestVersionForDataLength(mode2, length, errorCorrectionLevel2) {
    for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
      if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel2, mode2)) {
        return currentVersion;
      }
    }
    return void 0;
  }
  function getReservedBitsCount(mode2, version2) {
    return Mode2.getCharCountIndicator(mode2, version2) + 4;
  }
  function getTotalBitsFromDataArray(segments2, version2) {
    let totalBits = 0;
    segments2.forEach(function(data) {
      const reservedBits = getReservedBitsCount(data.mode, version2);
      totalBits += reservedBits + data.getBitsLength();
    });
    return totalBits;
  }
  function getBestVersionForMixedData(segments2, errorCorrectionLevel2) {
    for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
      const length = getTotalBitsFromDataArray(segments2, currentVersion);
      if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel2, Mode2.MIXED)) {
        return currentVersion;
      }
    }
    return void 0;
  }
  exports.from = function from(value, defaultValue) {
    if (VersionCheck.isValid(value)) {
      return parseInt(value, 10);
    }
    return defaultValue;
  };
  exports.getCapacity = function getCapacity(version2, errorCorrectionLevel2, mode2) {
    if (!VersionCheck.isValid(version2)) {
      throw new Error("Invalid QR Code version");
    }
    if (typeof mode2 === "undefined")
      mode2 = Mode2.BYTE;
    const totalCodewords = Utils2.getSymbolTotalCodewords(version2);
    const ecTotalCodewords = ECCode2.getTotalCodewordsCount(version2, errorCorrectionLevel2);
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    if (mode2 === Mode2.MIXED)
      return dataTotalCodewordsBits;
    const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode2, version2);
    switch (mode2) {
      case Mode2.NUMERIC:
        return Math.floor(usableBits / 10 * 3);
      case Mode2.ALPHANUMERIC:
        return Math.floor(usableBits / 11 * 2);
      case Mode2.KANJI:
        return Math.floor(usableBits / 13);
      case Mode2.BYTE:
      default:
        return Math.floor(usableBits / 8);
    }
  };
  exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel2) {
    let seg;
    const ecl = ECLevel2.from(errorCorrectionLevel2, ECLevel2.M);
    if (Array.isArray(data)) {
      if (data.length > 1) {
        return getBestVersionForMixedData(data, ecl);
      }
      if (data.length === 0) {
        return 1;
      }
      seg = data[0];
    } else {
      seg = data;
    }
    return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
  };
  exports.getEncodedBits = function getEncodedBits2(version2) {
    if (!VersionCheck.isValid(version2) || version2 < 7) {
      throw new Error("Invalid QR Code version");
    }
    let d = version2 << 12;
    while (Utils2.getBCHDigit(d) - G18_BCH >= 0) {
      d ^= G18 << Utils2.getBCHDigit(d) - G18_BCH;
    }
    return version2 << 12 | d;
  };
})(version);
var formatInfo = {};
const Utils$3 = utils$1;
const G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
const G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
const G15_BCH = Utils$3.getBCHDigit(G15);
formatInfo.getEncodedBits = function getEncodedBits(errorCorrectionLevel2, mask) {
  const data = errorCorrectionLevel2.bit << 3 | mask;
  let d = data << 10;
  while (Utils$3.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= G15 << Utils$3.getBCHDigit(d) - G15_BCH;
  }
  return (data << 10 | d) ^ G15_MASK;
};
var segments = {};
const Mode$4 = mode;
function NumericData(data) {
  this.mode = Mode$4.NUMERIC;
  this.data = data.toString();
}
NumericData.getBitsLength = function getBitsLength(length) {
  return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};
NumericData.prototype.getLength = function getLength() {
  return this.data.length;
};
NumericData.prototype.getBitsLength = function getBitsLength2() {
  return NumericData.getBitsLength(this.data.length);
};
NumericData.prototype.write = function write(bitBuffer2) {
  let i, group, value;
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3);
    value = parseInt(group, 10);
    bitBuffer2.put(value, 10);
  }
  const remainingNum = this.data.length - i;
  if (remainingNum > 0) {
    group = this.data.substr(i);
    value = parseInt(group, 10);
    bitBuffer2.put(value, remainingNum * 3 + 1);
  }
};
var numericData = NumericData;
const Mode$3 = mode;
const ALPHA_NUM_CHARS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
  "$",
  "%",
  "*",
  "+",
  "-",
  ".",
  "/",
  ":"
];
function AlphanumericData(data) {
  this.mode = Mode$3.ALPHANUMERIC;
  this.data = data;
}
AlphanumericData.getBitsLength = function getBitsLength3(length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2);
};
AlphanumericData.prototype.getLength = function getLength2() {
  return this.data.length;
};
AlphanumericData.prototype.getBitsLength = function getBitsLength4() {
  return AlphanumericData.getBitsLength(this.data.length);
};
AlphanumericData.prototype.write = function write2(bitBuffer2) {
  let i;
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
    bitBuffer2.put(value, 11);
  }
  if (this.data.length % 2) {
    bitBuffer2.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
  }
};
var alphanumericData = AlphanumericData;
var encodeUtf8$1 = function encodeUtf8(input) {
  var result = [];
  var size = input.length;
  for (var index = 0; index < size; index++) {
    var point = input.charCodeAt(index);
    if (point >= 55296 && point <= 56319 && size > index + 1) {
      var second = input.charCodeAt(index + 1);
      if (second >= 56320 && second <= 57343) {
        point = (point - 55296) * 1024 + second - 56320 + 65536;
        index += 1;
      }
    }
    if (point < 128) {
      result.push(point);
      continue;
    }
    if (point < 2048) {
      result.push(point >> 6 | 192);
      result.push(point & 63 | 128);
      continue;
    }
    if (point < 55296 || point >= 57344 && point < 65536) {
      result.push(point >> 12 | 224);
      result.push(point >> 6 & 63 | 128);
      result.push(point & 63 | 128);
      continue;
    }
    if (point >= 65536 && point <= 1114111) {
      result.push(point >> 18 | 240);
      result.push(point >> 12 & 63 | 128);
      result.push(point >> 6 & 63 | 128);
      result.push(point & 63 | 128);
      continue;
    }
    result.push(239, 191, 189);
  }
  return new Uint8Array(result).buffer;
};
const encodeUtf82 = encodeUtf8$1;
const Mode$2 = mode;
function ByteData(data) {
  this.mode = Mode$2.BYTE;
  if (typeof data === "string") {
    data = encodeUtf82(data);
  }
  this.data = new Uint8Array(data);
}
ByteData.getBitsLength = function getBitsLength5(length) {
  return length * 8;
};
ByteData.prototype.getLength = function getLength3() {
  return this.data.length;
};
ByteData.prototype.getBitsLength = function getBitsLength6() {
  return ByteData.getBitsLength(this.data.length);
};
ByteData.prototype.write = function(bitBuffer2) {
  for (let i = 0, l = this.data.length; i < l; i++) {
    bitBuffer2.put(this.data[i], 8);
  }
};
var byteData = ByteData;
const Mode$1 = mode;
const Utils$2 = utils$1;
function KanjiData(data) {
  this.mode = Mode$1.KANJI;
  this.data = data;
}
KanjiData.getBitsLength = function getBitsLength7(length) {
  return length * 13;
};
KanjiData.prototype.getLength = function getLength4() {
  return this.data.length;
};
KanjiData.prototype.getBitsLength = function getBitsLength8() {
  return KanjiData.getBitsLength(this.data.length);
};
KanjiData.prototype.write = function(bitBuffer2) {
  let i;
  for (i = 0; i < this.data.length; i++) {
    let value = Utils$2.toSJIS(this.data[i]);
    if (value >= 33088 && value <= 40956) {
      value -= 33088;
    } else if (value >= 57408 && value <= 60351) {
      value -= 49472;
    } else {
      throw new Error(
        "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
      );
    }
    value = (value >>> 8 & 255) * 192 + (value & 255);
    bitBuffer2.put(value, 13);
  }
};
var kanjiData = KanjiData;
var dijkstra = { exports: {} };
(function(module) {
  var dijkstra2 = {
    single_source_shortest_paths: function(graph, s, d) {
      var predecessors = {};
      var costs = {};
      costs[s] = 0;
      var open = dijkstra2.PriorityQueue.make();
      open.push(s, 0);
      var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
      while (!open.empty()) {
        closest = open.pop();
        u = closest.value;
        cost_of_s_to_u = closest.cost;
        adjacent_nodes = graph[u] || {};
        for (v in adjacent_nodes) {
          if (adjacent_nodes.hasOwnProperty(v)) {
            cost_of_e = adjacent_nodes[v];
            cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
            cost_of_s_to_v = costs[v];
            first_visit = typeof costs[v] === "undefined";
            if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
              costs[v] = cost_of_s_to_u_plus_cost_of_e;
              open.push(v, cost_of_s_to_u_plus_cost_of_e);
              predecessors[v] = u;
            }
          }
        }
      }
      if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
        var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
        throw new Error(msg);
      }
      return predecessors;
    },
    extract_shortest_path_from_predecessor_list: function(predecessors, d) {
      var nodes = [];
      var u = d;
      while (u) {
        nodes.push(u);
        predecessors[u];
        u = predecessors[u];
      }
      nodes.reverse();
      return nodes;
    },
    find_path: function(graph, s, d) {
      var predecessors = dijkstra2.single_source_shortest_paths(graph, s, d);
      return dijkstra2.extract_shortest_path_from_predecessor_list(
        predecessors,
        d
      );
    },
    PriorityQueue: {
      make: function(opts) {
        var T = dijkstra2.PriorityQueue, t = {}, key;
        opts = opts || {};
        for (key in T) {
          if (T.hasOwnProperty(key)) {
            t[key] = T[key];
          }
        }
        t.queue = [];
        t.sorter = opts.sorter || T.default_sorter;
        return t;
      },
      default_sorter: function(a, b) {
        return a.cost - b.cost;
      },
      push: function(value, cost) {
        var item = { value, cost };
        this.queue.push(item);
        this.queue.sort(this.sorter);
      },
      pop: function() {
        return this.queue.shift();
      },
      empty: function() {
        return this.queue.length === 0;
      }
    }
  };
  {
    module.exports = dijkstra2;
  }
})(dijkstra);
(function(exports) {
  const Mode2 = mode;
  const NumericData2 = numericData;
  const AlphanumericData2 = alphanumericData;
  const ByteData2 = byteData;
  const KanjiData2 = kanjiData;
  const Regex = regex;
  const Utils2 = utils$1;
  const dijkstra$1 = dijkstra.exports;
  function getStringByteLength(str) {
    return unescape(encodeURIComponent(str)).length;
  }
  function getSegments(regex2, mode2, str) {
    const segments2 = [];
    let result;
    while ((result = regex2.exec(str)) !== null) {
      segments2.push({
        data: result[0],
        index: result.index,
        mode: mode2,
        length: result[0].length
      });
    }
    return segments2;
  }
  function getSegmentsFromString(dataStr) {
    const numSegs = getSegments(Regex.NUMERIC, Mode2.NUMERIC, dataStr);
    const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode2.ALPHANUMERIC, dataStr);
    let byteSegs;
    let kanjiSegs;
    if (Utils2.isKanjiModeEnabled()) {
      byteSegs = getSegments(Regex.BYTE, Mode2.BYTE, dataStr);
      kanjiSegs = getSegments(Regex.KANJI, Mode2.KANJI, dataStr);
    } else {
      byteSegs = getSegments(Regex.BYTE_KANJI, Mode2.BYTE, dataStr);
      kanjiSegs = [];
    }
    const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
    return segs.sort(function(s1, s2) {
      return s1.index - s2.index;
    }).map(function(obj) {
      return {
        data: obj.data,
        mode: obj.mode,
        length: obj.length
      };
    });
  }
  function getSegmentBitsLength(length, mode2) {
    switch (mode2) {
      case Mode2.NUMERIC:
        return NumericData2.getBitsLength(length);
      case Mode2.ALPHANUMERIC:
        return AlphanumericData2.getBitsLength(length);
      case Mode2.KANJI:
        return KanjiData2.getBitsLength(length);
      case Mode2.BYTE:
        return ByteData2.getBitsLength(length);
    }
  }
  function mergeSegments(segs) {
    return segs.reduce(function(acc, curr) {
      const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
      if (prevSeg && prevSeg.mode === curr.mode) {
        acc[acc.length - 1].data += curr.data;
        return acc;
      }
      acc.push(curr);
      return acc;
    }, []);
  }
  function buildNodes(segs) {
    const nodes = [];
    for (let i = 0; i < segs.length; i++) {
      const seg = segs[i];
      switch (seg.mode) {
        case Mode2.NUMERIC:
          nodes.push([
            seg,
            { data: seg.data, mode: Mode2.ALPHANUMERIC, length: seg.length },
            { data: seg.data, mode: Mode2.BYTE, length: seg.length }
          ]);
          break;
        case Mode2.ALPHANUMERIC:
          nodes.push([
            seg,
            { data: seg.data, mode: Mode2.BYTE, length: seg.length }
          ]);
          break;
        case Mode2.KANJI:
          nodes.push([
            seg,
            { data: seg.data, mode: Mode2.BYTE, length: getStringByteLength(seg.data) }
          ]);
          break;
        case Mode2.BYTE:
          nodes.push([
            { data: seg.data, mode: Mode2.BYTE, length: getStringByteLength(seg.data) }
          ]);
      }
    }
    return nodes;
  }
  function buildGraph(nodes, version2) {
    const table = {};
    const graph = { start: {} };
    let prevNodeIds = ["start"];
    for (let i = 0; i < nodes.length; i++) {
      const nodeGroup = nodes[i];
      const currentNodeIds = [];
      for (let j = 0; j < nodeGroup.length; j++) {
        const node = nodeGroup[j];
        const key = "" + i + j;
        currentNodeIds.push(key);
        table[key] = { node, lastCount: 0 };
        graph[key] = {};
        for (let n = 0; n < prevNodeIds.length; n++) {
          const prevNodeId = prevNodeIds[n];
          if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
            graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
            table[prevNodeId].lastCount += node.length;
          } else {
            if (table[prevNodeId])
              table[prevNodeId].lastCount = node.length;
            graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode2.getCharCountIndicator(node.mode, version2);
          }
        }
      }
      prevNodeIds = currentNodeIds;
    }
    for (let n = 0; n < prevNodeIds.length; n++) {
      graph[prevNodeIds[n]].end = 0;
    }
    return { map: graph, table };
  }
  function buildSingleSegment(data, modesHint) {
    let mode2;
    const bestMode = Mode2.getBestModeForData(data);
    mode2 = Mode2.from(modesHint, bestMode);
    if (mode2 !== Mode2.BYTE && mode2.bit < bestMode.bit) {
      throw new Error('"' + data + '" cannot be encoded with mode ' + Mode2.toString(mode2) + ".\n Suggested mode is: " + Mode2.toString(bestMode));
    }
    if (mode2 === Mode2.KANJI && !Utils2.isKanjiModeEnabled()) {
      mode2 = Mode2.BYTE;
    }
    switch (mode2) {
      case Mode2.NUMERIC:
        return new NumericData2(data);
      case Mode2.ALPHANUMERIC:
        return new AlphanumericData2(data);
      case Mode2.KANJI:
        return new KanjiData2(data);
      case Mode2.BYTE:
        return new ByteData2(data);
    }
  }
  exports.fromArray = function fromArray(array) {
    return array.reduce(function(acc, seg) {
      if (typeof seg === "string") {
        acc.push(buildSingleSegment(seg, null));
      } else if (seg.data) {
        acc.push(buildSingleSegment(seg.data, seg.mode));
      }
      return acc;
    }, []);
  };
  exports.fromString = function fromString(data, version2) {
    const segs = getSegmentsFromString(data, Utils2.isKanjiModeEnabled());
    const nodes = buildNodes(segs);
    const graph = buildGraph(nodes, version2);
    const path = dijkstra$1.find_path(graph.map, "start", "end");
    const optimizedSegs = [];
    for (let i = 1; i < path.length - 1; i++) {
      optimizedSegs.push(graph.table[path[i]].node);
    }
    return exports.fromArray(mergeSegments(optimizedSegs));
  };
  exports.rawSplit = function rawSplit(data) {
    return exports.fromArray(
      getSegmentsFromString(data, Utils2.isKanjiModeEnabled())
    );
  };
})(segments);
const Utils$1 = utils$1;
const ECLevel = errorCorrectionLevel;
const BitBuffer = bitBuffer;
const BitMatrix = bitMatrix;
const AlignmentPattern = alignmentPattern;
const FinderPattern = finderPattern;
const MaskPattern = maskPattern;
const ECCode = errorCorrectionCode;
const ReedSolomonEncoder = reedSolomonEncoder;
const Version = version;
const FormatInfo = formatInfo;
const Mode = mode;
const Segments = segments;
function setupFinderPattern(matrix, version2) {
  const size = matrix.size;
  const pos = FinderPattern.getPositions(version2);
  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];
    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r)
        continue;
      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c)
          continue;
        if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}
function setupTimingPattern(matrix) {
  const size = matrix.size;
  for (let r = 8; r < size - 8; r++) {
    const value = r % 2 === 0;
    matrix.set(r, 6, value, true);
    matrix.set(6, r, value, true);
  }
}
function setupAlignmentPattern(matrix, version2) {
  const pos = AlignmentPattern.getPositions(version2);
  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}
function setupVersionInfo(matrix, version2) {
  const size = matrix.size;
  const bits = Version.getEncodedBits(version2);
  let row, col, mod;
  for (let i = 0; i < 18; i++) {
    row = Math.floor(i / 3);
    col = i % 3 + size - 8 - 3;
    mod = (bits >> i & 1) === 1;
    matrix.set(row, col, mod, true);
    matrix.set(col, row, mod, true);
  }
}
function setupFormatInfo(matrix, errorCorrectionLevel2, maskPattern2) {
  const size = matrix.size;
  const bits = FormatInfo.getEncodedBits(errorCorrectionLevel2, maskPattern2);
  let i, mod;
  for (i = 0; i < 15; i++) {
    mod = (bits >> i & 1) === 1;
    if (i < 6) {
      matrix.set(i, 8, mod, true);
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true);
    } else {
      matrix.set(size - 15 + i, 8, mod, true);
    }
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true);
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true);
    } else {
      matrix.set(8, 15 - i - 1, mod, true);
    }
  }
  matrix.set(size - 8, 8, 1, true);
}
function setupData(matrix, data) {
  const size = matrix.size;
  let inc = -1;
  let row = size - 1;
  let bitIndex = 7;
  let byteIndex = 0;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6)
      col--;
    while (true) {
      for (let c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          let dark = false;
          if (byteIndex < data.length) {
            dark = (data[byteIndex] >>> bitIndex & 1) === 1;
          }
          matrix.set(row, col - c, dark);
          bitIndex--;
          if (bitIndex === -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }
      row += inc;
      if (row < 0 || size <= row) {
        row -= inc;
        inc = -inc;
        break;
      }
    }
  }
}
function createData(version2, errorCorrectionLevel2, segments2) {
  const buffer = new BitBuffer();
  segments2.forEach(function(data) {
    buffer.put(data.mode.bit, 4);
    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version2));
    data.write(buffer);
  });
  const totalCodewords = Utils$1.getSymbolTotalCodewords(version2);
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel2);
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4);
  }
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0);
  }
  const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
  for (let i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 17 : 236, 8);
  }
  return createCodewords(buffer, version2, errorCorrectionLevel2);
}
function createCodewords(bitBuffer2, version2, errorCorrectionLevel2) {
  const totalCodewords = Utils$1.getSymbolTotalCodewords(version2);
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version2, errorCorrectionLevel2);
  const dataTotalCodewords = totalCodewords - ecTotalCodewords;
  const ecTotalBlocks = ECCode.getBlocksCount(version2, errorCorrectionLevel2);
  const blocksInGroup2 = totalCodewords % ecTotalBlocks;
  const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
  const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
  const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
  const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
  const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
  const rs = new ReedSolomonEncoder(ecCount);
  let offset = 0;
  const dcData = new Array(ecTotalBlocks);
  const ecData = new Array(ecTotalBlocks);
  let maxDataSize = 0;
  const buffer = new Uint8Array(bitBuffer2.buffer);
  for (let b = 0; b < ecTotalBlocks; b++) {
    const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
    dcData[b] = buffer.slice(offset, offset + dataSize);
    ecData[b] = rs.encode(dcData[b]);
    offset += dataSize;
    maxDataSize = Math.max(maxDataSize, dataSize);
  }
  const data = new Uint8Array(totalCodewords);
  let index = 0;
  let i, r;
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i];
      }
    }
  }
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i];
    }
  }
  return data;
}
function createSymbol(data, version2, errorCorrectionLevel2, maskPattern2) {
  let segments2;
  if (Array.isArray(data)) {
    segments2 = Segments.fromArray(data);
  } else if (typeof data === "string") {
    let estimatedVersion = version2;
    if (!estimatedVersion) {
      const rawSegments = Segments.rawSplit(data);
      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel2);
    }
    segments2 = Segments.fromString(data, estimatedVersion || 40);
  } else {
    throw new Error("Invalid data");
  }
  const bestVersion = Version.getBestVersionForData(segments2, errorCorrectionLevel2);
  if (!bestVersion) {
    throw new Error("The amount of data is too big to be stored in a QR Code");
  }
  if (!version2) {
    version2 = bestVersion;
  } else if (version2 < bestVersion) {
    throw new Error(
      "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
    );
  }
  const dataBits = createData(version2, errorCorrectionLevel2, segments2);
  const moduleCount = Utils$1.getSymbolSize(version2);
  const modules = new BitMatrix(moduleCount);
  setupFinderPattern(modules, version2);
  setupTimingPattern(modules);
  setupAlignmentPattern(modules, version2);
  setupFormatInfo(modules, errorCorrectionLevel2, 0);
  if (version2 >= 7) {
    setupVersionInfo(modules, version2);
  }
  setupData(modules, dataBits);
  if (isNaN(maskPattern2)) {
    maskPattern2 = MaskPattern.getBestMask(
      modules,
      setupFormatInfo.bind(null, modules, errorCorrectionLevel2)
    );
  }
  MaskPattern.applyMask(maskPattern2, modules);
  setupFormatInfo(modules, errorCorrectionLevel2, maskPattern2);
  return {
    modules,
    version: version2,
    errorCorrectionLevel: errorCorrectionLevel2,
    maskPattern: maskPattern2,
    segments: segments2
  };
}
qrcode.create = function create(data, options) {
  if (typeof data === "undefined" || data === "") {
    throw new Error("No input text");
  }
  let errorCorrectionLevel2 = ECLevel.M;
  let version2;
  let mask;
  if (typeof options !== "undefined") {
    errorCorrectionLevel2 = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
    version2 = Version.from(options.version);
    mask = MaskPattern.from(options.maskPattern);
    if (options.toSJISFunc) {
      Utils$1.setToSJISFunction(options.toSJISFunc);
    }
  }
  return createSymbol(data, version2, errorCorrectionLevel2, mask);
};
var canvas$1 = {};
var utils = {};
(function(exports) {
  function hex2rgba(hex) {
    if (typeof hex === "number") {
      hex = hex.toString();
    }
    if (typeof hex !== "string") {
      throw new Error("Color should be defined as hex string");
    }
    let hexCode = hex.slice().replace("#", "").split("");
    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
      throw new Error("Invalid hex color: " + hex);
    }
    if (hexCode.length === 3 || hexCode.length === 4) {
      hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
        return [c, c];
      }));
    }
    if (hexCode.length === 6)
      hexCode.push("F", "F");
    const hexValue = parseInt(hexCode.join(""), 16);
    return {
      r: hexValue >> 24 & 255,
      g: hexValue >> 16 & 255,
      b: hexValue >> 8 & 255,
      a: hexValue & 255,
      hex: "#" + hexCode.slice(0, 6).join("")
    };
  }
  exports.getOptions = function getOptions(options) {
    if (!options)
      options = {};
    if (!options.color)
      options.color = {};
    const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
    const width = options.width && options.width >= 21 ? options.width : void 0;
    const scale = options.scale || 4;
    return {
      width,
      scale: width ? 4 : scale,
      margin,
      color: {
        dark: hex2rgba(options.color.dark || "#000000ff"),
        light: hex2rgba(options.color.light || "#ffffffff")
      },
      type: options.type,
      rendererOpts: options.rendererOpts || {}
    };
  };
  exports.getScale = function getScale(qrSize, opts) {
    return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
  };
  exports.getImageWidth = function getImageWidth(qrSize, opts) {
    const scale = exports.getScale(qrSize, opts);
    return Math.floor((qrSize + opts.margin * 2) * scale);
  };
  exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
    const size = qr.modules.size;
    const data = qr.modules.data;
    const scale = exports.getScale(size, opts);
    const symbolSize = Math.floor((size + opts.margin * 2) * scale);
    const scaledMargin = opts.margin * scale;
    const palette = [opts.color.light, opts.color.dark];
    for (let i = 0; i < symbolSize; i++) {
      for (let j = 0; j < symbolSize; j++) {
        let posDst = (i * symbolSize + j) * 4;
        let pxColor = opts.color.light;
        if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
          const iSrc = Math.floor((i - scaledMargin) / scale);
          const jSrc = Math.floor((j - scaledMargin) / scale);
          pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
        }
        imgData[posDst++] = pxColor.r;
        imgData[posDst++] = pxColor.g;
        imgData[posDst++] = pxColor.b;
        imgData[posDst] = pxColor.a;
      }
    }
  };
})(utils);
(function(exports) {
  const Utils2 = utils;
  function clearCanvas(ctx, canvas2, size) {
    ctx.clearRect(0, 0, canvas2.width, canvas2.height);
    if (!canvas2.style)
      canvas2.style = {};
    canvas2.height = size;
    canvas2.width = size;
    canvas2.style.height = size + "px";
    canvas2.style.width = size + "px";
  }
  function getCanvasElement() {
    try {
      return document.createElement("canvas");
    } catch (e) {
      throw new Error("You need to specify a canvas element");
    }
  }
  exports.render = function render2(qrData, canvas2, options) {
    let opts = options;
    let canvasEl = canvas2;
    if (typeof opts === "undefined" && (!canvas2 || !canvas2.getContext)) {
      opts = canvas2;
      canvas2 = void 0;
    }
    if (!canvas2) {
      canvasEl = getCanvasElement();
    }
    opts = Utils2.getOptions(opts);
    const size = Utils2.getImageWidth(qrData.modules.size, opts);
    const ctx = canvasEl.getContext("2d");
    const image = ctx.createImageData(size, size);
    Utils2.qrToImageData(image.data, qrData, opts);
    clearCanvas(ctx, canvasEl, size);
    ctx.putImageData(image, 0, 0);
    return canvasEl;
  };
  exports.renderToDataURL = function renderToDataURL(qrData, canvas2, options) {
    let opts = options;
    if (typeof opts === "undefined" && (!canvas2 || !canvas2.getContext)) {
      opts = canvas2;
      canvas2 = void 0;
    }
    if (!opts)
      opts = {};
    const canvasEl = exports.render(qrData, canvas2, opts);
    const type = opts.type || "image/png";
    const rendererOpts = opts.rendererOpts || {};
    return canvasEl.toDataURL(type, rendererOpts.quality);
  };
})(canvas$1);
var svgTag = {};
const Utils = utils;
function getColorAttrib(color, attrib) {
  const alpha = color.a / 255;
  const str = attrib + '="' + color.hex + '"';
  return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}
function svgCmd(cmd, x, y) {
  let str = cmd + x;
  if (typeof y !== "undefined")
    str += " " + y;
  return str;
}
function qrToPath(data, size, margin) {
  let path = "";
  let moveBy = 0;
  let newRow = false;
  let lineLength = 0;
  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size);
    const row = Math.floor(i / size);
    if (!col && !newRow)
      newRow = true;
    if (data[i]) {
      lineLength++;
      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
        moveBy = 0;
        newRow = false;
      }
      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd("h", lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }
  return path;
}
svgTag.render = function render(qrData, options, cb) {
  const opts = Utils.getOptions(options);
  const size = qrData.modules.size;
  const data = qrData.modules.data;
  const qrcodesize = size + opts.margin * 2;
  const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
  const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
  const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
  const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
  const svgTag2 = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
  if (typeof cb === "function") {
    cb(null, svgTag2);
  }
  return svgTag2;
};
const canPromise = canPromise$1;
const QRCode = qrcode;
const CanvasRenderer = canvas$1;
const SvgRenderer = svgTag;
function renderCanvas(renderFunc, canvas2, text, opts, cb) {
  const args = [].slice.call(arguments, 1);
  const argsNum = args.length;
  const isLastArgCb = typeof args[argsNum - 1] === "function";
  if (!isLastArgCb && !canPromise()) {
    throw new Error("Callback required as last argument");
  }
  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error("Too few arguments provided");
    }
    if (argsNum === 2) {
      cb = text;
      text = canvas2;
      canvas2 = opts = void 0;
    } else if (argsNum === 3) {
      if (canvas2.getContext && typeof cb === "undefined") {
        cb = opts;
        opts = void 0;
      } else {
        cb = opts;
        opts = text;
        text = canvas2;
        canvas2 = void 0;
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error("Too few arguments provided");
    }
    if (argsNum === 1) {
      text = canvas2;
      canvas2 = opts = void 0;
    } else if (argsNum === 2 && !canvas2.getContext) {
      opts = text;
      text = canvas2;
      canvas2 = void 0;
    }
    return new Promise(function(resolve, reject) {
      try {
        const data = QRCode.create(text, opts);
        resolve(renderFunc(data, canvas2, opts));
      } catch (e) {
        reject(e);
      }
    });
  }
  try {
    const data = QRCode.create(text, opts);
    cb(null, renderFunc(data, canvas2, opts));
  } catch (e) {
    cb(e);
  }
}
browser.create = QRCode.create;
browser.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
browser.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
browser.toString = renderCanvas.bind(null, function(data, _, opts) {
  return SvgRenderer.render(data, opts);
});
const server_url = `http://${sessionStorage.getItem("server_IP")}`;
const server_token = sessionStorage.getItem("server_api_token");
const server_port = 8080;
var canvas;
const canvas_css_classes = "border-b";
var menu_items;
var picked_items = [];
window.screen.orientation.lock("landscape");
window.addEventListener("DOMContentLoaded", () => {
  get_menu_design();
  hideStatusBar();
  keepAwake();
  toggle_sidebar();
  display_items_picked();
});
function get_menu_design() {
  console.log("called get_menu_design()");
  return new Promise((resolve, reject) => {
    CapacitorHttp.get({
      url: `${server_url}:${server_port}/menu_design?api_token=${server_token}`
    }).then((response) => {
      const json_data = response.data;
      generate_canvas_area(json_data.canvas_height, json_data.canvas_width, function() {
        canvas.loadFromJSON(json_data.canvas_objects, function() {
          canvas.renderAll();
          const canvas_objects = canvas.getObjects();
          canvas_objects.forEach((object) => {
            object.set({
              lockMovementX: true,
              lockMovementY: true,
              editable: false,
              resizable: false,
              hasBorders: false,
              hasControls: false
            });
          });
        });
        const scale = Math.min(window.innerWidth / json_data.canvas_width, window.innerHeight / json_data.canvas_height);
        canvas.setZoom(scale);
        get_selected_objects();
        get_menu_items();
      });
      resolve();
    }).catch((error) => {
      console.error(error);
      reject(error);
    });
  });
}
function get_menu_items() {
  console.log("called get_menu_items()");
  return new Promise((resolve, reject) => {
    CapacitorHttp.get({
      url: `${server_url}:${server_port}/menu_items_lite?api_token=${server_token}`
    }).then((response) => {
      const json_data = response.data;
      menu_items = json_data;
      resolve();
    }).catch((error) => {
      alert(`Connection Failed: Server is down.
Your order will not be received.
${error}`);
      reject(error);
    });
  });
}
function generate_canvas_area(canvas_height, canvas_width, callback) {
  console.log("called generate_canvas_area()");
  const canvas_element = document.createElement("canvas");
  canvas_element.id = "canvas";
  canvas_element.className = canvas_css_classes;
  const canvas_placeholder = document.querySelector("#canvas_area");
  canvas_placeholder.innerHTML = "";
  canvas_placeholder.appendChild(canvas_element);
  canvas = new fabric.fabric.Canvas("canvas", {
    preserveObjectStacking: true,
    height: canvas_height,
    width: canvas_width,
    selection: false
  });
  if (canvas) {
    if (typeof callback === "function")
      callback();
  }
}
function get_selected_objects() {
  if (!canvas)
    return;
  console.log("called get_selected_objects()");
  canvas.on("mouse:up", function(event) {
    hideStatusBar();
    const selected_object = canvas.getActiveObject();
    item_quantity_dialog(selected_object);
  });
}
var item_quantity_input_listener;
var item_quantity_minus_listener;
var item_quantity_plus_listener;
var item_pick_button_listener;
function item_quantity_dialog(selected_object) {
  get_menu_items();
  if (selected_object && selected_object.group_id) {
    const object_group_id = selected_object.group_id;
    menu_items.forEach((item) => {
      if (item.item_id == object_group_id) {
        dialog_open("item_order_quantity_dialog");
        const item_name_span = document.getElementById("item_name");
        const item_price_span = document.getElementById("item_price");
        const item_cost_by_quantity_span = document.getElementById("item_cost_by_quantity");
        const item_quantity_count = document.getElementById("item_quantity_count");
        const item_quantity_range = document.getElementById("item_quantity_range");
        const item_quantity_range_min = parseInt(item_quantity_range.min);
        const item_quantity_range_max = parseInt(item_quantity_range.max);
        const item_quantity_range_step = parseInt(item_quantity_range.step);
        item_name_span.textContent = item.item_name;
        item_price_span.textContent = item.item_price;
        item_cost_by_quantity_span.textContent = item.item_price * parseInt(item_quantity_range.value);
        item_quantity_count.textContent = item_quantity_range.value;
        if (item_quantity_range) {
          if (item_quantity_input_listener) {
            item_quantity_range.removeEventListener("input", item_quantity_input_listener);
            item_quantity_count.textContent = 1;
            item_quantity_range.value = 1;
            item_cost_by_quantity_span.textContent = item.item_price;
          }
          item_quantity_input_listener = function() {
            console.log("called item_quantity_input_listener()");
            item_cost_by_quantity_span.textContent = item.item_price * item_quantity_range.value;
            item_quantity_count.textContent = item_quantity_range.value;
          };
          item_quantity_range.addEventListener("input", item_quantity_input_listener);
        }
        const item_quantity_minus = document.getElementById("item_quantity_minus");
        if (item_quantity_minus) {
          if (item_quantity_minus_listener) {
            item_quantity_minus.removeEventListener("click", item_quantity_minus_listener);
          }
          item_quantity_minus_listener = function() {
            if (parseInt(item_quantity_range.value) <= item_quantity_range_min)
              return;
            console.log("called item_quantity_minus_listener()");
            item_quantity_range.value = parseInt(item_quantity_range.value) - item_quantity_range_step;
            item_cost_by_quantity_span.textContent = item.item_price * item_quantity_range.value;
            item_quantity_count.textContent = item_quantity_range.value;
          };
          item_quantity_minus.addEventListener("click", item_quantity_minus_listener);
        }
        const item_quantity_plus = document.getElementById("item_quantity_plus");
        if (item_quantity_plus) {
          if (item_quantity_plus_listener) {
            item_quantity_plus.removeEventListener("click", item_quantity_plus_listener);
          }
          item_quantity_plus_listener = function() {
            if (parseInt(item_quantity_range.value) >= item_quantity_range_max)
              return;
            console.log("called item_quantity_plus_listener()");
            item_quantity_range.value = parseInt(item_quantity_range.value) + item_quantity_range_step;
            item_cost_by_quantity_span.textContent = item.item_price * item_quantity_range.value;
            item_quantity_count.textContent = item_quantity_range.value;
          };
          item_quantity_plus.addEventListener("click", item_quantity_plus_listener);
        }
        const item_pick_button = document.getElementById("item_pick_button");
        if (item_pick_button) {
          if (item_pick_button_listener) {
            item_pick_button.removeEventListener("click", item_pick_button_listener);
          }
          item_pick_button_listener = function() {
            console.log("called item_pick_button_listener()");
            dialog_close("item_order_quantity_dialog");
            let item_details = {
              "item_id": item.item_id,
              "item_name": item.item_name,
              "item_price": item.item_price,
              "item_cost": parseFloat(item_cost_by_quantity_span.textContent),
              "item_quantity": parseFloat(item_quantity_count.textContent)
            };
            let item_found = false;
            picked_items.forEach((picked_item) => {
              if (picked_item.item_id === item_details.item_id) {
                picked_item.item_quantity += item_details.item_quantity;
                picked_item.item_cost += item_details.item_cost;
                item_found = true;
              }
            });
            if (!item_found)
              picked_items.push(item_details);
            sidebar();
          };
          item_pick_button.addEventListener("click", item_pick_button_listener);
        }
      }
    });
    const cancel_order_quantity_dialog_button = document.getElementById("cancel_order_quantity_dialog");
    if (cancel_order_quantity_dialog_button) {
      cancel_order_quantity_dialog_button.addEventListener("click", function() {
        dialog_close("item_order_quantity_dialog");
        canvas.discardActiveObject();
      });
    }
  }
}
var review_order_button_listener;
function sidebar() {
  if (picked_items.length == 0)
    return;
  console.log("called sidebar()");
  display_items_picked();
  const review_order_button = document.getElementById("review_order_button");
  if (review_order_button) {
    if (review_order_button_listener) {
      review_order_button.removeEventListener("click", review_order_button_listener);
    }
    review_order_button_listener = function() {
      if (picked_items.length == 0)
        return;
      console.log("called review_order_button_listener()");
      review_picked_items_dialog();
      dialog_open("review_order_dialog");
    };
    review_order_button.addEventListener("click", review_order_button_listener);
  }
  let total_cost = 0;
  picked_items.forEach((picked_item) => {
    total_cost += picked_item.item_cost;
  });
  const total_cost_span = document.getElementById("total_cost");
  total_cost_span.textContent = parseFloat(total_cost);
}
function display_items_picked() {
  console.log("called display_items_picked()");
  var placeholder = document.querySelector("#items_picked_list");
  var out = "";
  for (let item of picked_items) {
    out += `
			<tr class="border-b">
				<td class="text-center">
					<button class="delete_picked_item_button border px-2 rounded-xl">
						remove
					</button>
				</td>
				<td data-column="" class="text-center hidden">${item.item_id}</td>
				<td data-column="" class="text-center">${item.item_name}</td>
				<td data-column="" class="text-center">${item.item_quantity}</td>
				<td data-column="" class="text-center">${item.item_price}</td>
				<td data-column="" class="text-center">${item.item_cost}</td>
			</tr>
		`;
  }
  placeholder.innerHTML = out;
  delete_picked_item();
}
function delete_picked_item() {
  console.log("called delete_picked_item()");
  var delete_buttons = document.querySelectorAll(".delete_picked_item_button");
  delete_buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      const row = button.closest("tr");
      const item_id = parseInt(row.querySelector(".hidden").textContent);
      console.log("item_id", item_id);
      picked_items = picked_items.filter((item) => item.item_id !== item_id);
      console.log(picked_items);
      let total_cost = 0;
      picked_items.forEach((picked_item) => {
        total_cost += picked_item.item_cost;
      });
      const total_cost_span = document.getElementById("total_cost");
      total_cost_span.textContent = parseFloat(total_cost);
      display_items_picked();
    });
  });
}
var order_button_listener;
function review_picked_items_dialog() {
  if (picked_items.length == 0)
    return;
  console.log("called review_picked_items_dialog()");
  const cancel_review_order_dialog = document.getElementById("cancel_review_order_dialog");
  if (cancel_review_order_dialog) {
    cancel_review_order_dialog.addEventListener("click", function() {
      dialog_close("review_order_dialog");
    });
  }
  const order_button = document.getElementById("order_button");
  if (order_button) {
    if (order_button_listener) {
      order_button.removeEventListener("click", order_button_listener);
    }
    order_button_listener = async function() {
      console.log("called order_button_listener()");
      let order_details = {
        order_details: [{
          customer_name: document.getElementById("order_customer_name").value,
          total_price: document.getElementById("total_cost").textContent,
          transaction_date: document.getElementById("order_timestamp").textContent
        }],
        item_ordered: picked_items.map((item) => ({
          item_id: item.item_id,
          item_name: item.item_name,
          item_price: item.item_price,
          item_quantity: item.item_quantity,
          item_cost: item.item_cost
        }))
      };
      send_order_to_server(order_details, function() {
        dialog_open("display_queue_number_dialog");
        queue_number_dialog();
      });
    };
    order_button.addEventListener("click", order_button_listener);
  }
  const order_timestamp = document.getElementById("order_timestamp");
  order_timestamp.textContent = get_current_timestamp();
  var order_items_list = document.querySelector("#order_items_list");
  var order_items_list_out = "";
  for (let item of picked_items) {
    order_items_list_out += `
			<tr class="border-b">
				<td data-column="" class="text-center px-2 font-bold border-r border-l">${item.item_name}</td>
				<td data-column="" class="text-center px-2 border-r">${item.item_quantity}</td>
				<td data-column="" class="text-center px-2 border-r">${item.item_price}</td>
				<td data-column="" class="text-center px-2 border-r">${item.item_cost}</td>
			</tr>
		`;
  }
  order_items_list.innerHTML = order_items_list_out;
  let total_cost = 0;
  picked_items.forEach((picked_item) => {
    total_cost += picked_item.item_cost;
  });
  const order_total_cost = document.getElementById("order_total_cost");
  order_total_cost.textContent = parseFloat(total_cost);
}
var display_queue_number_done_listener;
function queue_number_dialog() {
  console.log("called queue_number_dialog()");
  const display_queue_number_done_button = document.getElementById("display_queue_number_done_button");
  if (display_queue_number_done_button) {
    if (display_queue_number_done_listener) {
      display_queue_number_done_button.removeEventListener("click", display_queue_number_done_listener);
    }
    display_queue_number_done_listener = function() {
      console.log("called display_queue_number_done_listener()");
      dialog_close("display_queue_number_dialog");
      document.getElementById("order_customer_name").value = "";
      picked_items = [];
      display_items_picked();
      document.getElementById("total_cost").textContent = 0;
      dialog_close("review_order_dialog");
      document.getElementById("minimal_sidebar").classList.remove("hidden");
      document.getElementById("full_sidebar").classList.add("hidden");
    };
    display_queue_number_done_button.addEventListener("click", display_queue_number_done_listener);
  }
}
function send_order_to_server(order_details, callback) {
  console.log(`called send_order_to_server()`);
  CapacitorHttp.post({
    url: `${server_url}:${server_port}/send_order?api_token=${server_token}`,
    data: order_details,
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => {
    if (response.status === 200) {
      if (typeof callback === "function") {
        callback();
        document.getElementById("order_queue_number").textContent = response.data.queue_number;
        generate_qrcode(response.data.queue_number, order_details);
      }
    }
  }).catch((error) => {
    console.error(error);
    alert(error);
  });
}
function generate_qrcode(queue_number, order_details) {
  console.log("called generate_qrcode()");
  const canvas2 = document.getElementById("qr_code");
  order_details.item_ordered.forEach((item) => {
    delete item.item_id;
  });
  const qr_data = [{ "queue_number": queue_number }, order_details];
  const jsoned_qr_data = JSON.stringify(qr_data, null, 2).replace(/[\[\]{}]/g, "");
  browser.toCanvas(canvas2, jsoned_qr_data, { scale: 2 });
}
function toggle_sidebar() {
  console.log("called toggle_sidebar()");
  const toggle_sidebar_full = document.getElementById("toggle_sidebar_full");
  if (toggle_sidebar_full) {
    toggle_sidebar_full.addEventListener("click", function() {
      document.getElementById("minimal_sidebar").classList.add("hidden");
      document.getElementById("full_sidebar").classList.remove("hidden");
      document.getElementById("full_sidebar").classList.add("grid");
    });
  }
  const toggle_sidebar_min = document.getElementById("toggle_sidebar_min");
  if (toggle_sidebar_min) {
    toggle_sidebar_min.addEventListener("click", function() {
      document.getElementById("minimal_sidebar").classList.remove("hidden");
      document.getElementById("full_sidebar").classList.add("hidden");
    });
  }
}
function dialog_open(element_id) {
  console.log(`called dialog_open(${element_id})`);
  const fav_dialog = document.getElementById(element_id);
  fav_dialog.classList.add("active-dialog");
  fav_dialog.classList.remove("hidden");
  fav_dialog.inert = true;
  fav_dialog.showModal();
  fav_dialog.inert = false;
}
function dialog_close(element_id) {
  console.log(`called dialog_close(${element_id})`);
  const fav_dialog = document.getElementById(element_id);
  fav_dialog.classList.remove("active-dialog");
  fav_dialog.classList.add("hidden");
  fav_dialog.close();
}
function get_current_timestamp() {
  console.log("called get_current_timestamp()");
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return timestamp;
}
