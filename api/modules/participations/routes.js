const controller = require("./controller");
const participationSchema = require("./schemas/participation");
const participationEditionSchema = require("./schemas/participationEdition");

module.exports = [
  {
    method: "GET",
    path: "/participations/:id",
    handler: controller.getParticipation,
    authenticated: true,
  },
  {
    method: "GET",
    path: "/participations",
    handler: controller.getParticipations,
    authenticated: true,
  },
  {
    method: "POST",
    path: "/participations",
    handler: controller.createParticipation,
    schema: participationSchema,
    authenticated: true,
  },
  {
    method: "PUT",
    path: "/participations/:id",
    handler: controller.updateParticipation,
    schema: participationEditionSchema,
    authenticated: true,
  },
  {
    method: "DELETE",
    path: "/participations/:id",
    handler: controller.deleteParticipation,
    authenticated: true,
  },
];
