import AbstractView from './abstract-view.js';

const createFilmCommentContainer = (commentCount) => (
  `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>
  </section>`
);

export default class FilmCommentContainerView extends AbstractView{
  #commentCount = null;

  constructor(commentCount) {
    super();
    this.#commentCount = commentCount;
  }

  get template() {
    return createFilmCommentContainer(this.#commentCount);
  }
}
