export function changeBacgroundEveryFifthRefreash() {
  const paragraph = document.querySelector('#bottom-paragraph');

  const counter = JSON.parse(sessionStorage.getItem('counter'));
  if (counter === null) {
    sessionStorage.setItem('counter', 0);
  } else {
    sessionStorage.setItem('counter', counter + 1);
  }

  if (counter % 5 === 0) {
    paragraph.style.backgroundColor = '#FF6767';
  } else {
    paragraph.style.backgroundColor = 'azure';
  }
}
