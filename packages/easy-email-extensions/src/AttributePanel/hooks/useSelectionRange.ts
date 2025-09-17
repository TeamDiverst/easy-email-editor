/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useCallback, useContext } from 'react';
import {
  SelectionRangeContext,
} from '@extensions/AttributePanel/components/provider/SelectionRangeProvider';
import { getIframeDocument } from '@teamdiverst/easy-email-editor';

export function useSelectionRange() {
  const { selectionRange, setSelectionRange } = useContext(
    SelectionRangeContext,
  );

  const iframe = getIframeDocument();

  const restoreRange = useCallback((range: Range) => {

    const selection = iframe?.getSelection();
    selection?.removeAllRanges();
    const newRange = iframe?.createRange()!;
    newRange.setStart(range.startContainer, range.startOffset);
    newRange.setEnd(range.endContainer, range.endOffset);

    selection?.addRange(newRange);

  }, [iframe]);

  const setRangeByElement = useCallback(
    (element: ChildNode) => {
      const selection = iframe?.getSelection();

      selection?.removeAllRanges();
      const newRange = iframe?.createRange()!;
      newRange.selectNode(element);
      setSelectionRange(newRange);
      selection?.addRange(newRange);

    },
    [setSelectionRange, iframe],
  );

  return {
    selectionRange,
    setSelectionRange,
    restoreRange,
    setRangeByElement,
  };
}
