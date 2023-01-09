"use strict";

import { Model } from "objection";

class Users extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "users";
  }
}

export default Users;
