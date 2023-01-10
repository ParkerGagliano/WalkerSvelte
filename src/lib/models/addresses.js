"use strict";

import { Model } from "objection";

class Addresses extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "addresses";
  }
}

export default Addresses;
