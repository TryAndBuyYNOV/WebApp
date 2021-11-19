import React, { useRef, useState } from "react";
import styles from "./SignUp.module.scss";
import { gql, useMutation } from "@apollo/client";
import AutoComplete from "react-google-autocomplete";
import { useRouter } from "next/router";
import ProfilPicture from "components/Profile/picture";
import image from "../../assets/team/member-5.png";
import axios from "axios";
import { schema } from "utils/schemas/signup";

const index = () => {
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

  const AutoCompletComponent = ({ state }) => {
    const [inputValue, setInputValue] = useState(state.address.localisation);

    const onChangeInputHandler = (event) => {
      const value = event.target.value;
      setInputValue(value);
    };

    return (
      <AutoComplete
        className={styles.signupForms}
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
    <div className={styles.container}>
      <h1> Sign Up</h1>
      <p
        style={{ display: isError ? "block" : "none" }}
        className={styles.ErrorMessage}
      >
        {" "}
        email existe dèja
      </p>
      {errorMessage && <p className={styles.ErrorMessage}>{errorMessage}</p>}
      <form onSubmit={SubmitForms}>
        <ProfilPicture
          profilePic={picturData}
          changeHandler={changePicturHandler}
        />
        <input
          type="text"
          className={styles.signupForms}
          placeholder="Nom..."
          name="firstName"
          value={Forms.firstName}
          onChange={FormsOnChange}
        />
        <input
          type="text"
          className={styles.signupForms}
          placeholder="Prénom..."
          name="lastName"
          value={Forms.lastName}
          onChange={FormsOnChange}
        />
        <input
          type="text"
          className={styles.signupForms}
          placeholder="Numéro de télephone..."
          name="numero"
          value={Forms.numero}
          onChange={FormsOnChange}
        />
        <input
          type="email"
          className={styles.signupForms}
          placeholder="Email..."
          name="email"
          value={Forms.email}
          onChange={FormsOnChange}
        />
        <input
          type="password"
          className={styles.signupForms}
          placeholder="mot de passe..."
          name="password"
          value={Forms.password}
          onChange={FormsOnChange}
        />

        <AutoCompletComponent state={Forms} />

        <select
          onChange={FormsOnChange}
          className={styles.signupForms}
          name=""
          id=""
          name="role"
        >
          <option selected value="Seller">
            Vendeur
          </option>
          <option value="Buyer">Acheteur</option>
        </select>

        <button
          className={styles.signupForms + " " + styles.SubmitButton}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default index;
