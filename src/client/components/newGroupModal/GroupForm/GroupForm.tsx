import React, { useState } from 'react';
import { FormikErrors } from 'formik';

import { Avatar, Input } from 'antd';
import { GroupFormType } from '../../../types';
import './GroupForm.css';

import UsersList from '../UsersList';

type Props = {
  values: GroupFormType,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<GroupFormType>>;
}

const GroupForm: React.FC<Props> = ({ values, setFieldValue }) =>  {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('name', event.target.value);
  }

  return (
    <>
      <div className="main-info">
        <div className="avatar">
          <Avatar />
        </div>
        <div className="text-info">
          <span className="input">
            <Input
              size="large"
              variant="borderless"
              placeholder="Введите название"
              value={values.name}
              onChange={handleChange}
            />
          </span>
        </div>
      </div>
      <div className="additional-info">
        <div className="search-bar">
          <Input
            allowClear
            className="search"
            variant="borderless"
            placeholder="Поиск контактов..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <UsersList
        searchTerm={searchTerm} 
        userIds={values.userIds}
        setFieldValue={setFieldValue}
      />
    </>
  );
};

export default GroupForm;
