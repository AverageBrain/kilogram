import { GroupFormType } from "../types";
import * as Yup from 'yup';

export const groupFormInitialValues: GroupFormType = {
  name: "",
  userIds: [],
};

export const groupFormValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Введите наименование группы'),
});