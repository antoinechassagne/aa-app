exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.timestamp("creationDate").notNullable();
    table.timestamp("updateDate");
    table.timestamp("confirmationDate");
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("salt").notNullable();
    table.string("confirmationToken");
    table.string("resetToken");
    table.boolean("active").notNullable();
    table.string("pseudo").notNullable();
    table.string("phone").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
