export default function switchState() {
  const button = document.querySelector('#button');
  const chart = document.querySelector('#myChart');
  const table = document.querySelector('#table');

  //get data from session storage
  const state = JSON.parse(sessionStorage.getItem('state'));
  if (state === null) state = 0;
  switch (state) {
    case 0:
      sessionStorage.setItem('state', 1);
      table.classList.remove('hidden');
      chart.classList.add('hidden');
      button.innerText = 'Chart';

      break;
    case 1:
      sessionStorage.setItem('state', 0);
      chart.classList.remove('hidden');
      table.classList.add('hidden');
      button.innerText = 'Table';

      break;
    default:
      break;
  }
}
