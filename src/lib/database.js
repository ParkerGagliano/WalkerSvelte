import Knex from "knex";
import knexConfig from "./knexfile";
import { Model } from "objection";
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
    table.string("username");
    table.string("password");
  });
}
createSchema();

export const db = {
  async login(data) {
    return data;
  },
};
