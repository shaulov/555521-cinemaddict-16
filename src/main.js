import {createUserRateTemplate} from './view/user-rate-view.js';
import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createSortTemplate} from './view/sort-view.js';
import {createContentContainerTemplate} from './view/content-container-view.js';
import {createCardTemplate} from './view/card-view.js';
import {createShowMoreButtonTemplate} from './view/show-more-button-view.js';
import {createStatisticTemplate} from './view/statictic-view.js';
import {createInfoPopupTemplate} from './view/info-popup-view.js';
import {createDetailGenre} from './view/detail-genre-view.js';
import {createFilmCommentContainer} from './view/comment-container-view.js';
import {createFilmComment} from './view/comment-view.js';
import {createNewCommentContainer} from './view/new-comment-view.js';
import {filmsData, COMMENTS} from './mock/film.js';

const FILM_COUNT = 5;

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector('.header');
renderTemplate(siteHeader, createUserRateTemplate(), RenderPosition.BEFOREEND);

const siteMain = document.querySelector('.main');
renderTemplate(siteMain, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMain, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMain, createContentContainerTemplate(), RenderPosition.BEFOREEND);

const filmListContainer = siteMain.querySelector('.films-list__container');

const siteFooter = document.querySelector('.footer');
const footerStatistic = siteFooter.querySelector('.footer__statistics');
renderTemplate(footerStatistic, createStatisticTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filmListContainer, createShowMoreButtonTemplate(), RenderPosition.AFTEREND);

for (let i = 0; i < FILM_COUNT; i++) {
  renderTemplate(filmListContainer, createCardTemplate(filmsData[i]), RenderPosition.BEFOREEND);
  renderTemplate(siteFooter, createInfoPopupTemplate(filmsData[1]), RenderPosition.AFTEREND);

  const filmDetailsContainer = document.querySelector('.film-details__table');
  renderTemplate(filmDetailsContainer, createDetailGenre(filmsData[1].genres), RenderPosition.BEFOREEND);

  const comments = COMMENTS[filmsData[i].commentId];

  const filmCommentContainer = document.querySelector('.film-details__bottom-container');
  renderTemplate(filmCommentContainer, createFilmCommentContainer(comments.length), RenderPosition.BEFOREEND);

  const newFilmCommentContainer = document.querySelector('.film-details__comments-wrap');
  renderTemplate(newFilmCommentContainer, createNewCommentContainer(), RenderPosition.BEFOREEND);

  const commentList = document.querySelector('.film-details__comments-list');
  for (let j = 0; j < comments.length; j++) {
    renderTemplate(commentList, createFilmComment(comments[j]), RenderPosition.BEFOREEND);
  }
}
