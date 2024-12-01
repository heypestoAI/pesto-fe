import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { Box, TextField, IconButton, Typography, Paper, Container, styled, Avatar, Chip, Stack } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Layout from "../components/layout/Layout";
import { generateResponse } from '../utils/apiUtils';
import { useExcelData } from '../contexts/ExcelDataContext';

const OPENAI_API_KEY = process.env;

const GREETING = "Hello! I'm your Pesto AI. I can help you analyze your performance data and answer any questions about your metrics. What would you like to know?"
const LOADING_MSG = "Pesto AI is thinking...";

const ChatContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#deeae4",
  borderRadius: "12px",
  overflow: "hidden"
}));

const MessageArea = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "20px",
  "&::-webkit-scrollbar": {
    width: "6px"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#4caf50",
    borderRadius: "3px"
  }
});

const MessageBubble = styled(Paper)(({ isUser }) => ({
  padding: "10px 15px",
  borderRadius: isUser ? "15px 15px 0 15px" : "15px 15px 15px 0",
  backgroundColor: isUser ? "#4caf50" : "#fff",
  color: isUser ? "#fff" : "#000",
  maxWidth: "70%",
  marginBottom: "10px",
  position: "relative",
  alignSelf: isUser ? "flex-end" : "flex-start",
  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  animation: "fadeIn 0.3s ease-in",
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" }
  },
  '& code': {
    backgroundColor: '#f0f0f0',
    padding: '2px 4px',
    borderRadius: '4px',
  },
  '& pre': {
    backgroundColor: '#f0f0f0',
    padding: '8px',
    borderRadius: '4px',
    overflowX: 'auto',
  }
}));

const InputArea = styled(Box)({
  padding: "15px",
  backgroundColor: "#fff",
  borderTop: "1px solid #e0e0e0",
  display: "flex",
  alignItems: "center",
  gap: "10px"
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#4caf50"
    },
    "&:hover fieldset": {
      borderColor: "#4caf50"
    }
  }
});

const TypingIndicator = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "5px 10px",
  color: "#666",
  fontSize: "0.875rem"
});

const PREDEFINED_PROMPTS = [
  "COGS vs Sales",
  "How can I increase my Gross Profit Margin?",
  "Online sales v/s offline sales?"
];

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: GREETING,
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
      status: "read"
    }
  ]);
  const { excelData } = useExcelData();
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef(null);
  const [customPrompt, setCustomPrompt] = useState(`You are an intelligent FMCG Analytics Assistant. You have access to Excel data containing performance metrics. Help users analyze their data and provide insights. Current Excel Data: ${JSON.stringify(excelData)}`);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageFromChip = "") => {
    if (newMessage.trim() || messageFromChip.trim()) {
      const userMsg = {
        id: messages.length + 1,
        text: newMessage || messageFromChip,
        isUser: true,
        timestamp: new Date().toLocaleTimeString(),
        status: "sent"
      };
      
      setMessages([...messages, userMsg]);
      setNewMessage("");
      setIsLoading(true);

      const assistantMsg = {
        id: messages.length + 2,
        text: "",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        status: "streaming"
      };
      setMessages(prev => [...prev, assistantMsg]);

      try {
        const stream = await generateResponse(newMessage || messageFromChip, excelData);
        let accumulatedText = "";
        
        for await (const chunk of stream) {
          accumulatedText += chunk;
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMsg.id 
              ? { ...msg, text: accumulatedText }
              : msg
          ));
        }

        setMessages(prev => prev.map(msg => 
          msg.id === assistantMsg.id 
            ? { ...msg, status: "sent" }
            : msg
        ));
      } catch (error) {
        console.error('Error:', error);
      }
      
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    setIsTyping(true);
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => setIsTyping(false), 1000);
  };

  const handleChipClick = (prompt) => {
    setNewMessage(prompt);
    handleSend(prompt);
  };

  return (
    <Layout>
    <Container maxWidth="md" sx={{height: '100%', }}>
      <ChatContainer>
        <MessageArea>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: message.isUser ? "flex-end" : "flex-start",
                mb: 2
              }}
            >
              <MessageBubble isUser={message.isUser}>
                <ReactMarkdown>{message.text}</ReactMarkdown>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: 0.5,
                    fontSize: "0.75rem",
                    opacity: 0.8
                  }}
                >
                  <Typography variant="caption">{message.timestamp}</Typography>
                </Box>
              </MessageBubble>
            </Box>
          ))}
          {(isLoading) && (
            <TypingIndicator>
              <MoreHorizIcon fontSize="large"></MoreHorizIcon>
              <Typography variant="caption">{LOADING_MSG}</Typography>
            </TypingIndicator>
          )}
          <div ref={messageEndRef} />
        </MessageArea>
        <InputArea sx={{position: 'relative', marginTop: '20px'}}>
          <IconButton
            aria-label="emoji"
            sx={{ color: "#4caf50" }}
          >
            <AttachFileIcon />
          </IconButton>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              p: 2, 
              overflowX: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              position: 'absolute',
              left: 0,
              bottom: '60px'
            }}
          >
            {PREDEFINED_PROMPTS.map((prompt, index) => (
              <Chip
                key={index}
                label={prompt}
                onClick={() => handleChipClick(prompt)}
                sx={{
                  backgroundColor: '#f0f0f0',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                  whiteSpace: 'nowrap'
                }}
              />
            ))}
          </Stack>
          <StyledTextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={newMessage}
            onChange={handleTyping}
            onKeyPress={handleKeyPress}
            size="small"
            aria-label="message input"
            disabled={isLoading}
          />
          <IconButton
            onClick={handleSend}
            aria-label="send message"
            sx={{
              backgroundColor: "#4caf50",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#45a049"
              }
            }}
            disabled={isLoading}
          >
            <SendIcon />
          </IconButton>
        </InputArea>
      </ChatContainer>
    </Container>
    </Layout>
  );
};

export default ChatInterface;