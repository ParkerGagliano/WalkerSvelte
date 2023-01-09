import Users from "$lib/models/users";
import bcrypt from "bcrypt";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    let data = await event.request.formData();
    let username = data.get("username");
    let password = data.get("password");
    let user;
    let confirmpassword = data.get("confirmpassword");
    let userExists = await Users.query().where("username", username);
    if (userExists.length > 0) {
      console.log("User already exists");
    } else {
      if (password != confirmpassword) {
        console.log("Passwords do not match");
      } else {
        user = await Users.query().insert({
          username: username,
          password: bcrypt.hashSync(password, 8),
        });
        console.log(user);
      }
      console.log(user);
      return user.toJSON();
    }
  },
};
