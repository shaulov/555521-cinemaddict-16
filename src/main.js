import UserRateView from './view/user-rate-view.js';
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
import {renderElement, RenderPosition} from './render.js';
import {generateFilm, COMMENTS} from './mock/film.js';
import {generateFilter} from './mock/filter.js';

const FILM_COUNT = 5;

const films = Array.from({length: 15}, generateFilm);
const filters = generateFilter(films);

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector('.header');
renderElement(siteHeader, new UserRateView().element, RenderPosition.BEFOREEND);

const siteMain = document.querySelector('.main');
renderTemplate(siteMain, createSiteMenuTemplate(filters), RenderPosition.BEFOREEND);
renderTemplate(siteMain, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMain, createContentContainerTemplate(), RenderPosition.BEFOREEND);

const filmListContainer = siteMain.querySelector('.films-list__container');

const siteFooter = document.querySelector('.footer');
const footerStatistic = siteFooter.querySelector('.footer__statistics');
renderTemplate(footerStatistic, createStatisticTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filmListContainer, createShowMoreButtonTemplate(), RenderPosition.AFTEREND);

for (let i = 0; i < FILM_COUNT; i++) {
  renderTemplate(filmListContainer, createCardTemplate(films[i]), RenderPosition.BEFOREEND);
  // renderTemplate(siteFooter, createInfoPopupTemplate(films[0]), RenderPosition.AFTEREND);

  // const filmDetailsContainer = document.querySelector('.film-details__table');
  // renderTemplate(filmDetailsContainer, createDetailGenre(films[0].genres), RenderPosition.BEFOREEND);

  // const comments = COMMENTS[films[i].comments];

  // const filmCommentContainer = document.querySelector('.film-details__bottom-container');
  // renderTemplate(filmCommentContainer, createFilmCommentContainer(comments.length), RenderPosition.BEFOREEND);

  // const newFilmCommentContainer = document.querySelector('.film-details__comments-wrap');
  // renderTemplate(newFilmCommentContainer, createNewCommentContainer(), RenderPosition.BEFOREEND);

  // const commentList = document.querySelector('.film-details__comments-list');
  // for (let j = 0; j < comments.length; j++) {
  //   renderTemplate(commentList, createFilmComment(comments[j]), RenderPosition.BEFOREEND);
  // }
}

const showMoreButton = document.querySelector('.films-list__show-more');
const visibleFilms = films.slice(FILM_COUNT);

showMoreButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (visibleFilms.length > FILM_COUNT) {
    for (let i = 0; i < FILM_COUNT; i++) {
      renderTemplate(filmListContainer, createCardTemplate(visibleFilms[i]), RenderPosition.BEFOREEND);
    }
    visibleFilms.splice(0, FILM_COUNT);
  } else if (visibleFilms.length !== 0 && visibleFilms.length <= FILM_COUNT) {
    for (let i = 0; i < visibleFilms.length; i++) {
      renderTemplate(filmListContainer, createCardTemplate(visibleFilms[i]), RenderPosition.BEFOREEND);
    }

    showMoreButton.remove();
  } else {
    showMoreButton.remove();
  }
});
