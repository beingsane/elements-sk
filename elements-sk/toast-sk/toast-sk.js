// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @module elements-sk/toast-sk
 * @description <h2><code>toast-sk</code></h2>
 *
 * <p>
 *   Notification toast that pops up from the bottom of the screen
 *   when shown.
 * </p>
 *
 * @attr duration - The duration, in ms, to display the notification.
 *               Defaults to 5000. A value of 0 means to display
 *               forever.
 */
import { upgradeProperty } from '../upgradeProperty'

window.customElements.define('toast-sk', class extends HTMLElement {
  constructor() {
    super();
    this._timer = null;
  }

  connectedCallback() {
    if (!this.hasAttribute('duration')) {
      this.duration = 5000;
    }
    upgradeProperty(this, 'duration');
  }

  /** @prop {number} duration Mirrors the duration attribute. */
  get duration() { return +this.getAttribute('duration'); }
  set duration(val) { this.setAttribute('duration', val); }

  /** Displays the contents of the toast. */
  show() {
    this.setAttribute('shown', '');
    if (this.duration > 0 && !this._timer) {
      this._timer = window.setTimeout(() => {
        this._timer = null;
        this.hide();
      }, this.duration);
    }
  }

  /** Hides the contents of the toast. */
  hide() {
    this.removeAttribute('shown');
    if (this._timer) {
      window.clearTimeout(this._timer);
      this._timer = null;
    }
  }
});
