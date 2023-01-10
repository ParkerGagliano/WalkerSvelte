import { db } from "$lib/database";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  const sessionid = cookies.get("session_token");
  if (!sessionid) {
    throw redirect(307, "/login");
  }
  let temp = await db.getUser(sessionid);
  if (temp.error == "Session expired") {
    throw redirect(307, "/login");
  }
  console.log(temp);
  cookies.set("session_token", temp.session_token, { path: "./" });
  return temp;
}
