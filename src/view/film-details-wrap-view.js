import AbstractView from './abstract-view.js';

const createFilmDetailsWrapTemplate = () => (
  `<div class="film-details__info-wrap">
  </div>`
);

export default class FilmDetailsWrapView extends AbstractView{
  get template() {
    return createFilmDetailsWrapTemplate();
  }
}
