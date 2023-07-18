import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import Landing from './landing';
import Search from './search';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const App = () => {
  
  const [isLanding, setIsLanding] = useState(true);

  const generate = () => {
    setIsLanding(false);
    const pageTitle = "Car sale system";
    const headline = "Best Cars at lowest price";
    const bodyText = "Find your dream car today!";
    const backgroundColor = "blue"
    const prompt = `Generate a landing page with the following information:
    \nPage Title: ${pageTitle}
    \nHeadline: ${headline}
    \nBody Text: ${bodyText}
    \nBackground Color: ${backgroundColor}`;

    const fetchData = async () => {
      try {
        // Make the API call
        const result = await openai.createCompletion({
          model: "code-davinci-003",
          prompt,
          temperature: 0.8,
          n: 1,
          max_tokens: 300,
        });
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }

  return (
    <div className="App">
      {isLanding?<Landing onGenerate={generate} />:<Search onGenerate={generate} />}
      
    </div>
  );
}

export default App;
