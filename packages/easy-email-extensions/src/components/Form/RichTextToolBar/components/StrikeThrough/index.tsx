import { PopoverProps } from '@arco-design/web-react';
import React, { useCallback, useMemo } from 'react';
import { IconFont } from '@teamdiverst/easy-email-editor';
import { ToolItem } from '../ToolItem';
import { EMAIL_BLOCK_CLASS_NAME } from '@teamdiverst/easy-email-core';
import { useSelectionRange } from '@extensions/AttributePanel/hooks/useSelectionRange';

export interface LinkProps extends PopoverProps {
  currentRange: Range | null | undefined;
  onChange: () => void;
}

function getStrikeThroughNode(
  node: Node | null | undefined,
): Element | null {
  if (!node) return null;
  if ((node as Element).classList?.contains(EMAIL_BLOCK_CLASS_NAME)) return null;
  if ((node as Element).tagName?.toLocaleLowerCase() === 'strike') return node as Element;
  return getStrikeThroughNode(node.parentNode);
}

export function StrikeThrough(props: LinkProps) {
  const { onChange } = props;
  const { setRangeByElement } = useSelectionRange();
  const node = useMemo(() => {
    return getStrikeThroughNode(props.currentRange?.commonAncestorContainer);

  }, [props.currentRange]);

  const onClick = useCallback(() => {
    if (node) {
      setRangeByElement(node);
    }
    onChange();
  }, [node, onChange, setRangeByElement]);

  return (
    <ToolItem title={t('Strikethrough')} isActive={Boolean(node)}
              icon={<IconFont iconName="icon-strikethrough" />} onClick={onClick}
    />
  );
}
