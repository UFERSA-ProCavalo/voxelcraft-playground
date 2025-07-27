import { data } from "react-router";

export async function clientLoader() {
  return data({}, 404);
}
