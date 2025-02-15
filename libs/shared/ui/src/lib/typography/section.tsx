import React from 'react';

import Box, { BoxProps } from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

type SectionBackground = 'white' | 'comfort' | 'dim' | 'gradient' | 'transparent';

type SectionProps = {
    bg?: SectionBackground;
    cozy?: boolean;
    noPaddingBottom?: boolean;
} & BoxProps;

type SectionHeadlineProps = {
    alwaysCenter?: boolean;
    description?: React.ReactNode;
    id?: string;
    inverted?: boolean;
    overline?: React.ReactNode;
    title: string | React.ReactElement<React.HTMLAttributes<HTMLElement>>;
};

const bgMap: Record<'white' | 'comfort' | 'dim' | 'transparent', { light: string; dark: string }> = {
    white: {
        light: 'common.white',
        dark: 'primaryDark.900',
    },
    comfort: {
        light: 'grey.50',
        dark: 'primaryDark.900',
    },
    dim: {
        light: 'primaryDark.700',
        dark: 'primaryDark.700',
    },
    transparent: {
        light: 'transparent',
        dark: 'transparent',
    },
};

export const Section = React.forwardRef<HTMLDivElement, SectionProps>((props, ref) => {
    const { bg = 'white', children, sx, cozy = false, noPaddingBottom = false, ...other } = props;

    return (
        <Box
            ref={ref}
            {...other}
            sx={[
                (theme) => ({
                    ...(bg === 'gradient'
                        ? {
                              background: `linear-gradient(#FFF 0%, ${(theme.vars || theme).palette.primary[50]} 100%)`,
                              ...theme.applyDarkStyles({
                                  background: `linear-gradient(${
                                      (theme.vars || theme).palette.primaryDark[900]
                                  } 0%, ${alpha(theme.palette.primary[900], 0.2)} 100%)`,
                              }),
                          }
                        : {
                              bgcolor: bgMap[bg].light,
                              ...theme.applyDarkStyles({
                                  bgcolor: bgMap[bg].dark,
                              }),
                          }),
                    py: cozy ? { xs: 6, sm: 10, md: 12 } : { xs: 4, sm: 12, md: 14 },
                    pb: noPaddingBottom ? '0 !important' : undefined,
                    overflow: 'hidden',
                }),
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <Container>{children}</Container>
        </Box>
    );
});

export const SectionHeadline: React.FC<SectionHeadlineProps> = (props: SectionHeadlineProps) => {
    const { alwaysCenter = false, description, id, inverted = false, overline, title } = props;

    return (
        <Box sx={{ m: alwaysCenter ? 'auto' : null }}>
            {overline && (
                <Typography
                    id={id}
                    component='h2'
                    variant='body2'
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mb: 1,
                        ...(alwaysCenter && {
                            textAlign: 'center',
                        }),
                    }}
                >
                    {overline}
                </Typography>
            )}
            {typeof title === 'string' ? (
                <Typography
                    variant='h2'
                    sx={(theme) => ({
                        maxWidth: 500,
                        ...(inverted
                            ? {
                                  color: '#fff',
                              }
                            : {
                                  color: 'primaryDark.900',
                                  ...theme.applyDarkStyles({
                                      color: 'grey.100',
                                  }),
                              }),
                        ...(alwaysCenter && {
                            textAlign: 'center',
                            maxWidth: '100%',
                        }),
                    })}
                >
                    {title}
                </Typography>
            ) : (
                React.cloneElement(title, {
                    style: {
                        maxWidth: 500,
                        ...(alwaysCenter && {
                            maxWidth: '100%',
                            textAlign: 'center',
                        }),
                        ...(inverted && {
                            color: '#fff',
                        }),
                    },
                })
            )}
            {description && (
                <Typography
                    sx={(theme) => ({
                        mt: 1,
                        mb: 3,
                        maxWidth: 500,
                        ...(inverted
                            ? {
                                  color: 'grey.400',
                              }
                            : {
                                  color: 'grey.800',
                                  ...theme.applyDarkStyles({
                                      color: 'grey.500',
                                  }),
                              }),
                        ...(alwaysCenter && {
                            textAlign: 'center',
                            mx: 'auto',
                        }),
                    })}
                >
                    {description}
                </Typography>
            )}
        </Box>
    );
};
