import React from 'react';
import { useFormik } from 'formik';
import Modal from 'react-modal';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

import { chatsStore } from '../../../stores';
import { groupFormInitialValues, groupFormValidationSchema } from '../../../constants';
import GroupForm from '../GroupForm';
import './NewGroupModal.css';

type Props = {
  isOpenModal: boolean;
  closeModal: () => void;
}

const NewGroupModal: React.FC<Props> = ({ isOpenModal, closeModal }) => {
  const { createGroup } = chatsStore;

  const {
    values,
    submitForm,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: groupFormInitialValues,
    validationSchema: groupFormValidationSchema,
    onSubmit: async () => {
      await createGroup(values.userIds, values.name);
      closeModal();
      resetForm();
    },
  });

  const handleClose = () => {
    closeModal();
    resetForm();
  };

  return (
    <Modal 
      className="modal"
      isOpen={isOpenModal} 
      onRequestClose={handleClose}
      closeTimeoutMS={500}>
        <header>
          <div className="header-name">Новая группа</div>
          <div className="icon" onClick={handleClose}><CloseOutlined /></div>
        </header>
        <GroupForm values={values} setFieldValue={setFieldValue} />
        <Button className="modal-button" type="text" size="large" onClick={submitForm}>
          Сохранить
        </Button>
    </Modal>
  );
};

export default NewGroupModal;
