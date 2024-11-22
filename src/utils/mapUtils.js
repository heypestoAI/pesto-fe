// Function to get unique countries from suppliers data
export const getSupplierCountries = (suppliersData) => {
  const uniqueCountries = [...new Set(suppliersData.map(item => item["Sourcing Geography"]))];
  
  // Create data structure for map visualization
  const countryData = uniqueCountries.map(country => ({
    id: country,
    value: suppliersData.filter(item => item["Sourcing Geography"] === country).length
  }));

  return countryData;
}; 