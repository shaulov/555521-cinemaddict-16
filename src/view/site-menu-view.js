import {createElement} from '../render.js';

const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;
  const filterNameWithCapitalLetter = name.charAt(0).toUpperCase() + name.slice(1);

  if (name === 'all') {
    return `<a href="#${name}" class="main-navigation__item main-navigation__item--active">${filterNameWithCapitalLetter}</a>`;
  }

  return (
    `<a href="${name}" class="main-navigation__item">${filterNameWithCapitalLetter} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createSiteMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenuView {
  #element = null;
  #filter = null;

  constructor (filter) {
    this.#filter = filter;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSiteMenuTemplate(this.#filter);
  }

  removeElement() {
    this.#element = null;
  }
}
