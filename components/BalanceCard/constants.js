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
  
  const labels = ['03/22', '05/22', '06/22', '08/22', '09/22'];
  
  export const balanceData = {
    labels,
    datasets: [
      {
        fill: true,
        data: labels.map(() => Math.floor(Math.random() * 200))
        ,
        borderColor: '#F9F9F9',
        backgroundColor: '#1976D3',
      },
    ],
  };