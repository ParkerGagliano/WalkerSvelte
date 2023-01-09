import Users from "$lib/models/users";
import bcrypt from "bcrypt";
import Sessions from "$lib/models/sessions";
import uuid from "uuid";
import { redirect } from "@sveltejs/kit";
/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    let data = await event.request.formData();
    let username = data.get("username");
    let password = data.get("password");
    let user = await Users.query().where("username", username);
    user = user[0];
    if (user != undefined) {
      console.log(password, user.password);
      let passwordIsValid = await bcrypt.compare(password, user.password);
      if (passwordIsValid) {
        const sessionToken = uuid.v4();

        // set the expiry time as 120s after the current time
        const now = new Date();
        const expiresAt = new Date(+now + 120 * 1000);

        // create a session containing information about the user and expiry time
        let ins = await Sessions.query().insert({
          token: sessionToken,
          username: username,
          expiresat: expiresAt,
        });
        event.cookies.set("session_token", sessionToken, {
          path: "/",
        });
        return user.toJSON();
      } else {
        return { error: "Password is invalid" };
      }
    } else {
      return { error: "User does not exist" };
    }
  },
};
