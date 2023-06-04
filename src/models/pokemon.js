module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg : "Le nom est déjà utilisé."
        },
        validate: {
          notEmpty: { msg: "Le nom du pokemon ne dois pas être vide." },
          notNull: { msg: "Le nom du pokemon est requis." },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Le nombre de points de vie est requis." },
          isInt: { msg: "Le nombre de hp dois être un entier." },
          min: {
            args: [0],
            msg: "Un pokémon ne peux pas avoir moin de 0hp.",
          },
          max: {
            args: [999],
            msg: "Un pokémon ne peux pas avoir plus de 999hp.",
          },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updateAt: false,
    }
  );
};
