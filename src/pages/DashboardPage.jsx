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
  LinearProgress
} from '@mui/material';
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


function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { excelData } = useExcelData();

  useEffect(() => {
    // Fetch data from localStorage or your state management solution
    const storedData = localStorage.getItem('excelData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      processData(parsedData);
    }
    setLoading(false);
  }, []);

  const processData = (data) => {
    console.log(excelData);
    // Process your Excel data here to match the dashboard requirements
    setDashboardData({
      dailySummary: {
        grossProfitMargin: 48.7,
        totalSales: 18752.41,
        totalCOGS: 9197.52,
        changes: {
          grossProfit: '+8%',
          sales: '+5%',
          cogs: '+2.5%'
        }
      },
      cogsVsSales: [
        { month: 'Jan', cogs: 8000, sales: 12000 },
        { month: 'Feb', cogs: 9000, sales: 14000 },
        // ... more data
      ],
      revenueByChannel: [
        { month: 'Jan', online: 12000, offline: 10000 },
        { month: 'Feb', online: 15000, offline: 11000 },
        // ... more data
      ],
      topProducts: [
        { id: '01', name: 'Home Decor Range', popularity: 45, sales: '45%' },
        { id: '02', name: 'Disney Princess Pink Bag 18"', popularity: 35, sales: '29%' },
        // ... more data
      ]
    });
  };

  const SummaryCard = ({ title, value, change, prefix = '' }) => (
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
            {change} from yesterday
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

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
        <Typography variant="h4" sx={{ mb: 3 }}>Dashboard</Typography>

        {/* Daily Summary */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <SummaryCard
              title="Gross Profit Margin"
              value={`${dashboardData.dailySummary.grossProfitMargin}%`}
              change={dashboardData.dailySummary.changes.grossProfit}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              title="Total Sales"
              value={dashboardData.dailySummary.totalSales}
              change={dashboardData.dailySummary.changes.sales}
              prefix="£"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              title="Total COGS"
              value={dashboardData.dailySummary.totalCOGS}
              change={dashboardData.dailySummary.changes.cogs}
              prefix="£"
            />
          </Grid>
        </Grid>

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

          {/* Daily COGS Insights */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Daily COGS Insights
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Ingredients', value: 45 },
                      { name: 'Labour', value: 45 },
                      { name: 'Other', value: 10 }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#82ca9d"
                    dataKey="value"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Revenue by Channel */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Revenue by Channel
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData.revenueByChannel}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="online" fill="#8884d8" name="Online Sales" />
                  <Bar dataKey="offline" fill="#82ca9d" name="Offline Sales" />
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