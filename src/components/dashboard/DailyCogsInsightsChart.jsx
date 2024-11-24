import { Card, CardContent, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';

const DailyCogsInsightsChart = ({ data }) => {
  // Get the latest date's data
  const latestData = data.reduce((latest, current) => {
    return (!latest || current.Date > latest.Date) ? current : latest;
  }, null);

  // Prepare data for the pie chart
  const pieData = [
    {
      id: 0,
      value: Number(latestData["Ingredient costs"].toFixed(2)),
      label: 'Ingredients',
      color: '#4CAF50', // Dark green
    },
    {
      id: 1,
      value: Number(latestData["Labour costs"].toFixed(2)),
      label: 'Labour',
      color: '#81C784', // Medium green
    },
    {
      id: 2,
      value: Number(latestData["Distribution costs"].toFixed(2)),
      label: 'Distribution',
      color: '#A5D6A7', // Light-medium green
    },
    {
      id: 3,
      value: Number(latestData["Packaging costs"].toFixed(2)),
      label: 'Packaging',
      color: '#C8E6C9', // Light green
    }
  ];

  // Calculate total for percentage
  const total = pieData.reduce((sum, item) => sum + item.value, 0);
  
  // Add percentage to labels
  const pieDataWithPercentages = pieData.map(item => ({
    ...item,
    label: `${item.label} (${Math.round((item.value / total) * 100)}%)`,
  }));

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Daily COGS Insights
        </Typography>
        <PieChart
          series={[
            {
              data: pieDataWithPercentages,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30 },
              innerRadius: 30,
              paddingAngle: 5,
              cornerRadius: 4,
            },
          ]}
          width={500}
          height={200}
          slotProps={{
            legend: {
              direction: 'column',
              position: { vertical: 'top', horizontal: 'right' },
              padding: { left: 10, right: 20 },
              itemMarkWidth: 10,
              itemMarkHeight: 10,
              itemGap: 8,
              markGap: 5,
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default DailyCogsInsightsChart; 