export default function hydrateTable(data, viewportWidth) {
  const table = document.querySelector('#table');

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
