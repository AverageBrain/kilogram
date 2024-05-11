import React, { useState } from 'react';
import { FormikErrors } from 'formik';
import { Avatar, Input } from 'antd';
import { GroupFormType } from '../../../../../types';
import UsersList from '../UsersList';
import clsx from 'clsx';

import './GroupForm.css';
import { Divider } from '../../../commonComponents/divider';
import { UserSearch } from '../../../commonComponents/userSearch';

type Props = {
  values: GroupFormType,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<GroupFormType>>;
}

const GroupForm: React.FC<Props> = ({ values, setFieldValue }) =>  {
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ isInputFocused, setIsInputFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('name', event.target.value);
  }

  const handleFocus = () => {
    setIsInputFocused(true);
  }
  
  const handleBlur = () => {
    setIsInputFocused(false);
  }

  return (
    <>
      <div className="main-info">
        <div className="avatar">
          <Avatar />
        </div>
        <div className="name-input">
          <div className={clsx("background-box", isInputFocused ? "input-focus": "")}>
            <div className="input-wrapper">
              <Input
                size="large"
                variant="borderless"
                placeholder="Введите название группы"
                value={values.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <UserSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <UsersList
        searchTerm={searchTerm} 
        userIds={values.userIds}
        setFieldValue={setFieldValue}
      />
    </>
  );
};

export default GroupForm;
