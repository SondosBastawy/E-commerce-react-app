import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext();


    // add product to wishList
async function addToWishList(productId) {
  if(localStorage.getItem('userToken')){
    return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
  }
}

async function getWishList() {
  if(localStorage.getItem('userToken')){
    return axios
    .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
  }
}

async function deleteFromWishList(productId) {
  return axios
    .delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}


export default function WishListContextProvider({ children }) {

  let [wishCount, setWishCount] = useState(0);

    return (
        <WishListContext.Provider value={{ getWishList, addToWishList, deleteFromWishList, wishCount, setWishCount }}>
            {" "}
      {children}{" "}
        </WishListContext.Provider>
    );
}