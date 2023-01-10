import Users from "$lib/models/users";
import bcrypt from "bcrypt";
import Sessions from "$lib/models/sessions";
import uuid from "uuid";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/database";
/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    let data = await event.request.formData();
    let username = data.get("username");
    let password = data.get("password");
    let user = await db.loginUser(username, password);
    event.cookies.set("session_token", user.session_token, { path: "./" });
    throw redirect(307, "/");
  },
};
