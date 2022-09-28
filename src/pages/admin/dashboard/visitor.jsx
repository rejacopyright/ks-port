import Chart from 'react-apexcharts'

const Index = ({ categories = [], visitors = [], pageViews = [] }) => {
  const data = [
    {
      name: 'Pengunjung',
      data: visitors,
    },
    {
      name: 'Dilihat',
      data: pageViews,
    },
  ]
  const setting = {
    chart: {
      toolbar: { show: false },
      fontFamily: 'inherit',
      stacked: false,
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val || '',
      offsetY: -20,
      style: {
        fontSize: '10px',
        colors: ['#000'],
        fontFamily: 'inherit',
        margin: 10,
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 5,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 1,
      },
    },
    colors: ['#82b1ff', '#ffbe0b'],
    stroke: { width: [1, 1] },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    xaxis: {
      categories,
      position: 'bottom',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        seriesName: 'Pengunjung',
        show: false,
      },
      {
        seriesName: 'Dilihat',
        axisTicks: { show: false },
        axisBorder: { show: true },
        title: { text: '', show: false },
      },
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: { show: false },
    },
    grid: {
      row: {
        colors: ['#fff', '#fafafa'],
      },
      borderColor: '#eee',
      padding: {
        top: 5,
        right: 0,
        bottom: 5,
        left: 0,
      },
    },
    legend: {
      horizontalAlign: 'center',
      offsetX: 0,
    },
  }
  return (
    <div className='shadow borders border-ee radius-5 overflow-hidden'>
      <div className='text-center fw-500 fs-8 border-bottom border-ee bg-primary text-white py-2'>
        Pengunjung dalam 7 hari terakhir
      </div>
      <Chart options={setting} type='bar' series={data} height={250} />
    </div>
  )
}

export default Index
