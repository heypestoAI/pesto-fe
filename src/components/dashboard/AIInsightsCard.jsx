import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Skeleton 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AutoAwesome
  , ChatBubbleOutline } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { useExcelData } from '../../contexts/ExcelDataContext';
import { generateInsights } from '../../utils/apiUtils';

const AIInsightsCard = () => {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState('');
  const navigate = useNavigate();
  const { excelData } = useExcelData();

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      if (excelData?.cogs_sales_monthly) {
        const insights = await generateInsights(excelData.cogs_sales_monthly);
        setInsights(insights);
      }
      setLoading(false);
    };

    fetchInsights();
  }, [excelData]);

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex',
      flexDirection: 'column'
    }}>
      <CardContent sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 3
      }}>
        <Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3,
            gap: 1
          }}>
            <AutoAwesome sx={{ color: '#2e7d32' }} />
            <Typography variant="h6">AI Insights</Typography>
          </Box>
          
          {loading ? (
            <Box sx={{ mb: 2 }}>
              <Skeleton 
                variant="rectangular" 
                height={120}
                sx={{
                  background: 'linear-gradient(90deg, #e0f2e9 0%, #ccede0 50%, #e0f2e9 100%)',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  borderRadius: 1
                }}
              />
            </Box>
          ) : (
            <Box sx={{ mb: 3 }}>
              <ReactMarkdown
                components={{
                  p: ({node, ...props}) => <Typography {...props} sx={{ mb: 1 }} />,
                  li: ({node, ...props}) => (
                    <Typography 
                      component="li" 
                      sx={{ 
                        mb: 1,
                      }} 
                      {...props} 
                    />
                  )
                }}
              >
                {insights}
              </ReactMarkdown>
            </Box>
          )}
        </Box>

        <Button
          variant="outlined"
          color="success"
          startIcon={<ChatBubbleOutline />}
          onClick={() => navigate('/chat')}
          sx={{ 
            alignSelf: 'flex-start',
            borderRadius: 2,
            textTransform: 'none',
            px: 2,
            mt: 'auto'
          }}
        >
          Ask AI Assistant
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIInsightsCard; 