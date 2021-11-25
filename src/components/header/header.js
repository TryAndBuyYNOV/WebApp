/** @jsx jsx */
import { jsx, Container, Flex, Button } from "theme-ui";
import { keyframes } from "@emotion/core";
import { Link } from "react-scroll";
import MobileDrawer from "./mobile-drawer";
import menuItems from "./header.data";
import { useRouter } from "next/router";

export default function Header({ className }) {
  const router = useRouter();
  const Deconnect = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <header sx={styles.header} className={className} id="header">
      <Container sx={styles.container}>
        <Link path="/">
          <h1> Try & buy</h1>
        </Link>

        <Flex as="nav" sx={styles.nav}>
          {menuItems.map((menuItem, i) => (
            <Link
              activeClass="active"
              to={menuItem.path}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              key={i}
            >
              {menuItem.label}
            </Link>
          ))}
        </Flex>
        {!localStorage.getItem("user") && (
          <>
            <Button
              onClick={() => {
                router.push("/login");
              }}
              className="donate__btn"
              variant="primary"
              aria-label="Sign In"
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                router.push("/signup");
              }}
              className="donate__btn"
              variant="secondary"
              aria-label="Sign Up"
            >
              Sign Up
            </Button>
          </>
        )}
        {localStorage.getItem("user") && (
          <Button
            onClick={() => {
              Deconnect();
              router.push("/");
            }}
            className="donate__btn"
            variant="secondary"
            aria-label="logout"
          >Logout</Button>
        )}
        <MobileDrawer />
      </Container>
    </header>
  );
}

const positionAnim = keyframes`
  from {
    position: fixed;
    opacity: 1;
  }

  to {
    position: absolute;
    opacity: 1;
    transition: all 0.4s ease;
  }
`;

const styles = {
  header: {
    fontSize: 5,
    color: "#fff",
    fontWeight: "body",
    py: 0,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(50, 50, 50, 0.46)",
    transition: "all 0.4s ease",
    animation: `${positionAnim} 0.4s ease`,
    ".donate__btn": {
      flexShrink: 0,
      mr: [5, 10, null, null, 0],
      ml: ["auto", null, null, null, 0],
    },
    "&.sticky": {
      position: "fixed",
      backgroundColor: "background",
      color: "#000000",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
      py: 0,
      "nav > a": {
        color: "#000000",
      },
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nav: {
    mx: "auto",
    display: "none",
    "@media screen and (min-width: 1024px)": {
      display: "block",
    },
    a: {
      fontSize: 3,
      fontWeight: "body",
      px: 5,
      cursor: "pointer",
      lineHeight: "1.5",
      transition: "all 0.15s",
      color: "#FFFFFF",
      "&:hover": {
        color: "primary",
      },
      "&.active": {
        color: "primary",
      },
    },
  },
};
