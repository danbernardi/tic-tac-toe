# Hello!

And welcome to the Redshift coding challenge. We started building a basic tic-tac-toe app, but got busy halfway through and haven't been able to finish it. We need your help.

- [Instructions](#instructions)
- [Tickets](#tickets)
- [Time and Submission](#time-and-submission)

## Instructions

We've left basic functionality unfinished, a handful of bugs unfixed, and a lot of wishlist items on the table.

Add [the basic functionality](#the-basics) and fix [the bugs](#bug-fixes) (both at the top of the [tickets](#tickets) section below). With whatever time you have left, work on whichever other "tickets" you find most interesting. [Guidance below](#which-tickets-should-i-tackle).

Whenever you complete a ticket, please:

- Check the relevant checkbox in this README, and
- Make a separate git commit.

**Most importantly**:

> This as a choose-your-own-adventure -- **not** an exhaustive list of requirements. We do **not** expect you to complete the below in 3 hours. Take your time, work on what you find interesting, and don't worry about getting it all done.

### Getting Started

This is a relatively vanilla React app, built with `create-react-app`. It should work more or less "out of the box", by running:

```
$ yarn install
$ yarn start
```

To run tests:

```
$ yarn test
```

If you run into any issues getting it up and running, please let us know. Debugging systems issues is **not** part of this challenge, and we don't want to waste your time on it.

### Which Tickets Should I Tackle?

Go for those that seem interesting or play to your strengths. If you consider yourself more of a full-stack candidate, we'd love to see you try the [game history](#game-history) tickets (ideally including 2.0). More of a frontend applicant? Maybe focus on making [visual improvements](#visual-improvements) without leaning too hard on external libraries.


## Tickets

### The Basics

#### Victory and Stalemate

The game doesn't really work, because we haven't built in victory or stalemate conditions.

- [x] Add a check and alert for victory.
- [x] Add a check and alert for basic stalemate -- when the game hasn't been won and there are no more moves.

### Bug Fixes

#### Play bugs

There are at least two bugs on the Play page.

- [x] Find them and fix them.
- [ ] Add to the limited test suite to make sure that your changes fix the issues, and they don't happen again.

### Bonus Basics

#### Victory and Stalemate Continued

- [ ] Add a check and alert for preemptive stalemate -- when the board still has open squares, but nobody can win.
- [ ] Test your check functions, to make sure they work reliably.

### Visual Improvements

#### Styling the Play component

Our board component is unstyled, and looks pretty awful right now.

- [x] Make it look nice. We've added some styles to the Welcome page, and you could use them as a guide.

#### Styling game alerts

We got lazy, and set up a bad pattern for alerting players -- just using JavaScript's in-built `alert` function.

- [x] Change how we give user feedback, using whatever visual/coding patterns or tools you see fit.

#### Responsive

We forgot to do a responsive pass, and the header looks scrunched up on smaller screens.

- [x] Please make the existing app looks nice on mobile.
- [x] Make sure the new functionality you add looks good on both mobile and desktop.

### Added functionality

#### Game history

Tic-tac-toe is cool on its own, but we think it'd be even cooler if we could use the app to look through the game history and replay old games.

- [ ] Figure out a pattern for tracking and storing each game move in the store, and storing each complete game in "history".
- [ ] Fill in the `HistoryList` route file, so that it displays the history of previously played games, with whatever information feels relevant. Style it (minimally is OK).
- [ ] Add a link (or two) to `HistoryList`, wherever seems best.
- [ ] Fill in the `HistoricalGame` route file, so that it displays the history of the specified game. Implement a UI for stepping back and forward through game moves.

###### Game History 2.0

"History" is a misnomer if it's unpersisted and local.

- [ ] Build out an API endpoint that can store previous game history, and fetch the history of previous games on app refresh.

#### Better Play UI

Honestly, our Play UI sucks.

- [x] Improve it, however you see fit. (Some options: keyboard input, move on click, etc).

### Go crazy

- [ ] Add some subtle animation, wherever feels relevant and fun.
- [ ] See something you don't like? Fix it. We left lots of room for improvement. Feel encouraged to improve.
- [ ] See something you don't like and don't have time to change? Let us know how you'd think about changing it.

## Time and Submission

### Time

That's a long laundry list. This take-home is meant take up no more than 3 hours of your time (unless you get totally carried away). Please start a timer when you begin the project, and triage your time between the "tickets" that seem best.

> Let us know how long you took.

We'd really appreciate it. We want to know so we can 1) make sure you're not sinking too much time into this project, and 2) get a better sense of realistic time constraints.

Please note: This project is meant to be fodder for discussion. We don't expect everything to be perfectly complete, so don't worry about getting it all done -- really.

### Submission

You can submit by either zipping up and sending your solution by email, or pushing it to a Github repo and sharing the link. Please include instructions for running the app, if they've changed.

Bonus points: Deploy your app, and give us a link.

Good luck, and, hopefully, enjoy!