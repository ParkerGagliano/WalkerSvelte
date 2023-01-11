import { db } from "$lib/database";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  const sessionid = cookies.get("session_token");
  if (!sessionid) {
    return { error: "Not Logged In" };
  }
  let temp = await db.getUser(sessionid);

  console.log(temp);
  cookies.set("session_token", temp.session_token, { path: "/" });
  return temp;
}
