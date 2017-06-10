# kuwau

## TODO

add 'ProductTheme' menu

add actions:

- uploadEditProductTheme

- uploadAddProductOption

- uploadAddProductMedia

- uploadAddProductElement

ProductTheme:

- use varaibles
- add server-side saving

add ProductOptions:
- Checkbox
- Toggle
- Radio
- Dropdown
- Type(?)
- Color
- Bundle(?)
- Coupon(?)

add ProductElements:
- Header
- Paragraph
- List
- Table
- Columns

add ProductMedias:
- Video
- Line chart(?)
- Bar chart(?)
- Pie chart(?)
- Activity feed(?)

## TODO

### General

- Checkout:
  - Add shipping
  - Redo styling
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
  - redo the layout
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
