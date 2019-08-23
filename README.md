# SuperHeroes

A React app coded in [TypeScript](https://www.typescriptlang.org/), bundled by [Parcel.js](https://parceljs.org/) and themed by [SASS](https://sass-lang.com).

`npm start`

Grab a token [here](https://superheroapi.com/index.html).

## What this project _doesn't_ use

This project deliberately doesn't use webpack and Babel. And aims at demonstrating that, despite what every tutorial on the web want you to believe, webpack and Babel are not needed at all to build a React application. Just some native TypeScript and a modern bundler like Parcel.js and you're good.

It also doesn't use redux or react-redux to handle state. Although redux is awesome, this example also aims to demonstrate that a store is nothing more than an _observable_ object that abstract the state storage. And can be as simpler as the 30 lines TypeScript module included here.