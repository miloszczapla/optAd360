export default function createChart(data) {
  const chart = document.querySelector('#myChart');

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
