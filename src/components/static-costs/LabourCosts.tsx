import { Grid, TextField, FormControl } from "@mui/material";
import { styles } from "./styles";

interface LabourCostsProps {
  labour: {
    type: string;
    hourlyRate: number;
    hoursWorked: number;
  };
  onChange: (field: string, value: string | number) => void;
}

export const LabourCosts = ({ labour, onChange }: LabourCostsProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Labour Type"
          sx={styles.input}
          value={labour.type}
          onChange={(e) => onChange("type", e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Hourly Rate"
          type="number"
          sx={styles.input}
          value={labour.hourlyRate}
          onChange={(e) => onChange("hourlyRate", Number(e.target.value))}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Hours Worked"
          type="number"
          sx={styles.input}
          value={labour.hoursWorked}
          onChange={(e) => onChange("hoursWorked", Number(e.target.value))}
        />
      </Grid>
    </Grid>
  );
};
