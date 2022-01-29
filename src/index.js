const DATA_END_POINT =
  'https://randomuser.me/api/?results=1000&nat=fr&gender=male';

const button = document.querySelector('#button');
const chart = document.querySelector('#myChart');
const table = document.querySelector('#table');

button.addEventListener('click', swich);
function swich() {
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

async function fetchData() {
  const response = await fetch(DATA_END_POINT);
  const data = await response.json();
  return data.results;
}

function changeBacgroundEveryFifthRefreash(element) {
  //get element and change its background color after getting counter from local storage
  //if local storage is empty, add counter to local storage

  const counter = JSON.parse(sessionStorage.getItem('counter'));
  if (counter === null) {
    sessionStorage.setItem('counter', 0);
  } else {
    sessionStorage.setItem('counter', counter + 1);
  }

  if (counter % 5 === 0) {
    element.style.backgroundColor = '#FF6767';
  } else {
    element.style.backgroundColor = 'azure';
  }
}

function hydrateTable(data, viewportWidth) {
  const sortedData = data.sort(
    (a, b) => new Date(a.dob.date).getTime() - new Date(b.dob.date).getTime(),
  );
  const oldestTen = sortedData.slice(0, 10);
  const headers = ['Name', 'Picture', 'Age', 'Email', 'Phone', 'Address'];

  if (viewportWidth > 768) {
    const tr = document.createElement('tr');
    headers.forEach((header) => {
      const th = document.createElement('th');
      th.innerText = header;
      tr.appendChild(th);
    });
    table.appendChild(tr);
  }

  oldestTen.forEach((person) => {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdAge = document.createElement('td');
    const tdEmail = document.createElement('td');
    const tdPhone = document.createElement('td');
    const tdAddress = document.createElement('td');
    const tdPicture = document.createElement('td');

    tdName.innerText = person.name.first + ' ' + person.name.last;
    tdAge.innerText = person.dob.age;
    tdEmail.innerText = person.email;
    tdPhone.innerText = person.phone;
    tdAddress.innerText = person.location.city + ' ' + person.location.state;
    tdPicture.innerHTML = `<img src="${person.picture.thumbnail}" alt="${person.name.first} ${person.name.last}">`;

    const tds = [tdName, tdPicture, tdAge, tdEmail, tdPhone, tdAddress];
    if (viewportWidth < 768) {
      headers.forEach((header, id) => {
        const tr = document.createElement('tr');

        const headerElement = document.createElement('th');
        headerElement.innerText = header;

        tr.append(headerElement, tds[id]);
        table.appendChild(tr);
      });
      tr.className = 'divider';
      table.appendChild(tr);
    } else {
      tr.append(tdName, tdPicture, tdAge, tdEmail, tdPhone, tdAddress);
      table.appendChild(tr);
    }
  });
}

function createChart(data) {
  const labels = [
    '0-9',
    '10-19',
    '20-29',
    '30-39',
    '40-59',
    '50-59',
    '60-69',
    '70-79',
    '80-89',
    '90-99',
    '100+',
  ];

  const bgColors = [
    'rgba(237, 102, 37, 0.8)',
    'rgba(0, 0, 223, 0.2)',
    'rgba(129, 48, 234, 0.9)',
    'rgba(189, 71, 150, 0.8)',
    'rgba(200, 209, 79, 0.3)',
    'rgba(36, 50, 60, 0.2)',
    'rgba(35, 124, 150, 0.5)',
    'rgba(130, 86, 10, 0.2)',
    'rgba(50, 67, 215, 0.3)',
    'rgba(157, 144, 124, 0.2)',
  ];

  const ageRangesArray = data.reduce(
    (ageRanges, man) => {
      const age = man.dob.age;
      const id = Math.floor(age / 10);
      ageRanges[id] = ageRanges[id] + 1;
      return ageRanges;
    },
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Mens per age range',
        backgroundColor: bgColors,
        borderColor: 'rgb(255, 99, 132)',
        data: ageRangesArray,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: chartData,
    options: {},
  };
  const myChart = new Chart(chart, config);
}

async function onStart() {
  const viewportWidth = window.innerWidth;
  const paragraph = document.querySelector('#bottom-paragraph');

  changeBacgroundEveryFifthRefreash(paragraph);
  const loader = document.querySelector('#loader');
  const data = await fetchData();
  createChart(data);
  hydrateTable(data, viewportWidth);
  loader.style.display = 'none';
  chart.classList.remove('hidden');
  button.classList.remove('nonclickable');
}
onStart();
