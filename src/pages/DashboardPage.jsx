import { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  FormControl, InputLabel, Select, MenuItem, IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { TrendingUp, TrendingDown, ChatBubbleOutline } from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { useExcelData } from '../contexts/ExcelDataContext';
import CogsVsSalesChart from '../components/dashboard/CogsVsSalesChart';
import RevenueByChannelChart from '../components/dashboard/RevenueByChannelChart';
import DailyCogsInsightsChart from '../components/dashboard/DailyCogsInsightsChart';
import SuppliersMapChart from '../components/dashboard/SuppliersMapChart';
import { AccountBalance, ShoppingCart, CurrencyPound } from '@mui/icons-material';
import AIInsightsCard from '../components/dashboard/AIInsightsCard';

const getSummaryData = ({cogs_sales_monthly, cogs_sales_weekly}, isMonthly=true) => {
  if(isMonthly) {
    // Assuming that the latest is YTD
    const thisMonthData = cogs_sales_monthly[cogs_sales_monthly.length - 2];
    const lastMonthData = cogs_sales_monthly[cogs_sales_monthly.length - 3];
    return {
      dailySummary: {
        grossProfitMargin: (thisMonthData["Product Gross Profit Margin"]*100).toFixed(1),
        totalSales: thisMonthData["Sales - Value"].toFixed(2),
        totalCOGS: thisMonthData["Costs - Value"].toFixed(2),
        changes: {
          grossProfit: ((thisMonthData["Product Gross Profit Margin"] - lastMonthData["Product Gross Profit Margin"])* 100).toFixed(1) + "%",
          sales: (((thisMonthData["Sales - Value"] - lastMonthData["Sales - Value"]) / lastMonthData["Sales - Value"]) * 100).toFixed(2) + "%",
          cogs: (((thisMonthData["Costs - Value"] - lastMonthData["Costs - Value"]) / lastMonthData["Costs - Value"]) * 100).toFixed(2) + "%",
        }
      }
    }
  }
  // weekly calculation
  const thisWeekData = cogs_sales_weekly[cogs_sales_weekly.length - 1];
  const lastWeekData = cogs_sales_weekly[cogs_sales_weekly.length - 2];
  return {
    dailySummary: {
      grossProfitMargin: (thisWeekData["Product Gross Profit Margin"]*100).toFixed(1),
      totalSales: thisWeekData["Sales - Value"].toFixed(2),
      totalCOGS: thisWeekData["Costs - Value"].toFixed(2),
      changes: {
        grossProfit: ((thisWeekData["Product Gross Profit Margin"] - lastWeekData["Product Gross Profit Margin"])* 100).toFixed(1) + "%",
        sales: (((thisWeekData["Sales - Value"] - lastWeekData["Sales - Value"]) / lastWeekData["Sales - Value"]) * 100).toFixed(2) + "%",
        cogs: (((thisWeekData["Costs - Value"] - lastWeekData["Costs - Value"]) / lastWeekData["Costs - Value"]) * 100).toFixed(2) + "%",
      }
    }
  }
}

const SummaryCard = ({ title, value, change, prefix = '', comparisonPeriod, icon: Icon, bgColor, iconColor }) => (
  <Box sx={{ 
    p: 2,
    mb: -2,
    borderRadius: 2,
    bgcolor: bgColor,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }}>
    <Box>
      <Box sx={{ 
        width: 40, 
        height: 40, 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: iconColor,
        mb: 2
      }}>
        <Icon sx={{ color: 'white' }} />
      </Box>
      <Typography variant="h5" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
        {prefix}{value}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      <Typography 
        variant="body2" 
        color={change.startsWith('-') ? 'error.main' : 'success.main'}
        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '12px' }}
      >
        
      </Typography>
    </Box>
    <Typography 
      color={change.startsWith('-') ? 'error.main' : 'success.main'}
      sx={{mt: 'auto', fontSize: '12px' }}
    >
      {change.startsWith('-') ? <TrendingDown fontSize="12px" /> : <TrendingUp fontSize="12px" />}
      &nbsp;
      {change}
      &nbsp;
      from {comparisonPeriod}
    </Typography>
  </Box>
);


function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState('Monthly');
  const { excelData } = useExcelData();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    console.log("dashboard page mounted", duration);
    if(!excelData) {
        navigate('/upload');
        return;
    }
    processData();
    // Fetch data from localStorage or your state management solution
    const storedData = localStorage.getItem('excelData');
    // if (storedData) {
    //   const parsedData = JSON.parse(storedData);
    //   processData(parsedData);
    // }
    setLoading(false);
  }, [duration]);

  const processData = () => {
    const summmaryData = getSummaryData(excelData, duration === 'Monthly');
    
    // Process top products from monthly data
    const monthlyData = excelData.cogs_sales_monthly;
    const currentMonth = monthlyData[monthlyData.length - 2]; // Get latest non-YTD month
    
    // Sort products by sales volume and take top 5

    setDashboardData({
      dailySummary: summmaryData.dailySummary,
    });
  };

  const topProducts = (() => {
    // Filter out summary rows (ones with text dates like "January", "YTD")
    const numericData = excelData.cogs_sales.filter(item => !isNaN(item.Date));
    
    // Get the latest Excel date
    const latestDate = Math.max(...numericData.map(item => item.Date));
    
    // Get top 3 products from the latest date
    return numericData
      .filter(item => 
        item.Date === latestDate && 
        item.Product !== 'Total'
      )
      .map(item => ({
        id: item.Product,
        name: item.Product,
        salesVolume: item['Sales - Volume'],
        salesValue: item['Sales - Value'],
        grossProfitMargin: item['Product Gross Profit Margin']
      }))
      .sort((a, b) => b.grossProfitMargin - a.grossProfitMargin)
      .slice(0, 4);  // Take only top 3 products
  })();



  if (loading) {
    return <Box sx={{ p: 3 }}><LinearProgress /></Box>;
  }

  if (!dashboardData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>No data available. Please upload files first.</Typography>
      </Box>
    );
  }

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" mb={2}>Dashboard</Typography>

        {/* Summary and AI Insights */}
        <Grid container spacing={3} mb={3}>
          <Grid item md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Summary</Typography>
                  <FormControl variant="outlined" size="small">
                    <InputLabel id="duration-label">Duration</InputLabel>
                    <Select
                      labelId="duration-label"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      label="Duration"
                    >
                      <MenuItem value="Weekly">Weekly</MenuItem>
                      <MenuItem value="Monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Grid container spacing={2} mb={4}>
                  <Grid item xs={12} md={4}>
                    <SummaryCard
                      title="Gross Profit Margin"
                      value={`${dashboardData.dailySummary.grossProfitMargin}%`}
                      change={dashboardData.dailySummary.changes.grossProfit}
                      comparisonPeriod={duration === 'Weekly' ? 'last week' : 'last month'}
                      icon={AccountBalance}
                      bgColor="#f0f9ff"
                      iconColor="#0095ff"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <SummaryCard
                      title="Total Sales"
                      value={dashboardData.dailySummary.totalSales}
                      change={dashboardData.dailySummary.changes.sales}
                      prefix="£"
                      comparisonPeriod={duration === 'Weekly' ? 'last week' : 'last month'}
                      icon={CurrencyPound}
                      bgColor="#fff4de"
                      iconColor="#ff947a"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <SummaryCard
                      title="Total COGS"
                      value={dashboardData.dailySummary.totalCOGS}
                      change={dashboardData.dailySummary.changes.cogs}
                      prefix="£"
                      comparisonPeriod={duration === 'Weekly' ? 'last week' : 'last month'}
                      icon={ShoppingCart}
                      bgColor="#dcfce7"
                      iconColor="#3cd856"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={6}>
            <AIInsightsCard isProduct={false}/>
          </Grid>
        </Grid>

        {/* COGS Charts */}
        <Grid container spacing={3} mb={3}>
          <Grid item md={6}>
            <DailyCogsInsightsChart data={excelData.cogs_sales_weekly} />
          </Grid>
          <Grid item md={6}>
            <CogsVsSalesChart data={excelData.cogs_sales_monthly} />
          </Grid>
        </Grid>

        {/* Revenue and Top Products */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6}>

                
                <RevenueByChannelChart data={excelData.cogs_sales_monthly} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Products
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Gross Profit Margin</TableCell>
                        <TableCell>Units Sold</TableCell>
                        <TableCell>Total Sales</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topProducts.map((product, index) => (
                        <TableRow key={product.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <LinearProgress
                                variant="determinate"
                                value={product.grossProfitMargin * 100}
                                sx={{ flexGrow: 1, mr: 1 }}
                              />
                              <Typography variant="body2">
                                {(product.grossProfitMargin * 100).toFixed(1)}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{product.salesVolume}</TableCell>
                          <TableCell>£{product.salesValue.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Suppliers Map */}
        <Grid item xs={12} md={6} mb={3}>
          <Card>
            <CardContent>
              <SuppliersMapChart suppliersData={excelData.suppliers} />
            </CardContent>
          </Card>
      </Grid>
      </Box>
    </Layout>
  );
}

export default DashboardPage; 