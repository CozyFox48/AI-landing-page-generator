import React, { useState } from 'react';
import { Col, Input, Row } from 'antd';
import CustomCard  from './customCard';

const { TextArea } = Input;

interface LandingProps {
   onGenerate: (prompt:string) => void;
   prompt:string;
   setPrompt:(value:string)=>void;
  results: { result: string, waiting: boolean }[];
}

const App: React.FC<LandingProps> = ({ onGenerate,prompt, setPrompt, results }) => {
    const [loading, setLoading] = useState([false, false, false, false]);
    const handleDownload = (index:number) => {
        
        setLoading([...loading.map((item, i) => (i === index ? true : item))]);
        const element = document.createElement('a');
        const file = new Blob([results[index].result], { type: 'text/plain' });
    
        element.href = URL.createObjectURL(file);
        element.download = 'Landing Page.html';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        setTimeout(() => {
            setLoading([...loading.map((item, i) => (i === index ? false : item))]);
            // Your download functionality here
        }, 2000); // Set a timeout to simulate the download process
    };

    return (
        <div>
            <div className="main" style={{ height: '300px', position: 'relative', backgroundImage: `url('search.jpg')` }}>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', width: "100%", height: "100%" }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            maxWidth: '900px',
                            width: '90%',
                            padding: '0 20px',
                            textAlign: 'center',
                        }}
                    >
                        <Row justify="center">
                            <Col span={24}>
                                <TextArea
                                    className="form-control transparent"
                                    placeholder="Your prompt here..."
                                    autoSize={{ minRows: 2, maxRows: 2 }}
                                    onChange={(e)=>{setPrompt(e.target.value);}}
                                />
                            </Col>
                        </Row>
                        <Row justify="center" style={{ marginTop: "5px" }}>
                            <Col span={12}>
                                <button className="btn btn-warning btn-fill" onClick={()=>{onGenerate(prompt);}}>Generate</button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    margin: '20px auto',
                    maxWidth: '1200px',
                    padding: '0 20px',
                }}
            >
                <Row justify="space-between">
                    <Col span={11}>
                        <CustomCard loading={results[0].waiting||loading[0] } result={results[0].result} index={0} onDownload={handleDownload} color="#008080" imageUrl='sample (1).jpg'/>
                    </Col>
                    <Col span={11}>
                        <CustomCard loading={results[1].waiting||loading[1]} result={results[1].result} index={1} onDownload={handleDownload}  color="#FF7F50" imageUrl='sample (2).jpg'/>
                    </Col>
                </Row>
                <Row justify="space-between">
                    <Col span={11}>
                        <CustomCard loading={results[2].waiting||loading[2]} result={results[2].result} index={2} onDownload={handleDownload} color="#9966CC " imageUrl='sample (3).jpg'/>
                    </Col>
                    <Col span={11}>
                        <CustomCard loading={results[3].waiting||loading[3]} result={results[3].result} index={3} onDownload={handleDownload}  color="#50C878 " imageUrl='sample (4).jpg'/>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default App;