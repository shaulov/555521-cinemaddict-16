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
import {openPopup, closePopup} from '../popup.js';
import {isEscapeKey} from '../ustil.js';
import {COMMENTS} from '../mock/film.js';
import {remove, render, RenderPosition} from '../render.js';

export default class PopupPresenter {
  #changePopupData = null;

  #filmPopupComponent = null;
  #infoPopupTopComponent = null;
  #filmDetailsCloseComponent = null;
  #filmDetailsWrapComponent = null;
  #filmDetailsInfoComponent = null;
  #filmDetailsTableComponent =  null;
  #filmDetailsControlComponent = null;
  #filmPopupBottomComponent = null;
  #filmCommentContainerComponent = null;
  #commentListComponent = null;
  #filmCommentComponent = null;
  #newCommentComponent = null;
  #filmComments = null;

  #film = null;

  constructor(changePopupData) {
    this.#changePopupData = changePopupData;
  }

  init = (film) => {
    this.#film = film;

    this.#filmPopupComponent = new PopupContainerView();
    this.#infoPopupTopComponent = new InfoPopupTopView(this.#film);
    this.#filmDetailsCloseComponent = new FilmDetailsCloseView();
    this.#filmDetailsWrapComponent = new FilmDetailsWrapView();
    this.#filmDetailsInfoComponent = new FilmDetailsInfoView(this.#film);
    this.#filmDetailsTableComponent = new FilmDetailsTableView(this.#film);
    this.#filmDetailsControlComponent = new FilmDetailsControlView(this.#film);
    this.#filmPopupBottomComponent = new InfoPopupBottomView();
    this.#filmCommentContainerComponent = new FilmCommentContainerView(COMMENTS[this.#film.comments].length);
    this.#commentListComponent = new CommentListView();
    this.#newCommentComponent = new NewCommentView();
    this.#filmComments = COMMENTS[this.#film.comments];

    this.#filmDetailsCloseComponent.setClickHandler(this.#closePopupHandle);
    this.#filmDetailsControlComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmDetailsControlComponent.setAlreadyWatchClickHandler(this.#handleAlreadyWatchClick);
    this.#filmDetailsControlComponent.setAddToFavoriteClickHandler(this.#handleAddToFavoriteClick);
    this.#filmDetailsControlComponent.setUpdatePopupView(this.#handleChangePopupView);

    render(this.#filmPopupComponent, this.#infoPopupTopComponent, RenderPosition.BEFOREEND);
    render(this.#infoPopupTopComponent, this.#filmDetailsCloseComponent, RenderPosition.AFTERBEGIN);
    render(this.#infoPopupTopComponent, this.#filmDetailsWrapComponent, RenderPosition.BEFOREEND);
    render(this.#filmDetailsWrapComponent, new FilmDetailsPosterView(this.#film), RenderPosition.BEFOREEND);
    render(this.#filmDetailsWrapComponent, this.#filmDetailsInfoComponent, RenderPosition.BEFOREEND);
    render(this.#filmDetailsInfoComponent, this.#filmDetailsTableComponent, RenderPosition.BEFOREEND);
    render(this.#infoPopupTopComponent, this.#filmDetailsControlComponent, RenderPosition.BEFOREEND);
    render(this.#filmDetailsInfoComponent, new FilmDetailsDescriptionView(this.#film), RenderPosition.BEFOREEND);
    render(this.#filmDetailsTableComponent, new DetailGenreView(this.#film), RenderPosition.BEFOREEND);
    render(this.#filmPopupComponent, this.#filmPopupBottomComponent, RenderPosition.BEFOREEND);
    render(this.#filmPopupBottomComponent, this.#filmCommentContainerComponent, RenderPosition.BEFOREEND);
    render(this.#filmCommentContainerComponent, this.#commentListComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.#filmComments.length; i++) {
      this.#filmCommentComponent = new FilmCommentView(this.#filmComments[i]);
      render(this.#commentListComponent, this.#filmCommentComponent, RenderPosition.BEFOREEND);
    }

    render(this.#filmCommentContainerComponent, this.#newCommentComponent, RenderPosition.BEFOREEND);

    this.#openPopup();
  }

  destroy = () => {
    remove(this,this.#filmPopupComponent);
  }

  resetView = () => {
    this.#closePopup();
  }

  #openPopup = () => {
    openPopup(this.#filmPopupComponent);
    document.addEventListener('keydown', this.#escapeKeydownHandler);
  }

  #closePopup = () => {
    closePopup(this.#filmPopupComponent);
    document.removeEventListener('keydown', this.#escapeKeydownHandler);

  }

  #escapeKeydownHandler = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      this.#closePopup();
    }
  }

  #closePopupHandle = () => {
    this.#closePopup();
    document.removeEventListener('keydown', this.#escapeKeydownHandler);
  }

  #handleChangePopupView = () => {
    render(this.#infoPopupTopComponent, this.#filmDetailsControlComponent, RenderPosition.BEFOREEND);
  }

  #handleAddToWatchlistClick = () => {
    this.#changePopupData({...this.#film, isWatchlist: !this.#film.isWatchlist});
  }

  #handleAlreadyWatchClick = () => {
    this.#changePopupData({...this.#film, isHistory: !this.#film.isHistory});
  }

  #handleAddToFavoriteClick = () => {
    this.#changePopupData({...this.#film, isFavorite: !this.#film.isFavorite});
  }
}
