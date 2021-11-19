/** @jsx jsx */
import { jsx, Box, Container, Image, Text } from 'theme-ui';
import { Link } from 'react-scroll';
import data from './footer.data';
import FooterLogo from 'assets/logo.svg';
import { FaFacebookF, FaTwitter, FaGithubAlt, FaDribbble } from 'react-icons/fa';

const social = [
  {
    path: '/',
    icon: <FaFacebookF />,
  },
  {
    path: '/',
    icon: <FaTwitter />,
  },
  {
    path: '/',
    icon: <FaGithubAlt />,
  },
  {
    path: '/',
    icon: <FaDribbble />,
  },
];

export default function Footer() {
  return (
    <footer sx={styles.footer}>
    <Container>
      <Box sx={styles.footer.footerBottomArea}>
        <Link path="/">
          <h1> Try & buy</h1>
        </Link>
        <Box sx={styles.menuFooter}>
          <Box sx={styles.social}>
            {social.map((socialItem, i)=>(
              <Box as="span" key={i} sx={styles.icon}>
                <Link to={socialItem.path}>
                  {socialItem.icon}
                </Link>
              </Box>
             ))}
          </Box>
        </Box>
          <Text sx={styles.footer.copyright}>
          - LEGAL NOTICE - CREDITS - COOKIES -
          </Text>
      </Box>
    </Container>
  </footer>
    
  );
}

const styles = {
  footer: {
    footerBottomArea: {
      borderTop: '1px solid',
      borderTopColor: 'border_color',
      display: 'flex',
      pt: [7, null, 8],
      pb: ['40px', null, '100px'],
      textAlign: 'center',
      flexDirection: 'column',
    },
    menus: {
      mt: [3, 4],
      mb: 2,
      nav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
    },

    link: {
      fontSize: [1, '15px'],
      color: 'text',
      fontWeight: '400',
      mb: 2,
      cursor: 'pointer',
      transition: 'all 0.35s',
      display: 'block',
      textDecoration: 'none',
      lineHeight: [1.5, null, 1.8],
      px: [2, null, 4],
      ':hover': {
        color: 'primary',
      },
    },
    copyright: {
      fontSize: [1, '15px'],
      width: '100%',
    },
  },
};
