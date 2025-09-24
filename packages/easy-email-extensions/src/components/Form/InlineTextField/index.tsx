import React, { useEffect } from 'react';
import {
  ContentEditableType,
  DATA_CONTENT_EDITABLE_TYPE,
  getIframeDocument,
} from '@teamdiverst/easy-email-editor';
import { useField, useForm } from 'react-final-form';

export interface InlineTextProps {
  idx: string;
  children?: React.ReactNode;
  onChange: (content: string) => void;
}

export function InlineText({ idx, onChange, children }: InlineTextProps) {
  const {
    mutators: { setFieldTouched },
  } = useForm();

  useField(idx); // setFieldTouched will be work while register field,

  useEffect(() => {
    const iframeDocument = getIframeDocument();

    const onPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;

      const contentEditableType = getContentEditableType(target);

      e.preventDefault();

      const text = e.clipboardData?.getData('text/plain') ?? '';
      iframeDocument?.execCommand('insertHTML', false, text);
      if (contentEditableType === ContentEditableType.RichText) {
        onChange(target.innerHTML || '');
      } else if (contentEditableType === ContentEditableType.Text) {
        onChange(target.textContent?.trim() ?? '');
      }
    };

    const onInput = (e: Event) => {
      const target = e.target as HTMLElement;

      const contentEditableType = getContentEditableType(target)

      if (contentEditableType === ContentEditableType.RichText) {
        onChange(target.innerHTML || '');
      } else if (contentEditableType === ContentEditableType.Text) {
        onChange(target.textContent?.trim() ?? '');
      }
    };

    iframeDocument?.body.addEventListener('paste', onPaste as any, true);
    iframeDocument?.body.addEventListener('input', onInput);

    return () => {
      iframeDocument?.body.removeEventListener('paste', onPaste as any, true);
      iframeDocument?.body.removeEventListener('input', onInput);
    };
  }, [onChange, setFieldTouched]);

  return <>{children}</>;
}

function getContentEditableType(element: HTMLElement): string {
  const type = element.getAttribute(DATA_CONTENT_EDITABLE_TYPE);
  if (type) {
    return type;
  }

  if (element.parentElement) {
    return getContentEditableType(element.parentElement);
  }

  return '';
}
