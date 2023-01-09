import Knex from "knex";
import knexConfig from "./knexfile";
import { Model } from "objection";
import Sessions from "./models/sessions";
import Users from "./models/users";

const knex = Knex(knexConfig.development);
Model.knex(knex);
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
  async login(data) {
    let ins = await Users.query().insert(data);
    return ins.toJSON();
  },

  async getUser(token) {
    let session = await Sessions.query().where("token", token);
    if (session[0].expiresat < new Date()) {
      let Error = { error: "Session expired" };
      return Error;
    }
    let user = await Users.query().where("username", session[0].username);
    user = user[0].toJSON();

    return user;
  },
};
