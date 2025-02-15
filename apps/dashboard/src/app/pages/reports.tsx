import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import { GradientText, Section, SectionHeadline } from '@golf-reporting/shared/ui';

const reports = [
    {
        overline: 'Scorecard + Club Distances',
        title: 'Simple',
        description: 'Blank card to fill out your scorecard and keep track of your club distances',
    },
    {
        overline: 'Scorecard + Shot plots',
        title: 'Moderate',
        description: 'Blank card to fill out your scorecard, plot your drives and approach shots',
    },
    {
        overline: 'Shot plots + Club Distances',
        title: 'Advanced',
        description: 'Blank card to plot your drives and approach shots and keep track of your distances',
    },
];

const Reports: React.FC = () => (
    <Grid container>
        {reports.map((report, i) => (
            <Grid key={i} size={{ xs: 12, lg: 4 }}>
                <Section bg='transparent' cozy>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: { xs: 'auto', sm: 'center' },
                        }}
                    >
                        <SectionHeadline
                            alwaysCenter
                            overline={report.overline}
                            title={
                                <Typography variant='h2'>
                                    <GradientText>{report.title}</GradientText>
                                </Typography>
                            }
                            description={report.description}
                        />
                        <Button variant='contained' sx={{ flexShrink: 0 }} endIcon={<DownloadIcon />} disabled>
                            Download
                        </Button>
                    </Box>
                </Section>
            </Grid>
        ))}
    </Grid>
);

export default Reports;
