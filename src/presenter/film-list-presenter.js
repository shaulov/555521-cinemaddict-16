import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import CardView from '../view/card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupContainerView from '../view/popup-container-view.js';
import InfoPopupTopView from '../view/info-popup-top-view.js';
import FilmDetailsCloseView from '../view/film-details-close-view.js';
import FilmDetailsWrapView from '../view/film-details-wrap-view.js';
import FilmDetailsPosterView from '../view/film-details-poster-view.js';
import FilmDetailsInfoView from '../view/film-details-info-view.js';
import FilmDetailsDescriptionView from '../view/film-details-description-view.js';
import FilmDetailsControlView from '../view/film-details-control-view.js';
import FilmDetailsTableView from '../view/film-details-table-view.js';
import DetailGenreView from '../view/detail-genre-view.js';
import InfoPopupBottomView from '../view/info-popup-bottom-view.js';
import FilmCommentContainerView from '../view/comment-container-view.js';
import CommentListView from '../view/comment-list-view.js';
import FilmCommentView from '../view/comment-view.js';
import NewCommentView from '../view/new-comment-view.js';
import {render, RenderPosition, remove} from '../render.js';
import {openPopup, closePopup} from '../popup.js';
import {isEscapeKey} from '../ustil.js';
import {COMMENTS} from '../mock/film.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmListPresenter {
  #filmsContainer = null;

  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmListContainerComponent = new FilmsListContainerView();
  #filmPopupComponent = new PopupContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #listFilms = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;

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

  #renderFilm = (film) => {
    const filmComponent = new CardView(film);

    filmComponent.setClickHandler(() => {
      this.#renderFilmPopup(film);
      openPopup(this.#filmPopupComponent);
    });

    render(this.#filmListContainerComponent, filmComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmPopup = (film) => {
    this.#filmPopupComponent.removeElement();
    const infoPopupTopComponent = new InfoPopupTopView(film);
    const filmDetailsCloseComponent = new FilmDetailsCloseView();
    const filmDetailsWrapComponent = new FilmDetailsWrapView();
    const filmDetailsInfoComponent = new FilmDetailsInfoView(film);
    const filmsDetailsTableComponent = new FilmDetailsTableView(film);
    const filmPopupBottomComponent = new InfoPopupBottomView();
    const filmCommentContainerComponent = new FilmCommentContainerView(COMMENTS[film.comments].length);
    const commentListComponent = new CommentListView();
    const newCommentComponent = new NewCommentView();
    const filmComments = COMMENTS[film.comments];

    const onEscapeKeydown = (evt) => {
      if(isEscapeKey(evt)) {
        evt.preventDefault();
        closePopup(this.#filmPopupComponent);
        document.removeEventListener('keydown', onEscapeKeydown);
      }
    };

    filmDetailsCloseComponent.setClickHandler(() => {
      closePopup(this.#filmPopupComponent);
      document.removeEventListener('keydown', onEscapeKeydown);
    });

    document.addEventListener('keydown', onEscapeKeydown);

    render(this.#filmPopupComponent, infoPopupTopComponent, RenderPosition.BEFOREEND);
    render(infoPopupTopComponent, filmDetailsCloseComponent, RenderPosition.AFTERBEGIN);
    render(infoPopupTopComponent, filmDetailsWrapComponent, RenderPosition.BEFOREEND);
    render(filmDetailsWrapComponent, new FilmDetailsPosterView(film), RenderPosition.BEFOREEND);
    render(filmDetailsWrapComponent, filmDetailsInfoComponent, RenderPosition.BEFOREEND);
    render(filmDetailsInfoComponent, filmsDetailsTableComponent, RenderPosition.BEFOREEND);
    render(filmDetailsInfoComponent, new FilmDetailsDescriptionView(film), RenderPosition.BEFOREEND);
    render(infoPopupTopComponent, new FilmDetailsControlView(), RenderPosition.BEFOREEND);
    render(filmsDetailsTableComponent, new DetailGenreView(film), RenderPosition.BEFOREEND);
    render(this.#filmPopupComponent, filmPopupBottomComponent, RenderPosition.BEFOREEND);
    render(filmPopupBottomComponent, filmCommentContainerComponent, RenderPosition.BEFOREEND);
    render(filmCommentContainerComponent, commentListComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < filmComments.length; i++) {
      const filmCommentComponent = new FilmCommentView(filmComments[i]);
      render(commentListComponent, filmCommentComponent, RenderPosition.BEFOREEND);
    }

    render(filmCommentContainerComponent, newCommentComponent, RenderPosition.BEFOREEND);
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
      this.#showMoreButtonComponent.removeElement();
    }
  }

  #renderShowMoreButton = () => {
    render(this.#filmListContainerComponent, this.#showMoreButtonComponent, RenderPosition.AFTEREND);

    this.#showMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);
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
