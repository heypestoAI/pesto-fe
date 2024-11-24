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
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { useExcelData } from '../contexts/ExcelDataContext';
import CogsVsSalesChart from '../components/dashboard/CogsVsSalesChart';
import RevenueByChannelChart from '../components/dashboard/RevenueByChannelChart';
import DailyCogsInsightsChart from '../components/dashboard/DailyCogsInsightsChart';
import SuppliersMapChart from '../components/dashboard/SuppliersMapChart';

const getSummaryData = ({cogs_sales_monthly, cogs_sales_weekly}, isMonthly=true) => {
  console.log('lelo cogs_sales_weekly', cogs_sales_weekly);
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

const SummaryCard = ({ title, value, change, prefix = '', comparisonPeriod}) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div">
        {prefix}{value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        {change.startsWith('+') ? (
          <TrendingUp color="success" fontSize="small" />
        ) : (
          <TrendingDown color="error" fontSize="small" />
        )}
        <Typography 
          variant="body2" 
          color={change.startsWith('+') ? 'success.main' : 'error.main'}
          sx={{ ml: 0.5 }}
        >
          {change} from {comparisonPeriod}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState('Monthly');
  const { excelData } = useExcelData();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
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
    // console.log('excelData', excelData);
    const summmaryData = getSummaryData(excelData, duration === 'Monthly');
    console.log('lelo summmaryData', summmaryData);

    // Process your Excel data here to match the dashboard requirements
    setDashboardData({
      dailySummary: summmaryData.dailySummary,
      topProducts: [
        { id: '01', name: 'Home Decor Range', popularity: 45, sales: '45%' },
        { id: '02', name: 'Disney Princess Pink Bag 18"', popularity: 35, sales: '29%' },
        // ... more data
      ]
    });
  };



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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Dashboard</Typography>
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

        <Grid container>
          {/* Daily Summary */}
          <Grid container  sx={{ mb: 3, mt: 0, pr: 3 }} md={6}>
            <Card sx={{width: '100%'}}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4} >
                    <SummaryCard
                      title="Gross Profit Margin"
                      value={`${dashboardData.dailySummary.grossProfitMargin}%`}
                      change={dashboardData.dailySummary.changes.grossProfit}
                      comparisonPeriod={duration === 'Weekly' ? 'last week' : 'last month'}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <SummaryCard
                      title="Total Sales"
                      value={dashboardData.dailySummary.totalSales}
                      change={dashboardData.dailySummary.changes.sales}
                      prefix="£"
                      comparisonPeriod={duration === 'Weekly' ? 'last week' : 'last month'}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <SummaryCard
                      title="Total COGS"
                      value={dashboardData.dailySummary.totalCOGS}
                      change={dashboardData.dailySummary.changes.cogs}
                      prefix="£"
                      comparisonPeriod={duration === 'Weekly' ? 'last week' : 'last month'}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid container md={6}>
            <CogsVsSalesChart data={excelData.cogs_sales_monthly} />
          </Grid>
        </Grid>

        
        <RevenueByChannelChart data={excelData.cogs_sales_monthly} />
        <DailyCogsInsightsChart data={excelData.cogs_sales_weekly} />
        <SuppliersMapChart suppliersData={excelData.suppliers} />

        {/* COGS vs Sales Chart */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                COGS vs Sales
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData.cogsVsSales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cogs" fill="#82ca9d" name="COGS" />
                  <Bar dataKey="sales" fill="#ffc658" name="Sales" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* Top Products Table */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Top Products
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Popularity</TableCell>
                      <TableCell>Sales</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData.topProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LinearProgress
                              variant="determinate"
                              value={product.popularity}
                              sx={{ flexGrow: 1, mr: 1 }}
                            />
                            <Typography variant="body2">
                              {product.popularity}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{product.sales}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default DashboardPage; 