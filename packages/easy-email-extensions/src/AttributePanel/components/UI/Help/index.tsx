import React from 'react';
import { Tooltip, TooltipProps } from '@extensions/components/MuiAdapter';
import { IconQuestionCircle } from '@extensions/components/MuiAdapterIcons';

export function Help(
  props: TooltipProps &
    Partial<{ style: Partial<React.CSSProperties> }> & {
      title: React.ReactNode;
    }
) {
  return (
    <Tooltip {...{ ...props, style: undefined }} content={props.title}>
      <span style={{ cursor: 'pointer' }}>
        <IconQuestionCircle style={props.style} />
      </span>
    </Tooltip>
  );
}
