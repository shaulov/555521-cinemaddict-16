import dayjs from 'dayjs';
import {getRandomInteger} from '../ustil.js';

const filmsName = [
  'Made For Each Other',
  'Popeye Meets Sinbad',
  'Sagebrush Trail',
  'Santa Claus Conquers The Martians',
  'The Dance Of Life',
  'The Great Flamarion',
  'The Man With The Golden Arm',
];

const posters = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const directors = [
  'Steven Spielberg',
  'Martin Scorsese',
  'Ridley Scott',
  'John Woo',
  'Christopher Nolan',
  'Tim Burton',
  'Quentin Tarantino',
  'Peter Jackson',
];

const ageRatings = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+',
];

const getArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
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

  const description = [];

  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    description.push(descriptions[getRandomInteger(0, descriptions.length - 1)]);
  }

  return description.join('. ');
};

const generateRealiseDate = () => {
  const date = dayjs().set('date', getRandomInteger(0, 30)).set('month', getRandomInteger(0, 11)).set('year', getRandomInteger(1950, 2010));

  return date.format('DD MMMM YYYY');
};

const generateDuration = () => {
  const filmDuration = getRandomInteger(95, 130);

  return `${Math.floor(filmDuration / 60)}h ${filmDuration - Math.floor(filmDuration/60)*60}m`;
};

export const COMMENTS = {
  0: [
    {
      'id': '42',
      'author': 'Ilya O\'Reilly',
      'comment': 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
      'date': '2019-05-11T16:12:32.554Z',
      'emotion': 'smile'
    },
    {
      author: 'Johnny Page', emoji: 'smile', date: '2019/10/21 10:19', text: generateDescription()
    },
    {
      author: 'Casio Linter', emoji: 'smile', date: '2020/01/11 21:39', text: generateDescription()
    },
  ],
  1: [
    {
      author: 'Vasily Hole', emoji: 'smile', date: '2019/12/31 23:59', text: generateDescription()
    },
    {
      author: 'Johnny Page', emoji: 'angry', date: '2019/10/21 10:19', text: generateDescription()
    },
    {
      author: 'Casio Linter', emoji: 'smile', date: '2020/01/11 21:39', text: generateDescription()
    },
    {
      author: 'Casio Linter', emoji: 'sleeping', date: '2020/01/11 21:39', text: generateDescription()
    },
  ],
  2: [
    {
      author: 'Vasily Hole', emoji: 'smile', date: '2019/12/31 23:59', text: generateDescription()
    },
    {
      author: 'Johnny Page', emoji: 'angry', date: '2019/10/21 10:19', text: generateDescription()
    },
    {
      author: 'Casio Linter', emoji: 'smile', date: '2020/01/11 21:39', text: generateDescription()
    },
  ],
  3: [
    {
      author: 'Vasily Hole', emoji: 'angry', date: '2019/12/31 23:59', text: generateDescription()
    },
    {
      author: 'Johnny Page', emoji: 'smile', date: '2019/10/21 10:19', text: generateDescription()
    },
    {
      author: 'Casio Linter', emoji: 'sleeping', date: '2020/01/11 21:39', text: generateDescription()
    },
  ],
  4: [
    {
      author: 'Vasily Hole', emoji: 'smile', date: '2019/12/31 23:59', text: generateDescription()
    },
    {
      author: 'Johnny Page', emoji: 'smile', date: '2019/10/21 10:19', text: generateDescription()
    },
    {
      author: 'Casio Linter', emoji: 'smile', date: '2020/01/11 21:39', text: generateDescription()
    },
  ],
  '5': [
    {
      author: 'Vasily Hole', emoji: 'puke', date: '2019/12/31 23:59', text: generateDescription()
    },
    {
      author: 'Scally Hole', emoji: 'smile', date: '2019/12/31 23:59', text: generateDescription()
    },
    {
      author: 'Johnny Page', emoji: 'sleeping', date: '2019/10/21 10:19', text: generateDescription()
    },
    {
      author: 'Casio Linter', emoji: 'smile', date: '2020/01/11 21:39', text: generateDescription()
    },
  ],
  6: [
    {
      author: 'Vasily Hole', emoji: 'smile', date: '2019/12/31 23:59', text: generateDescription()
    },
    {
      author: 'Petr Hole', emoji: 'sleeping', date: '2019/12/31 23:59', text: generateDescription()
    },
    {
      author: 'Igor Tut', emoji: 'puke', date: '2019/12/31 23:59', text: generateDescription()
    },
    {
      author: 'Johnny Page', emoji: 'smile', date: '2019/10/21 10:19', text: generateDescription()
    },
    {
      author: 'Casio Linter', emoji: 'smile', date: '2020/01/11 21:39', text: generateDescription()
    },
  ],
};

export const generateFilm = () => ({
  name: getArrayElement(filmsName),
  originalName: getArrayElement(filmsName),
  poster: getArrayElement(posters),
  comments: getRandomInteger(0, 6),
  rating: getRandomInteger(5, 9),
  realiseDate: generateRealiseDate(),
  duration: generateDuration(),
  director: getArrayElement(directors),
  writers: ['Doja Cat', 'Fernando Magelan'],
  cast: ['Johnny Depp', 'Miki Rurk', 'Francesco Fellini'],
  country: 'Argentina',
  genres: ['Thriller', 'Drama', 'Melodrama'],
  description: generateDescription(),
  ageRating: getArrayElement(ageRatings),
  isWatchlist: getRandomInteger(0, 1),
  isHistory: getRandomInteger(0, 1),
  isFavorite: getRandomInteger(0, 1),
});
