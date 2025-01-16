import { Card, Typography, Button, IconButton, Paper } from "@mui/material";
// import { Upload } from "lucide-react";
import { Upload } from "@mui/icons-material";
import { useState } from "react";

const styles = {
  paper: {
    padding: "32px",
    background: "rgba(250, 247, 226, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(250, 247, 226, 0.1)",
    borderRadius: "12px",
    textAlign: "center",
  },
  dragActive: {
    border: "2px solid #2A765F",
  },
  icon: {
    width: "48px",
    height: "48px",
    margin: "0 auto 16px",
    color: "#2A765F",
  },
  title: {
    color: "#FAF7E2",
    marginBottom: "8px",
  },
  description: {
    color: "#FDE891",
    marginBottom: "16px",
    opacity: 0.8,
  },
  button: {
    backgroundColor: "#2A765F",
    color: "#FAF7E2",
    "&:hover": {
      backgroundColor: "#1a4d3d",
    },
  },
  input: {
    display: "none",
  },
};

export const FileUpload = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/jpeg",
      "image/jpg",
    ];
    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      //   toast({
      //     title: "Invalid file type",
      //     description: "Please upload only PDF, Excel, or JPG files.",
      //     variant: "destructive",
      //   });
      return;
    }

    // toast({
    //   title: "Files received",
    //   description: `${files.length} file(s) ready for processing.`,
    // });
  };

  return (
    <Paper
      sx={{ ...styles.paper, ...(isDragging && styles.dragActive) }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload style={styles.icon} />
      <Typography variant="h5" sx={styles.title}>
        Upload Files
      </Typography>
      <Typography variant="body1" sx={styles.description}>
        Drag and drop your PDF, Excel, or JPG files here, or click to browse
      </Typography>
      <input
        type="file"
        id="file-upload"
        style={styles.input}
        multiple
        accept=".pdf,.xls,.xlsx,.jpg,.jpeg"
        onChange={handleFileInput}
      />
      <label htmlFor="file-upload">
        <Button component="span" variant="contained" sx={styles.button}>
          Browse Files
        </Button>
      </label>
    </Paper>
  );
};
