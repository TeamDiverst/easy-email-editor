import { BasicType, AdvancedType } from '@teamdiverst/easy-email-core';

export function isNavbarBlock(blockType: any) {
  return blockType === BasicType.NAVBAR || blockType === AdvancedType.NAVBAR;
}
