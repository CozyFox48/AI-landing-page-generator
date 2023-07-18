import React from 'react';
import { Col, Input, Row } from 'antd';
import './App.css';
import './bootstrap.css';
import './coming-sssoon.css';
interface LandingProps {
  onGenerate: () => void;
}

const { TextArea } = Input;

const Landing: React.FC<LandingProps> = ({ onGenerate }) => {
  return (
    <div className="main" style={{ backgroundImage: `url('landing.jpg')` }}>
      <div className="cover black" data-color="black"></div>
      <div className="container">
        <h1 className="logo cursive">AI Landing Page Generator</h1>
        <div className="content">
          <h4 className="motto">Imagine what you want in your mind and write your imagination here. We can take you into the world of your imagination.</h4>
          <div className="subscribe">
            <Row justify="center">
              <Col span={16}>
                <TextArea
                  className="form-control transparent"
                  placeholder="Your prompt here..."
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Col>
            </Row>
            <Row justify="center" style={{ marginTop: "5px" }}>
              <Col span={12}>
                <button className="btn btn-warning btn-fill" onClick={onGenerate}>Generate</button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container">
          Made with <i className="fa fa-heart heart"></i> by <a href="http://www.creative-tim.com">Raman Preet Signh</a>. Free download here.
        </div>
      </div>
    </div>
  );
};

export default Landing;
