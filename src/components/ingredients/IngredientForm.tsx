import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { Ingredient, IngredientType } from "../../types/ingredient";
import { Input } from "@mui/icons-material";

const styles = {
  paper: {
    padding: "32px",
    background: "rgba(250, 247, 226, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(250, 247, 226, 0.1)",
    borderRadius: "12px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
    color: "#FAF7E2",
  },
  formControl: {
    width: "100%",
    marginBottom: "16px",
    backgroundColor: "rgba(250, 247, 226, 0.1)",
    borderRadius: "8px",
    "& .MuiInputBase-root": {
      color: "#FDE891 !important",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(250, 247, 226, 0.2)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(250, 247, 226, 0.3)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FDE891",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#FDE891",
      "&.Mui-focused": {
        color: "#FAF7E2",
      },
    },
    "& .MuiSelect-icon": {
      color: "#FDE891", // Arrow icon color
    },
  },
  input: {
    "& .MuiOutlinedInput-root": {
      color: "#FAF7E2",
      "& fieldset": {
        borderColor: "rgba(250, 247, 226, 0.2)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(250, 247, 226, 0.3)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#FDE891",
    },
  },
  button: {
    backgroundColor: "#2A765F",
    color: "#FAF7E2",
    marginTop: "32px",
    "&:hover": {
      backgroundColor: "#1a4d3d",
    },
  },
};

export const IngredientForm = () => {
  const [ingredient, setIngredient] = useState<Partial<Ingredient>>({
    type: "raw",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredient.name || !ingredient.supplier) {
      // toast({
      //   title: "Error",
      //   description: "Please fill in all required fields.",
      //   variant: "destructive",
      // });
      return;
    }

    console.log("Form Data:", JSON.stringify(ingredient, null, 2));

    //   toast({
    //     title: "Success",
    //     description: "Ingredient data saved successfully.",
    //   });
  };

  const handleChange = (field: keyof Ingredient, value: string | number) => {
    setIngredient((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Paper sx={styles.paper}>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={styles.header}>
          <Input />
          <Typography variant="h5">Enter Ingredient Details</Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl sx={styles.formControl}>
              <TextField
                label="Ingredient Name*"
                value={ingredient.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                sx={styles.input}
                fullWidth
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl sx={styles.formControl}>
              <InputLabel id="type-label">Type*</InputLabel>
              <Select
                labelId="type-label"
                value={ingredient.type || ""}
                onChange={(e) =>
                  handleChange("type", e.target.value as IngredientType)
                }
                label="Type*"
                sx={styles.input}
              >
                <MenuItem value="raw">Raw Material</MenuItem>
                <MenuItem value="processed">Processed</MenuItem>
                <MenuItem value="packaging">Packaging</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl sx={styles.formControl}>
              <TextField
                label="Pack Size (kg/L)*"
                type="number"
                value={ingredient.packSize || ""}
                onChange={(e) =>
                  handleChange("packSize", parseFloat(e.target.value))
                }
                sx={styles.input}
                fullWidth
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl sx={styles.formControl}>
              <TextField
                label="Pack Cost (£)*"
                type="number"
                value={ingredient.packCost || ""}
                onChange={(e) =>
                  handleChange("packCost", parseFloat(e.target.value))
                }
                sx={styles.input}
                fullWidth
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl sx={styles.formControl}>
              <TextField
                label="Case Size*"
                type="number"
                value={ingredient.caseSize || ""}
                onChange={(e) =>
                  handleChange("caseSize", parseInt(e.target.value))
                }
                sx={styles.input}
                fullWidth
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl sx={styles.formControl}>
              <TextField
                label="Primary Supplier*"
                value={ingredient.supplier || ""}
                onChange={(e) => handleChange("supplier", e.target.value)}
                sx={styles.input}
                fullWidth
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl sx={styles.formControl}>
              <TextField
                label="Secondary Supplier"
                value={ingredient.secondarySupplier || ""}
                onChange={(e) =>
                  handleChange("secondarySupplier", e.target.value)
                }
                sx={styles.input}
                fullWidth
              />
            </FormControl>
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" fullWidth sx={styles.button}>
          Save Ingredient
        </Button>
      </Box>
    </Paper>
  );
};
