const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
let isDebugging = false;

// isDebugging = true;

export const generateResponse = async (userMessage, prompt) => {
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
            content: prompt
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: true  // Enable streaming
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Create a decoder for parsing the stream
    const decoder = new TextDecoder();
    const reader = response.body.getReader();
    
    // Return an async generator that yields chunks of text
    return {
      async* [Symbol.asyncIterator]() {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            // Decode the chunk and split into lines
            const chunk = decoder.decode(value);
            const lines = chunk
              .split('\n')
              .filter(line => line.trim() !== '');

            // Process each line
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') return;
                
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices[0]?.delta?.content;
                  if (content) {
                    yield content;
                  }
                } catch (e) {
                  console.error('Error parsing JSON:', e);
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
        }
      }
    };
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};

export const generateInsights = async (monthlyData) => {
  try {
    const lastMonth = monthlyData[monthlyData.length - 2];
    const previousMonth = monthlyData[monthlyData.length - 3];

    const prompt = `Based on the COGS vs Sales data:
      - Last month's sales: £${lastMonth['Sales - Value']}
      - Previous month's sales: £${previousMonth['Sales - Value']}
      - Last month's COGS: £${lastMonth['Costs - Value']}
      - Previous month's COGS: £${previousMonth['Costs - Value']}
      
      Generate 3 key business insights in markdown bullet points.
      - Ensure the insights are relevant to the data and the business.
      - Ensure the insights are actionable and can be used to improve the business.
      - Each insight should be a single sentence, between 10 and 20 words.
      `;

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
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating insights:", error);
    return "* Unable to generate insights at the moment\n* Please try again later";
  }
}; 