exports.up = function (knex) {
  return knex.schema.createTable("sessions", (table) => {
    table.uuid("id").primary();
    table.date("creationDate").notNull();
    table.date("updateDate");
    table.date("expirationDate").notNullable();
    table.integer("userId").references("id").inTable("users").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sessions");
};
