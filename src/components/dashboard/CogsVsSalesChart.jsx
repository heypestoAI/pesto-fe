import { Card, CardContent, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

const CogsVsSalesChart = ({ data }) => {
    console.log(data);
  // Filter out the YTD entry and prepare data for the chart
  const monthlyData = data.filter(item => item.Date !== 'YTD');

  const chartData = {
    months: monthlyData.map(item => item.Date.substring(0, 3)), // Get first 3 letters of month
    sales: monthlyData.map(item => Number(Math.round(item["Sales - Value"] ))), // Convert to thousands
    cogs: monthlyData.map(item => Number(Math.round(item["Costs - Value"] )))
  };

  return (
    <Card sx={{width: "100%"}}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          COGS vs Sales
        </Typography>
        <BarChart
          width={600}
          height={300}
          series={[
            {
              data: chartData.cogs,
              label: 'COGS',
              type: 'bar',
              color: '#4CAF50', // Green color for COGS
            },
            {
              data: chartData.sales,
              label: 'Sales',
              type: 'bar',
              color: '#FFC107', // Yellow color for Sales
            },
          ]}
          xAxis={[{
            data: chartData.months,
            scaleType: 'band',
          }]}
          legend={{
            position: 'top',
            align: 'right',
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CogsVsSalesChart; 