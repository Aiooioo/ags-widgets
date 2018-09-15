/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, decorators_1, Widget, widget_1) {
    "use strict";
    var CSS = {
        base: "esri-slider-v esri-widget",
        inner: "esri-slider-v__inner",
        label: "esri-slider-v__label",
        input: "esri-slider-v__input",
        anchor: "esri-widget__anchor",
        slider: "esri-slider-v__slider",
        widgetIcon: "esri-icon-description",
        buttons: "esri-widget esri-widget--button esri-slider-v__toggle-button",
        playbtn: "toggle-button-icon esri-icon-play",
        pausebtn: "toggle-button-icon esri-icon-pause",
        // common.css
        interactive: "esri-interactive"
    };
    var SliderAnimation = /** @class */ (function (_super) {
        __extends(SliderAnimation, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        /**
         * @constructor
         * @alias module:esri/widgets/Attribution
         * @extends module:esri/widgets/Widget
         * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
         *                                that may be passed into the constructor.
         */
        function SliderAnimation(params) {
            var _this = _super.call(this) || this;
            _this.datalist = [];
            _this.step = 0.25;
            _this.value = 0;
            _this._animation = null;
            return _this;
        }
        SliderAnimation.prototype.render = function () {
            var _a;
            var toggleClass = (_a = {},
                _a["toggle"] = !!this._animation,
                _a);
            return (widget_1.tsx("div", { bind: this, class: this.classes(CSS.base) },
                widget_1.tsx("div", { class: this.classes(CSS.inner) },
                    widget_1.tsx("div", { class: this.classes(CSS.label) },
                        widget_1.tsx("span", null, this.datalist[Math.floor(this.value)])),
                    widget_1.tsx("div", { class: this.classes(CSS.input) },
                        widget_1.tsx("input", { type: "range", min: "0", max: this.datalist.length - 1, value: this.value, step: this.step, class: this.classes(CSS.slider), bind: this, onchange: this.inputHandler }))),
                widget_1.tsx("div", { class: this.classes(CSS.buttons, toggleClass), role: "button", bind: this, onclick: this.toggleAnimation },
                    widget_1.tsx("div", null,
                        widget_1.tsx("span", { class: this.classes(CSS.playbtn), "aria-label": "play icon" }),
                        widget_1.tsx("span", null, "Start")),
                    widget_1.tsx("div", null,
                        widget_1.tsx("span", { class: this.classes(CSS.pausebtn), "aria-label": "pause icon" }),
                        widget_1.tsx("span", null, "Pause")))));
        };
        SliderAnimation.prototype.refreshValue = function (value) {
            this.value = value;
            this.emit("change", { value: value });
        };
        SliderAnimation.prototype.inputHandler = function (evt) {
            this.stopAnimation();
            this.refreshValue(parseInt(evt.target.value));
        };
        SliderAnimation.prototype.toggleAnimation = function () {
            if (this._animation) {
                this.stopAnimation();
            }
            else {
                this.startAnimation();
            }
        };
        SliderAnimation.prototype.startAnimation = function () {
            this.stopAnimation();
            this._animation = this.animate(this.value);
        };
        SliderAnimation.prototype.stopAnimation = function () {
            if (!this._animation) {
                return;
            }
            this._animation.remove();
            this._animation = null;
        };
        SliderAnimation.prototype.animate = function (startValue) {
            var animating = true;
            var value = startValue;
            var direction = 0.05;
            var max = this.datalist.length - 1;
            var that = this;
            var frame = function () {
                if (!animating) {
                    return;
                }
                value += direction;
                if (value > max) {
                    value = max;
                    direction = -direction;
                }
                else if (value < 0) {
                    value = 0;
                    direction = -direction;
                }
                that.refreshValue(value);
                requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
            return {
                remove: function () {
                    animating = false;
                }
            };
        };
        __decorate([
            decorators_1.property()
        ], SliderAnimation.prototype, "datalist", void 0);
        __decorate([
            decorators_1.property()
        ], SliderAnimation.prototype, "step", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], SliderAnimation.prototype, "value", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], SliderAnimation.prototype, "inputHandler", null);
        __decorate([
            widget_1.accessibleHandler()
        ], SliderAnimation.prototype, "toggleAnimation", null);
        SliderAnimation = __decorate([
            decorators_1.subclass("demo.SliderAnimation")
        ], SliderAnimation);
        return SliderAnimation;
    }(decorators_1.declared(Widget)));
    return SliderAnimation;
});
//# sourceMappingURL=SliderAnimation.js.map