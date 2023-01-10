import Knex from "knex";
import knexConfig from "./knexfile";
import { Model } from "objection";
import Sessions from "./models/sessions";
import Users from "./models/users";
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
  if (await knex.schema.hasTable("sessions")) {
    return;
  }
  await knex.schema.createTable("sessions", (table) => {
    table.increments("id").primary();
    table.string("token").unique();
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

  async login(data) {
    let ins = await Users.query().insert(data);
    return ins.toJSON();
  },

  async getUser(token) {
    let session = await Sessions.query().where("token", token);
    if (session.length == 0) {
      return { error: "No session, login/register" };
    }
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
};
