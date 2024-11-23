import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export const CogsInsightsChart = ({ productData }) => {
  if (!productData) return null;

  const data = [
    { name: 'Ingredient costs', value: productData['Ingredient costs'] },
    { name: 'Labour costs', value: productData['Labour costs'] },
    { name: 'Distribution costs', value: productData['Distribution costs'] },
    { name: 'Packaging costs', value: productData['Packaging costs'] }
  ];

  // Calculate percentages for each cost
  const total = data.reduce((sum, item) => sum + item.value, 0);
  data.forEach(item => {
    item.percentage = ((item.value / total) * 100).toFixed(1);
  });

  // Colors for the pie chart segments
  const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722'];

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
          <p>{`${data.name}: £${data.value.toFixed(2)} (${data.percentage}%)`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percentage }) => `${name} (${percentage}%)`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </div>
  );
}; 