import {
  Grid,
  Autocomplete,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { styles } from "./styles";
import { Product } from "../../types/static-costs";

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product | null;
  productSize: number;
  productUnit: string;
  onProductChange: (product: Product | null) => void;
  onSizeChange: (size: number) => void;
  onUnitChange: (unit: string) => void;
}

export const ProductSelector = ({
  products,
  selectedProduct,
  productSize,
  productUnit,
  onProductChange,
  onSizeChange,
  onUnitChange,
}: ProductSelectorProps) => {
  return (
    <Grid container spacing={2} sx={{ marginBottom: 3 }}>
      <Grid item xs={12} md={6}>
        <Autocomplete
          options={products.sort(
            (a, b) => (b.frequency || 0) - (a.frequency || 0)
          )}
          getOptionLabel={(option) => option.name}
          sx={styles.input}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Product"
              placeholder="Search for a product..."
            />
          )}
          value={selectedProduct}
          onChange={(_event, newValue) => onProductChange(newValue)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          type="number"
          label="Size"
          value={productSize}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          sx={styles.input}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl fullWidth sx={styles.formControl}>
          <InputLabel>Unit</InputLabel>
          <Select
            value={productUnit}
            label="Unit"
            onChange={(e) => onUnitChange(e.target.value)}
            sx={styles.input}
          >
            <MenuItem value="units">Units</MenuItem>
            <MenuItem value="kg">Kilograms</MenuItem>
            <MenuItem value="l">Litres</MenuItem>
            <MenuItem value="g">Grams</MenuItem>
            <MenuItem value="ml">Millilitres</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
