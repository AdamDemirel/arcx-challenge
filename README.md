The live demo lives at [https://arcx-challenge.vercel.app/](https://arcx-challenge.vercel.app/)

# About

This project addresses the criteria in the lead frontend engineering technical challenge for [ARCx](https://www.arcxanalytics.com/)

# Project Setup Steps
1. Clone the repo
2. Run `npm install`
3. Run the dev server with `npm run dev`. Runs at [http://localhost:3000](http://localhost:3000)

# Libraries / Tools
- [Next.js](https://nextjs.org/) for boilerplate code structure and React setup
- [tailwindcss](https://tailwindcss.com/) for styling via helper classes
- [react-calendar](https://www.npmjs.com/package/react-calendar) for react calendar UI
- [date-fns](https://date-fns.org/) for date utilities
- ~~[headlessui](https://headlessui.com/) for transitions~~

# Requirements / Steps Undertaken

### Functionality
- [x] Setup a simple webpage in Next.js
- [x] Default the homepage to /home as per spec and redirect from /
- [x] Make the background page basic and white
- [x] Add a basic date input
- [x] Display a calendar popup the date input once clicked
- [x] Ensure the calendar popup is underneath the basic date input once display
- [x] Allow the selection of a single day
- [x] Single day selection is selected if clicked outside the popup
- [x] Allow the selection of a date range
- [x] Datepicker closes automatically upon selection of dateTo in range
- [x] Format the displayed date in the input as eg 'Nov 8th 2023' for single and range
- [x] Sync default calendar state with query params on load `?fromDate=2024-01-01&toDate=2024-01-10`
- [x] Update query params on calendar date changes. Ensure this persists upon page reload
- [x] Connect and deploy to vercel via CICD

## Design
- [x] Use only tailwind for styling
- [x] Style the page layout as per figma
- [x] Style the button input as per figma
  - [x] Ensure the input is a button with a hand displayed when hovering (dev mode comment)
- [x] Style the day selector as per figma for:
  - [x] selected start/end days
  - [x] selected range
  - [x] past dates, and
  - [x] out of range dates
- [x] Style the year selector as per figma
- [x] Style the month selector as per figma
- [ ] Add delight to calendar - ie transitions/motion on date selection, calendar popup, and page load

## QA
- [x] Double check all stylistic changes - colors, bgColors, spacing, fontSizes, opacity, layouts, etc
- [x] Try to break and find edge cases in functionality
- [x] Make sure necessary types are in place
- [x] Decouple any mixed concerns and decompose complex components + hook logic
- [x] Comment any necessary code
- [x] If params are set and no state values synced yet, display loader on button
- [x] Fix console errors/warnings
- [x] Fix TODOs

# Notes
- Didn't add support for dark color scheme, legacy browsers or date localisation
- Aware that invalid dates can be passed into params. eg toDate before fromDate
- Aware that if only toDate passed to params, no error message
- Aware that you can pass in a fromDate to params earlier than today, no error message
- Excluded hover states on calendar
- The designs were missing selected ranges for months/year view so I made my best judgement
