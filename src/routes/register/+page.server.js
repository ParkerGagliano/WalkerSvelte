import Users from "$lib/models/users";
import bcrypt from "bcrypt";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    let data = await event.request.formData();
    let username = data.get("username");
    let password = data.get("password");
    let user;
    let confirmpassword = data.get("confirmpassword");
    if (username == "" || password == "" || confirmpassword == "") {
      return { error: "Please fill out all fields" };
    }
    if (username.length < 2) {
      return { error: "Username must be at least 3 characters" };
    }
    if (password.length < 6) {
      return { error: "Password must be at least 6 characters" };
    }

    let userExists = await Users.query().where("username", username);
    if (userExists.length > 0) {
      return { error: "User already exists" };
    } else {
      if (password != confirmpassword) {
        return { error: "Passwords dont match" };
      } else {
        user = await Users.query().insert({
          username: username,
          password: bcrypt.hashSync(password, 8),
        });
      }

      throw redirect(307, "/login");
    }
  },
};
