import dayjs from 'dayjs';

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomPositiveInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const FILM_NAME = [
  'Made For Each Other',
  'Popeye Meets Sinbad',
  'Sagebrush Trail',
  'Santa Claus Conquers The Martians',
  'The Dance Of Life',
  'The Great Flamarion',
  'The Man With The Golden Arm',
];

const POSTER = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const DESCRIPTION_TEXT = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Cras aliquet varius magna, non porta ligula feugiat eget',
  'Fusce tristique felis at fermentum pharetra',
  'Aliquam id orci ut lectus varius viverra',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui',
  'Sed sed nisi sed augue convallis suscipit in sed felis',
  'Aliquam erat volutpat',
  'Nunc fermentum tortor ac porta dapibus',
  'In rutrum ac purus sit amet tempus',
];

const generateDescription = (array) => {
  const description = [];

  for (let i = 0; i < getRandomPositiveInteger(0, 5); i++) {
    description.push(array[getRandomPositiveInteger(0, array.length - 1)]);
  }

  return description;
};

export const COMMENTS = {
  0: [
    {
      author: 'Vasily Hole', emoji: 'smile', date: '2019/12/31 23:59', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Johnny Page', emoji: 'smile', date: '2019/10/21 10:19', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Casio Linter', emoji: 'smile', date: '2020/01/11 21:39', text: generateDescription(DESCRIPTION_TEXT)
    },
  ],
  1: [
    {
      author: 'Vasily Hole', emoji: 'smile', date: '2019/12/31 23:59', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Johnny Page', emoji: 'angry', date: '2019/10/21 10:19', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Casio Linter', emoji: 'smile', date: '2020/01/11 21:39', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Casio Linter', emoji: 'sleeping', date: '2020/01/11 21:39', text: generateDescription(DESCRIPTION_TEXT)
    },
  ],
  2: [
    {
      author: 'Vasily Hole', emoji: 'smile', date: '2019/12/31 23:59', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Johnny Page', emoji: 'angry', date: '2019/10/21 10:19', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Casio Linter', emoji: 'smile', date: '2020/01/11 21:39', text: generateDescription(DESCRIPTION_TEXT)
    },
  ],
  3: [
    {
      author: 'Vasily Hole', emoji: 'angry', date: '2019/12/31 23:59', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Johnny Page', emoji: 'smile', date: '2019/10/21 10:19', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Casio Linter', emoji: 'sleeping', date: '2020/01/11 21:39', text: generateDescription(DESCRIPTION_TEXT)
    },
  ],
  4: [
    {
      author: 'Vasily Hole', emoji: 'smile', date: '2019/12/31 23:59', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Johnny Page', emoji: 'smile', date: '2019/10/21 10:19', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Casio Linter', emoji: 'smile', date: '2020/01/11 21:39', text: generateDescription(DESCRIPTION_TEXT)
    },
  ],
  '5': [
    {
      author: 'Vasily Hole', emoji: 'puke', date: '2019/12/31 23:59', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Scally Hole', emoji: 'smile', date: '2019/12/31 23:59', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Johnny Page', emoji: 'sleeping', date: '2019/10/21 10:19', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Casio Linter', emoji: 'smile', date: '2020/01/11 21:39', text: generateDescription(DESCRIPTION_TEXT)
    },
  ],
  6: [
    {
      author: 'Vasily Hole', emoji: 'smile', date: '2019/12/31 23:59', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Petr Hole', emoji: 'sleeping', date: '2019/12/31 23:59', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Igor Tut', emoji: 'puke', date: '2019/12/31 23:59', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Johnny Page', emoji: 'smile', date: '2019/10/21 10:19', text: generateDescription(DESCRIPTION_TEXT)
    },
    {
      author: 'Casio Linter', emoji: 'smile', date: '2020/01/11 21:39', text: generateDescription(DESCRIPTION_TEXT)
    },
  ],
};

const generateFilm = () => {
  const filmDuration = getRandomPositiveInteger(95, 130);

  return {
    name: FILM_NAME[getRandomPositiveInteger(0, FILM_NAME.length - 1)],
    originalName: FILM_NAME[getRandomPositiveInteger(0, FILM_NAME.length - 1)],
    poster: POSTER[getRandomPositiveInteger(0, POSTER.length - 1)],
    commentId: getRandomPositiveInteger(0, 6),
    rating: getRandomPositiveInteger(5, 9),
    realiseDate: dayjs(getRandomPositiveInteger(587893112, 1638976302692)).format('DD MMMM YYYY'),
    duration: `${Math.floor(filmDuration / 60)}h ${filmDuration - Math.floor(filmDuration/60)*60}m`,
    director: 'Frank Ocean',
    writers: ['Doja Cat', 'Fernando Magelan'],
    cast: ['Johnny Depp', 'Miki Rurk', 'Francesco Fellini'],
    country: 'Argentina',
    genres: ['Thriller', 'Drama', 'Melodrama'],
    description: generateDescription(DESCRIPTION_TEXT).join('. '),
    ageRating: '18+',
  };
};

export const filmsData = Array.from({length: 15}, generateFilm);
