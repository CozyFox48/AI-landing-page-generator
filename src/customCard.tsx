import React from 'react';
import { Button, Card, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

interface CustomCardProps {
  loading: boolean;
  result: string;
  color: string;
  index: number;
  imageUrl: string,
  onDownload: (index: number) => void;
}

const CustomCard: React.FC<CustomCardProps> = ({ loading, result, index, onDownload, color, imageUrl }) => {
  return (
    <Card
      hoverable
      style={{
        width: '600px',
        height: '800px',
        margin: '10px',
        borderTop: '7px solid ' + color,
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
            <iframe
              srcDoc={result}
              title="Generated Code"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          )}
        </div>
      }
    >

      <Button
        type="primary"
        style={{ marginTop: '10px', width: '100%' }}
        disabled={loading}
        icon={<DownloadOutlined />}
        onClick={() => { onDownload(index); }}
      >
        {loading ? 'Downloading...' : 'Download'}
      </Button>
    </Card>
  );
};

export default CustomCard;
