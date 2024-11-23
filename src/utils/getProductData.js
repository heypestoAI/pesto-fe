export const getProductData = (cogsData, selectedProduct) => {
  // Filter data for selected product, excluding summary rows (like "Total", "January", "February", etc.)
  const productData = cogsData.filter(item => 
    item.Product === selectedProduct && 
    !isNaN(item.Date) // This excludes summary rows which have text dates
  );

  // Sort by date to ensure chronological order
  return productData.sort((a, b) => a.Date - b.Date);
}; 