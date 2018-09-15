/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import {
  aliasOf,
  property,
  declared,
  subclass
} from "esri/core/accessorSupport/decorators";

import Widget = require("esri/widgets/Widget");
import {
  renderable,
  tsx,
  accessibleHandler
} from "esri/widgets/support/widget";

import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");

import watchUtils = require("esri/core/watchUtils");

const CSS = {
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

@subclass("demo.SliderAnimation")
class SliderAnimation extends declared(Widget) {
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
  constructor(params?: any) {
    super();
  }

  @property()
  datalist: Array<string> = [];

  @property()
  step: number = 0.25;

  @property()
  @renderable()
  value: number = 0;

  private _animation: any = null;

  render() {
    const toggleClass = {
      ["toggle"]: !!this._animation
    };

    return (
      <div bind={this} class={this.classes(CSS.base)}>
        <div class={this.classes(CSS.inner)}>
          <div class={this.classes(CSS.label)}>
            <span>{this.datalist[Math.floor(this.value)]}</span>
          </div>
          <div class={this.classes(CSS.input)}>
            <input
              type="range"
              min="0"
              max={this.datalist.length - 1}
              value={this.value}
              step={this.step}
              class={this.classes(CSS.slider)}
              bind={this}
              onchange={this.inputHandler}
            />
          </div>
        </div>
        <div
          class={this.classes(CSS.buttons, toggleClass)}
          role="button"
          bind={this}
          onclick={this.toggleAnimation}
        >
          <div>
            <span class={this.classes(CSS.playbtn)} aria-label="play icon" />
            <span>Start</span>
          </div>
          <div>
            <span class={this.classes(CSS.pausebtn)} aria-label="pause icon" />
            <span>Pause</span>
          </div>
        </div>
      </div>
    );
  }

  refreshValue(value: number): void {
    this.value = value;
    this.emit("change", { value });
  }

  @accessibleHandler()
  private inputHandler(evt: any): void {
    this.stopAnimation();
    this.refreshValue(parseInt(evt.target.value));
  }

  @accessibleHandler()
  private toggleAnimation(): void {
    if (this._animation) {
      this.stopAnimation();
    } else {
      this.startAnimation();
    }
  }

  private startAnimation(): void {
    this.stopAnimation();
    this._animation = this.animate(this.value);
  }

  private stopAnimation(): void {
    if (!this._animation) {
      return;
    }

    this._animation.remove();
    this._animation = null;
  }

  private animate(startValue: number): any {
    var animating = true;
    var value = startValue;
    var direction = 0.05;
    var max = this.datalist.length - 1;
    var that = this;

    var frame = function() {
      if (!animating) {
        return;
      }

      value += direction;
      if (value > max) {
        value = max;
        direction = -direction;
      } else if (value < 0) {
        value = 0;
        direction = -direction;
      }

      that.refreshValue(value);
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);

    return {
      remove: function() {
        animating = false;
      }
    };
  }
}

export = SliderAnimation;
