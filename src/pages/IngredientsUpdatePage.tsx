import { Container, Typography, Box } from "@mui/material";
import { useState } from "react";

// import { EmailParser } from "@/components/EmailParser";

import { InputMethod } from "../types/ingredient";
import { FileUpload } from "../components/ingredients/FileUpload";
import { IngredientForm } from "../components/ingredients/IngredientForm";
import { InputMethodToggle } from "../components/ingredients/InputMethodToggle";
import { EmailParser } from "../components/ingredients/EmailParser";

const styles = {
  root: {
    minHeight: "100vh",
    padding: "24px",
    background: "linear-gradient(145deg, #2A765F 0%, #1a4d3d 100%)",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    color: "#FAF7E2",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#FDE891",
    marginBottom: "32px",
    opacity: 0.9,
  },
};

const IngredientsUpdatePage = () => {
  const [inputMethod, setInputMethod] = useState<InputMethod>("form");

  const renderInputMethod = () => {
    switch (inputMethod) {
      case "file":
        return <FileUpload />;
      case "email":
        return <EmailParser />;
      case "form":
        return <IngredientForm />;
      default:
        return null;
    }
  };

  return (
    <Box sx={styles.root}>
      <Container sx={{ paddingTop: 4, paddingBottom: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#FAF7E2",
            marginBottom: 2,
          }}
        >
          Ingredient Management
        </Typography>
        <Typography variant="subtitle1" sx={styles.subtitle}>
          Add and manage your ingredients and supplier information
        </Typography>

        <InputMethodToggle selected={inputMethod} onSelect={setInputMethod} />
        <Box sx={{ marginTop: 4 }}>{renderInputMethod()}</Box>
      </Container>
    </Box>
  );
};

export default IngredientsUpdatePage;
