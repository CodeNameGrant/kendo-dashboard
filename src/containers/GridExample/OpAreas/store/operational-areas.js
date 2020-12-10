const { findCountry } = require('./countries');
const { findProvince } = require('./provinces');
const { findCities } = require('./cities');

module.exports.OperationalAreas = [
  {
    "id": 1,
    "country": findCountry('id', 'ZAR'),
    "provinces": findProvince('id', 'KZN', 'GAU'),
    "cities": findCities('id', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19)
  },
  {
    "id": 2,
    "country": findCountry('id', 'ZAR'),
    "provinces": findProvince('id', 'WC'),
    "cities": findCities('id', 23, 24, 25)
  },
  {
    "id": 3,
    "country": findCountry('id', 'BOT'),
    "provinces": findProvince('id', 'GAB'),
    "cities": findCities('id', 31, 32, 33, 34)
  }
]

module.exports.getOperationalRole = (id) => {
  return this.OperationalAreas.find(item => item.id === id);
}