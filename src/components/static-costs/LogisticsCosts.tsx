import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { styles } from "./styles";

interface LogisticsCostsProps {
  logistics: {
    mode: string;
    distance: number;
    transportCost: number;
    handlingFees: number;
  };
  onChange: (field: string, value: string | number) => void;
}

export const LogisticsCosts = ({
  logistics,
  onChange,
}: LogisticsCostsProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth sx={styles.formControl}>
          <InputLabel>Transport Mode</InputLabel>
          <Select
            value={logistics.mode}
            label="Transport Mode"
            onChange={(e) => onChange("mode", e.target.value)}
            sx={styles.input}
          >
            <MenuItem value="road">Road Transport</MenuItem>
            <MenuItem value="rail">Rail Transport</MenuItem>
            <MenuItem value="air">Air Freight</MenuItem>
            <MenuItem value="sea">Sea Freight</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Distance (km)"
          type="number"
          sx={styles.input}
          value={logistics.distance}
          onChange={(e) => onChange("distance", Number(e.target.value))}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Transport Cost"
          type="number"
          sx={styles.input}
          value={logistics.transportCost}
          onChange={(e) => onChange("transportCost", Number(e.target.value))}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Handling Fees"
          type="number"
          sx={styles.input}
          value={logistics.handlingFees}
          onChange={(e) => onChange("handlingFees", Number(e.target.value))}
        />
      </Grid>
    </Grid>
  );
};
