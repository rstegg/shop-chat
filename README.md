# kuwau

## TODO: End goals

- TODO

## TODO

### General

- ViewProduct:
  - 'Buy now'
  - 'Add to cart'
  - styling  
- Add loading screens
- Fix bug with profile chat not always joining [bug]
- Add:
  - 'feed'
  - 'account'
- Finish:
  - 'products'
    - add 'buy'
  - 'account'/'user settings'
    - create endpoints
    - create pages for withdraw/payment, or collapse into one
    - add privacy page
    - add tools?

### Styling

- Clean up inline styling [chat]

### Sockets

- Threads authentication (permissions)
- private Threads

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
