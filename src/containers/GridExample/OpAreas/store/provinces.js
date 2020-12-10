module.exports.Provinces = [
  { "id": "KZN", "name": "KZN", "country": "ZAR" },
  { "id": "GAU", "name": "Gauteng", "country": "ZAR" },
  { "id": "WC", "name": "Western Cape", "country": "ZAR" },

  { "id": "GAB", "name": "Gaborone City", "country": "BOT" },
  { "id": "FRA", "name": "Francistown City", "country": "BOT" },
  { "id": "LOB", "name": "Lobatse Town", "country": "BOT" },

  { "id": "KUN", "name": "Kunene", "country": "NAM" },
  { "id": "KAW", "name": "Kavango West", "country": "NAM" },
  { "id": "KAE", "name": "Kavango East", "country": "NAM" },
  { "id": "ZAM", "name": "Zambezi", "country": "NAM" },
]

module.exports.getProvinceByCountry = (country) => {
  return this.Provinces.filter(item => item.country === country.id);
}