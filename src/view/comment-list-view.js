import AbstractView from './abstract-view.js';

const createCommentListTemplate = () => (
  `<ul class="film-details__comments-list">
  </ul>`
);

export default class CommentListView extends AbstractView{
  get template() {
    return createCommentListTemplate();
  }
}
