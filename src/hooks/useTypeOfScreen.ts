import { useMediaQuery } from 'react-responsive';

export const useTypeOfScreen = () => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 650px)' });

  return { isBigScreen };
};
