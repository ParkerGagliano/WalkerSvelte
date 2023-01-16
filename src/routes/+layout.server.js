import { db } from "$lib/database";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  const sessionid = cookies.get("session_token");

  if (!sessionid) {
    return { authorized: false, message: "Not Logged In" };
  }
  let temp = await db.getUser(sessionid);
  if (temp.error) {
    return { authorized: false, message: "Session expired" };
  }
  cookies.set("session_token", temp.session_token, { path: "/" });
  temp.authorized = true;
  return temp;
}
