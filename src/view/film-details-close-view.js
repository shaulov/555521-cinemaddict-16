import AbstractView from './abstract-view.js';

const createFilmDetailsCloseTemplate = () => (
  `<div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>`
);

export default class FilmDetailsCloseView extends AbstractView{
  get template() {
    return createFilmDetailsCloseTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
}
