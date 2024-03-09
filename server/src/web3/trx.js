const fetch = require('node-fetch');

const apiKey = 'd088f9ab-17b3-488a-8f99-7b93478720f7';
const address = 'TCdTfftGiZYurxbcyHouCYCNjra1xwTpuU'
const endpoint = 'https://apilist.tronscanapi.com/api/transaction?address='+address;

fetch(endpoint, {
  headers: {
    'TRON-PRO-API-KEY': apiKey
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));



  