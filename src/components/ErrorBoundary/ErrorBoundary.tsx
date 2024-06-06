/* eslint-disable */
import { Component, PropsWithChildren } from 'react';

import ErrorPage from '../additionalPages/ErrorPage';

type Props = PropsWithChildren;

type State = {
  isError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    isError: false,
  };

  static getDerivedStateFromError(): State {
    return { isError: true };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    return this.state.isError
      ? <ErrorPage />
      : this.props.children;
  }
}

export default ErrorBoundary;
