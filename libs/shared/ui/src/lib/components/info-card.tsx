import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export const InfoCard: React.FC<any> = (props: any) => (
    <Paper variant='outlined' sx={{ p: 2, ...props.sx }}>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                '& > div': { minWidth: 'clamp(0px, (150px - 100%) * 999 ,100%)' },
            }}
        >
            <Tooltip
                title={props.location || false}
                placement='right-end'
                describeChild
                slotProps={{
                    popper: {
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [3, 2],
                                },
                            },
                        ],
                    },
                }}
            >
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar
                        variant='rounded'
                        imgProps={{
                            width: '70',
                            height: '70',
                            loading: 'lazy',
                        }}
                        src={props.src}
                        alt={props.name}
                        {...(props.src?.startsWith('https://avatars.githubusercontent.com') && {
                            src: `${props.src}?s=70`,
                            srcSet: `${props.src}?s=140 2x`,
                        })}
                        sx={(theme) => ({
                            width: 70,
                            height: 70,
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'grey.100',
                            backgroundColor: 'primary.50',
                            ...theme.applyDarkStyles({
                                backgroundColor: 'primary.900',
                                borderColor: 'primaryDark.500',
                            }),
                        })}
                    />
                    <Box
                        sx={(theme) => ({
                            width: 24,
                            height: 24,
                            display: 'flex',
                            justifyContent: 'center',
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            backgroundColor: '#FFF',
                            borderRadius: 40,
                            border: '2px solid',
                            borderColor: 'primary.50',
                            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                            transform: 'translateX(50%)',
                            overflow: 'hidden',
                            ...theme.applyDarkStyles({
                                borderColor: 'primary.200',
                            }),
                        })}
                    >
                        <img
                            loading='lazy'
                            height='20'
                            width='40'
                            src={`https://flagcdn.com/${props.locationCountry}.svg`}
                            alt=''
                        />
                    </Box>
                </Box>
            </Tooltip>
            <Box sx={{ mt: -0.5, mr: -0.5, ml: 'auto' }}>
                {props.github && (
                    <IconButton
                        aria-label={`${props.name} GitHub profile`}
                        component='a'
                        href={`https://github.com/${props.github}`}
                        target='_blank'
                        rel='noopener'
                    >
                        {/* <GitHubIcon fontSize='small' sx={{ color: 'grey.500' }} /> */}
                    </IconButton>
                )}
                {props.twitter && (
                    <IconButton
                        aria-label={`${props.name} X profile`}
                        component='a'
                        href={`https://x.com/${props.twitter}`}
                        target='_blank'
                        rel='noopener'
                    >
                        {/* <XIcon fontSize='small' sx={{ color: 'grey.500' }} /> */}
                    </IconButton>
                )}
                {props.linkedin && (
                    <IconButton
                        aria-label={`${props.name} LinkedIn profile`}
                        component='a'
                        href={`https://www.linkedin.com/${props.linkedin}`}
                        target='_blank'
                        rel='noopener'
                    >
                        {/* <LinkedInIcon fontSize='small' sx={{ color: 'grey.500' }} /> */}
                    </IconButton>
                )}
            </Box>
        </Box>
        <Typography variant='body2' sx={{ fontWeight: 'bold', mt: 2, mb: 0.5 }}>
            {props.name}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {props.title}
        </Typography>
        {props.about && <Divider sx={{ my: 1.5 }} />}
        {props.about && (
            <Typography variant='body2' sx={{ color: 'text.tertiary' }}>
                {props.about}
            </Typography>
        )}
    </Paper>
);
