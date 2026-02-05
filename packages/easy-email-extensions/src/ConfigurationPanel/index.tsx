import React, { useEffect, useState } from 'react';
import { Tabs } from '@extensions/components/MuiAdapter';
import { AttributePanel } from '@extensions/AttributePanel';
import { SourceCodePanel } from '@extensions/SourceCodePanel';
import { FullHeightOverlayScrollbars } from '@extensions/components/FullHeightOverlayScrollbars';
import { IconLeft } from '@extensions/components/MuiAdapterIcons';

export interface ConfigurationPanelProps {
  showSourceCode: boolean;
  jsonReadOnly: boolean;
  mjmlReadOnly: boolean;
  height: string;
  onBack?: () => void;
  compact?: boolean;
}

export function ConfigurationPanel({
  showSourceCode,
  height,
  onBack,
  compact,
  jsonReadOnly,
  mjmlReadOnly,
}: ConfigurationPanelProps) {
  const [inited, setInited] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setInited(true);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!inited) return null;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      {showSourceCode ? (
        <Box sx={{ width: '100%', height: height, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
            {!compact && onBack && (
              <IconButton onClick={onBack} size="small" sx={{ ml: 1 }}>
                <IconLeft fontSize="small" />
              </IconButton>
            )}
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ flex: 1 }}>
              <Tab label={t('Configuration')} />
              <Tab label={t('Source code')} />
            </Tabs>
          </Box>
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            {activeTab === 0 && (
              <FullHeightOverlayScrollbars height={`calc(${height} - 48px)`}>
                <AttributePanel />
              </FullHeightOverlayScrollbars>
            )}
            {activeTab === 1 && (
              <FullHeightOverlayScrollbars height={`calc(${height} - 48px)`}>
                <SourceCodePanel jsonReadOnly={jsonReadOnly} mjmlReadOnly={mjmlReadOnly} />
              </FullHeightOverlayScrollbars>
            )}
          </Box>
        </Box>
      ) : (
        <AttributePanel />
      )}
    </>
  );
}
