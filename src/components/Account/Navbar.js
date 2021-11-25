import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import router from "next/router";
const Navbar = ({ role }) => {
  const firstName = JSON.parse(localStorage.getItem("user")).firstName;
  const lastName = JSON.parse(localStorage.getItem("user")).lastName;
  const avatar = JSON.parse(localStorage.getItem("user")).avatar;
  const avatarUrl =
    "https://res.cloudinary.com/dr5vzrsj1/image/upload/v1636461990/tryandbuy/" +
    avatar +
    ".png";

  let navbar = <nav></nav>;

  if (role == "Seller") {
    navbar = (
      <nav className={styles.menu} tabindex="0">
        <div className={styles.smartphone}></div>
        <header className={styles.avatar}>
          <img src={avatarUrl} />
          <h2 className={styles.Name}>{firstName + " " + lastName}</h2>
        </header>
        <ul className={styles.list}>
          <li>
            {" "}
            <Link href="/account/profile"> Mon profile </Link>{" "}
          </li>
          <li>
            {" "}
            <Link href="/account/products/add"> Ajouter produit </Link>{" "}
          </li>
          <li>
            {" "}
            <Link href="/account/products/manage"> Mes ventes </Link>{" "}
          </li>
          <li>
            {" "}
            <Link href="/account/offers"> Mes offres </Link>{" "}
          </li>
          <li>
            {" "}
            <button onClick={() => Deconnect()} href="">
              {" "}
              Déconnexion{" "}
            </button>{" "}
          </li>
        </ul>
      </nav>
    );
  }

  if (role == "Buyer") {
    navbar = (
      <nav className={styles.menu} tabindex="0">
        <div className={styles.smartphone}></div>
        <header className={styles.avatar}>
          <img src={avatarUrl} />
          <h2 className={styles.Name}>{firstName + " " + lastName}</h2>
        </header>
        <ul className={styles.list}>
          <li>
            {" "}
            <Link href="/account/profile"> Mon profile </Link>{" "}
          </li>
          <li>
            {" "}
            <Link href="/account/orders"> Mes commandes </Link>{" "}
          </li>
          <li>
            {" "}
            <Link href="/account/wishlist"> WishList </Link>{" "}
          </li>
          <li>
            {" "}
            <Link href="/account/catalog"> Catalogues </Link>{" "}
          </li>
          <li>
            {" "}
            <Link href="/account/geolocalisation"> géolocalisation </Link>{" "}
          </li>
          <li>
            {" "}
            <button onClick={() => Deconnect()}> Déconnexion </button>{" "}
          </li>
        </ul>
      </nav>
    );
  }

  return <div>{navbar}</div>;
};

export default Navbar;
