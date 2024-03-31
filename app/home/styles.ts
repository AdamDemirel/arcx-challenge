const styles = {
  pageWrapper: 'min-h-screen flex items-center justify-center py-12 px-4 md:px-[60px]',
  timePeriodWrapperOuter: 'border border-arcx-gray-400 rounded-lg py-3.5 px-8 w-full max-w-[420px] text-sm font-regular relative',
  timePeriodWrapperInner: 'flex flex-col border-b border-arcx-gray-300',
  btnLabel: 'text-arcx-gray-500 font-medium',
  dateBtn: ({ hasDate }: { hasDate: boolean }) => `border border-gray-300 rounded p-2 text-arcx-gray-600 w-full focus:outline-none text-left ${!hasDate ? 'opacity-60' : ''} leading-6`,
  // The purple border is on the input wrapper to prevent layout shift on the input from 1-2px border-width change
  btnWrapper: ({ showCalendar }: { showCalendar: boolean }) => `mt-2 mb-6 border-2 rounded ${showCalendar ? 'border-arcx-purple-500' : 'border-white'}`,
} as const

export { styles }
