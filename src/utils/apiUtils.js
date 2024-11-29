import callOnceInInterval from 'call-once-in-interval';
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
let isDebugging = false;

// isDebugging = true;


const generateResponseLocal = async (userMessage, excelData) => {
  try {
    const cogsSales = excelData.cogs_sales;
    const ingredients = excelData.ingredients;
    const recipes = excelData.recipes;

    const prompt = `You are a data analyst for small manufacturing businesses in the food and drinks space. Analyze the provided data to assess profit margin and suggest specific recommendations on increasing overall profitability.
        Use this data to answer the question: 
        - COGS and sales data across products: ${JSON.stringify(cogsSales)}
        - Ingredient data: ${JSON.stringify(ingredients)}
        - Recipe data: ${JSON.stringify(recipes)}

        In the response, base insights directly on the provided data instead of offering generic advice, focusing on trends, outliers, and practical adjustments relevant to the case.

        # Steps
        - Review the data provided to identify trends in ingredients, recipes, sales, and product costs.  
        - Perform the required calculations for individual products or recipes wherever data permits.
        - Based on the question - Analyze ingredient costs, product profitability, sales volume, and trends to determine key drivers of profitability.
        - Provide actionable recommendations specific to the business, such as changing product pricing, adjusting ingredient quantities, or switching ingredients to more economical options if supported by data.
        - Ensure each recommendation logically follows from data, focusing on insights that can directly and practically improve profit margins.
        - Be explicit about which particular data points support your conclusions and provide your reasoning before presenting any recommendations.

        # Output Format
        - Structured response paragraphs.
        - Highlight the reasoning following each data insight with data points.
        - Use bullet points for specific recommendations to clearly differentiate between insights and actions.
        - Give one actionable recommendation at the end.

        # Notes
        - Be watchful of any sharp changes in ingredient cost trends that could impact overall profitability.
        - Ensure recommendations are precise and achievable within the given context and current data constraints.
        - Avoid giving away generic advice.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${isDebugging ? "dummy" : OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
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

export const generateInsights = async (excelData) => {
  try {
    const cogsSales = excelData.cogs_sales;
    const ingredients = excelData.ingredients;
    const recipes = excelData.recipes;

    const systemPrompt = `You are an intelligent reasoning FMCG Analytics Assistant. You have access to Excel data containing costs and sales data for the business.

    Here is the data to be referenced in your insights: 
    - COGS vs Sales data across products: ${JSON.stringify(cogsSales)}. This data contains the date, products, product cost, sales and gross profit margin.
    - Ingredient data: ${JSON.stringify(ingredients)}. This data contains the date, ingredients, and cost per kg.
    - Recipe data: ${JSON.stringify(recipes)}. This data contains the date, recipes, and cost per kg.

    Generate 3 key business insights in markdown bullet points:
      - Ensure the insights are relevant to the data and the business.
      - Ensure each should contain data insight and calculation from the data. For calcuations, round of the data to 2 decimal places.
      - Each insight should be a simple single sentence, between 10 and 15 words. Keep the sentence concise and to the point. Don't have a heading or summary for bullet points.`;

    const userPrompt = `Based on the COGS vs Sales data - generate insights for:
    - Insights on trends of cost of ingredients of the ingredients which has most change for the products
    - Insights on chnage in labour costs over time
    - Insights on sales for the products which has most change over time and mention month on month change
    `

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${isDebugging ? "dummy" : OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userPrompt
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

const generateProductInsightsLocal = async (excelData) => {
  try {
    const cogsSales = excelData.cogs_sales;

    const systemPrompt = `You are an intelligent reasoning FMCG Analytics Assistant. You have access to Excel data containing costs and sales data for all the details on products.

    Here is the data to be referenced in your insights: ${JSON.stringify(cogsSales)}. This data contains the date, products, product cost, sales and gross profit margin.

    Generate one insight in one simple sentence less than 10 words in markdown. The insight should be based on the data and the business.`;

    const userPrompt = `Generate one insight on which product has the most decline in sales over time.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${isDebugging ? "dummy" : OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userPrompt
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
export const generateResponse = generateResponseLocal;
export const generateProductInsights = callOnceInInterval(generateProductInsightsLocal, 2000);