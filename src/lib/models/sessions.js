"use strict";

import { Model } from "objection";

class Sessions extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "sessions";
  }
}

export default Sessions;
