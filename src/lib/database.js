import Knex from "knex";
import knexConfig from "./knexfile";
import { Model } from "objection";
import Sessions from "./models/sessions";
import Users from "./models/users";
import Addresses from "./models/addresses";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

//CALLING GETRUSER THAT DELETES OLD TOKEN THEN CALLS ADD ADDY THAT NEEDS OLDER ONE THATS DELETED
//TODO
// Delete sessions that are expired AAA
// Add delte to all items DONE
// fix coordinates of beach accesses need
// fix title and favicon
// overall clean code up
// Fix homepage vs calc auth DIBE
// look into passing auth status from layout/navbar to other things BETTER/DONE

//fix login errors
//use slug on login to define if theres an error or not YES
const knex = Knex(knexConfig.development);
Model.knex(knex);
let init = false;
async function createSchema() {
  if (await knex.schema.hasTable("docs")) {
    return;
  }

  await knex.schema.createTable("docs", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.string("content");
    table.integer("owner_id").references("users.id");
  });
  if (await knex.schema.hasTable("users")) {
    return;
  }

  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").unique();
    table.string("password");
  });
  if (await knex.schema.hasTable("addresses")) {
    return;
  }
  await knex.schema.createTable("addresses", (table) => {
    table.increments("id").primary();
    table.string("origin_address");
    table.string("destination_address");
    table.integer("walktime");
    table.integer("drivetime");
    table.integer("owner_id");
  });
  if (await knex.schema.hasTable("sessions")) {
    return;
  }
  await knex.schema.createTable("sessions", (table) => {
    table.increments("id").primary();
    table.string("token").unique();
    table.integer("user_id");
    table.string("username");
    table.date("expiresat");
  });
}

createSchema();
export const db = {
  async init() {
    if (init == false) {
      createSchema();
    }
  },
  async getAddresses(id) {
    let addresses = await Addresses.query()
      .where("owner_id", id)
      .orderBy("id", "desc");

    let final = addresses.map((element) => {
      return {
        origin_address: element.origin_address,
        destination_address: element.destination_address,
        walktime: element.walktime,
        drivetime: element.drivetime,
        id: element.id,
      };
    });
    return final;
  },

  async deleteSession(data) {
    let del = await Sessions.query().deleteById(data);
  },
  async getSession(token) {
    let session = await Sessions.query().where("token", token);
    if (session.length == 0) {
      return { error: "No session, login/register" };
    }
    return session[0].toJSON();
  },

  async login(data) {
    let ins = await Users.query().insert(data);
    return ins.toJSON();
  },

  async getUser(token) {
    let testing = await Sessions.query();

    let session = await Sessions.query().where("token", token);
    if (session.length == 0) {
      return { error: "No session" };
    }
    for (let i = 0; i < testing.length; i++) {
      if (testing[i].expiresat < new Date()) {
        let del = await Sessions.query().deleteById(testing[i].id);
      }
    }
    let currentUser = await Users.query().where("id", session[0].user_id);
    if (session[0].expiresat < new Date()) {
      let del = await Sessions.query().deleteById(session[0].id);
      console.log("deleted session");
      //return { error: "Session expired" };
    }
    let user = await Users.query().where("username", session[0].username);
    user = user[0].toJSON();
    const newSessionToken = uuidv4();

    // renew the expiry time
    const now = new Date();
    const expiresAt = new Date(+now + 120 * 1000);

    // add the new session to our map, and delete the old session
    let ins = await Sessions.query().insert({
      token: newSessionToken,
      username: session[0].username,
      user_id: session[0].user_id,
      expiresat: expiresAt,
    });
    user.session_token = newSessionToken;
    let del2 = await Sessions.query().deleteById(session[0].id);

    console.log("deleted session");
    // set the session token to the new value we generated, with a
    // renewed expiration time
    return user;
  },

  async loginUser(username, password) {
    let user = await Users.query().where("username", username);
    user = user[0];
    if (user != undefined) {
      let passwordIsValid = await bcrypt.compare(password, user.password);
      if (passwordIsValid) {
        const sessionToken = uuidv4();
        // set the expiry time as 120s after the current time
        const now = new Date();
        const expiresAt = new Date(+now + 120 * 1000);

        // create a session containing information about the user and expiry time
        let ins = await Sessions.query().insert({
          token: sessionToken,
          username: username,
          user_id: user.id,
          expiresat: expiresAt,
        });

        user.session_token = sessionToken;
        return user.toJSON();
      } else {
        return { error: "Password is invalid" };
      }
    } else {
      return { error: "User does not exist" };
    }
  },
  async logoutUser(session) {
    let del = await Sessions.query().deleteById(session);
    console.log("deleted session");
    return del;
  },

  async addAddress(data) {
    let currentUser = await Sessions.query().where("token", data.session_token);
    if (currentUser.length == 0) {
      return { error: "No session" };
    }
    currentUser = currentUser[0];

    data.addyData.owner_id = currentUser.user_id;
    let addr = await Addresses.query()
      .where("origin_address", data.addyData.origin_address)
      .where("owner_id", currentUser.user_id);
    if (addr.length > 0) {
      return { error: "Address already exists" };
    }

    let ins = await Addresses.query().insert(data.addyData);
    console.log("DNSKAJDNASJK", ins);
    return ins.toJSON();
  },

  async deleteAddress(id) {
    let del = await Addresses.query().deleteById(id);
    if (del == 0) {
      return { error: "Address does not exist" };
    } else {
      return { success: "Address deleted" };
    }
  },
};
