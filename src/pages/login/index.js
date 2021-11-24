/** @jsx jsx */
import { jsx, Container, Box, Button, Input } from "theme-ui";
import React, { useRef, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { schema } from "utils/schemas/login";
import { Label, Text } from "@theme-ui/components";

export default function index() {
  const router = useRouter();
  const [Forms, setForms] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const isUpdated = useRef(false);

  const LoginQuery = gql`
    query LoginQuery($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        auth
        token
      }
    }
  `;

  const [LoginQueryFunction, { called, loading, data }] =
    useLazyQuery(LoginQuery);

  async function SubmitLogin(e) {
    e.preventDefault();
    await schema
      .validate(Forms)
      .then((form) => {
        LoginQueryFunction({
          variables: { email: form.email, password: form.password },
        });
      })
      .catch((err) => {
        console.log(err.name);
        setErrorMessage(err.errors);
      });
  }

  const OnChangeLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForms({
      ...Forms,
      [name]: value,
    });
  };

  if (called === true && data) {
    isUpdated.current = false;
    const token = data["login"].token;

    const decoded = jwt_decode(token);
    const userData = JSON.stringify(decoded);
    localStorage.setItem("user", userData);
    if (decoded.role == "Admin") {
      router.push("/admin");
    } else {
      router.push("/account");
    }
  }

  if (called === true && !data) {
    isUpdated.current = true;
  }

  return (
    <Container>
      <Box sx={styles.container}>
        <h1> Login</h1>

        <Text
          style={{ display: isUpdated.current ? "block" : "none" }}
          sx={styles.errorMessage}
        >
          {" "}
          email ou mot de passe erroné
        </Text>
        {errorMessage && <Text sx={styles.errorMessage}>{errorMessage}</Text>}
        <Box as="form" onSubmit={SubmitLogin}>
          <Label>Email</Label>
          <Input
            type="text"
            name="email"
            id=""
            value={Forms.email}
            onChange={OnChangeLogin}
          />
          <Label>Mot de passe</Label>
          <Input
            sx={styles.bottomField}
            type="password"
            value={Forms.password}
            name="password"
            onChange={OnChangeLogin}
          />
          <Box sx={styles.buttonGroup}>
            <Button
              className={styles.signupForms + " " + styles.SubmitButton}
              type="submit"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                router.push("/");
              }}
              className="donate__btn"
              variant="secondary"
              aria-label="Back"
            >
              Back
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonGroup: {
    display: "flex",
    alignItems: "flex-start",
  },
  bottomField: {
    marginBottom: "10px",
  },
  errorMessage: {
    color: "#DC143C",
  },
};
