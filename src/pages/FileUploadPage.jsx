import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  CircularProgress,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip
} from '@mui/material';
import { 
  CloudUpload, 
  InsertDriveFile, 
  Delete, 
  CheckCircle, 
  Error 
} from '@mui/icons-material';
import * as XLSX from 'xlsx';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useExcelData } from '../contexts/ExcelDataContext';
import { saveAs } from 'file-saver';
import { processRecipeData, processIngredientData } from '../utils/dataProcessing';
import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';

const saveJsonToFile = (data, sheetName) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    saveAs(blob, `${sheetName}_data.json`);
    console.log(`${sheetName}_data.json saved`);
  };

// Function to check if a value is an Excel date
function isExcelDate(value) {
    return value && typeof value === 'number' && !isNaN(value) && 
           value >= 1 && value < 2958466; // Upper limit to avoid treating large numbers as dates
}

const validateExcelFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          if (workbook.SheetNames.length !== 6) {
            reject(new Error('Excel file must contain exactly four sheets'));
            return;
          }

          const allData = {};
        
        workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            const dateColumns = ['Date']; // Replace with your date column names
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                raw: true,  // Keep original data types for non-date fields
                transform: function(value, name) {
                    // Only transform if it's a date field
                    if (dateColumns.includes(name)) {
                        return new Date(Math.round((value - 25569) * 86400 * 1000));
                    }
                    return value;  // Return original value for non-date fields
                }});
            if (sheetName === 'Recipes') {
              allData[sheetName] = processRecipeData(jsonData);
              console.log(processRecipeData(jsonData));
            } else if (sheetName === 'Ingredients') {
              allData[sheetName] = processIngredientData(jsonData);
            }
            else {
                allData[sheetName] = jsonData;
            }
        });
          
          resolve(allData);
        } catch (error) {
          reject(new Error('Error processing file'));
        }
      };
      
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsArrayBuffer(file);
    });
  };

function FileUploadPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDashboardEnabled, setIsDashboardEnabled] = useState(false);
  const { updateExcelData } = useExcelData();
  const gotoDashboardRef = useRef(null);


  const handleFile = async (file) => {
    if (!file) return;

    const fileType = file.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'csv'].includes(fileType)) {
      setError('Please upload only Excel (.xlsx) or CSV (.csv) files');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      if (fileType === 'xlsx') {
        const excelData = await validateExcelFile(file);
        updateExcelData(excelData);
        console.log('gotoDashboardRef is ', gotoDashboardRef.current);
        requestAnimationFrame(() => {
            setTimeout(() => {
                gotoDashboardRef.current?.focus();
            }, 500);
        });
      }
      
      // Add file to uploaded files list with validation status
      setUploadedFiles(prev => [...prev, {
        name: file.name,
        type: fileType,
        size: file.size,
        status: 'valid',
        timestamp: new Date().toISOString()
      }]);

      setSuccess('File uploaded successfully!');
      setIsDashboardEnabled(true);
    } catch (err) {
      setUploadedFiles(prev => [...prev, {
        name: file.name,
        type: fileType,
        size: file.size,
        status: 'invalid',
        error: err.message,
        timestamp: new Date().toISOString()
      }]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      setIsDashboardEnabled(newFiles.some(file => file.status === 'valid'));
      return newFiles;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(handleFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(handleFile);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Welcome to Pesto!
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Get started by uploading your data.
        </Typography>

        <Paper
          sx={{
            mt: 4,
            p: 4,
            textAlign: 'center',
            backgroundColor: '#fff'
          }}
        >
          <Box
            sx={{
              border: '2px dashed',
              borderColor: dragActive ? 'primary.main' : '#e0e0e0',
              borderRadius: 2,
              p: 6,
              backgroundColor: dragActive ? 'rgba(0, 181, 23, 0.04)' : '#f8f9fa',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => document.getElementById('file-upload').click()}
          >
            <input
              type="file"
              id="file-upload"
              accept=".xlsx,.csv"
              onChange={handleFileInput}
              style={{ display: 'none' }}
              multiple
            />
            
            <CloudUpload 
              sx={{ 
                fontSize: 48, 
                color: dragActive ? 'primary.main' : '#757575',
                mb: 2 
              }} 
            />
            
            <Typography variant="h6" gutterBottom>
              Drag & drop files or browse
            </Typography>
            
            <Typography variant="body2" color="textSecondary">
              Supported formats: (XLSX, CSV, XLS, PDF, TXT, AI, Word, PPT)
            </Typography>
          </Box>

          {uploadedFiles.length > 0 && (
            <List sx={{ mt: 3, textAlign: 'left' }}>
              {uploadedFiles.map((file, index) => (
                <ListItem
                  key={`${file.name}-${file.timestamp}`}
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    mb: 1,
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    secondary={formatFileSize(file.size)}
                  />
                  <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      icon={file.status === 'valid' ? <CheckCircle /> : <Error />}
                      label={file.status === 'valid' ? 'Valid' : 'Invalid'}
                      color={file.status === 'valid' ? 'success' : 'error'}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <IconButton 
                      edge="end" 
                      onClick={() => handleRemoveFile(index)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => document.getElementById('file-upload').click()}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'UPLOAD FILES'}
          </Button>

          <Button
            variant="contained"
            ref={gotoDashboardRef}
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isDashboardEnabled}
            onClick={() => navigate('/dashboard')}
          >
            GO TO DASHBOARD
          </Button>

          <Typography 
            variant="body2" 
            color="primary" 
            sx={{ 
              mt: 2, 
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Download Sample Template for the data here
          </Typography>
        </Paper>

        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={() => setError('')}
        >
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        </Snackbar>

        <Snackbar 
          open={!!success} 
          autoHideDuration={6000} 
          onClose={() => setSuccess('')}
        >
          <Alert severity="success" onClose={() => setSuccess('')}>
            {success}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
}

export default FileUploadPage; 