module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Quelqu'un utilise déjà cet identifiant."
      }
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}