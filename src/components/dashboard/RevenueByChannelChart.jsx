import { Card, CardContent, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

const RevenueByChannelChart = ({ data }) => {
  // Filter out the YTD entry and prepare data for the chart
  const monthlyData = data.filter(item => item.Date !== 'YTD');

  const chartData = {
    months: monthlyData.map(item => item.Date.substring(0, 3)), // Get first 3 letters of month
    onlineSales: monthlyData.map(item => item["Sales D2C"]), // Online sales (D2C)
    offlineSales: monthlyData.map(item => item["Sales - Retail"]) // Offline sales (Retail)
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Revenue by channel
        </Typography>
        <BarChart
          width={550}
          height={300}
          series={[
            {
              data: chartData.onlineSales,
              label: 'Online Sales',
              type: 'bar',
              color: '#2196F3', // Blue color for online sales
            },
            {
              data: chartData.offlineSales,
              label: 'Offline Sales',
              type: 'bar',
              color: '#4CAF50', // Green color for offline sales
            },
          ]}
          xAxis={[{
            data: chartData.months,
            scaleType: 'band',
          }]}
          legend={{
            position: 'bottom',
            align: 'center',
          }}
          yAxis={[{
            min: 0,
            max: 3000, // Set max value to match the 25k shown in the image
          }]}
        />
      </CardContent>
    </Card>
  );
};

export default RevenueByChannelChart; 