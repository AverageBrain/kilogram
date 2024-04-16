import React from 'react';

import './EmptyPanel.css';

const EmptyPanel: React.FC = () => {


  return (
    <div className="panel">
      <div className="start-text">
        <span>Выберите чат, чтобы начать переписку</span>
      </div>
    </div>
  );
};

export default EmptyPanel;
