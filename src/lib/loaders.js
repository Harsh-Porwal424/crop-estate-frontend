import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
    console.log(params.id);
  const res = await apiRequest("/post/" + params.id);
  return res.data;
};