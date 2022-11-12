export const options = {
    responsive: true,
    plugins: {
      legend: {
        display:false,
        position:'top',
      },
    },
    borderWidth: 2,
  };
  
  export const balanceData = {
    labels:['03/22', '05/22', '06/22', '08/22', '09/22'],
    datasets: [
      {
        fill: true,
        data: [400,500,400,300]
        ,
        borderColor: '#F9F9F9',
        backgroundColor: '#1976D3',
      },
    ],
  };