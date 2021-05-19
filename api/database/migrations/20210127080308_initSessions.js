exports.up = function (knex) {
  return knex.schema.createTable("sessions", (table) => {
    table.uuid("id").primary();
    table.timestamp("creationDate").notNullable();
    table.timestamp("updateDate");
    table.timestamp("expirationDate").notNullable();
    table.integer("userId").references("id").inTable("users").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sessions");
};
