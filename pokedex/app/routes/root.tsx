import { redirect } from "react-router-dom";

export function Component() {
  return null;
}

export async function loader() {
  return redirect("/pokemon");
}