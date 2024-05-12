import React from 'react';
import { useFormik } from 'formik';
import Modal from 'react-modal';

import { chatsStore } from '../../../../stores';
import { groupFormInitialValues, groupFormValidationSchema } from '../../../../constants';
import GroupForm from './GroupForm';
import { ModalHeader } from '../../commonComponents/header';
import { ModalFooter } from '../../commonComponents/footer';

type Props = {
  isOpenModal: boolean;
  closeModal: () => void;
}

export const NewGroupModal: React.FC<Props> = ({ isOpenModal, closeModal }) => {
  const { loadItems, createGroup } = chatsStore;

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
      await loadItems();
    },
  });

  const handleClose = () => {
    closeModal();
    resetForm();
  };

  return (
    <Modal
      className="big-modal" 
      isOpen={isOpenModal} 
      onRequestClose={handleClose}
      closeTimeoutMS={500}>
        <ModalHeader title='Новая группа' toggle={handleClose} />
        <GroupForm values={values} setFieldValue={setFieldValue} />
        <ModalFooter handleBack={handleClose} handleSave={submitForm}/>
    </Modal>
  );
};
