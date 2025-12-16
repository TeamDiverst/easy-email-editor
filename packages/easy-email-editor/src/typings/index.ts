import { IPage } from '@teamdiverst/easy-email-core';
import { ReactElement } from 'react';

export interface IEmailTemplate {
  content: IPage;
  subject: string;
  subTitle: string;
}

declare global {
  function t(key: string): string;
  function t(key: string, placeholder: React.ReactNode): ReactElement;

  interface Window {
    // translation

    t: (key: string, placeholder?: React.ReactNode) => ReactElement;
  }
}
