import AbstractView from './abstract-view.js';

const createFilmDetailsControlTemplate = ({isWatchlist, isHistory, isFavorite}) => (
  `<section class="film-details__controls">
    <button type="button" class="film-details__control-button film-details__control-button--watchlist ${isWatchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button film-details__control-button--watched ${isHistory ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button film-details__control-button--favorite ${isFavorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
  </section>`
);

export default class FilmDetailsControlView extends AbstractView{
  #controlButtonStatus = null;

  constructor (controlButtonStatus) {
    super();
    this.#controlButtonStatus = controlButtonStatus;
  }

  get template() {
    return createFilmDetailsControlTemplate(this.#controlButtonStatus);
  }
}
