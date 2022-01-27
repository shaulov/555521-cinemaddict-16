import UserRateView from './view/user-rate-view.js';
import SiteMenuView from './view/site-menu-view.js';
import SortView from './view/sort-view.js';
import StatisticView from './view/statictic-view.js';
import {render, RenderPosition} from './render.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import FilmListPresenter from './presenter/movie-list-presenter.js';

const FILM_COUNT = 15;

const films = Array.from({length: FILM_COUNT}, generateFilm);
const filters = generateFilter(films);

const siteMain = document.querySelector('.main');
render(siteMain, new SiteMenuView(filters), RenderPosition.BEFOREEND);
render(siteMain, new SortView(), RenderPosition.BEFOREEND);

const siteHeader = document.querySelector('.header');
render(siteHeader, new UserRateView(), RenderPosition.BEFOREEND);

const siteFooter = document.querySelector('.footer');
const footerStatistic = siteFooter.querySelector('.footer__statistics');
render(footerStatistic, new StatisticView(), RenderPosition.BEFOREEND);

const filmPresenter = new FilmListPresenter(siteMain);

filmPresenter.init(films);
