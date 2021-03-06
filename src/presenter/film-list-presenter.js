import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {updateItem} from '../ustil.js';
import {render, RenderPosition, remove} from '../render.js';
import FilmPresenter from './film-presenter.js';
import PopupPresenter from '../presenter/popup-presenter.js';


const FILM_COUNT_PER_STEP = 5;
const BODY = document.body;

export default class FilmListPresenter {
  #filmsContainer = null;

  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #listFilms = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map();

  #popupPresenter = null;
  #currentPopupId = null;
  #popupPosition = null;

  constructor(filmsContainer) {
    this.#filmsContainer = filmsContainer;
  }

  init = (listFilms) => {
    this.#listFilms = [...listFilms];

    render(this.#filmsContainer, this.#filmsContainerComponent, RenderPosition.BEFOREEND);
    render(this.#filmsContainerComponent, this.#filmsListComponent, RenderPosition.BEFOREEND);
    render(this.#filmsListComponent, new FilmsListTitleView(), RenderPosition.BEFOREEND);
    render(this.#filmsListComponent, this.#filmListContainerComponent, RenderPosition.BEFOREEND);

    this.#renderFilmsContainer();
  }

  #handleFilmChange = (updatedFilm) => {
    this.#listFilms = updateItem(this.#listFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
    if (BODY.contains(document.querySelector('.film-details')) && this.#currentPopupId === updatedFilm.id) {
      const scrollPosition = this.#popupPresenter.popupPosition;
      this.#popupPresenter.resetView();
      this.#renderPopup(updatedFilm);
      this.#popupPresenter.popupPosition = scrollPosition;
    }
  }

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListContainerComponent, this.#handleFilmChange, this.#renderPopup);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderPopup = (film) => {
    this.#popupPresenter = new PopupPresenter(BODY, this.#handleFilmChange);
    this.#popupPresenter.init(film);
    this.#currentPopupId = film.id;
    if (!BODY.contains(document.querySelector('.film-details'))) {
      this.#popupPresenter.open();
    }
  }

  #renderFilms = (from, to) => {
    this.#listFilms
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  }

  #handleLoadMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if(this.#renderedFilmCount >= this.#listFilms.length) {
      remove(this.#showMoreButtonComponent);
    }
  }

  #renderShowMoreButton = () => {
    render(this.#filmListContainerComponent, this.#showMoreButtonComponent, RenderPosition.AFTEREND);

    this.#showMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);
  }

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  }

  #renderFilmList = () => {
    this.#renderFilms(0, Math.min(this.#listFilms.length, FILM_COUNT_PER_STEP));

    if (this.#listFilms.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #renderFilmsContainer = () => {
    this.#renderFilmList();
  }
}
