exports.seed = function (knex) {
  return knex("gameCategories")
    .del()
    .then(function () {
      return knex("gameCategories").insert([
        { creationDate: new Date().toISOString(), label: "Jeu de cartes", imageName: "jeu-de-cartes" },
        { creationDate: new Date().toISOString(), label: "Echecs", imageName: "echecs" },
        { creationDate: new Date().toISOString(), label: "Jeu de plateau", imageName: "jeu-de-plateau" },
        { creationDate: new Date().toISOString(), label: "Jeu de dès", imageName: "jeu-de-des" },
        { creationDate: new Date().toISOString(), label: "Jeu de rôle", imageName: "jeu-de-role" },
        { creationDate: new Date().toISOString(), label: "Jeu en plein air", imageName: "jeu-en-plein-air" },
        { creationDate: new Date().toISOString(), label: "Jeu de logique", imageName: "jeu-de-logique" },
        { creationDate: new Date().toISOString(), label: "Jeu de connaissances", imageName: "jeu-de-connaissances" },
      ]);
    });
};
