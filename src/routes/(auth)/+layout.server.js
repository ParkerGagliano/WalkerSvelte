import { db } from "$lib/database";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  const sessionid = cookies.get("session_token");
  let temp = await db.getUser(sessionid);
  console.log(temp);
  if (temp.error == "Session expired") {
    throw redirect(307, "/login");
  }
  return temp;
}
