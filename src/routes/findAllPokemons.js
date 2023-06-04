const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons", auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      if (name.length <= 1) {
        return res
          .status(400)
          .json({ message: "Le nom dois avoir au minimum deux caractères" });
      }
      return Pokemon.findAndCountAll({
        where: {
          name: {
            // [Op.eq] : name   // egalité strict
            [Op.like]: `%${name}%`,
          },
        },
        limit: req.query.limit ? parseInt(req.query.limit) : null,
        order: ["name"],
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} pokemons qui correspondent à la recherche ${name}.`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll()
        .then((pokemons) => {
          const message = "La liste de pokémons a bien été récupérée";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message = "La liste des pokémons n'a pas pu être retournée.";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
