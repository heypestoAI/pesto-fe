import { useState, useEffect } from 'react';
import { Box, Card, Typography, Select, MenuItem } from '@mui/material';
//import { DailyCogsInsightsChart } from '../components/Dashboard/DailyCogsInsightsChart';
import { IngredientsChart } from '../components/Products/IngredientsChart';
import { GrossProfitChart } from '../components/Products/GrossProfitChart';
import Layout from '../components/layout/Layout';
import { getLatestProductData } from '../utils/getLatestProductData';
import { useExcelData } from '../contexts/ExcelDataContext';
import { CogsInsightsChart } from '../components/Products/CogsInsightsChart';



const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const {excelData} = useExcelData();
  const latestProducts = getLatestProductData(excelData.cogs_sales);

  const products = [...new Set(latestProducts.map(item => item.Product))];
  const [productData, setProductData] = useState(null);

  const handleProductChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedProduct(selectedValue);
    
    // Find the data for the selected product
    const selectedProductData = latestProducts.find(
      product => product.Product === selectedValue
    );
    
    // Update product data state with the found data
    setProductData(selectedProductData);
  };

  // Optional: Set initial product and data when component mounts
  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      const initialProduct = products[0];
      setSelectedProduct(initialProduct);
      const initialProductData = latestProducts.find(
        product => product.Product === initialProduct
      );
      setProductData(initialProductData);
    }
  }, [products, latestProducts]);

  return (
    <Layout>
    <Box sx={{ p: 3 }}>
      {/* Product Selection Header */}
      <Card sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">{selectedProduct || 'Select a Product'}</Typography>
        <Select
          value={selectedProduct}
          onChange={handleProductChange}
          sx={{ minWidth: 200 }}
          displayEmpty
        >
          <MenuItem value="" disabled>Select Product</MenuItem>
          {products.map((product) => (
            <MenuItem key={product} value={product}>
              {product}
            </MenuItem>
          ))}
        </Select>
      </Card>

      {/* Metrics Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mb: 3 }}>
        <Card sx={{ p: 2 }}>
          <Typography variant="subtitle1" color="textSecondary">Revenue</Typography>
          <Typography variant="h4">
            £{productData ? productData["Sales - Value"].toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }) : '0.00'}
          </Typography>
        </Card>
        <Card sx={{ p: 2 }}>
          <Typography variant="subtitle1" color="textSecondary">Overall COGS</Typography>
          <Typography variant="h4">
            £{productData ? productData["Costs - Value"].toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }) : '0.00'}
          </Typography>
        </Card>
        <Card sx={{ p: 2 }}>
          <Typography variant="subtitle1" color="textSecondary">AI Recommendation</Typography>
          <Typography variant="body1">Decrease Spinach by 2% to have 10% increase in GPM</Typography>
        </Card>
      </Box>

      {/* Charts Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>COGS Insights</Typography>
          <CogsInsightsChart productData={productData} />
        </Card>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>Ingredients Mix</Typography>
          <IngredientsChart 
            recipesData={excelData.recipes}
            selectedProduct={selectedProduct}
          />
        </Card>
        <Card sx={{ gridColumn: 'span 2', p: 2 }}>
          <Typography variant="h6" mb={2}>Gross Profit</Typography>
          <GrossProfitChart 
            cogsData={excelData.cogs_sales}
            selectedProduct={selectedProduct}
          />
        </Card>
      </Box>
    </Box>
    </Layout>
  );
};

export default Products; 