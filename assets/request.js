import axios from "axios";

export async function getData(api, upit) {
  try {
    const { data } = await axios.get(api, {
      params: upit,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}
