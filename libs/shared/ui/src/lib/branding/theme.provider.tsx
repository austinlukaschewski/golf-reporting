import createCache, { Options } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { extendTheme, PaletteColorOptions, ThemeProvider } from '@mui/material/styles';
import { getInitColorSchemeScript } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { getDesignTokens, getThemedComponents } from './theme';

import { Element, prefixer, RULESET } from 'stylis';

declare module '@mui/material/styles' {
    interface PaletteOptions {
        primaryDark?: PaletteColorOptions;
    }
}
// A workaround to https://github.com/emotion-js/emotion/issues/2836
// to be able to use `:where` selector for styling.
const globalSelector = (element: Element) => {
    switch (element.type) {
        case RULESET:
            element.props = (element.props as string[]).map((value: any) => {
                if (value.match(/(:where|:is)\(/)) {
                    value = value.replace(/\.[^:]+(:where|:is)/, '$1');
                    return value;
                }
                return value;
            });
    }
};

export const createEmotionCache = (options: Options) => {
    const stylisPlugins = (options.stylisPlugins ?? []).concat([prefixer, globalSelector]);

    return createCache({ ...options, stylisPlugins });
};

const { palette: lightPalette, typography, ...designTokens } = getDesignTokens('light');
const { palette: darkPalette } = getDesignTokens('dark');

const theme = (keyPrefix: string) =>
    extendTheme({
        defaultColorScheme: 'dark',
        cssVarPrefix: keyPrefix ?? 'golf-reporting',
        colorSchemeSelector: 'data-color-scheme',
        colorSchemes: {
            light: {
                palette: lightPalette,
            },
            dark: {
                palette: darkPalette,
            },
        },
        ...designTokens,
        typography: deepmerge(typography, {
            h1: {
                ':where([data-color-scheme="dark"]) &': {
                    color: `var(--${keyPrefix ?? 'golf-reporting'}-palette-common-white)`,
                },
            },
            h2: {
                ':where([data-color-scheme="dark"]) &': {
                    color: `var(--${keyPrefix ?? 'golf-reporting'}-palette-grey-100)`,
                },
            },
            h5: {
                ':where([data-color-scheme="dark"]) &': {
                    color: `var(--${keyPrefix ?? 'golf-reporting'}-palette-primary-300)`,
                },
            },
        }),
        ...getThemedComponents(),
    });

type BrandingThemeProviderProps = { keyPrefix?: string; children: React.ReactNode };

export const BrandingThemeProvider: React.FC<BrandingThemeProviderProps> = ({
    keyPrefix,
    children,
}: BrandingThemeProviderProps) => (
    <>
        {getInitColorSchemeScript()}

        <CacheProvider value={createEmotionCache({ key: 'css' })}>
            <ThemeProvider
                theme={theme(keyPrefix ?? 'golf-reporting')}
                defaultMode='dark'
                modeStorageKey={`${keyPrefix ?? 'golf-reporting'}-theme-mode`}
                colorSchemeStorageKey={`${keyPrefix ?? 'golf-reporting'}-theme-color-scheme`}
                noSsr
            >
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    </>
);
