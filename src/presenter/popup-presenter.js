import PopupContainerView from '../view/popup-container-view.js';
import PopupTopView from '../view/popup-top-view.js';
import InfoPopupBottomView from '../view/popup-bottom-view.js';
import FilmCommentContainerView from '../view/comment-container-view.js';
import CommentListView from '../view/comment-list-view.js';
import FilmCommentView from '../view/comment-view.js';
import NewCommentView from '../view/new-comment-view.js';
import {isEscapeKey} from '../ustil.js';
import {COMMENTS} from '../mock/film.js';
import {remove, render, replace, RenderPosition} from '../render.js';

export default class PopupPresenter {
  #film = null;
  #popupContainer = null;
  #changeData = null;

  #filmPopupComponent = null;
  #popupTopComponent = null;
  #popupBottomComponent = null;
  #commentContainerComponent = null;
  #commentListComponent = null;
  #filmCommentComponent = null;
  #newCommentComponent = null;
  #filmComments = null;

  constructor(popupContainer, changeData) {
    this.#popupContainer = popupContainer;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;

    const prevPopupTopComponent = this.#popupTopComponent;

    this.#filmPopupComponent = new PopupContainerView();
    this.#popupTopComponent = new PopupTopView(this.#film);
    this.#popupBottomComponent = new InfoPopupBottomView();
    this.#commentContainerComponent = new FilmCommentContainerView(COMMENTS[this.#film.comments].length);
    this.#commentListComponent = new CommentListView();
    this.#newCommentComponent = new NewCommentView();
    this.#filmComments = COMMENTS[this.#film.comments];

    this.#popupTopComponent.setCloseClickHandler(this.#closePopupHandle);
    this.#popupTopComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistPopupClick);
    this.#popupTopComponent.setAlreadyWatchClickHandler(this.#handleAlreadyWatchPopupClick);
    this.#popupTopComponent.setAddToFavoriteClickHandler(this.#handleAddToFavoritePopupClick);

    render(this.#filmPopupComponent, this.#popupBottomComponent, RenderPosition.BEFOREEND);
    render(this.#popupBottomComponent, this.#commentContainerComponent, RenderPosition.BEFOREEND);
    render(this.#commentContainerComponent, this.#commentListComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.#filmComments.length; i++) {
      this.#filmCommentComponent = new FilmCommentView(this.#filmComments[i]);
      render(this.#commentListComponent, this.#filmCommentComponent, RenderPosition.BEFOREEND);
    }

    render(this.#commentContainerComponent, this.#newCommentComponent, RenderPosition.BEFOREEND);

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
    remove(this.#filmPopupComponent);
    remove(this.#popupTopComponent);
    remove(this.#popupBottomComponent);
    remove(this.#commentContainerComponent);
    remove(this.#commentListComponent);
    remove(this.#filmCommentComponent);
    remove(this.#newCommentComponent);
  }

  resetView = () => {
    this.#close();
  }

  open = () => {
    render(this.#popupContainer, this.#filmPopupComponent, RenderPosition.BEFOREEND);
    document.addEventListener('keydown', this.#escapeKeydownHandler);
  }

  #close = () => {
    remove(this.#filmPopupComponent);
    document.removeEventListener('keydown', this.#escapeKeydownHandler);

  }

  #escapeKeydownHandler = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      this.#close();
    }
  }

  #closePopupHandle = () => {
    this.#close();
    document.removeEventListener('keydown', this.#escapeKeydownHandler);
  }

  #handleAddToWatchlistPopupClick = () => {
    this.#changeData({...this.#film, isWatchlist: !this.#film.isWatchlist});
  }

  #handleAlreadyWatchPopupClick = () => {
    this.#changeData({...this.#film, isHistory: !this.#film.isHistory});
  }

  #handleAddToFavoritePopupClick = () => {
    this.#changeData({...this.#film, isFavorite: !this.#film.isFavorite});
  }
}
