import { apiClient } from "./APIClient";

export const retrieveAllTodosForUsernameAPI = (username) =>
    apiClient.get(`/users/${username}/todos`);

export const deleteToDoAPI = (username, id) =>
    apiClient.delete(`/users/${username}/todos/${id}`);

export const retrieveToDoAPI = (username, id) =>
    apiClient.get(`/users/${username}/todos/${id}`);

export const updateToDoAPI = (username, id, todo) =>
    apiClient.put(`/users/${username}/todos/${id}`, todo);

export const createToDoAPI = (username, todo) =>
    apiClient.post(`/users/${username}/todos`, todo);
