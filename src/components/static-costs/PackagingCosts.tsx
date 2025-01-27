import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { styles } from "./styles";

interface PackagingCostsProps {
  packaging: {
    type: string;
    costPerUnit: number;
    quantity: number;
  };
  onChange: (field: string, value: string | number) => void;
}

export const PackagingCosts = ({
  packaging,
  onChange,
}: PackagingCostsProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth sx={styles.formControl}>
          <InputLabel>Packaging Type</InputLabel>
          <Select
            value={packaging.type}
            label="Packaging Type"
            onChange={(e) => onChange("type", e.target.value)}
            sx={styles.input}
          >
            <MenuItem value="glass">Glass Jars</MenuItem>
            <MenuItem value="plastic">Plastic Containers</MenuItem>
            <MenuItem value="cardboard">Cardboard Boxes</MenuItem>
            <MenuItem value="metal">Metal Tins</MenuItem>
            <MenuItem value="paper">Paper Bags</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Cost per Unit"
          type="number"
          sx={styles.input}
          value={packaging.costPerUnit}
          onChange={(e) => onChange("costPerUnit", Number(e.target.value))}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Quantity"
          type="number"
          sx={styles.input}
          value={packaging.quantity}
          onChange={(e) => onChange("quantity", Number(e.target.value))}
        />
      </Grid>
    </Grid>
  );
};
