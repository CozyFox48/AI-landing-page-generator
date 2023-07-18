import React from 'react';
import { Button, Card, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

interface CustomCardProps {
    loading: boolean;
    color:string;
    imageUrl:string,
    onDownload: () => void;
  }

  const CustomCard: React.FC<CustomCardProps> = ({ loading, onDownload,color ,imageUrl}) => {
    return (
      <Card
        hoverable
        style={{
          width: '600px',
          height: '800px',
          margin: '10px',
          borderTop: '7px solid '+color,
          boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.5)',
        }}
        cover={
          <div
            style={{
              height: '700px',
              background: loading ? '#f5f5f5' : 'lightgray',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {loading ? (
              <Spin size="large" />
            ) : (
              <img alt="Card" src={imageUrl} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            )}
          </div>
        }
      >
        <Button
          type="primary"
          style={{ marginTop: '10px', width: '100%' }}
          disabled={loading}
          icon={<DownloadOutlined />}
          onClick={onDownload}
        >
          {loading ? 'Downloading...' : 'Download'}
        </Button>
      </Card>
    );
  };
  
  export default CustomCard;
  