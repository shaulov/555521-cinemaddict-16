import PopupContainerView from '../view/popup-container-view.js';
import PopupTopView from '../view/popup-top-view.js';
import PopupBottomView from '../view/popup-bottom-view.js';
import FilmCommentContainerView from '../view/comment-container-view.js';
import CommentListView from '../view/comment-list-view.js';
import FilmCommentView from '../view/comment-view.js';
import NewCommentView from '../view/new-comment-view.js';
import {isEscapeKey} from '../ustil.js';
import {COMMENTS} from '../mock/film.js';
import {remove, render, RenderPosition} from '../render.js';

export default class PopupPresenter {
  #film = null;
  #popupContainer = document.body;
  #changeData = null;

  #popupComponent = null;
  #popupTopComponent = null;
  #popupBottomComponent = null;
  #commentContainerComponent = null;
  #commentListComponent = null;
  #filmCommentComponent = null;
  #newCommentComponent = null;
  #filmComments = null;

  constructor (changeData) {
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;

    this.#popupComponent = new PopupContainerView();
    this.#popupTopComponent = new PopupTopView(this.#film);
    this.#popupBottomComponent = new PopupBottomView();
    this.#commentContainerComponent = new FilmCommentContainerView(COMMENTS[this.#film.comments].length);
    this.#commentListComponent = new CommentListView();
    this.#newCommentComponent = new NewCommentView();
    this.#filmComments = COMMENTS[this.#film.comments];

    this.setEscapeKeydownHandler();
    this.#popupTopComponent.setCloseClickHandler(this.#closePopupHandle);
    this.#popupTopComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistPopupClick);
    this.#popupTopComponent.setAlreadyWatchClickHandler(this.#handleAlreadyWatchPopupClick);
    this.#popupTopComponent.setAddToFavoriteClickHandler(this.#handleAddToFavoritePopupClick);

    render(this.#popupContainer, this.#popupComponent, RenderPosition.BEFOREEND);
    render(this.#popupComponent, this.#popupTopComponent, RenderPosition.BEFOREEND);
    render(this.#popupComponent, this.#popupBottomComponent, RenderPosition.BEFOREEND);
    render(this.#popupBottomComponent, this.#commentContainerComponent, RenderPosition.BEFOREEND);
    render(this.#commentContainerComponent, this.#commentListComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.#filmComments.length; i++) {
      this.#filmCommentComponent = new FilmCommentView(this.#filmComments[i]);
      render(this.#commentListComponent, this.#filmCommentComponent, RenderPosition.BEFOREEND);
    }

    render(this.#commentContainerComponent, this.#newCommentComponent, RenderPosition.BEFOREEND);
  }

  destroy = () => {
    remove(this.#popupComponent);
    remove(this.#popupTopComponent);
    remove(this.#popupBottomComponent);
    remove(this.#commentContainerComponent);
    remove(this.#commentListComponent);
    remove(this.#filmCommentComponent);
    remove(this.#newCommentComponent);
  }

  resetView = () => {
    this.popupPosition = this.#popupComponent.element.scrollTop;
  }

  setEscapeKeydownHandler = () => {
    this.#popupContainer.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escapeKeydownHandler);
  }

  #close = () => {
    document.body.classList.remove('hide-overflow');
    remove(this.#popupComponent);
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
    this.#popupTopComponent.updateData({...this.#film, isWatchlist: !this.#film.isWatchlist}, false);
  }

  #handleAlreadyWatchPopupClick = () => {
    this.#changeData({...this.#film, isHistory: !this.#film.isHistory});
    this.#popupTopComponent.updateData({...this.#film, isHistory: !this.#film.isHistory}, false);
  }

  #handleAddToFavoritePopupClick = () => {
    this.#changeData({...this.#film, isFavorite: !this.#film.isFavorite});
    this.#popupTopComponent.updateData({...this.#film, isFavorite: !this.#film.isFavorite}, false);
  }

  get popupPosition () {
    return this.#popupComponent.element.scrollTop;
  }

  set popupPosition (position) {
    this.#popupComponent.element.scrollTop = position;
  }
}
