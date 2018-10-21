function reverse (string) {
  return Array.from(string).reverse().join('')
}

function formatCurrency (amount, prefix = 'R$ ', thousandSeparator = '.', decimalSeparator = ',') {
  return Number(amount)
    .toString()
    .replace(/(\d+)(\.?\d*)/, function (match, integral, fractional) {
      return prefix +
        reverse(reverse(integral).match(/.{1,3}/g).join(thousandSeparator)) +
        decimalSeparator + (+fractional).toFixed(2).substr(2, 2)
    })
}

function formatProcessId (processId) {
  var m = processId.match(/(\d{4})(\d{2})(\d)(\d{6})(\d+)/)
  return m
    ? m[1] + '.' + m[2] + '.' + m[3] + '.' + m[4] + '-' + m[5]
    : processId
}

export {
  reverse,
  formatCurrency,
  formatProcessId
}
