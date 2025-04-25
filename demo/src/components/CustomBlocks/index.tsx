import { BlockManager } from '@teamdiverst/easy-email-core';
import { BlockAttributeConfigurationManager } from '@teamdiverst/easy-email-extensions';
import { CustomBlocksType } from './constants';
import { Panel as ProductRecommendationPanel, ProductRecommendation } from './ProductRecommendation';

BlockManager.registerBlocks({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: ProductRecommendation,
});

BlockAttributeConfigurationManager.add({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: ProductRecommendationPanel,
});
