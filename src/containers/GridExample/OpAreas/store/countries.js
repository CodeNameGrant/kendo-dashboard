module.exports.Countries = [
  { "id": "ZAR", "name": "South Africa", provinceCount: 3 },
  { "id": "BOT", "name": "Botswana", provinceCount: 3 },
  { "id": "NAM", "name": "Namibia", provinceCount: 4 }
]

module.exports.findCountry = (field, ...values) => {
  return this.Countries.find(item => values.indexOf(item[field]) !== -1);
}