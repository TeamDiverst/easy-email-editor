import { Box, Tabs } from '@extensions/components/MuiAdapter';
import { useEditorProps } from '@teamdiverst/easy-email-editor';
import React from 'react';
import { Blocks } from './Blocks';
import { FullHeightOverlayScrollbars } from '@extensions/components/FullHeightOverlayScrollbars';
import styles from './index.module.scss';
import { ConfigurationDrawer } from './ConfigurationDrawer';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';

export function EditPanel({
  showSourceCode,
  jsonReadOnly,
  mjmlReadOnly,
}: {
  showSourceCode: boolean;
  jsonReadOnly: boolean;
  mjmlReadOnly: boolean;
}) {
  const { height } = useEditorProps();
  const { compact = true, showBlockLayer = true } = useExtensionProps();

  return (
    <Box
      className={styles.blocksPanel}
      sx={{ paddingRight: 0, minWidth: 360, width: 360, borderRight: 1, borderColor: 'divider' }}
    >
      <Tabs
        defaultActiveTab='2'
        style={{ width: '100%', padding: 0 }}
      >
        <Tabs.TabPane
          key='2'
          title={t('Block')}
        >
          <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
            <Blocks />
          </FullHeightOverlayScrollbars>
        </Tabs.TabPane>

        {showBlockLayer && (
          <Tabs.TabPane
            key='1'
            title={t('Layer')}
          >
            <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
              <div style={{ padding: 20 }} />
            </FullHeightOverlayScrollbars>
          </Tabs.TabPane>
        )}
      </Tabs>
      {!compact && (
        <ConfigurationDrawer
          height={height}
          showSourceCode={showSourceCode}
          compact={Boolean(compact)}
          jsonReadOnly={jsonReadOnly}
          mjmlReadOnly={mjmlReadOnly}
        />
      )}
    </Box>
  );
}
