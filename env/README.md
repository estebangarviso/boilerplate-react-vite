#### Environment variables loader.

## 1. Requirements

#### 1.1. Dependencies

-   Install **env** library with `npm i -D @v10e/env`.

#### 1.2. NPM Scripts

For load desired environment, add you npm script like **`env -e <env> -m <mode>[ <mode2>] : <your-command>`**.

-   **mode**: (build|debug|test) execution mode base variables (can be many).
-   **env**: (dev|qa|prod) environment variables.

_In example: `env -e dev -m debug : npm start`_

## 2. Structure

#### 2.1. Non secrets (appsettings.json)

Your `appsettings.json` could contains an structure like below:

```json
{
	// (optional) base default variables
	"|DEFAULT|": {
		...
	},
	// (optional) execution modes
	"|MODE|": {
		// on build
		"build": {
			...
		},
		// on local debugging
		"debug": {
			...
		},
		// on testing
		"test": {
			...
		},
		// any custom mode
		...
	},
	// (optional) execution environments
	"|ENV|": {
		"<env-name>": {
			...
		},
		...
	}
}
```

_This folder contains every base environment variables files a.k.a. environment execution modes._

#### 2.2. Environments

-   2.2.1. Secrets

Your `env` folder will contain files below that store secrets:

-   **dev.env.json**: development environment.
-   **qa.env.json**: quality assurance environment.
-   **prod.env.json**: production environment.

_This folder contains secrets variables files for system environments._

-   2.2.2. Local Environment

Your `env` folder will contain files below that store local development variables per environment:

-   **dev.local.env.json**: local development environment.
-   **qa.local.env.json**: local qa environment.
-   **prod.local.env.json**: local production environment.

_This folder should local environment variables files for system environments, taking precedence over any other._

## 3. Schema

`settings/schema.json` is the file that contains current structure for
your environment secrets files (dev|qa|prod).

Schema uses JSON schema v4 standard, so you can add custom validations.
Updating the schema model will merge changes by default.

For each property in the file, loader will retrieve the value from Azure Key
Vault.

When you push a new variable from any of your environment secrets
file, `schema.json` will be updated automatically.

If you want to ignore to load some variable without delete it, you can remove
the variable from `schema.json`.

## 5. Nested Keys

You can organize your keys in nested objects.

```json
{
	// .dev.env.json
	"GROUP1": {
		"VAR": "anyValue1",
		...
	},
	"GROUP2": {
		"VAR": "anyValue2",
		"SUBGROUP1": {
			"VAR": "anyValue1",
			...
		},
		...
	},
	"VAR3": "anyValue3",
	...
}
```

Default nesting delimiter is `__`:
So, in your application you can use the variables as shown below:

```javascript
const myVar1 = import.meta.env.GROUP1__VAR;
const myVar2 = import.meta.env.GROUP2__VAR;
const myVar2 = import.meta.env.GROUP2__SUBGROUP1_VAR;
const myVar3 = import.meta.env.VAR3;
```

## 6. Priority

### From lowest to highest.

-   `appsettings.json` -> default
-   `appsettings.json` -> dev|qa|prod
-   `appsettings.json` -> debug|build|test
-   `(dev|qa|prod).env.json`
-   `(dev|qa|prod).local.env.json` (takes precedence over previous)
