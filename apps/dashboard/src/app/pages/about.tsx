import Container from '@mui/material/Container';

import { InfoCard } from '@golf-reporting/shared/ui';

const me = {
    name: 'Austin Lukaschewski',
    github: 'austinlukaschewski',
    title: 'Software Engineer | Baseball, Golf, Hockey ethusiast.',
    location: 'Fenton, Missouri',
    locationCountry: 'us',
    src: 'https://media.licdn.com/dms/image/v2/C5603AQG5CdXCj76UPQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1600619691486?e=1744848000&v=beta&t=itmRrvTzfD5GrizztGiodbJ86gPqOt_qIgfupjtEUpg',
    twitter: 'jedi_chewski',
    about: "Created this app to aid in my friends & I's golf game. Idea sparked after purchasing two Journal 18 notebooks",
};

const About: React.FC = () => (
    <Container sx={{ marginTop: 4 }}>
        <InfoCard {...me} />
    </Container>
);

export default About;
