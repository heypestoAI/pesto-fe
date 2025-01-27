import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { styles } from "./styles";

interface DistributionCostsProps {
  distribution: {
    mode: string;
    costPerDelivery: number;
    zone: string;
    additionalFees: number;
  };
  onChange: (field: string, value: string | number) => void;
}

export const DistributionCosts = ({
  distribution,
  onChange,
}: DistributionCostsProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth sx={styles.formControl}>
          <InputLabel>Distribution Mode</InputLabel>
          <Select
            value={distribution.mode}
            label="Distribution Mode"
            onChange={(e) => onChange("mode", e.target.value)}
            sx={styles.input}
          >
            <MenuItem value="courier">Courier Service</MenuItem>
            <MenuItem value="self">Self-Delivery</MenuItem>
            <MenuItem value="thirdParty">Third-Party Logistics</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Cost per Delivery"
          type="number"
          sx={styles.input}
          value={distribution.costPerDelivery}
          onChange={(e) => onChange("costPerDelivery", Number(e.target.value))}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Zone/Region"
          sx={styles.input}
          value={distribution.zone}
          onChange={(e) => onChange("zone", e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Additional Fees"
          type="number"
          sx={styles.input}
          value={distribution.additionalFees}
          onChange={(e) => onChange("additionalFees", Number(e.target.value))}
        />
      </Grid>
    </Grid>
  );
};
