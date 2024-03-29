This project addresses the criteria in the lead frontend engineering technical challenge for [arcx](https://www.arcxanalytics.com/)

# Project Setup Steps
1. Clone the repo
2. Run the dev server with `npm run dev`. Runs at [http://localhost:3000](http://localhost:3000)

# Libraries / Tools
- [Next.js](https://nextjs.org/) for boilerplate code structure and React setup
- [tailwindcss](https://tailwindcss.com/) for styling via helper classes

# Requirements / Steps Undertaken

### Functionality
- [x] Setup a simple webpage in Next.js
- [x] Default the homepage to /home as per spec and redirect from /
- [x] Make the background page basic and white
- [ ] Add a basic date input
- [ ] Display a calendar popup the date input once clicked
- [ ] Ensure the calendar popup is underneath the basic date input once display
- [ ] Allow the selection of a single day
- [ ] Single day selection is selected if clicked outside the popup
- [ ] Allow the selection of a date range
- [ ] Datepicker closes automatically upon selection of dateTo in range
- [ ] Format the displayed date in the input as eg 'Nov 8th 2023' for single and range
- [ ] Sync default calendar state with query params on load `?fromDate=2024-01-01&toDate=2024-01-10`
- [ ] Update query params on calendar date changes. Ensure this persists upon page reload
- [ ] Connect and deploy to vercel via CICD

## Design
- [ ] Use only tailwind for styling
- [ ] Style the page layout as per figma
- [ ] Style the date input as per figma
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
- [ ] Decouple any mixed concerns and decompose complex components
- [ ] Comment any necessary code

# Noted Exclusions
- Support for dark color scheme
