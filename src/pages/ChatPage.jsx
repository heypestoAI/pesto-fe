import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton, Typography, Paper, Container, styled, Avatar } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Layout from "../components/layout/Layout";

let isDebugging = false;

isDebugging = true;

const OPENAI_API_KEY = process.env;
console.log('OPENAI_API_KEY', OPENAI_API_KEY);

const GREETING = "Hello! I am Pesto AI. How can I help you today?"
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
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${isDebugging ? "dummy" : OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4-0125-preview",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant."
            },
            {
              role: "user",
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating response:", error);
      return "I apologize, but I encountered an error. Please try again.";
    }
  };

  const handleSend = async () => {
    if (newMessage.trim()) {
      const userMsg = {
        id: messages.length + 1,
        text: newMessage,
        isUser: true,
        timestamp: new Date().toLocaleTimeString(),
        status: "sent"
      };
      setMessages([...messages, userMsg]);
      setNewMessage("");
      setIsLoading(true);
      
      const response = await generateResponse(newMessage);
      
      const assistantMsg = {
        id: messages.length + 2,
        text: response,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        status: "sent"
      };
      
      setMessages(prev => [...prev, assistantMsg]);
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

  return (
    <Layout>
    <Container maxWidth="md" sx={{height: '100%'}}>
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
                <Typography variant="body1">{message.text}</Typography>
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
          {(isLoading || isDebugging) && (
            <TypingIndicator>
              <MoreHorizIcon fontSize="large"></MoreHorizIcon>
              <Typography variant="caption">{LOADING_MSG}</Typography>
            </TypingIndicator>
          )}
          <div ref={messageEndRef} />
        </MessageArea>
        <InputArea>
          <IconButton
            aria-label="emoji"
            sx={{ color: "#4caf50" }}
          >
            <AttachFileIcon />
          </IconButton>
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