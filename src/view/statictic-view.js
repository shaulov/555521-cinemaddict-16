import AbstractView from './abstract-view.js';

const createStatisticTemplate = () => (
  `<p>130 291 movies inside</p>
`);

export default class StatisticView extends AbstractView{
  get template() {
    return createStatisticTemplate();
  }
}
