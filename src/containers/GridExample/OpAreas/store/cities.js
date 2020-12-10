module.exports.Cities = [
  { "id": 1, "name": "Durban", "province": "KZN" },
  { "id": 2, "name": "PMB", "province": "KZN" },
  { "id": 3, "name": "New Castle", "province": "KZN" },
  { "id": 4, "name": "Umhlanga", "province": "KZN" },
  { "id": 5, "name": "Richards Bay", "province": "KZN" },
  { "id": 6, "name": "Port Shepston", "province": "KZN" },
  { "id": 7, "name": "Margate", "province": "KZN" },
  { "id": 8, "name": "Lady Smith", "province": "KZN" },
  { "id": 9, "name": "Pinetown", "province": "KZN" },

  { "id": 11, "name": "Jo'berg", "province": "GAU" },
  { "id": 12, "name": "Pretoria", "province": "GAU" },
  { "id": 13, "name": "Soweto", "province": "GAU" },
  { "id": 14, "name": "Hillbrow", "province": "GAU" },
  { "id": 15, "name": "Geriston", "province": "GAU" },
  { "id": 16, "name": "Benoni", "province": "GAU" },
  { "id": 17, "name": "Centurian", "province": "GAU" },
  { "id": 18, "name": "Randburg", "province": "GAU" },
  { "id": 19, "name": "Boksburg", "province": "GAU" },

  { "id": 21, "name": "Cape Town", "province": "WC" },
  { "id": 22, "name": "Stellenbosch", "province": "WC" },
  { "id": 23, "name": "Hermanus", "province": "WC" },
  { "id": 24, "name": "Franschoek", "province": "WC" },
  { "id": 25, "name": "Paarl", "province": "WC" },
  { "id": 26, "name": "Mossel Bay", "province": "WC" },
  { "id": 27, "name": "Somerset West", "province": "WC" },
  { "id": 28, "name": "George", "province": "WC" },


  { "id": 31, "name": "Ramotswa", "province": "GAB" },
  { "id": 32, "name": "Mogoditshane ", "province": "GAB" },
  { "id": 33, "name": "Mochudi ", "province": "GAB" },
  { "id": 34, "name": "Tlokweng ", "province": "GAB" },
]

module.exports.getCitiesByProvince = (province) => {
  return this.Cities.filter(item => item.province === province.id)
}

module.exports.getCitiesByProvinces = (provinces) => {
  return provinces.reduce((data, province) => {
    return data.concat(this.getCitiesByProvince(province));
  }, [])
}