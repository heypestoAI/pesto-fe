import { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { Mail } from "@mui/icons-material";

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
    marginBottom: "16px",
    color: "#FAF7E2",
  },
  description: {
    color: "#FDE891",
    marginBottom: "16px",
    opacity: 0.8,
  },
  textarea: {
    marginBottom: "16px",
    "& .MuiOutlinedInput-root": {
      color: "#FAF7E2",
      "& fieldset": {
        borderColor: "rgba(250, 247, 226, 0.2)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(250, 247, 226, 0.3)",
      },
    },
  },
  button: {
    backgroundColor: "#2A765F",
    color: "#FAF7E2",
    "&:hover": {
      backgroundColor: "#1a4d3d",
    },
  },
};

export const EmailParser = () => {
  const [email, setEmail] = useState<string>("");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setSnackbar({
        open: true,
        message: "Please paste an email content to parse.",
        severity: "error",
      });
      return;
    }

    console.log("Email Content:", email);

    setSnackbar({
      open: true,
      message: "Email received. Processing email content...",
      severity: "success",
    });

    // clear the textarea after submission
    setEmail("");
  };

  return (
    <Paper sx={styles.paper}>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={styles.header}>
          <Mail />
          <Typography variant="h5">Parse Email Content</Typography>
        </Box>

        <Typography variant="body1" sx={styles.description}>
          Paste the email content containing ingredient details below
        </Typography>

        <TextField
          multiline
          rows={8}
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Paste email content here..."
          sx={styles.textarea}
        />

        <Button type="submit" variant="contained" fullWidth sx={styles.button}>
          Parse Email
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
