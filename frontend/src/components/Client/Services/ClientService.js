import axios from "axios";
import StorageService from "../../../util/StorageService";

// Base URL for your API
const BASIC_URL = "http://localhost:8080/";

// Create Authorization header
const createAuthorizationHeader = () => {
  const token = StorageService.getToken();
  console.log("Retrieved Token:", token);
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const ClientService = {
  // Post an post
  postAd(PostDTO) {
    console.log("postDto");
    console.log(PostDTO); //debugging

    console.log("fetching endpoint");
    const userId = StorageService.getUserId();
    try {
      return axios.post(`${BASIC_URL}api/client/post/${userId}`, PostDTO, {
        headers: createAuthorizationHeader(),
      });
    } catch (error) {
      console.error(error);
    }
  },

  // Get all Ads for a user
  //   getAllAdsByUserId() {
  //     const userId = StorageService.getUserId();
  //     return axios.get(`${BASIC_URL}api/company/ads/${userId}`, {
  //       headers: createAuthorizationHeader(),
  //     });
  //   },

  //   // Get an Ad by ID
  //   getAdById(adId) {
  //     return axios.get(`${BASIC_URL}api/company/ad/${adId}`, {
  //       headers: createAuthorizationHeader(),
  //     });
  //   },

  //   // Update an Ad
  //   updateAd(adId, adDTO) {
  //     return axios.put(`${BASIC_URL}api/company/ad/${adId}`, adDTO, {
  //       headers: createAuthorizationHeader(),
  //     });
  //   },

  //   // Delete an Ad
  //   deleteAd(adId) {
  //     return axios.delete(`${BASIC_URL}api/company/ad/${adId}`, {
  //       headers: createAuthorizationHeader(),
  //     });
  //   },

  //   // Get all Ad bookings
  //   getAllAdBookings() {
  //     const companyId = getUserId();
  //     return axios.get(`${BASIC_URL}api/company/bookings/${companyId}`, {
  //       headers: createAuthorizationHeader(),
  //     });
  //   },

  //   // Change booking status
  //   changeBookingStatus(bookingId, status) {
  //     return axios.get(`${BASIC_URL}api/company/booking/${bookingId}/${status}`, {
  //       headers: createAuthorizationHeader(),
  //     });
  //   },
};
