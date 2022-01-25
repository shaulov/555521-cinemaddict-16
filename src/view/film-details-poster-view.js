import AbstractView from './abstract-view.js';

const createFilmDetailsPosterTemplate = ({poster, ageRating}) => (
  `<div class="film-details__poster">
    <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

    <p class="film-details__age">${ageRating}</p>
  </div>`
);

export default class FilmDetailsPosterView extends AbstractView{
  #poster = null;

  constructor(poster) {
    super();
    this.#poster = poster;
  }

  get template() {
    return createFilmDetailsPosterTemplate(this.#poster);
  }
}
