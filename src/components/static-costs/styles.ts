export const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    minHeight: "100vh",
    padding: "24px",
  },
  paper: {
    padding: "32px",
    background: "#1A1F2C",
    border: "1px solid rgba(250, 247, 226, 0.1)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "700px",
    color: "#FAF7E2",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    marginBottom: "24px",
    textAlign: "center",
    color: "#FAF7E2",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#FAF7E2",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#FDE891",
    opacity: 0.9,
  },
  mainContent: {
    display: "flex",
    gap: "2rem",
    flexDirection: { xs: "column", md: "row" },
  },
  sections: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  accordion: {
    backgroundColor: "rgba(42, 118, 95, 0.9)",
    color: "#FAF7E2",
    borderRadius: "8px",
    border: "1px solid rgba(250, 247, 226, 0.1)",
    "&:before": {
      display: "none",
    },
  },
  accordionSummary: {
    borderBottom: "1px solid rgba(250, 247, 226, 0.1)",
    "& .MuiAccordionSummary-content": {
      fontWeight: "600",
      fontSize: "1rem",
      color: "#FAF7E2",
    },
  },
  formControl: {
    width: "100%",
    marginBottom: "16px",
    "& .MuiInputBase-root": {
      backgroundColor: "rgba(42, 118, 95, 0.9)",
      color: "#FAF7E2",
      borderRadius: "8px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(250, 247, 226, 0.3)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(250, 247, 226, 0.5)",
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
      "& .MuiSelect-icon": {
        color: "#FDE891",
      },
    },
  },
  input: {
    "& .MuiOutlinedInput-root": {
      color: "#FAF7E2",
      backgroundColor: "rgba(42, 118, 95, 0.9)",
      borderRadius: "8px",
      "& fieldset": {
        borderColor: "rgba(250, 247, 226, 0.3)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(250, 247, 226, 0.5)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FDE891",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#FDE891",
    },
  },
  button: {
    backgroundColor: "#2A765F",
    color: "#FAF7E2",
    borderRadius: "8px",
    marginRight: "1rem",
    cursor: "pointer",
    marginTop: "16px",
    "&:hover": {
      backgroundColor: "#1a4d3d",
    },
  },
};
