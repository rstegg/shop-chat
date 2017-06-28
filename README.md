# kuwau

## Instructions

### Setup

#### Create file `server/.env`

1. start up a postgres server, and use inline notation:

**DATABASE_URL**=_postgres://user:pass@localhost:5432/kuwau-db_

2. set a JWT_SECRET (but leave API_HOST as-is!)

**JWT_SECRET**

**API_HOST**=_/api/v1_

3. set secret and access keys [AWS needs S3 Read/Write Access]

**AWS_ACCESS_KEY_ID**

**AWS_SECRET_ACCESS_KEY**

**STRIPE_SECRET**

**MAILGUN_SECRET**

### To run development

#### Server

1. `cd server && npm install`
2. `npm run dev`

#### App [server should be running before starting]

1. `cd app && npm i`
2. `npm start`

## TODO

### Server

- Check stripe endpoints to be valid attributes
- Refactor attributes into scheme or model files

### App

- Redo Mobile to be pure css

- Checkout:
  - Add shipping
  - Design
- Settings:
  - 'Payment options'
    - 'Add a card' - need validation on card
  - 'notifications'
    - Add page for
  - 'privacy'
    - Add page for
  - 'tools'
    - Add page for
- ViewProduct:
  - 'Add to cart' needs some animation/something happens
- Add:
  - loading screens
  - 'feed', 'follow', 'suggestions'

### Styling

- Clean up inline styling [chat, components]

### Sockets

- Threads permissions (moderators)
- private Threads (whispers)

### TODO: Low Priority

- Fix styling

## Structure

- CreateProduct: should be inside ViewShop/AsOwner (idea)

### Pages

- CreateProduct
- CreateShop
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
