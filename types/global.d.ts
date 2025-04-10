declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}

declare module '*.gif' {
  const content: any;
  export default content;
}

// Extend React Native Paper theme
declare module 'react-native-paper' {
  interface MD3Theme {
    colors: {
      success: string;
      onSuccess: string;
      successContainer: string;
      onSuccessContainer: string;
      warning: string;
      onWarning: string;
      warningContainer: string;
      onWarningContainer: string;
      placeholder: string;
    };
  }
} 