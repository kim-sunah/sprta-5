const bgImg = document.querySelector('.background-img');
const chgTheme = document.querySelector('.chg-theme');
const imgArray = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
];

function makeRandomImg() {
  const img = imgArray[Math.floor(Math.random() * imgArray.length)];
  bgImg.src = 'img/' + img;
}

makeRandomImg();

chgTheme.addEventListener('click', makeRandomImg);
