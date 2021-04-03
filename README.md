## Askaway

A live, anonymous Q&A tool for webinars.

## Features
#### Realtime

See which question is being answered by the speaker right now

#### No auth needed

No signups, no personal data collected. Just navigate to a link and make up a username - anyone can create rooms, ask questions and upvote other's questions

#### Prioritized questions

Live upvoting helps burning questions bubble their way to the top

#### Walk-in's welcome

Drop in late? See what's already been asked and answered.

#### Take aways

Export all the questions and answers at the end of the session at the click of a button.

#### Ephemeral

Data for rooms, questions and replies is regularly deleted. Only metadata (like # of rooms created, # of questions asked, etc.) is persisted. It's like your conversation never happened.


## Roadmap
- [x] hook up DB
- [x] create rooms
- [ ] view rooms
- [x] create questions
- [ ] view questions in room
- [ ] upvote questions in room
- [ ] view questions RT in room
- [ ] set user alias
- [ ] create replies to questions
- [ ] view replies to questions
- [ ] view replies to questions
- [ ] admin: select featured question
- [ ] admin: set question to answered
- [ ] admin: delete questions
- [ ] admin: delete replies
- [ ] export to json
- [ ] style

## Dev

This project built with RedwoodJS.

### Install

```terminal
yarn install
```

### Start

```terminal
yarn rw dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.

### Testing

`yarn rw test`

To run tests, a local postgres db must be set up.

Follow the instructions [here](https://redwoodjs.com/docs/local-postgres-setup#creating-a-database) to set up a postgres db.

