import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
    try {
        const res = await apiRequest("/post/" + params.id);
        return res.data;
    } catch (error) {
        console.error("Failed to load single page data", error);
        return null; // or throw error to handle it in an ErrorBoundary
    }
};

export const listPageLoader = async ({ request, params }) => {
    try {
        const query = request.url.split("?")[1];
        const postPromise = apiRequest("/post?" + query);
        return defer({
          postResponse: postPromise,
        });
    } catch (error) {
        console.error("Failed to load list page data", error);
        return null; // or throw error to handle it in an ErrorBoundary
    }
};