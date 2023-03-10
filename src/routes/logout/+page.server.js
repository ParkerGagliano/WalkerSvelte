import { db } from "$lib/database";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, parent }) {
  if (cookies.get("session_token") == undefined) {
    return { error: "Not Logged In" };
  }
  const sessionid = cookies.get("session_token");
  let temp = await db.logoutUser(sessionid);
  cookies.set("session_token", "", { path: "/", expires: new Date() });
  throw redirect(307, "/login");
}
