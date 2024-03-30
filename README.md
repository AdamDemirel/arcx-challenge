The live demo lives at [https://arcx-challenge.vercel.app/](https://arcx-challenge.vercel.app/)

# About

This project addresses the criteria in the lead frontend engineering technical challenge for [ARCx](https://www.arcxanalytics.com/)

# Project Setup Steps
1. Clone the repo
2. Run the dev server with `npm run dev`. Runs at [http://localhost:3000](http://localhost:3000)

# Libraries / Tools
- [Next.js](https://nextjs.org/) for boilerplate code structure and React setup
- [tailwindcss](https://tailwindcss.com/) for styling via helper classes
- [react-calendar](https://www.npmjs.com/package/react-calendar) for react calendar UI
- [date-fns](https://date-fns.org/) for date utilities
- [headlessui](https://headlessui.com/) for transitions

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
- [ ] Use only tailwind for styling
- [x] Style the page layout as per figma
- [x] Style the button input as per figma
  - [x] Ensure the input is a button with a hand displayed when hovering (dev mode comment)
- [ ] Style the day selector as per figma for:
  - [ ] selected start/end days
  - [ ] selected range
  - [ ] past dates, and
  - [ ] out of range dates
- [ ] Style the year selector as per figma
- [ ] Style the month selector as per figma
- [ ] Add delight to calendar - ie transitions/motion on date selection, calendar popup, and page load

## QA
- [ ] Double check all stylistic changes - colors, bgColors, spacing, fontSizes, opacity, layouts, etc
- [ ] Try to break and find edge cases in functionality
- [ ] Make sure necessary types are in place
- [ ] Decouple any mixed concerns and decompose complex components + hook logic
- [ ] Comment any necessary code
- [ ] If fromDate in params is before today, display error
- [x] If params are set and no state values synced yet, display loader on button
- [ ] Fix console errors/warnings
- [ ] Fix TODOs

# Noted Exclusions
- Support for dark color scheme
- Support for legacy browsers
- Some colors in Figma didn't match the tailwind theme - eg `#E9E9E9` for the input box border, so I used [Find the nearest tailwind colour](https://find-nearest-tailwind-colour.netlify.app/) to keep the designs consistent with the spec to use Tailwind
- Disallowed typing in the date button area to avoid all the formatting edge cases. Dates can only be selected with the calendar
- Invalid dates can be passed into params. eg toDate before fromDate
- If only toDate passed to params, no error message displayed
- Ignored date localisation
- No hover states on calendar
