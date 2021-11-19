# URL SHORTENER API

- If your url is too long and you need a shorter version of it. Then this is the api for it.

## INSTALLATION AND LOCAL SETUP

- Run the command `git clone https://github.com/Gwachukwu/url_shortener.git` on your terminal to clone this repository to your local directory.

- Run `yarn` or `npm install` to install all required dependencies.

- Run `yarn build` or `npm run build` to compile the typescript into a build folder.

- Run `yarn test` or `npm run test` to run tests.

- Run `yarn start` or `npm start` to run the compiled project.

- Run `yarn dev` or `npm run dev` to run the typescript project in development mode.

- You are all set :D

### AVAILABLE ENDPOINTS

```markdown
GET / or /api Welcome message

- returns: JSON
```

```markdown
POST /api/url/shorten

- shortens the longUrl and return the short version

- required:

  - JSON Payload as specified above

- returns: JSON
```

```markdown
GET /api/all

- returns all available short urls in the database.

- returns: JSON
```

```markdown
GET /:code

- redirects to the long url

```

```markdown
DELETE /:code

- deletes the url from the database.

- returns: JSON
```