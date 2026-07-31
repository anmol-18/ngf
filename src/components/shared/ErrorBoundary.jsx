import { Component } from 'react';
import PillButton from './PillButton';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('App error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <span className="text-5xl">💔</span>
          <h1 className="font-hand text-3xl text-white">Something went wrong</h1>
          <p className="max-w-sm text-sm text-white/80">
            The page hit a snag. Tap below to reload and try again.
          </p>
          <PillButton onClick={() => window.location.reload()}>Reload</PillButton>
        </div>
      );
    }

    return this.props.children;
  }
}
