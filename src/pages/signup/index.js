/** @jsx jsx */
import { jsx, Container, Box, Button, Text } from "theme-ui";
import { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import AutoComplete from "react-google-autocomplete";
import { useRouter } from "next/router";
import ProfilPicture from "components/Profile/picture";
import image from "../../assets/team/member-5.png";
import axios from "axios";
import { schema } from "utils/schemas/signup";
import { Input, Label, Select } from "@theme-ui/components";

export default function index() {
  // Hooks
  const [Forms, setForms] = useState({
    firstName: "",
    lastName: "",
    numero: "",
    email: "",
    password: "",
    address: {
      lat: 0,
      lng: 0,
      localisation: "",
    },
    role: "Seller",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setError] = useState(false);
  const [picturData, setPictur] = useState({
    pictur: image,
    file: "",
  });
  const router = useRouter();
  const isRef = useRef(false);
  //GraphQl queries

  const creatUser = gql`
    mutation CreateUser(
      $firstName: String!
      $lastName: String!
      $phoneNumber: String!
      $address: AddressInput!
      $email: String!
      $password: String!
      $avatar: String!
      $role: String!
    ) {
      createUser(
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        address: $address
        email: $email
        password: $password
        avatar: $avatar
        role: $role
      ) {
        id
      }
    }
  `;

  const [createUserFunction, { data, loading, error }] = useMutation(creatUser);

  // Event functions
  const SubmitForms = async (e) => {
    e.preventDefault();
    isRef.current = true;
    const data = new FormData();
    data.append("file", picturData.file);
    data.append("upload_preset", "tryandbuy");
    await schema
      .validate(Forms)
      .then(() => {
        axios
          .post("https://api.cloudinary.com/v1_1/dr5vzrsj1/image/upload", data)
          .then((result) => {
            const picturName = result["data"].public_id.split("/")[1];

            doSignUp(picturName);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err.name);
        setErrorMessage(err.errors);
      });
  };

  const doSignUp = (picturName) => {
    createUserFunction({
      variables: {
        firstName: Forms.firstName,
        lastName: Forms.lastName,
        phoneNumber: Forms.numero,
        address: Forms.address,
        email: Forms.email,
        password: Forms.password,
        avatar: picturName,
        role: Forms.role,
      },
    })
      .then((result) => {
        if (result.data.createUser == null) {
          setError(true);
        } else {
          alert("utilisateur crée avec succès");
          router.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const FormsOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForms({
      ...Forms,
      [name]: value,
    });
  };

  const changePicturHandler = (event) => {
    const path = URL.createObjectURL(event.target.files[0]);
    setPictur({
      pictur: path,
      file: event.target.files[0],
    });
  };

  const AutoCompletComponent = ({ state, style }) => {
    const [inputValue, setInputValue] = useState(state.address.localisation);

    const onChangeInputHandler = (event) => {
      const value = event.target.value;
      setInputValue(value);
    };

    return (
      <AutoComplete
        style={style}
        value={inputValue}
        onChange={onChangeInputHandler}
        apiKey={"AIzaSyAXcZLzg7Ut2hABj8Yo2ekpYuowcwKeBas"}
        onPlaceSelected={(place) => {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const localisation = place.formatted_address;
          setForms({
            ...state,
            address: {
              lat: lat,
              lng: lng,
              localisation: localisation,
            },
          });
        }}
        options={{ types: ["address"] }}
      />
    );
  };
  return (
    <Container>
      <Box>
        <h1> Sign Up</h1>
        <Text
          style={{ display: isError ? "block" : "none" }}
          sx={styles.errorMessage}
        >
          {" "}
          email existe dèja
        </Text>
        {errorMessage && <Text className={styles.errorMessage}>{errorMessage}</Text>}
        <Box as="form" onSubmit={SubmitForms}>
          <ProfilPicture
            profilePic={picturData}
            changeHandler={changePicturHandler}
          />
          <Label>Prénom</Label>
          <Input
            type="text"
            name="firstName"
            value={Forms.firstName}
            onChange={FormsOnChange}
          />
          <Label>Nom</Label>

          <Input
            type="text"
            name="lastName"
            value={Forms.lastName}
            onChange={FormsOnChange}
          />
          <Label>Téléphone</Label>

          <Input
            type="text"
            name="numero"
            value={Forms.numero}
            onChange={FormsOnChange}
          />
          <Label>Email</Label>

          <Input
            type="email"
            name="email"
            value={Forms.email}
            onChange={FormsOnChange}
          />
          <Label>Mot de passe</Label>
          <Input
            type="password"
            name="password"
            value={Forms.password}
            onChange={FormsOnChange}
          />
          <Label>Adresse</Label>
          <AutoCompletComponent state={Forms} style={styles.autocomplete} />
          <Label>Rôle</Label>
          <Select
            sx={styles.select}
            onChange={FormsOnChange}
            name=""
            id=""
            name="role"
          >
            <option selected value="Seller">
              Vendeur
            </option>
            <option value="Buyer">Acheteur</option>
          </Select>
          <Box sx={styles.container}>
            <Button
              className={styles.signupForms + " " + styles.SubmitButton}
              type="submit"
            >
              Sign Up
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
    alignItems: "left",
    justifyContent: "flex-start",
  },
  autocomplete: {
    width: "100%",
    borderRadius: "8px",
    borderColor: "#E5ECF4",
    padding: "2%",
    marginBottom: "10px",
  },
  errorMessage: {
    color: "#DC143C"
  },
  select: {
    marginBottom: "10px",
  },
};
