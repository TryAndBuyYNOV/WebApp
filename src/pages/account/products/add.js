/** @jsx jsx */
import {
  jsx,
  Container,
  Box,
  Button,
  Text,
  Label,
  Select,
  Input,
} from "theme-ui";
import React, { useRef, useState } from "react";
import Navbar from "../../../components/Account/Navbar";
import { gql, useMutation } from "@apollo/client";
import axios from "axios";
import withAuth from "HOC/withAuth";
import { schema } from "../../../utils/schemas/product";
import { Textarea } from "@theme-ui/components";

const AddProduct = () => {
  // React Hooks
  const [Forms, setForms] = useState({
    title: "",
    price: 0.0,
    description: "",
    category: "Shoes",
  });

  const [pictursStat, setPicturStat] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const InputPicturRef = useRef();

  const ID = JSON.parse(localStorage.getItem("user")).id;
  const ROLE = JSON.parse(localStorage.getItem("user")).role;
  // event functions

  const addProduct = (picturNamesArray) => {
    AddProductFunction({
      variables: {
        title: Forms.title,
        priceHT: parseFloat(Forms.price),
        description: Forms.description,
        category: Forms.category,
        imgUrl: picturNamesArray,
        userId: ID,
      },
    })
      .then((result) => {
        alert("produit ajouté avec succès");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitProduct = async (event) => {
    event.preventDefault();
    let picturNamesArray = [];

    await schema
      .validate(Forms)
      .then((form) => {
        pictursStat.map((pictur) => {
          const data = new FormData();
          data.append("file", pictur);
          data.append("upload_preset", "tryandbuy");
          return axios
            .post(
              "https://api.cloudinary.com/v1_1/dr5vzrsj1/image/upload",
              data
            )
            .then((result) => {
              const picturName = result["data"].public_id.split("/")[1];
              picturNamesArray.push(picturName);
              if (picturNamesArray.length == pictursStat.length) {
                addProduct(picturNamesArray);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((err) => {
        console.log(err.name);
        setErrorMessage(err.errors);
      });
  };

  const choosePicturHandler = (event) => {
    const files = event.target.files;

    let newPicturArray = [];
    for (let index = 0; index < files.length; index++) {
      newPicturArray.push(files[index]);
    }

    setPicturStat(newPicturArray);
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForms({
      ...Forms,
      [name]: value,
    });
  };

  // graphql query
  const ADD_PRODUCT = gql`
    mutation AddProduct(
      $title: String!
      $priceHT: Float!
      $description: String!
      $category: String!
      $imgUrl: [String!]
      $userId: ID!
    ) {
      createProduct(
        title: $title
        priceHT: $priceHT
        description: $description
        category: $category
        imgUrl: $imgUrl
        userId: $userId
      ) {
        id
      }
    }
  `;

  // Api Calls
  const [AddProductFunction, { data, loading, error }] =
    useMutation(ADD_PRODUCT);

  // logic functions

  return (
    <Container sx={styles.container}>
      <Box>
        <Navbar role={ROLE} />
      </Box>
      <Box sx={styles.content}>
        <Text sx={styles.title}> AJOUTER PRODUIT </Text>
        {errorMessage && <Text sx={styles.errorMessage}>{errorMessage}</Text>}
        <Box as="form" onSubmit={onSubmitProduct}>
          <Label htmlFor="title">Titre:</Label>
          <Input
            type="text"
            sx={styles.fieldForm}
            name="title"
            id="title"
            value={Forms.title}
            onChange={changeHandler}
          />

          <Label htmlFor="price">Prix:</Label>
          <Input
            type="number"
            step="0.01"
            sx={styles.fieldForm}
            name="price"
            id="price"
            value={Forms.price}
            onChange={changeHandler}
          />

          <Label htmlFor="description">Description:</Label>
          <Textarea
            rows="7"
            sx={styles.fieldForm}
            name="description"
            id="description"
            value={Forms.description}
            onChange={changeHandler}
          />

          <Label htmlFor="category">Catégorie:</Label>
          <Select
            onChange={changeHandler}
            sx={styles.fieldForm}
            name="category"
            id="category"
          >
            <option
              selected={Forms.category == "Shoes" || "" ? true : false}
              value="Shoes"
            >
              Chaussures
            </option>

            <option
              selected={Forms.category == "TShirt" ? true : false}
              value="TShirt"
            >
              {" "}
              T-Shirt
            </option>

            <option
              selected={Forms.category == "Pants" ? true : false}
              value="Pants"
            >
              {" "}
              Pantalon
            </option>

            <option
              selected={Forms.category == "Jacket" ? true : false}
              value="Jacket"
            >
              {" "}
              Veste
            </option>

            <option
              selected={Forms.category == "Coat" ? true : false}
              value="Coat"
            >
              {" "}
              Manteau
            </option>

            <option
              selected={Forms.category == "Accessory" ? true : false}
              value="Accessory"
            >
              {" "}
              Accessoire
            </option>
          </Select>

          <input
            ref={InputPicturRef}
            style={{ display: "none" }}
            multiple
            type="file"
            name=""
            id=""
            onChange={choosePicturHandler}
          />
          <Box sx={{ marginTop: "15px" }}>
            <Button
              name="modifier"
              className="donate__btn"
              variant="primary"
              aria-label="add pictures"
              onClick={() => InputPicturRef.current.click()}
            >
              Ajouter des images
            </Button>

            <Button
              name="modifier"
              className="donate__btn"
              variant="secondary"
              aria-label="add product"
              type="submit"
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "7%",
  },
  content: {
    marginTop: "150px",
    width: "80%",
  },
  title: {
    textDecoration: "underline",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 7,
  },
  fieldForm: {
    width: "100%",
  },
  errorMessage: {
    color: "#DC143C",
  },
};
export default withAuth(AddProduct);
