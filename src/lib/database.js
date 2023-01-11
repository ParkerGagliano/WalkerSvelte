import Knex from "knex";
import knexConfig from "./knexfile";
import { Model } from "objection";
import Sessions from "./models/sessions";
import Users from "./models/users";
import Addresses from "./models/addresses";
import uuid from "uuid";
import bcrypt from "bcrypt";

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
    let addresses = await await Addresses.query()
      .where("owner_id", id)
      .orderBy("id", "desc");

    let final = addresses.map((element) => {
      return {
        origin_address: element.origin_address,
        destination_address: element.destination_address,
        walktime: element.walktime,
      };
    });
    return final;
  },

  async getSession(token) {
    let session = await Sessions.query().where("token", token);
    return session[0].toJSON();
  },

  async login(data) {
    let ins = await Users.query().insert(data);
    return ins.toJSON();
  },

  async getUser(token) {
    let session = await Sessions.query().where("token", token);
    if (session.length == 0) {
      return { error: "No session, login/register" };
    }
    let currentUser = await Users.query().where("id", session[0].user_id);
    if (session[0].expiresat < new Date()) {
      let del = await Sessions.query().deleteById(session[0].id);
      return { error: "Session expired" };
    }
    let user = await Users.query().where("username", session[0].username);
    user = user[0].toJSON();
    const newSessionToken = uuid.v4();

    // renew the expiry time
    const now = new Date();
    const expiresAt = new Date(+now + 120 * 1000);
    Sessions.query().deleteById(session[0].id);
    // add the new session to our map, and delete the old session
    let ins = await Sessions.query().insert({
      token: newSessionToken,
      username: session[0].username,
      user_id: session[0].user_id,
      expiresat: expiresAt,
    });
    user.session_token = newSessionToken;

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
        const sessionToken = uuid.v4();

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
    return del;
  },

  async addAddress(data) {
    let currentUser = await Sessions.query().where("token", data.session_token);
    currentUser = currentUser[0];
    data.addyData.owner_id = currentUser.user_id;
    let addr = await Addresses.query().where(
      "origin_address",
      data.addyData.origin_address
    );
    if (addr.length > 0) {
      return { error: "Address already exists" };
    }
    let ins = await Addresses.query().insert(data.addyData);
    return ins.toJSON();
  },
};
