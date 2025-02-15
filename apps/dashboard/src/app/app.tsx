import { Route, Routes } from 'react-router';

import Box from '@mui/material/Box';

import { BrandingThemeProvider } from '@golf-reporting/shared/ui';

import DashboardFooter from './core/layout/footer';
import DashboardHeader from './core/layout/header';
import About from './pages/about';
import Reports from './pages/reports';

import '../styles/global.scss';

const App: React.FC = () => (
    <BrandingThemeProvider keyPrefix='golf-reporting-dashboard'>
        <Box display='flex' flexDirection='column' height='100%'>
            <DashboardHeader />

            <Box component='main' flex='1 1 auto'>
                <Routes>
                    <Route path='/' element={<Reports />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </Box>

            <DashboardFooter />
        </Box>
    </BrandingThemeProvider>
);

export default App;
