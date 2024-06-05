import * as Yup from 'yup';
import { GroupFormType } from '../types';

export const groupFormInitialValues: GroupFormType = {
  name: '',
  userIds: [],
};

export const groupFormValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Введите наименование группы'),
});
