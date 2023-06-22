# POKEMON API

## Prérequis 

avoir installé sur la machine locale :
* [Node.js](https://nodejs.org/): ^12.0.0
* [NPM](https://npmjs.org/) ou tout autre gestionnaire de paquets Node.js


## Démarrer le serveur 

1. Cloner le dépôt
2. Installer les dépendances dans le dossier Pokemon-API avec la commande `npm install`
3. Puis démarrer le serveur avec la commande `npm start` 

```bash
git clone https://github.com/ReyGuillaume/Pokemon-API.git
cd Pokemon-API
npm install
npm start
```

Le serveur démarre par défaut sur le port 3000 (http://localhost:3000).

## End-points

### Authentification

Pour obtenir votre token de connexion, faire une requête `POST` à :

* `/api/login`

avec comme corps de requête :

```json
{
  "username": "your_login",
  "password": "your_password"
}
```

Exemple de réponse si l'authentification est un succès :

```json
{
	"message": "L'utilisateur a été connécté avec succès.",
	"data": {
		"id": 1,
		"username": "your_login",
		"password": "$2b$10$Gca0zfhPIfTSIwM4k6avCuWj07ynPeaQTPqgT0n3fzx8UILCMETwa",
		"createdAt": "2023-06-04T17:05:27.000Z",
		"updatedAt": "2023-06-04T17:05:27.000Z"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1ZXJJZCI6MSwiaWF0IjoxNjg1ODk5OTE4LCJleHAiOjE2ODU5ODYzMTh9.mhjQYe1BpZcVZXYmyPilVVP4NQIvXhTYk64vAcCh8eE"
}
```

### Utiliser son token d'authentification

Pour tout autre requête à l'api, vous devrez inclure votre jeton dans l'entête de la requête :

```json
{
  "authorization": ". [VOTRE_TOKEN]"
}
```

### Manipulation des données

Faire une requête `GET` à :

* `/api/pokemons` pour obtenir la liste complète des pokémons de la base de donnée.
* `/api/pokemons?name=[CARACTERES]` pour obtenir la liste des pokémons dont le nom contient la chaine de caractère passée en paramètre.
* `/api/pokemons?limit=[NUMBER]` pour limiter le nombre d'élément dans la réponse.

Exemple de réponse si l'authentification est un succès :

```json
{
	"message": "La liste de pokémons a bien été récupérée",
	"data": [
		{
			"types": [
				"Plante",
				"Poison"
			],
			"id": 1,
			"name": "Bulbizarre",
			"hp": 100,
			"created": "2023-06-04T17:05:27.000Z",
			"updatedAt": "2023-06-04T17:05:27.000Z"
		},
		{
			"types": [
				"Feu"
			],
			"id": 2,
			"name": "Salamèche",
			"hp": 100,
			"created": "2023-06-04T17:05:27.000Z",
			"updatedAt": "2023-06-04T17:05:27.000Z"
		}
	]
}
```

Pour obtenir les données d'un pokémon en particulier, faire une requête `GET` à :

* `/api/pokemons/:id`

Exemple de réponse en cas de succès :

```json
{
	"message": "Un pokémon a bien été trouvé",
	"data": {
		"types": [
			"Plante",
			"Poison"
		],
		"id": 1,
		"name": "Bulbizarre",
		"hp": 100,
		"created": "2023-06-04T17:05:27.000Z",
		"updatedAt": "2023-06-04T17:05:27.000Z"
	}
}
```

Pour insérer un nouveau pokémon dans la base de donnée, faire une requête `POST` à :

* `/api/pokemons`

avec comme corps de requête :

```json
{
  "name": "[STRING]",
  "hp": "[INT]",
  "types": "[TYPE_1,TYPE_2]"
}
```

Pour mettre à jour les données d'un pokémon dans la base de donnée, faire une requête `DELETE` à :

* `/api/pokemons/:id`

avec comme corps de requête :

```json
{
  "name": "[STRING]",
  "hp": "[INT]",
  "types": "[TYPE_1,TYPE_2]"
}
```

Pour supprimer un pokémon dans la base de donnée, faire une requête `DELETE` à :

* `/api/pokemons/:id`
