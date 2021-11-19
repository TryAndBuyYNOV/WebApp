/** @jsx jsx */
import { jsx, Container, Box, Grid, Text, Heading, Button, Image } from 'theme-ui';
import TextFeature from 'components/text-feature';

import FeatureThumb from 'assets/service-thumb.jpg';
import { Link } from '@theme-ui/components';

const data = {
  
  title: 'For salers',
  features: [
    {
      id: 1,
      title: '1.',
      text:
        'Take a picture of your product & place it',
    },
    {
      id: 2,
      title: '2.',
      text:
        'Deal with your customers & sale it',
    },
    {
      id: 3,
      title: '3.',
      text:
        'Send Your product & get paid !',
    },
  ],
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  btnName: 'REGISTER',
  btnURL: 'MORE INFORMATION',
};

export default function CoreFeature() {
  return (
   <section sx={{variant: 'section.coreFeature'}}>
    <Container sx={styles.containerBox}>
    <Box sx={styles.thumbnail}>
        <Image src={FeatureThumb} alt="Thumbnail" />
      </Box>
      <Box sx={styles.contentBox}>
      <TextFeature title={data.title}/>
           <Grid sx={styles.grid}>
             {data.features.map((feature)=>(
              <Box sx={styles.card} key={feature.id}>
                <Box sx={styles.wrapper}>
                  <Heading sx={styles.title}>
                    {feature.title}
                  </Heading>
                  <Text sx={styles.subTitle}>
                    {feature.text}
                  </Text>
                </Box>
              </Box>
             ))}
           </Grid>
        <TextFeature 
          description={data.description}
        />
        <Button sx={styles.btnName}>
          {data.btnName}
        </Button>
        <Link>
          {data.btnURL}
        </Link>
      </Box>
    </Container>
   </section>
  );
}

const styles = {
  containerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: ['wrap', null, null, 'nowrap'],
    pb: [0, 7, 0, null, 7],
  },
  contentBox: {
    flexShrink: 0,
    px: [0, null, '30px', 0],
    textAlign: ['center', null, null, 'left'],
    width: ['100%', '80%', null, 340, 400, 430, null, 485],
    pb: ['50px', '60px', '50px', '50px'],
    ml: ['auto', null, null, null, 7],
    mx: ['auto', null, null, 0],
    '.description': {
      pr: [0, null, 6, 7, 6],
    },
  },
  grid: {
    mb: -1,
    pt: 0,
    gridGap: [
      '35px 0',
      null,
      '45px 30px',
      null,
      '50px 25px',
      null,
      null,
      '50px 65px',
    ],
    gridTemplateColumns: [
      'repeat(1,1fr)',
      null,
      'repeat(2,1fr)',
      null,
      'repeat(4,1fr)',
    ],
  },
  thumbnail: {
    display: 'inline-flex',
    position: 'relative',
    mr: 'auto',
    ml: ['auto', null, null,null , null],
    '> img': {
      position: 'relative',
      zIndex: 1,
      height: [210, 'auto'],
    },
  },
  shapeBox: {
    position: 'absolute',
    bottom: -65,
    right: -165,
    zIndex: -1,
    display: ['none', 'inline-block', 'none', null, 'inline-block'],
  },
};
