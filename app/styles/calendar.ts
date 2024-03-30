const styles = {
  container: 'min-h-screen flex items-center justify-center py-12 px-4 md:px-[60px]',
  formWrapper: 'border border-arcx-gray-400 rounded-lg py-3.5 px-8 w-full max-w-[420px] text-sm font-regular relative',
  form: 'flex flex-col border-b border-arcx-gray-300',
  dateLabel: 'text-arcx-gray-500 font-medium',
  dateBtn: ({ hasDate }: { hasDate: boolean }) => `border border-gray-300 rounded p-2 text-arcx-gray-600 w-full focus:outline-none text-left ${!hasDate ? 'opacity-60' : ''} leading-6`,
  calendarWrapper: 'absolute top-24 opacity-0 animate-fadein left-50 right-1/2 translate-x-2/4',
  // The purple border is on the input wrapper to prevent layout shift on the input from 1-2px border-width change
  btnWrapper: (showCal: boolean) => `mt-2 mb-6 border-2 rounded ${showCal ? 'border-arcx-purple-500' : 'border-white'}`,
  // Adds a custom calendar icon for the date input as per spec
  customDateIcon: {
    backgroundSize: '16px',
    paddingRight: '30px', /* space to accomodate the icon */
    backgroundImage: "url('/calendar.svg')",
    backgroundRepeat: 'no-repeat',
    /* Adds padding to the right of the icon */
    backgroundPosition: 'calc(100% - 12px) center'
  }
}

export { styles }
