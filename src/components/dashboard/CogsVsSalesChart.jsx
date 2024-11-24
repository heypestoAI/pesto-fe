import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { ChatBubbleOutline } from '@mui/icons-material';

const CogsVsSalesChart = ({ data }) => {
  const monthlyData = data.filter(item => item.Date !== 'YTD');

  const chartData = {
    months: monthlyData.map(item => item.Date.substring(0, 3)),
    sales: monthlyData.map(item => Number(Math.round(item["Sales - Value"]))),
    cogs: monthlyData.map(item => Number(Math.round(item["Costs - Value"])))
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            COGS vs Sales
          </Typography>
        </Box>
        <BarChart
          width={500}
          height={250}
          borderRadius={7}
          series={[
            {
              data: chartData.cogs,
              label: 'COGS',
              type: 'bar',
              color: '#4CAF50',
              valueFormatter: (value) => `${value}`,
            },
            {
              data: chartData.sales,
              label: 'Sales',
              type: 'bar',
              color: '#FFC107',
              valueFormatter: (value) => `${value}`,
            },
          ]}
          xAxis={[{
            data: chartData.months,
            scaleType: 'band',
            categoryGapRatio: 0.4 ,
            barGapRatio: 0.2,
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