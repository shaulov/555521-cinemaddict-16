import PopupContainerView from '../view/popup-container-view.js';
import PopupTopView from '../view/popup-top-view.js';
import InfoPopupBottomView from '../view/popup-bottom-view.js';
import FilmCommentContainerView from '../view/comment-container-view.js';
import CommentListView from '../view/comment-list-view.js';
import FilmCommentView from '../view/comment-view.js';
import NewCommentView from '../view/new-comment-view.js';
import {openPopup, closePopup} from '../popup.js';
import {isEscapeKey} from '../ustil.js';
import {COMMENTS} from '../mock/film.js';
import {remove, render, replace, RenderPosition} from '../render.js';

export default class PopupPresenter {
  #film = null;
  #changePopupData = null;

  #filmPopupComponent = null;
  #popupTopComponent = null;
  #filmPopupBottomComponent = null;
  #filmCommentContainerComponent = null;
  #commentListComponent = null;
  #filmCommentComponent = null;
  #newCommentComponent = null;
  #filmComments = null;

  constructor(changePopupData) {
    this.#changePopupData = changePopupData;
  }

  init = (film) => {
    this.#film = film;

    const prevPopupTopComponent = this.#popupTopComponent;

    this.#filmPopupComponent = new PopupContainerView();
    this.#popupTopComponent = new PopupTopView(this.#film);
    this.#filmPopupBottomComponent = new InfoPopupBottomView();
    this.#filmCommentContainerComponent = new FilmCommentContainerView(COMMENTS[this.#film.comments].length);
    this.#commentListComponent = new CommentListView();
    this.#newCommentComponent = new NewCommentView();
    this.#filmComments = COMMENTS[this.#film.comments];

    this.#popupTopComponent.setCloseClickHandler(this.#closePopupHandle);
    this.#popupTopComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistPopupClick);
    this.#popupTopComponent.setAlreadyWatchClickHandler(this.#handleAlreadyWatchPopupClick);
    this.#popupTopComponent.setAddToFavoriteClickHandler(this.#handleAddToFavoritePopupClick);
    this.#popupTopComponent.setUpdatePopupView(this.#handleChangePopupView);

    render(this.#filmPopupComponent, this.#popupTopComponent, RenderPosition.BEFOREEND);
    render(this.#filmPopupComponent, this.#filmPopupBottomComponent, RenderPosition.BEFOREEND);
    render(this.#filmPopupBottomComponent, this.#filmCommentContainerComponent, RenderPosition.BEFOREEND);
    render(this.#filmCommentContainerComponent, this.#commentListComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.#filmComments.length; i++) {
      this.#filmCommentComponent = new FilmCommentView(this.#filmComments[i]);
      render(this.#commentListComponent, this.#filmCommentComponent, RenderPosition.BEFOREEND);
    }

    render(this.#filmCommentContainerComponent, this.#newCommentComponent, RenderPosition.BEFOREEND);

    if (prevPopupTopComponent === null) {
      render(this.#filmPopupComponent, this.#popupTopComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    if(this.#filmPopupComponent.element.contains(prevPopupTopComponent.element)) {
      replace(this.#popupTopComponent, prevPopupTopComponent);
    }

    remove(prevPopupTopComponent);
  }

  destroy = () => {
    remove(this,this.#filmPopupComponent);
  }

  resetView = () => {
    this.#closePopup();
  }

  openPopup = () => {
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

  }

  #handleAddToWatchlistPopupClick = () => {
    this.#changePopupData({...this.#film, isWatchlist: !this.#film.isWatchlist});
  }

  #handleAlreadyWatchPopupClick = () => {
    this.#changePopupData({...this.#film, isHistory: !this.#film.isHistory});
  }

  #handleAddToFavoritePopupClick = () => {
    this.#changePopupData({...this.#film, isFavorite: !this.#film.isFavorite});
  }
}
