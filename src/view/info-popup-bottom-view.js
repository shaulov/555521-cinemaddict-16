import {createElement} from '../render.js';

const createInfoPopupBottomTemplate = () => (
  `<div class="film-details__bottom-container">
  </div>`
);

export default class InfoPopupBottomView {
  #element = null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createInfoPopupBottomTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
