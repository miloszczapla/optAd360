const DATA_END_POINT =
  'https://randomuser.me/api/?results=1000&nat=fr&gender=male';

async function fetchData() {
  const response = await fetch(DATA_END_POINT);
  const data = await response.json();
  return data.results;
}

async function onStart() {
  const button = window.querySelector('#button');
  const chart = window.querySelector('#chart');
  const table = window.querySelector('#table');

  console.log('fetchChartData', await fetchData());
}

onStart();
