import { FaArrowRight, FaSpinner } from "react-icons/fa";

interface ButtonProps {
  content: string;
  isPending?: boolean;
}

/** Submit button with animated arrow — used across auth forms. */
export default function AuthBtn({ content, isPending }: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      aria-busy={isPending}
      className="group w-full flex justify-center items-center gap-3 bg-accent rounded-lg text-text-white py-2 md:py-4 cursor-pointer transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <span className="font-bold text-sm md:text-base">{content}</span>
      {isPending ? (
        <FaSpinner
          aria-hidden="true"
          className="text-sm md:text-base animate-spin"
        />
      ) : (
        <FaArrowRight
          aria-hidden="true"
          className="text-sm md:text-base transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </button>
  );
}
