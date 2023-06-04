const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("pokedex", "root", "root", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pkmn) => {
      Pokemon.create({
        name: pkmn.name,
        hp: pkmn.hp,
        types: pkmn.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    bcrypt
      .hash("guigui", 10)
      .then((hash) => User.create({ username: "guigui", password: hash }))
      .then((user) => console.log(user.toJSON()));

    console.log('La base de donnée "Pokedex" a bien été synchronisée.');
  });
};

module.exports = {
  initDb,
  Pokemon,
  User
};
