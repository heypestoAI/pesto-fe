import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Typography 
} from '@mui/material';
import { Send } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { useExcelData } from '../../contexts/ExcelDataContext';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { excelData } = useExcelData();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      text: newMessage,
      user: 'User',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setLoading(true);

    try {
      const contextData = excelData ? {
        monthly_data: excelData.cogs_sales_monthly,
        weekly_data: excelData.cogs_sales_weekly,
      } : {};

      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: newMessage,
          context: contextData
        })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        text: data.message,
        user: 'AI Assistant',
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        text: 'Sorry, I encountered an error. Please try again.',
        user: 'AI Assistant',
        timestamp: new Date().toISOString()
      }]);
    }
    setLoading(false);
  };

  return (
    <Paper sx={{ 
      height: 'calc(100vh - 100px)', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: '#f8f9fa'
    }}>
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">AI Assistant</Typography>
      </Box>

      <List sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
        {messages.map((message, index) => (
          <ListItem 
            key={index}
            sx={{
              flexDirection: 'column',
              alignItems: message.user === 'User' ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ mb: 0.5, color: 'text.secondary' }}
            >
              {message.user}
            </Typography>
            <Paper 
              sx={{
                p: 2,
                maxWidth: '80%',
                bgcolor: message.user === 'User' ? '#e3f2fd' : '#fff',
                borderRadius: 2
              }}
            >
              <ReactMarkdown>
                {message.text}
              </ReactMarkdown>
            </Paper>
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>

      <Box
        component="form"
        onSubmit={handleSend}
        sx={{
          p: 3,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          gap: 2,
          bgcolor: '#fff'
        }}
      >
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ask about your COGS and sales data..."
          variant="outlined"
          size="small"
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<Send />}
          disabled={!newMessage.trim() || loading}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
}

export default Chat; 