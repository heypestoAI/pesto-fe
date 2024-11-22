import { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Load data from localStorage (in a real app, this would come from an API)
    const storedData = localStorage.getItem('excelData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const ChartCard = ({ title, children }) => (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children}
    </Paper>
  );

  if (!data) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>No data available. Please upload an Excel file first.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>lkjjlkwjdlk
      <Grid item xs={12} md={6}>
        <ChartCard title="Sales Overview">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data['Sheet1'] || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      <Grid item xs={12} md={6}>
        <ChartCard title="Revenue by Category">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data['Sheet2'] || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>
    </Grid>
  );
}

export default Dashboard; 