import { db } from "$lib/database";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  if (cookies.get("session_token") == undefined) {
    return { error: "Not Logged In" };
  }
  const sessionid = cookies.get("session_token");
  let temp = await db.logoutUser(sessionid);
  console.log("DNJASIKDKHJSAXZBDASHJKLBDSJAHKLBDSAHJKDSBAJKH");
  cookies.set("session_token", "", { path: "/", expires: new Date() });
  throw redirect(307, "/login");
}
