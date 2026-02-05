import { ShortcutToolbar } from '../ShortcutToolbar';
import { Box, Button, Card, ConfigProvider, Layout, Tabs } from '@extensions/components/MuiAdapter';
import { useEditorProps } from '@teamdiverst/easy-email-editor';
import React, { useState } from 'react';
import { SourceCodePanel } from '../SourceCodePanel';
import { AttributePanel } from '../AttributePanel';
import { InteractivePrompt } from '../InteractivePrompt';
import styles from './index.module.scss';
import { MergeTagBadgePrompt } from '@extensions/MergeTagBadgePrompt';
import { Typography } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

export const SimpleLayout: React.FC<
  {
    showSourceCode?: boolean;
    jsonReadOnly?: boolean;
    mjmlReadOnly?: boolean;
    defaultShowLayer?: boolean;
    children: React.ReactNode | React.ReactElement;
  }
> = props => {
  const { height: containerHeight } = useEditorProps();
  const { showSourceCode = true, defaultShowLayer = true, jsonReadOnly = false, mjmlReadOnly = true } = props;
  const [collapsed, setCollapsed] = useState(!defaultShowLayer);
  return (
    <ConfigProvider>
      <Box
        className={styles.SimpleLayout}
        sx={{
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
          minWidth: 1400,
        }}
      >
        <Box
          sx={{
            paddingRight: 0,
            width: collapsed ? 60 : 300,
            flexShrink: 0,
            borderRight: 1,
            borderColor: 'divider',
          }}
        >
          <Card
            sx={{ border: 'none', height: '100%' }}
          >
            <Box sx={{ display: 'flex', height: '100%' }}>
              <Box sx={{ width: 60, textAlign: 'center', borderRight: 1, borderColor: 'divider' }}>
                <ShortcutToolbar />
                <Button
                  sx={{
                    marginTop: '30px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  onClick={() => setCollapsed(v => !v)}
                >
                  {collapsed ? <ArrowRight /> : <ArrowLeft />}
                </Button>
              </Box>
              {!collapsed && (
                <Box
                  className={styles.customScrollBar}
                  sx={{
                    flex: 1,
                    paddingBottom: '50px',
                    height: containerHeight,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                  }}
                >
                  <Card
                    sx={{ border: 'none' }}
                  >
                    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                      <Typography>{t('Layout')}</Typography>
                    </Box>
                  </Card>
                </Box>
              )}
            </Box>
          </Card>
        </Box>

        <Box sx={{ flexGrow: 1, height: containerHeight, overflow: 'hidden' }}>{props.children}</Box>

        <Box
          sx={{
            height: containerHeight,
            minWidth: 300,
            maxWidth: 350,
            width: 350,
            borderLeft: 1,
            borderColor: 'divider',
          }}
          className={styles.rightSide}
        >
          <Card
            id='rightSide'
            sx={{
              maxHeight: '100%',
              height: '100%',
              borderLeft: 'none',
              overflowY: 'auto',
            }}
            className={styles.customScrollBarV2}
          >
            <Tabs className={styles.layoutTabs}>
              <Tabs.TabPane
                key="config"
                title={(
                  <div style={{ height: 31, lineHeight: '31px' }}>
                    {t('Configuration')}
                  </div>
                )}
              >
                <AttributePanel />
              </Tabs.TabPane>
              {showSourceCode && (
                <Tabs.TabPane
                  key='Source code'
                  title={(
                    <div style={{ height: 31, lineHeight: '31px' }}>
                      {t('Source code')}
                    </div>
                  )}
                >
                  <SourceCodePanel jsonReadOnly={jsonReadOnly} mjmlReadOnly={mjmlReadOnly} />
                </Tabs.TabPane>
              )}
            </Tabs>
          </Card>
        </Box>

        <InteractivePrompt />
        <MergeTagBadgePrompt />
      </Box>
    </ConfigProvider>
  );
};
