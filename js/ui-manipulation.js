// 매게변수로 들어온 요소들을 숨기는 함수
export function hideElements(elements) {
  Object.values(elements).forEach(($el) => {
    if ($el instanceof jQuery && $el.length > 0) {
      $el.hide();
    }
  });
}

// 매게변수로 들어온 요소들을 보여주는 함수
export function showElements(elements) {
  Object.values(elements).forEach(($el) => {
    if ($el instanceof jQuery && $el.length > 0) {
      $el.show();
    }
  });
}
