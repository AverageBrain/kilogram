import { useMediaQuery } from 'react-responsive';

export const useTypeOfScreen = () => {
  const isBigWidth = useMediaQuery({ query: '(min-width: 650px)' });
  const isBigHeight = useMediaQuery({ query: '(min-height: 650px)' });
  const isHiddenModal = useMediaQuery({ query: 'not ((min-width: 431px) and (min-height: 700px))' });

  return { isBigScreen: isBigWidth && isBigHeight, isHiddenModal };
};
