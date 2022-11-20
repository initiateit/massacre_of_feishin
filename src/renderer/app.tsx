import { ReactNode, useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import isElectron from 'is-electron';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { initSimpleImg } from 'react-simple-img';
import { BaseContextModal } from '@/renderer/components';
import { useTheme } from '@/renderer/hooks';
import { useSettingsStore } from '@/renderer/store/settings.store';
import { AppRouter } from './router/app-router';
import './styles/global.scss';
import 'ag-grid-community/styles/ag-grid.css';

initSimpleImg({ threshold: 0.05 }, true);

const SelectRouter = ({ children }: { children: ReactNode }) => {
  if (isElectron()) {
    return <HashRouter>{children}</HashRouter>;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
};

export const App = () => {
  const theme = useTheme();
  const contentFont = useSettingsStore((state) => state.general.fontContent);
  const headerFont = useSettingsStore((state) => state.general.fontHeader);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--content-font-family', contentFont);
    root.style.setProperty('--header-font-family', headerFont);
  }, [contentFont, headerFont]);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: theme as 'light' | 'dark',
        defaultRadius: 'xs',
        dir: 'ltr',
        focusRing: 'auto',
        focusRingStyles: {
          inputStyles: () => ({
            border: `1px solid var(--primary-color)`,
          }),
          resetStyles: () => ({ outline: 'none' }),
          styles: () => ({
            outline: `1px solid var(--primary-color)`,
            outlineOffset: '-1px',
          }),
        },
        fontFamily: 'var(--content-font-family)',
        fontSizes: {
          lg: 16,
          md: 14,
          sm: 13,
          xl: 18,
          xs: 12,
        },
        other: {},
        spacing: {
          lg: 12,
          md: 8,
          sm: 4,
          xl: 16,
          xs: 2,
        },
      }}
    >
      <NotificationsProvider
        autoClose={1500}
        position="bottom-right"
        style={{
          marginBottom: '90px',
          opacity: '.8',
          userSelect: 'none',
          width: '250px',
        }}
        transitionDuration={200}
      >
        <ModalsProvider
          modalProps={{
            centered: true,
            exitTransitionDuration: 300,
            overflow: 'inside',
            overlayBlur: 5,
            overlayOpacity: 0.9,
            transition: 'slide-down',
            transitionDuration: 300,
          }}
          modals={{ base: BaseContextModal }}
        >
          <SelectRouter>
            <AppRouter />
          </SelectRouter>
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
};
