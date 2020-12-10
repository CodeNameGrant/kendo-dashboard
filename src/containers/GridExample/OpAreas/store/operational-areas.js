module.exports.OperationalAreas = [
  {
    "id": 1,
    "country": { "id": "ZAR", "name": "South Africa" },
    "provinces": [{ "id": "KZN", "name": "KZN", "country": "ZAR" }],
    "cities": [
      { "id": 1, "name": "Durban", "province": "KZN" },
      { "id": 2, "name": "PMB", "province": "KZN" },
      { "id": 3, "name": "New Castle", "province": "KZN" },
      { "id": 4, "name": "Umhlanga", "province": "KZN" },
    ]
  },
  {
    "id": 2,
    "country": { "id": "ZAR", "name": "South Africa" },
    "provinces": [{ "id": "GAU", "name": "Gauteng", "country": "ZAR" }],
    "cities": [
      { "id": 11, "name": "Jo'berg", "province": "GAU" },
      { "id": 12, "name": "Pretoria", "province": "GAU" },
      { "id": 13, "name": "Soweto", "province": "GAU" },
      { "id": 14, "name": "Hillbrow", "province": "GAU" },
    ]
  },
  {
    "id": 3,
    "country": { "id": "BOT", "name": "Botswana" },
    "provinces": [{ "id": "GAB", "name": "Gaborone City", "country": "BOT" }],
    "cities": [
      { "id": 31, "name": "Ramotswa", "province": "GAB" },
      { "id": 32, "name": "Mogoditshane", "province": "GAB" }
    ]
  }
]

module.exports.getOperationalRole = (id) => {
  return this.OperationalAreas.find(item => item.id === id);
}