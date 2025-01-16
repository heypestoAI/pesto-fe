import {
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { InputMethod } from "../../types/ingredient";
import { FileCopy, Mail, Input } from "@mui/icons-material";

interface InputMethodToggleProps {
  selected: InputMethod;
  onSelect: (method: InputMethod) => void;
}

const styles = {
  button: {
    gap: "8px",
    color: "#FAF7E2",
    borderColor: "#FAF7E2",
    "&.Mui-selected": {
      backgroundColor: "#2A765F",
      color: "#FDE891",
    },
    "&:hover": {
      backgroundColor: "rgba(42, 118, 95, 0.1)",
    },
  },
};

export const InputMethodToggle = ({
  selected,
  onSelect,
}: InputMethodToggleProps) => {
  const methods = [
    { value: "file", icon: <FileCopy />, label: "Upload Files" },
    { value: "email", icon: <Mail />, label: "Parse Email" },
    { value: "form", icon: <Input />, label: "Direct Entry" },
  ];

  return (
    <ButtonGroup variant="outlined" sx={{ marginBottom: "24px" }}>
      {methods.map(({ value, icon, label }) => (
        <Button
          key={value}
          sx={styles.button}
          onClick={() => onSelect(value as InputMethod)}
          variant={selected === value ? "contained" : "outlined"}
        >
          {icon}
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
