import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import Landing from './landing';
import Search from './search';
import { message } from 'antd';
import { Modal, Checkbox } from "antd";
import cheerio from 'cheerio';
import axios from 'axios';

const openai = new OpenAIApi(new Configuration({
  apiKey: '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',
  username: "cuihelong"
}));

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [checkedItems, setCheckedItems] = useState({ button: true, hero: false, test: false, trust: true, form: false, FAQ: true, contact: true });
  const [prompt, setPrompt] = useState('');
  const [isLanding, setIsLanding] = useState(true);
  const [first, setFirst] = useState({ result: '', waiting: true });
  const [second, setSecond] = useState({ result: '', waiting: true });
  const [third, setThird] = useState({ result: '', waiting: true });
  const [fourth, setFourth] = useState({ result: '', waiting: true });

  const searchUnsplashImage = async (keyword: string) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random`,
        {
       
          params:{query:keyword, client_id:"kbmu6Ky_1er7zP13HiSM-NdVsFjqbtjr0qfCXOZlCkA",orientation:"landscape"}
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to search Unsplash image:", error);
    }
  };

  const handleOk = () => {
    setFirst({ result: '', waiting: true });
    setSecond({ result: '', waiting: true });
    setThird({ result: '', waiting: true });
    setFourth({ result: '', waiting: true });

    const promptTemplte = `Generate a big landing page code in one html file with the following information with proper pictures:
    ${checkedItems.button ? "add 'Sign up' and 'Download' button. " : ' '}
    ${checkedItems.hero ? "add hero section (Visual Illustrations niche). " : ' '}
    ${checkedItems.test ? "add testimonials. " : ' '}
    ${checkedItems.trust ? "add Trust badges like badges, proof, guarantee images. " : ' '}
    ${checkedItems.form ? "add Form like email to revert etc. " : ' '}
    ${checkedItems.FAQ ? "add FAQ section. " : ' '}
    ${checkedItems.contact ? "add contact section. " : ' '}
    ${prompt}`;

    for (let i = 0; i < 4; i++) {
      openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptTemplte }],
      }).then(async (res: any) => {

        const result = res.data.choices[0].message.content;
        const $html = cheerio.load(result);
        const images = $html("img");

        for (let index = 0; index < images.length; index++) {
          const element = images[index];
          const altText = $html(element).attr("alt");
          if (!altText) continue;
        
          const keyword = altText.toLowerCase().replace(/ /g, "+");
          const unsplashImage = await searchUnsplashImage(prompt+' '+keyword);
          const unsplashImageUrl = unsplashImage?.urls?.regular;
        
          if (unsplashImageUrl) {
            $html(element).attr("src", unsplashImageUrl);
            $html(element).attr("style", "width:100%;");
          }
        }

        switch (i) {
          case 0:
            setFirst({ result: $html.html(), waiting: false });
            break;
          case 1:
            setSecond({ result: $html.html(), waiting: false });
            break;
          case 2:
            setThird({ result: $html.html(), waiting: false });
            break;
          case 3:
            setFourth({ result: $html.html(), waiting: false });
            break;
          default:
            break;
        }
      }).catch((error) => {
        message.error(`An error occurred in ${i} generation. Please try again later. ${error}`); // Display error notification
      });
    }
    setModalVisible(false);
  };

  const generate = (prompt: string) => {
    if (prompt.length > 100) message.error('Prompt is too long! Limit is 100 letters');
    else {
      setIsLanding(false);
      setModalVisible(true);
    }
  }

  const configPrompt = (value: string) => {
    if (value.length > 100) message.error('Prompt is too long! Limit is 100 letters');
    else setPrompt(value);
  }

  return (
    <div className="App">

      {isLanding ? <Landing onGenerate={generate} prompt={prompt} setPrompt={configPrompt} /> :
        <Search onGenerate={generate} prompt={prompt} setPrompt={configPrompt} results={[first, second, third, fourth]} />}

      <Modal
        title="Select Options"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={() => { setModalVisible(false); }}
        width={600}
      >

        <Checkbox checked={checkedItems.button} style={{ marginBottom: "10px", fontSize: "16px" }}
          onChange={(e) => setCheckedItems({ ...checkedItems, button: e.target.checked })}
        >
          Do you need a CTR Button like Sign up or Download Now
        </Checkbox>
        <Checkbox checked={checkedItems.hero} style={{ marginBottom: "10px", fontSize: "16px" }}
          onChange={(e) => setCheckedItems({ ...checkedItems, hero: e.target.checked })}
        >
          Do you need Hero Section? Visual Illustrations niche
        </Checkbox>
        <Checkbox checked={checkedItems.test} style={{ marginBottom: "10px", fontSize: "16px" }}
          onChange={(e) => setCheckedItems({ ...checkedItems, test: e.target.checked })}
        >
          Do you need testimonials?
        </Checkbox>
        <Checkbox checked={checkedItems.trust} style={{ marginBottom: "10px", fontSize: "16px" }}
          onChange={(e) => setCheckedItems({ ...checkedItems, trust: e.target.checked })}
        >
          Do you need Trust badges like badges, proof, guarantee images
        </Checkbox>
        <Checkbox checked={checkedItems.form} style={{ marginBottom: "10px", fontSize: "16px" }}
          onChange={(e) => setCheckedItems({ ...checkedItems, form: e.target.checked })}
        >
          Do you need any form in your website/LP?
        </Checkbox>
        <Checkbox checked={checkedItems.FAQ} style={{ marginBottom: "10px", fontSize: "16px" }}
          onChange={(e) => setCheckedItems({ ...checkedItems, FAQ: e.target.checked })}
        >
          Do you need FAQ Section?
        </Checkbox>
        <Checkbox checked={checkedItems.contact} style={{ marginBottom: "10px", fontSize: "16px" }}
          onChange={(e) => setCheckedItems({ ...checkedItems, contact: e.target.checked })}
        >
          Do you want to include any contact information?
        </Checkbox>
      </Modal>
    </div>
  );
}

export default App;
