const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth")

module.exports = (app) => {
  app.delete("/api/pokemons/:id", auth, (req, res) => {
    const id = req.params.id;
    Pokemon.findByPk(id)
      .then((pokemon) => {
        if (!pokemon) {
          const message =
            "Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.";
          return res.status(404).json({ message });
        }
        const pokemonDeleted = pokemon;
        return Pokemon.destroy({
          where: { id: pokemon.id },
        }).then((_) => {
          const message = `Le pokémon ${pokemonDeleted.id} a bien été supprimé.`;
          res.json({ message, data: pokemonDeleted });
        });
      })
      .catch((error) => {
        const message =
          "Le pokémon n'a pas pu être supprimé. Réesseyez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
