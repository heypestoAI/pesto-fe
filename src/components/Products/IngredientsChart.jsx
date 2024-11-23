import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export const IngredientsChart = ({ recipesData, selectedProduct }) => {
  if (!recipesData || !selectedProduct) return null;

  // Filter ingredients for the selected product
  const productIngredients = recipesData.filter(
    item => item.Product === selectedProduct
  );

  // Calculate total weight
  const totalWeight = productIngredients.reduce(
    (sum, item) => sum + item["Ingredient Weight (kg)"], 
    0
  );

  // Calculate percentage for each ingredient
  const data = productIngredients.map(item => ({
    name: item.Ingredients,
    value: ((item["Ingredient Weight (kg)"] / totalWeight) * 100).toFixed(1),
    weight: item["Ingredient Weight (kg)"]
  }));

  // Sort by percentage in descending order
  data.sort((a, b) => b.value - a.value);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '10px', 
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <p>{`${data.name}`}</p>
          <p>{`Weight: ${data.weight}kg`}</p>
          <p>{`Percentage: ${data.value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      layout="vertical"
      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" unit="%" domain={[0, 50]}/>
      <YAxis dataKey="name" type="category" width={100} />
      <Tooltip content={<CustomTooltip />} />
      <Bar 
        dataKey="value" 
        fill="#4CAF50"
        radius={[0, 4, 4, 0]}
      />
    </BarChart>
  );
}; 