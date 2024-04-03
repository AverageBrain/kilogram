import React from 'react';

type Props = {
  value: string;
  description: string;
}

export const AdditionalInfoItem: React.FC<Props> = ({ value, description }) => {
  return (
    <div className='additional-info-item'>
      <div className='value'>{value}</div>
      <div className='description'>{description}</div>
    </div>
  );
}
