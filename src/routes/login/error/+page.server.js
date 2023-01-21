import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database";

/** @type {import('../$types').PageServerLoad}Load} */
export async function load({ cookies, parent }) {
  let test = await parent();
  if (test.authorized == false) {
    return { authorized: false, message: "Not Logged In" };
  }
  let cookie = cookies.get("session_token");
  if (cookie) {
    let session = await db.getSession(cookie);
    if (session.expiresat > new Date()) {
      throw redirect(307, "/");
    } else {
      let del = await db.deleteSession(cookie);
      return { authorized: false, message: "Session expired" };
    }
  }
}

/** @type {import('../$types').Actions} */
export const actions = {
  default: async (event) => {
    event.cookies.set("session_token", "", { path: "/", expires: new Date() });
    let del = await db.deleteSession(event.cookies.get("session_token"));
    let data = await event.request.formData();
    let username = data.get("username");
    let password = data.get("password");
    let user = await db.loginUser(username, password);
    if (user.error) {
      return user;
    }
    event.cookies.set("session_token", user.session_token, { path: "/" });
    throw redirect(307, "/calculate");
  },
};
