const quotes = [
  {
    quote: "Youth isn't always all it's touted to be.",
    author: 'Lawana Blackwell',
  },
  {
    quote: 'Life is either a daring adventure or nothing at all.',
    author: 'Helen Keller',
  },
  {
    quote: "Despite the forecast, live like it's spring.",
    author: 'Lilly Pulitzer',
  },
  {
    quote: 'Nothing in more despicable than respect based on fear.',
    author: 'Albert',
  },
  {
    quote: 'Change the world by being yourself.',
    author: 'Amy Poehler',
  },
  {
    quote: 'Great minds have purposes, others have wishes.',
    author: 'Washington Irving',
  },
  {
    quote: 'Be gentle first with yourself.',
    author: 'Anonymous',
  },
  {
    quote: 'Do anything, but let it produce joy.',
    author: 'Walt Whitman',
  },
  {
    quote: 'Winning is only half of it. Having fun is the other half.',
    author: 'Bum Phillips',
  },
  {
    quote: 'No man is a failure who is enjoying life.',
    author: 'William Feather',
  },
  {
    quote: 'Strop seeking out the storms and enjoy more fully the sunlight.',
    author: 'Gordon B. Hinckley',
  },
  {
    quote: 'Keep your eyes on the stars and your feet on the ground.',
    author: 'Theodore Roosevelt',
  },
  {
    quote: 'You get in life what you have the courage to ask for',
    author: 'Oprah Winfrey',
  },
  {
    quote: 'You only live once, but if you do it right, once is enough',
    author: 'Mae West',
  },
  {
    quote:
      'Life is 10 percent what you make it, and 90 percent how you take it.',
    author: 'Irving Berlin',
  },
  {
    quote: 'People are just about as happy as they make up their minds to be.',
    author: 'Abraham Lincoln',
  },
  {
    quote: 'The seat of knowledge is in the head, of wisdom, in the heart.',
    author: 'William Hazlitt',
  },
  {
    quote:
      'People generally see what they look for, and hear what they listen for.',
    author: 'Harper Lee',
  },
  {
    quote: 'There is more to life than increasing its speed.',
    author: 'Mahatma Gandhi',
  },
  {
    quote: 'Honesty is the first chapter in the book of wisdom.',
    author: 'Thomas Jefferson',
  },
];

const quoteComp = document.querySelector('.quote span');
const authorComp = document.querySelector('.author span');

const quotesInit = {
  makeRandomNum: function () {
    quotesInit.randomNum = Math.floor(Math.random() * 20);
  },
  randomNum: 0,
  setQuote: function () {
    quoteComp.innerText = quotes[quotesInit.randomNum].quote;
    authorComp.innerText = '-' + quotes[quotesInit.randomNum].author;
  },
};

quotesInit.makeRandomNum();
quotesInit.setQuote();
