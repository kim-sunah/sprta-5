const imgArray = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
];

function makeRandomImg() {
  const img = imgArray[Math.floor(Math.random() * imgArray.length)];
  $('.background-img').attr("src",'img/' + img);
}

makeRandomImg();

$('.chg-theme').on('click', makeRandomImg);
