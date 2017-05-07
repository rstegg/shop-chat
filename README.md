# kuwau

## .env

- DATABASE_URL=postgres://steggie:@localhost:5432/kuwau
- JWT_SECRET=poopielol (any string)
- API_HOST=/api/v1 (this is what the client will be proxying)

- AWS_ACCESS_KEY_ID=AKIAIVSW5JCRV7UQE5AQ
- AWS_SECRET_ACCESS_KEY=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

- MAILGUN_SECRET="key-ab72f757c533aea9d48f641d95c488fd"

## BUGS

- Tablet needs fixing
- Main doesn't scroll
- Page is just all wrong

## Roadmap (MVP1)

- Profile:
  - interests, contact
  - Settings: Following, TODO: FINISH THIS PART
- Feed:
  - Customize your interests
  - polish
- Feed (Following, recommended, promoted)
- Feed Items: Page [shop], TODO: FINISH THIS PART

## Done

- Profile: Username, bio
- Settings: N/A
- Layouts
- Page [about us], Post, Profile PT1

## TODO [app]
- work on feed (customizing interests) [H]
- add more navigation to header [H]
- Profile PT2 - layout, content, and usability

## TODO [server]

* Refactor duplicated validateBody on each handler [L]
* Move route prefixes to server/api/v1.js [L]
