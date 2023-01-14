import Users from "$lib/models/users";
import bcrypt from "bcrypt";
import Sessions from "$lib/models/sessions";
import uuid from "uuid";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database";

/** @type {import('./$types').PageServerLoad}Load} */
export async function load({ cookies, parent }) {
  let test = await parent();
  console.log(test, "TEST");
  if (test.authorized == false) {
    return { authorized: false, message: "Not Logged In" };
  }
  let cookie = cookies.get("session_token");
  console.log(cookie, "COOKIE");
  if (cookie) {
    let session = await db.getSession(cookie);
    console.log(session.expiresat, "EXPIRESAT");

    if (session.expiresat > new Date()) {
      throw redirect(307, "/");
    }
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    let data = await event.request.formData();
    let username = data.get("username");
    let password = data.get("password");
    let user = await db.loginUser(username, password);
    event.cookies.set("session_token", user.session_token, { path: "/" });
    throw redirect(307, "/");
  },
};
