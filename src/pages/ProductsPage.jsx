import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Layout from '../components/layout/Layout';

function ProductsPage() {
  const [products] = useState([
    // Your products data here
  ]);

  return (
    <Layout>
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>Products</Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  placeholder="Search products..."
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                />
                <Button 
                  variant="contained" 
                  sx={{ ml: 2 }}
                >
                  Add New Product
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Stock</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.status}</TableCell>
                        <TableCell>
                          {/* Add action buttons here */}
                        </TableCell>
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

export default ProductsPage; 