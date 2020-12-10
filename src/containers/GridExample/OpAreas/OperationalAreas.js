module.exports.countries = [
  { id: "ZAR", name: "South Africa" },
  { id: "BOT", name: "Botswana" },
  { id: "NAM", name: "Namibia" }
]

module.exports.provinces = {
  "ZAR": [
    { id: "KZN", name: "KZN" },
    { id: "GAU", name: "Gauteng" },
    { id: "WC", name: "Western Cape" },
  ],
  "BOT": [
    { id: "GAB", name: "Gaborone City" },
    { id: "FRA", name: "Francistown City" },
    { id: "LOB", name: "Lobatse Town" },
  ],
  "NAM": [
    { id: "KUN", name: "Kunene" },
    { id: "KAW", name: "Kavango West" },
    { id: "KAE", name: "Kavango East" },
    { id: "ZAM", name: "Zambezi" },
  ]
}

module.exports.cities = {
  // South Africa
  KZN: [
    { id: 1, name: "Durban" },
    { id: 2, name: "PMB" },
    { id: 3, name: "New Castle" },
    { id: 4, name: "Umhlanga" },
    { id: 5, name: "Richards Bay" },
    { id: 6, name: "Port Shepston" },
    { id: 7, name: "Margate" },
    { id: 8, name: "Lady Smith" },
    { id: 9, name: "Pinetown" },
  ],
  GAU: [
    { id: 11, name: "Jo'berg" },
    { id: 12, name: "Pretoria" },
    { id: 13, name: "Soweto" },
    { id: 14, name: "Hillbrow" },
    { id: 15, name: "Geriston" },
    { id: 16, name: "Benoni" },
    { id: 17, name: "Centurian" },
    { id: 18, name: "Randburg" },
    { id: 19, name: "Boksburg" },
  ],
  WC: [
    { id: 21, name: "Cape Town" },
    { id: 22, name: "Stellenbosch" },
    { id: 23, name: "Hermanus" },
    { id: 24, name: "Franschoek" },
    { id: 25, name: "Paarl" },
    { id: 26, name: "Mossel Bay" },
    { id: 27, name: "Somerset West" },
    { id: 28, name: "George" },
  ],

  // Botswana
  GAB: [
    { id: 31, name: "Ramotswa" },
    { id: 32, name: "Mogoditshane " },
    { id: 33, name: "Mochudi " },
    { id: 34, name: "Tlokweng " },
  ]
}

module.exports.OperationalAreas = [
  {
    id: 1,
    country: { id: "ZAR", name: "South Africa" },
    province: { id: "KZN", name: "KZN" },
    cities: [
      { id: 1, name: "Durban" },
      { id: 2, name: "PMB" },
      { id: 3, name: "New Castle" },
      { id: 4, name: "Umhlanga" },
    ]
  },
  {
    id: 2,
    country: { id: "ZAR", name: "South Africa" },
    province: { id: "GAU", name: "Gauteng" },
    cities: [
      { id: 11, name: "Jo'berg" },
      { id: 12, name: "Pretoria" },
      { id: 13, name: "Soweto" },
      { id: 14, name: "Hillbrow" },
    ]
  },
  {
    id: 3,
    country: { id: "BOT", name: "Botswana" },
    province: { id: "GAB", name: "Gaborone City" },
    cities: [
      { id: 31, name: "Ramotswa" },
      { id: 32, name: "Mogoditshane " },
    ]
  }
]