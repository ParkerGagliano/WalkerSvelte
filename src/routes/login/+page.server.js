import Users from "$lib/models/users";
import bcrypt from "bcrypt";

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
        return user.toJSON();
      } else {
        return { error: "Password is invalid" };
      }
    } else {
      return { error: "User does not exist" };
    }
    console.log(username, password);
  },
};
