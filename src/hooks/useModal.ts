import { useState } from 'react';

export const useModal = () => {
  const [isOpenModal, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => setIsOpen(!isOpenModal);

  const showModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return {
    isOpenModal, toggleModal, showModal, closeModal,
  };
};
