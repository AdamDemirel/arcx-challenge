const styles = {
  container: 'min-h-screen flex items-center justify-center py-12 px-[60px]',
  formWrapper: 'border border-gray-200 rounded-lg py-3.5 px-8 w-full max-w-[420px] text-sm font-regular relative',
  form: 'flex flex-col border-b border-gray-200',
  dateLabel: 'text-stone-500',
  dateInput: 'border border-gray-200 rounded p-2 text-gray-950 w-full focus:outline-none',
  calendarWrapper: 'absolute top-24 opacity-0 animate-fadein',
  // The purple border is on the input wrapper to prevent layout shift on the input from 1-2px border-width change
  inputWrapper: (showCal: boolean) => `mt-2 mb-6 border-2 rounded border-white ${showCal ? 'border-violet-700' : ''}`,
  // Adds a custom calendar icon for the date input as per spec
  customDateIcon: {
    backgroundSize: '16px',
    paddingRight: '16px', /* space to accomodate the icon */
    backgroundImage: "url('/calendar.svg')",
    backgroundRepeat: 'no-repeat',
    /* Adds padding to the right of the icon */
    backgroundPosition: 'calc(100% - 12px) center'
  }
}

export { styles }
