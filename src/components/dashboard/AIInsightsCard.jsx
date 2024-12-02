import React, { Component } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Skeleton 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AutoAwesome, ChatBubbleOutline } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { useExcelData } from '../../contexts/ExcelDataContext';
import { generateInsights, generateProductInsights } from '../../utils/apiUtils';

// Since we can't use hooks in class components, we need a HOC wrapper
const withNavigation = (Component) => {
  return props => {
    const navigate = useNavigate();
    const { excelData } = useExcelData();
    return <Component {...props} navigate={navigate} excelData={excelData} />;
  }
}

class AIInsightsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      insights: ''
    };
  }

  async componentDidMount() {
    this.fetchInsights(this.props.selectedProduct);
  }

  async shouldComponentUpdate(newProps) {
    if (newProps.selectedProduct !== this.props.selectedProduct) {
      this.fetchInsights(newProps.selectedProduct);
    }
  }

  fetchInsights = async (selectedProduct) => {
    if(this.props.isProduct) {
      if(!selectedProduct) return;
    }

    this.setState({ loading: true });
    if (this.props.excelData?.cogs_sales_monthly && !this.props.isProduct) {
      const insights = await generateInsights(this.props.excelData);
      this.setState({ insights });
    } else if (this.props.excelData?.cogs_sales && this.props.isProduct) {
      const insights = await generateProductInsights(this.props.excelData, selectedProduct);
      this.setState({ insights });
    }
    
    this.setState({ loading: false });
  };

  render() {
    const { loading, insights } = this.state;
    const { navigate, isProduct } = this.props;

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
              <Typography variant="h6">Pesto AI Insights</Typography>
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

          {!isProduct && <Button
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
            Chat with Pesto AI
          </Button>}
        </CardContent>
      </Card>
    );
  }
}

// Export the wrapped component
export default withNavigation(AIInsightsCard); 