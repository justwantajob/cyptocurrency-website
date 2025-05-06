import { formatTime } from './utils/getTime.js';

fetchCryptoData();

async function fetchCryptoData() {
  const cryptoCurrencyInfoTableBody = document.querySelector('.js-cryptocurrency-info-table-body');
  cryptoCurrencyInfoTableBody.innerHTML = '';

  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    const cryptoCurrencyData = await response.json();

    console.log(cryptoCurrencyData);

    cryptoCurrencyData.forEach((coin) => {
      const formattedPrice = coin.current_price.toLocaleString(
        'en-US',
        {
          style: 'currency',
          currency: 'USD',
        }
      );

    const twentyFourHourPriceChange = coin.price_change_percentage_24h?.toFixed(2);
    const priceChangeColor = twentyFourHourPriceChange >= 0 ? 'green' : 'red';

      const cryptocurrencyTableRow = document.createElement('tr');
      cryptocurrencyTableRow.classList.add('fade-in');
      cryptocurrencyTableRow.innerHTML += `
        <td><img style="height:16px;" src="${coin.image}">${coin.name}</td>
        <td>${formattedPrice}</td>
        <td style="color: ${priceChangeColor};">${twentyFourHourPriceChange}</td>
      `;

      cryptoCurrencyInfoTableBody.appendChild(cryptocurrencyTableRow);

      setTimeout(() => {
        cryptocurrencyTableRow.classList.add('show');
      }, 10);
    });

    const now = new Date();
    const timeString = formatTime(now);
    document.querySelector('.js-last-update-time')
      .innerHTML = `
        <svg class="last-update-time-icon js-last-update-time-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        Last updated at: ${timeString}
      `;
  } catch (error) {
    console.log('Error fetching crypto data: ', error);
  }
}

document.addEventListener('click', (event) => {
  if (event.target.closest('.js-last-update-time-icon')) {
    fetchCryptoData();
  }
});

// Auto refresh feature
setInterval(fetchCryptoData, 60000);