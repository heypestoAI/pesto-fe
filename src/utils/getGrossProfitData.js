export const getGrossProfitData = (cogsData, selectedProduct) => {
  // Filter data for selected product and exclude summary rows
  const productData = cogsData.filter(item => 
    item.Product === selectedProduct && 
    !isNaN(item.Date)
  );

  // Convert Excel date to JS date and calculate gross profit
  const grossProfitData = productData.map(item => {
    // Excel dates start from December 30, 1899
    const date = new Date((item.Date - 25569) * 86400 * 1000);
    
    return {
      date: date.toLocaleDateString('en-GB', { 
        day: 'numeric',
        month: 'short'
      }),
      grossProfit: item["Sales - Value"] - item["Costs - Value"],
      salesValue: item["Sales - Value"],
      costsValue: item["Costs - Value"]
    };
  });

  // Sort by date
  return grossProfitData.sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );
}; 