const OPENAI_API_KEY = "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";
let isDebugging = true;

// isDebugging = true;
//  process.env.OPENAI_API_KEY; // Ensure this is set in your environment

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

export const generateInsights = async (monthlyData) => {
  try {
    const lastMonth = monthlyData[monthlyData.length - 1];
    const previousMonth = monthlyData[monthlyData.length - 2];

    const prompt = `Based on the COGS vs Sales data:
      - Last month's sales: £${lastMonth['Sales - Value']}
      - Previous month's sales: £${previousMonth['Sales - Value']}
      - Last month's COGS: £${lastMonth['Costs - Value']}
      - Previous month's COGS: £${previousMonth['Costs - Value']}
      
      Generate 3 key business insights in markdown bullet points.`;

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