import { db } from "$lib/database";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  if (cookies.get("session_token") == undefined) {
    return { error: "Not Logged In" };
  }
  const sessionid = cookies.get("session_token");
  let temp = await db.logoutUser(sessionid);
  if (temp == 0) {
    cookies.set("session_token", "", { path: "/", expires: new Date() });
    return { message: "Logged out successfully" };
  }

  return { error: "Error logging out" };
}
