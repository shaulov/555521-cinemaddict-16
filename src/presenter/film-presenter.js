import CardView from '../view/card-view.js';
import {remove, replace, render, RenderPosition} from '../render.js';
import PopupPresenter from '../presenter/popup-presenter.js';

export default class FilmPresenter {
  #filmContainer = null;
  #changeData = null;

  #filmComponent = null;

  #film = null;
  #popupPresenter = null;
  #currentPopupId = null;

  constructor(filmContainer, changeData) {
    this.#filmContainer = filmContainer;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new CardView(this.#film);
    this.#filmComponent.setClickHandler(this.#handleCardClick);
    this.#filmComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmComponent.setAlreadyWatchClickHandler(this.#handleAlreadyWatchClick);
    this.#filmComponent.setAddToFavoriteClickHandler(this.#handleAddToFavoriteClick);

    if (prevFilmComponent === null) {
      render(this.#filmContainer, this.#filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if(this.#filmContainer.element.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  }

  destroy = () => {
    remove(this.#filmComponent);
  }

  #renderPopup = (film) => {
    this.#popupPresenter = new PopupPresenter(this.#changeData);
    this.#popupPresenter.init(film);
    this.#currentPopupId = film.id;
  }

  #handleCardClick = () => {
    this.#renderPopup(this.#film);
  }

  #handleAddToWatchlistClick = () => {
    this.#changeData({...this.#film, isWatchlist: !this.#film.isWatchlist});
  }

  #handleAlreadyWatchClick = () => {
    this.#changeData({...this.#film, isHistory: !this.#film.isHistory});
  }

  #handleAddToFavoriteClick = () => {
    this.#changeData({...this.#film, isFavorite: !this.#film.isFavorite});
  }
}
