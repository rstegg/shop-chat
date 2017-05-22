# kuwau

## install:

1 - `[in server directory] npm install`

2 - `[in app directory] npm install`

## environment variables:

`server/.env` needs:

- `DATABASE_URL="postgres://username:password@localhost:5432/dbName"` (posgresURL)
  - if you prefer to not use in-line user:pass, you can change this in `server/db.js`:
```js
const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
})
```

- `JWT_SECRET="SomeSecretString"` (can be any value)

- `API_HOST="/api/v1"` (must be this value)

### (aws with s3 read/write access, you can use mine if you don't use it in production :smile:)
- `AWS_ACCESS_KEY_ID=AKIAIVSW5JCRV7UQE5AQ`
- `AWS_SECRET_ACCESS_KEY=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`

### (same as above; bonus points if you respond to the e-mails sent so I don't get listed as spam :smile:)
- `MAILGUN_SECRET="key-ab72f757c533aea9d48f641d95c488fd"`

## start [development]:

1 - `[in server directory] npm run dev`

2 - `[in app directory] npm start`

## TODO: End goals

- TODO

## TODO

### General

- ViewProduct:
  - 'Buy' (placeholder menu)
  - 'Add to cart'
  - styling  
- Add loading screens
- Fix bug with profile chat not always joining [bug]
- Fix styling in general
- Add:
  - 'feed'
  - 'account'/'user settings'
  - 'payments'
- Finish:
  - 'products'
    - add 'buy'
  - 'shops'
    - add 'shop history'?
  - 'profiles'
    - 'canvas': image?

### Styling

- Clean up inline styling [chat]

### Sockets

- Threads authentication (permissions)
- private Threads

### TODO: Low Priority

- Fix styling

## Structure

- CreateProduct: should be inside ViewShop/AsOwner (idea)
- EditProduct: should be ViewProduct/AsOwner (idea/fix)

### Pages

- CreateProduct
- CreateShop
- EditProduct
- Home
- Login
- Products
- Shops
- Signup
- ViewProduct
- ViewProfile
- ViewShop

# Below this point are old/legacy notes

## BUGS

- Tablet needs fixing
- Main doesn't scroll

## Roadmap (MVP1)

- Profile:
  - interests, contact
  - Settings: Following, TODO: FINISH THIS PART
- Feed:
  - Customize your interests
  - polish
- Feed (Following, recommended, promoted)?
- Feed Items: Deals, Users, Shops?

## Done

- Profile: Username, bio
- Settings: N/A
- Layouts: Root, Grid
- Shop, Product, Profile PT1

## TODO [app]
- work on feed (customizing interests) [H]
- add more navigation to header [H]
- Profile PT2 - layout, content, and usability

## TODO [server]

* Refactor duplicated validateBody on each handler [L]
* Move route prefixes to server/api/v1.js [L]
