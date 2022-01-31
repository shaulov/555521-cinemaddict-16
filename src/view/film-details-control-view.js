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

  setUpdatePopupView = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#updatePopupViewHandle);
  }

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#addToWatchlistClickHandler);
  }

  setAlreadyWatchClickHandler = (callback) => {
    this._callback.alreadyWatchClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchClickHandler);
  }

  setAddToFavoriteClickHandler = (callback) => {
    this._callback.addToFavoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#addToFavoriteClickHandler);
  }

  #updatePopupViewHandle = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  #addToWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  }

  #alreadyWatchClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchClick();
  }

  #addToFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToFavoriteClick();
  }
}
