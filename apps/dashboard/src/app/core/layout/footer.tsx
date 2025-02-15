import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const DashboardFooter: React.FC = () => (
    <Box
        component='footer'
        sx={(theme) => ({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            backgroundColor: 'background.paper',
        })}
    >
        <Typography variant='body2' color='grey.500'>
            Copyright &copy; Austin Lukaschewski, 2025. All Rights Reserved.
        </Typography>
    </Box>
);

export default DashboardFooter;
