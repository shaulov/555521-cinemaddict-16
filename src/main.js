import UserRateView from './view/user-rate-view.js';
import SiteMenuView from './view/site-menu-view.js';
import SortView from './view/sort-view.js';
import ContentContainerView from './view/content-container-view.js';
import CardView from './view/card-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import StatisticView from './view/statictic-view.js';
import PopupContainerView from './view/popup-container-view.js';
import InfoPopupTopView from './view/info-popup-top-view.js';
import InfoPopupBottomView from './view/info-popup-bottom-view.js';
import DetailGenreView from './view/detail-genre-view.js';
import FilmCommentContainerView from './view/comment-container-view.js';
import FilmCommentView from './view/comment-view.js';
import NewCommentView from './view/new-comment-view.js';
import {renderElement, RenderPosition} from './render.js';
import {generateFilm, COMMENTS} from './mock/film.js';
import {generateFilter} from './mock/filter.js';

const FILM_COUNT = 5;

const films = Array.from({length: 15}, generateFilm);
const filters = generateFilter(films);

const siteHeader = document.querySelector('.header');
renderElement(siteHeader, new UserRateView().element, RenderPosition.BEFOREEND);

const siteMain = document.querySelector('.main');
renderElement(siteMain, new SiteMenuView(filters).element, RenderPosition.BEFOREEND);
renderElement(siteMain, new SortView().element, RenderPosition.BEFOREEND);
renderElement(siteMain, new ContentContainerView().element, RenderPosition.BEFOREEND);

const filmListContainer = siteMain.querySelector('.films-list__container');

const siteFooter = document.querySelector('.footer');
const footerStatistic = siteFooter.querySelector('.footer__statistics');
renderElement(footerStatistic, new StatisticView().element, RenderPosition.BEFOREEND);
renderElement(filmListContainer, new ShowMoreButtonView().element, RenderPosition.AFTEREND);

for (let i = 0; i < FILM_COUNT; i++) {
  renderElement(filmListContainer, new CardView(films[i]).element, RenderPosition.BEFOREEND);
}
const popupContainerComponent = new PopupContainerView();
const infoPopupBottomComponent = new InfoPopupBottomView(films[0]);
renderElement(siteFooter, popupContainerComponent.element, RenderPosition.AFTEREND);
renderElement(popupContainerComponent.element.children[0], new InfoPopupTopView(films[0]).element, RenderPosition.BEFOREEND);
renderElement(popupContainerComponent.element.children[0], infoPopupBottomComponent.element, RenderPosition.BEFOREEND);

// const filmDetailsContainer = document.querySelector('.film-details__table').children[0];
// renderElement(filmDetailsContainer, new DetailGenreView(films[0].genres).element, RenderPosition.BEFOREEND);

const comments = COMMENTS[films[0].comments];

const filmCommentComponent = new FilmCommentContainerView(comments.length);
renderElement(infoPopupBottomComponent.element, filmCommentComponent.element, RenderPosition.BEFOREEND);
renderElement(filmCommentComponent.element, new NewCommentView().element, RenderPosition.BEFOREEND);

const commentList = document.querySelector('.film-details__comments-list');
for (let j = 0; j < comments.length; j++) {
  renderElement(commentList, new FilmCommentView(comments[j]).element, RenderPosition.BEFOREEND);
}

const showMoreButton = document.querySelector('.films-list__show-more');
const visibleFilms = films.slice(FILM_COUNT);

showMoreButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (visibleFilms.length > FILM_COUNT) {
    for (let i = 0; i < FILM_COUNT; i++) {
      renderElement(filmListContainer, new CardView(visibleFilms[i]).element, RenderPosition.BEFOREEND);
    }
    visibleFilms.splice(0, FILM_COUNT);
  } else if (visibleFilms.length !== 0 && visibleFilms.length <= FILM_COUNT) {
    for (let i = 0; i < visibleFilms.length; i++) {
      renderElement(filmListContainer, new CardView(visibleFilms[i]).element, RenderPosition.BEFOREEND);
    }

    showMoreButton.remove();
  } else {
    showMoreButton.remove();
  }
});
