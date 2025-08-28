import { useContext } from 'react';
import { BlocksContext } from '@/components/Provider/BlocksProvider';
import { IEmailTemplate } from '@/typings';
import { useForm, useFormState } from 'react-final-form';

export function useEditorContext() {
  const formState = useFormState<IEmailTemplate>();
  const helpers = useForm();
  const { initialized, setInitialized } = useContext(BlocksContext);

  return {
    formState,
    formHelpers: helpers,
    initialized,
    setInitialized,
    pageData: formState.values?.content ?? defaultPageData,
  };
}

const defaultPageData = {
  type: 'page',
  data: {
    value: {
      breakpoint: '480px',
      headAttributes: '',
      'font-size': '14px',
      'font-weight': '400',
      'line-height': '1.7',
      headStyles: [],
      fonts: [],
      responsive: true,
      'font-family':
        '\'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\',\'Helvetica Neue\', sans-serif',
      'text-color': '#000000',
    },
  },
  attributes: { 'background-color': '#FFFFFF', width: '600px' },
  children: [],
};

