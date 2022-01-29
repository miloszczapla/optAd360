import createChart from './utils/createChart.js';
import hydrateTable from './utils/table.js';
import switchState from './utils/switchState.js';
import { changeBacgroundEveryFifthRefreash } from './utils/onRefresh.js';

const DATA_END_POINT =
  'https://randomuser.me/api/?results=1000&nat=fr&gender=male';

const button = document.querySelector('#button');
const chart = document.querySelector('#myChart');
const loader = document.querySelector('#loader');
const table = document.querySelector('#table');

button.addEventListener('click', switchState);

async function fetchData() {
  const response = await fetch(DATA_END_POINT);
  const data = await response.json();
  return data.results;
}

async function onStart() {
  changeBacgroundEveryFifthRefreash();
  const data = await fetchData();
  let viewportWidth = window.innerWidth;

  createChart(data);
  hydrateTable(data, viewportWidth);

  window.addEventListener('resize', () => {
    viewportWidth = window.innerWidth;
    table.innerHTML = '';
    hydrateTable(data, viewportWidth);
  });

  loader.classList.add('hidden');
  chart.classList.remove('hidden');
  button.classList.remove('nonclickable');
}
onStart();
