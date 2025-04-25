import { BasicType, AdvancedType } from '@teamdiverst/easy-email-core';

export function isTableBlock(blockType: any) {
  return blockType === AdvancedType.TABLE;
}
