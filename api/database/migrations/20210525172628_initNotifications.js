exports.up = function (knex) {
  return knex.schema.createTable("notifications", (table) => {
    table.uuid("id").primary();
    table.timestamp("creationDate").notNullable();
    table.timestamp("updateDate");
    table.integer("userId").references("id").inTable("users").notNullable();
    table.string("type").notNullable();
    table.boolean("read").notNullable();
    table.jsonb("content");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("notifications");
};
