import Vue from 'vue';

Vue.filter('txidCut', value => {
  if (value && value.length > 14) {
    return value.substring(0, 11) + '...' + value.substring(value.length - 3);
  } else {
    return value;
  }
});


Vue.filter('explorerAddressURL', (value, currency) => {
  if (currency === 'BTC')
    return 'https://live.blockcypher.com/btc/address/' + value;
  if (currency === 'ETH')
    return 'https://etherscan.io/address/' + value;
  if (currency === 'LTC')
    return 'https://live.blockcypher.com/ltc/address/' + value;
  if (currency === 'BCH')
    return 'https://explorer.bitcoin.com/bch/address/' + value;

  return '';
})

Vue.filter('explorerTxURL', (value, currency) => {
  if (currency === 'BTC')
    return 'https://live.blockcypher.com/btc/tx/' + value;
  if (currency === 'ETH')
    return 'https://etherscan.io/tx/' + value;
  if (currency === 'LTC')
    return 'https://live.blockcypher.com/ltc/tx/' + value;
  if (currency === 'BCH')
    return 'https://explorer.bitcoin.com/bch/address/' + value;
  return '';
})

Vue.filter('explorerCaseName', (value) => {
  return 'https://safu-media.phenom.team/' + value;
})
