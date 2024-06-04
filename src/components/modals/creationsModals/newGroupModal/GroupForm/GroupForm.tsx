import React, { useState } from 'react';
import { FormikErrors } from 'formik';
import { Input } from 'antd';
import { GroupFormType } from '../../../../../types';
import UsersList from '../UsersList';
import clsx from 'clsx';

import styles from './GroupForm.module.scss';
import { Divider } from '../../../commonComponents/divider';
import { UserSearch } from '../../../commonComponents/userSearch';
import { Avatar } from '../../../../Avatar';

type Props = {
  values: GroupFormType;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<GroupFormType>>;
};

const GroupForm: React.FC<Props> = ({ values, setFieldValue }) =>  {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('name', event.target.value);
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <>
      <div className={styles['main-info']}>
        <div className={styles.avatar}>
          <Avatar size={80}/>
        </div>
        <div className={styles['name-input']}>
          <div className={clsx(styles['background-box'], isInputFocused ? styles['input-focus'] : '')}>
            <div className={styles['input-wrapper']}>
              <Input
                size="large"
                variant="borderless"
                placeholder="Введите название группы"
                value={values.name}
                maxLength={25}
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
