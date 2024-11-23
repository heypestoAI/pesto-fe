export const getLatestProductData = (cogsData) => {
  // Get unique products excluding "Total"
  const uniqueProducts = [...new Set(cogsData.map(item => item.Product))]
    .filter(product => product !== "Total");

  // Get latest entry for each product
  const latestProductData = uniqueProducts.map(product => {
    const productEntries = cogsData.filter(item => item.Product === product);
    // Sort by Date in descending order and take the first entry
    return productEntries.sort((a, b) => b.Date - a.Date)[0];
  });

  return latestProductData;
}; 