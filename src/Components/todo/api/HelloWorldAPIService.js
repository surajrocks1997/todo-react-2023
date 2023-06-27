import { apiClient } from "./APIClient";

export const retrieveHelloWorld = () => {
    return apiClient.get("/hello-world");
};

export const retrieveHelloWorldPathVariable = (username) =>
    apiClient.get(`/hello-world/path-variable/${username}`);


