# kuwau

## .env

- DATABASE_URL=postgres://username:password@POSTGRES_DATABASE_URL
- JWT_SECRET=anything
- API_HOST=/api/v1

(AWS [image hosting])
- AWS_ACCESS_KEY_ID=AKIAIVSW5JCRV7UQE5AQ
- AWS_SECRET_ACCESS_KEY=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

(MAILGUN [email verfication])
- MAILGUN_SECRET=key-ab72f757c533aea9d48f641d95c488fd

## TODO

- Socket Authentication
- Shop Chat Styling

- CreateProduct (should be inside ViewShop/AsOwner)
- CreateShop
- EditProduct (should be ViewProduct/AsOwner)
- EditProfile (should be ViewProfile/AsOwner)
- Home
- Login
- Products (should be ViewShop/Products? or remove?)
- Shops
- Signup
- ViewProduct
- ViewProfile
- ViewShop

### TODO: Low Priority

- Fix styling
- Add aliases to common file paths

### TODO: End goals

- Abstract for white-label
- Fix inconsistencies as possible

### Pages

- CreateProduct
- CreateShop
- EditProduct
- EditProfile
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
- Shop is just all wrong

## Roadmap (MVP1)

- Profile:
  - interests, contact
  - Settings: Following, TODO: FINISH THIS PART
- Feed:
  - Customize your interests
  - polish
- Feed (Following, recommended, promoted)
- Feed Items: Shop [shop], TODO: FINISH THIS PART

## Done

- Profile: Username, bio
- Settings: N/A
- Layouts
- Shop [about us], Post, Profile PT1

## TODO [app]
- work on feed (customizing interests) [H]
- add more navigation to header [H]
- Profile PT2 - layout, content, and usability

## TODO [server]

* Refactor duplicated validateBody on each handler [L]
* Move route prefixes to server/api/v1.js [L]
