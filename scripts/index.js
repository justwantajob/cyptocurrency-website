"use strict";


async function fetchCryptoData() {
  let cryptoInfoHTML = '';
  // const cryptoInfoList = document.querySelector('.js-cryptocurrency-info-list');
  const cryptoCurrencyInfoTableBody = document.querySelector('.js-cryptocurrency-info-table-body');

  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    const cryptoCurrencyData = await response.json();

    cryptoCurrencyData.slice(0, 10).forEach((coin) => {
      const formattedPrice = coin.current_price.toLocaleString(
        'en-US',
        {
          style: 'currency',
          currency: 'USD',
        }
      );
      // cryptoInfoHTML += `
      //     <li>${coin.name} | $${coin.current_price.toLocaleString()} | <img style="height:16px;" src="${coin.image}"></li>
      // `;

      const cryptocurrencyTableRow = document.createElement('tr');
      cryptocurrencyTableRow.innerHTML += `
        <td>${coin.name}</td>
        <td>${formattedPrice}</td>
        <td><img style="height:16px;" src="${coin.image}"></td>
      `;

      cryptoCurrencyInfoTableBody.appendChild(cryptocurrencyTableRow);

    });
  } catch (error) {
    console.log('Error fetching crypto data: ', error);
  }

  // cryptoInfoList.innerHTML = cryptoInfoHTML;
}

fetchCryptoData();

// Auto refresh feature
// setInterval(fetchCryptoData, 60000);