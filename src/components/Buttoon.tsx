import { clsx } from 'clsx';

export const Buttoon = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={clsx(
      `relative flex h-auto min-h-0 select-none
      items-center justify-center rounded-2xl
      border-2 border-blue-500 bg-gradient-to-b 
      from-blue-500 to-[#00b4ff] p-1 
    text-white shadow-gag hover:shadow-xl
     hover:brightness-110 focus:brightness-110 active:brightness-75
     disabled:cursor-not-allowed disabled:border-opacity-0 
     disabled:bg-gray-700 disabled:from-gray-700 disabled:to-gray-700 disabled:opacity-50 disabled:shadow-none`,
      className
    )}
    {...props}
    type="button"
  />
);
