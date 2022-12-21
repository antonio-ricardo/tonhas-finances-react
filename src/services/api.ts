import axios from "axios";

const validStatus = [200, 201, 204, 401];

export const api = axios.create({
  baseURL: "http://localhost:3333",
  validateStatus: function (status) {
    return validStatus.includes(status);
  },
});
