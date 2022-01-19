import {createElement} from '../render.js';

const createPopupContainerTemplate = () => (
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    </form>
  </section>`
);

export default class PopupContainerView {
  #element = null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createPopupContainerTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
