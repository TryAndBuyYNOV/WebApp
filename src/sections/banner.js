/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Container, Box, Heading, Text, Image, Button } from 'theme-ui';
import BannerImg from 'assets/banner-thumb.jpg';

export default function Banner() {
  return (
    <section sx={styles.banner} id="home">
      <container sx={styles.banner.container}>
        
        <Box sx={styles.banner.imageBox}>
        <Box sx={styles.banner.contentBox}>
          <Text as="h2" variant="heroSecondary" color="#ddd">
            <br/><br/><br/><br/>
            Discover
          </Text>
          <Heading as="h1" variant="heroPrimary" color="#fff">
            Second Hand
          </Heading>
          <Heading as="h1" variant="heroPrimary" color="#fff">
            Elegant Outfit
          </Heading>
        </Box>

        </Box>
      </container>   
    </section>
  );
}

const styles = {
  banner: {
    pt: [ null, null, null, null, null, null, null, null],
    pb: [null, null, null, null, null, null, null, null],
    position: 'relative',
    height:'950px',
    zIndex: 2,
    container: {
      minHeight: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    contentBox: {
      width: ['100%', '100%', '535px', null, '87%', '60%', '58%', '60%'],
      mx: 'auto',
      textAlign: 'center',
      mb: ['80px', null, null, null, null, '250px'],
    },
    imageBox: {
      backgroundColor: 'primary',
      backgroundImage: `url(${BannerImg})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      position: 'relative',
      py: [8, null, 9, null, null, 10],
    },
  },
};
