import AbstractView from './abstract-view.js';

const createFilmDetailsInfoTemplate = ({name, originalName, rating}) => (
  `<div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${name}</h3>
        <p class="film-details__title-original">Original: ${originalName}</p>
      </div>

      <div class="film-details__rating">
        <p class="film-details__total-rating">${rating}</p>
      </div>
    </div>
  </div>`
);

export default class FilmDetailsInfoView extends AbstractView{
  #info = null;

  constructor(info) {
    super();
    this.#info = info;
  }

  get template() {
    return createFilmDetailsInfoTemplate(this.#info);
  }
}
