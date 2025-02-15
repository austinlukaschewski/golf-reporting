import { NavLink } from 'react-router';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import { alpha, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { ThemeModeToggle } from '@golf-reporting/shared/ui';

const Navigation = styled('nav')(({ theme }) => [
    {
        '& > div': {
            cursor: 'default',
        },
        '& ul': {
            padding: 0,
            margin: 0,
            listStyle: 'none',
            display: 'flex',
        },
        '& li': {
            ...theme.typography.body2,
            color: (theme.vars || theme).palette.text.secondary,
            fontWeight: theme.typography.fontWeightSemiBold,
            '& > a, & > button': {
                display: 'inline-block',
                color: 'inherit',
                font: 'inherit',
                textDecoration: 'none',
                padding: theme.spacing('6px', '8px'),
                borderRadius: (theme.vars || theme).shape.borderRadius,
                border: '1px solid transparent',
                '&:hover': {
                    color: (theme.vars || theme).palette.text.primary,
                    backgroundColor: (theme.vars || theme).palette.grey[50],
                    borderColor: (theme.vars || theme).palette.grey[100],
                    '@media (hover: none)': {
                        backgroundColor: 'initial',
                        // Reset on touch devices, it doesn't add specificity
                    },
                },
                '&:focus-visible': {
                    outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
                    outlineOffset: '2px',
                },
            },
        },
    },
    theme.applyDarkStyles({
        '& li': {
            '& > a, & > button': {
                '&:hover': {
                    color: (theme.vars || theme).palette.primary[50],
                    backgroundColor: alpha(theme.palette.primaryDark[700], 0.8),
                    borderColor: (theme.vars || theme).palette.divider,
                },
            },
        },
    }),
]);

const StyledHeader = styled('header')(({ theme }) => [
    {
        position: 'sticky',
        top: 0,
        transition: theme.transitions.create('top'),
        zIndex: theme.zIndex.appBar,
        backgroundColor: theme.palette.background.paper,
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
        boxShadow: theme.shadows[2],
    } as const,
    theme.applyDarkStyles({
        // backgroundColor: alpha(theme.palette.primaryDark[900], 0.7),
        backgroundColor: alpha(theme.palette.background.paper, 0.7),
    }),
]);

const StyledHeaderTitle = styled(Typography)(({ theme }) => [
    { color: (theme.vars || theme).palette.custom.efxGrey } as const,
    theme.applyDarkStyles({ color: (theme.vars || theme).palette.primary[500] }),
]);

const DashboardHeader: React.FC = () => (
    <StyledHeader>
        <Container sx={{ display: 'flex', alignItems: 'center', minHeight: 60 }}>
            <Box flex='1 1 auto' display='flex' alignItems='center'>
                <StyledHeaderTitle variant='h4' fontWeight='bold' fontStyle='italic' marginRight={4}>
                    Dashboard
                </StyledHeaderTitle>
            </Box>
            <Box display='flex' alignItems='center' gap={4}>
                <Navigation>
                    <ul>
                        <li>
                            <NavLink to='/about'>
                                <ButtonBase>About</ButtonBase>
                            </NavLink>
                        </li>
                    </ul>
                </Navigation>
                <ThemeModeToggle />
            </Box>
        </Container>
    </StyledHeader>
);

export default DashboardHeader;
