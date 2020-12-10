/**
 * Returns a boolean indicating if each province is represented by a city
 * 
 * @param {object} dataItem 
 * @returns {boolean}
 */
export const validateCitiesAndProvinces = (dataItem) => {
  const provinceIds = dataItem.provinces.map(item => item.id);
  const distinctCityProvinceIds = new Set(dataItem.cities.map(item => item.province));

  return provinceIds.length === distinctCityProvinceIds.size;
}