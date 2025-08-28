// // import React from 'react'
// // import {toast} from "react-hot-toast"
// // import { apiConnector } from '../apiconnector';
// // import { catalogData } from '../apis';

// // export const getCatalogaPageData = async(categoryId) => {
// //   const toastId = toast.loading("Loading...");
// //   let result = [];
// //   try{
// //         const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
// //         {categoryId: categoryId,});

// //         if(!response?.data?.success)
// //             throw new Error("Could not Fetch Category page data");

// //          result = response?.data;

// //   }
// //   catch(error) {
// //     console.log("CATALOG PAGE DATA API ERROR....", error);
// //     toast.error(error.message);
// //     result = error.response?.data;
// //   }
// //   toast.dismiss(toastId);
// //   return result;
// // }

// import React from "react";
// import { toast } from "react-hot-toast";
// import { apiConnector } from "../apiconnector";
// import { catalogData } from "../apis";
// const { CATALOGPAGEDATA_API } = catalogData;
// const { CONTACT_US_API } = contactusEndpoint;

// export const getCatalogaPageData = async (categoryId) => {
//   const toastId = toast.loading("Loading...");
//   let result = null;
//   try {
//     const response = await apiConnector(
//       "POST",
//       catalogData.CATALOGPAGEDATA_API,
//       { categoryId: categoryId }
//     );

//     if (!response?.data?.success) {
//       throw new Error("Could not fetch Category page data");
//     }

//     result = response.data;
//   } catch (error) {
//     console.log("CATALOG PAGE DATA API ERROR....", error);

//     toast.error(
//       error?.response?.data?.message ||
//         error.message ||
//         "Something went wrong fetching catalog data"
//     );

//     result = error?.response?.data || { success: false };
//   } finally {
//     toast.dismiss(toastId);
//   }

//   return result;
// };


// export const contactUsAPI = async (formData) => {
//   try {
//     const response = await apiConnector("POST", CONTACT_US_API, formData);
//     return response?.data;
//   } catch (error) {
//     console.log("CONTACT US API ERROR:", error);
//     throw error;
//   }
// }




// services/operations/pageAndComponentData.js
import React from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";
import { contactusEndpoint } from "../apis"; // <<-- ADD this import

const { CATALOGPAGEDATA_API } = catalogData;
const { CONTACT_US_API } = contactusEndpoint; // now safe

export const getCatalogaPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CATALOGPAGEDATA_API, { categoryId });

    // response.data is the API body: { success: true/false, data: ..., message: ... }
    if (!response?.data) {
      // extremely defensive — axios normally throws on non-2xx
      return { success: false, message: "No response body from server" };
    }

    // return the API body (not the full axios response)
    return response.data;
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);

    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Something went wrong fetching catalog data"
    );

    // Return a consistent API-body-shaped object for the caller to handle
    return error?.response?.data || { success: false, message: "Could not fetch Category page data" };
  } finally {
    toast.dismiss(toastId);
  }
};

// contactUsAPI stays same but uses CONTACT_US_API above
export const contactUsAPI = async (formData) => {
  try {
    const response = await apiConnector("POST", CONTACT_US_API, formData);
    return response?.data;
  } catch (error) {
    console.log("CONTACT US API ERROR:", error);
    throw error;
  }
};
