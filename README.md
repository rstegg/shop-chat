# kuwau

## TODO

### [HIGH PRIORITY]

- Clean up tech debt [chat]

- Postgres:
  - Add Chat Message model [maybe]

- Style View Product
  - Add chat to View Product
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
    - canvas: image?

### [sockets]

- Socket Authentication
- rooms authentication (permissions)
- Shop Chat Styling

### [structure]

- CreateProduct: should be inside ViewShop/AsOwner (idea)
- EditProduct: should be ViewProduct/AsOwner (idea/fix)

### TODO: Low Priority

- Fix styling

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
