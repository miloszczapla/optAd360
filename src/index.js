const DATA_END_POINT =
  'https://randomuser.me/api/?results=1000&nat=fr&gender=male';

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
  const table = document.querySelector('#table');
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

function createChart() {
  const ctx = document.getElementById('myChart').getContext('2d');

  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      title: {
        display: true,
        text: 'xdede',
      },
    },
  };
  const myChart = new Chart(ctx, config);
}

async function onStart() {
  const viewportWidth = window.innerWidth;
  const paragraph = document.querySelector('#bottom-paragraph');

  changeBacgroundEveryFifthRefreash(paragraph);
  // const button = document.querySelector('#button');
  const loader = document.querySelector('#loader');
  const data = await fetchData();
  createChart();
  hydrateTable(data, viewportWidth);
  loader.style.display = 'none';
}

onStart();
