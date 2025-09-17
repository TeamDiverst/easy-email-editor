import { AdvancedType, BasicType } from '@teamdiverst/easy-email-core';

export function isTableBlock(blockType: any) {
  return blockType === AdvancedType.TABLE || blockType === BasicType.TABLE;
}
