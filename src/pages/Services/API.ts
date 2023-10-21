import axios from "axios";

export const getData = async (pathName: string) => {
  try {
    const response = await axios.get("http://localhost:3000/" + pathName);
    return response.data;
  } catch (error) {}
};

export const createData = async (pathName: string, data: any) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/" + pathName,
      data
    );
    return response.data;
  } catch (error) {}
};
export const deleteData = async (pathName: string, id: string) => {
  try {
    const response = await axios.delete(
      "http://localhost:3000/" + pathName + "/" + id
    );
    return response.data;
  } catch (error) {}
};

export const updateData = async (pathName: string, id: string, data: any) => {
  try {
    const response = await axios.patch(
      "http://localhost:3000/" + pathName + "/" + id,
      data
    );
    return response.data;
  } catch (error) {}
};
