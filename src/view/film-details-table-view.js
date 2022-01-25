import AbstractView from './abstract-view.js';

const createFilmDetailsTableTemplate = ({realiseDate, duration, director, writers, cast, country}) => (
  `<table class="film-details__table">
    <tbody>
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${writers.join(', ')}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${cast.join(', ')}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${realiseDate}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${duration}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${country}</td>
      </tr>
    </tbody>
  </table>`
);

export default class FilmDetailsTableView extends AbstractView{
  #filmDetails = null;

  constructor(filmDetails) {
    super();
    this.#filmDetails = filmDetails;
  }

  get template() {
    return createFilmDetailsTableTemplate(this.#filmDetails);
  }
}
