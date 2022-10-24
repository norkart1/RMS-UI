import axios from "axios"

class Api {
    axiosClient;

    constructor() {
        this.axiosClient = axios.create({
            baseUrl: process.env.BASE_URL,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
    }

    async get(path, queryParams = {}, intercept = false) {
        // TODO: Add access token if it needs to be intercepted

        return (await this.axiosClient.get(path, {
            params: queryParams
        })).data;
    }

    async post(path, body = null, intercept = false) {
         // TODO: Add access token if it needs to be intercepted
         return (await this.axiosClient.post(path, body)).data;
    }
}

export const api = new Api();