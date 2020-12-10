module.exports.Provinces = [
  { "id": "KZN", "name": "KZN", "country": "ZAR", "cityCount": 9 },
  { "id": "GAU", "name": "Gauteng", "country": "ZAR", "cityCount": 9 },
  { "id": "WC", "name": "Western Cape", "country": "ZAR", "cityCount": 8 },

  { "id": "GAB", "name": "Gaborone City", "country": "BOT", "cityCount": 4 },
  { "id": "FRA", "name": "Francistown City", "country": "BOT", "cityCount": 0 },
  { "id": "LOB", "name": "Lobatse Town", "country": "BOT", "cityCount": 0 },

  { "id": "KUN", "name": "Kunene", "country": "NAM", "cityCount": 6 },
  { "id": "KAW", "name": "Kavango West", "country": "NAM", "cityCount": 0 },
  { "id": "KAE", "name": "Kavango East", "country": "NAM", "cityCount": 0 },
  { "id": "ZAM", "name": "Zambezi", "country": "NAM", "cityCount": 0 },
]

module.exports.getProvinceByCountry = (country) => {
  return this.Provinces.filter(item => item.country === country.id);
}

module.exports.findProvince = (field, ...values) => {
  return this.Provinces.filter(item => values.indexOf(item[field]) !== -1);
}