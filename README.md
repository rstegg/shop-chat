# kuwau

## TODO: End goals

- TODO

## TODO

### General

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
    - 'canvas': image?

### Styling

- Clean up inline styling [chat]
- Profile/Shop are not mobile-friendly

### Sockets

- rooms authentication (permissions)
- private rooms

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
