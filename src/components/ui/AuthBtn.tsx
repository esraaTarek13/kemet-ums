import { FaArrowRight } from "react-icons/fa";

interface ButtonProps {
  content: string;
}

/** Submit button with animated arrow — used across auth forms. */
export default function AuthBtn({ content }: ButtonProps) {
  return (
    <button
      type="submit"
      className="group w-full flex justify-center items-center gap-3 bg-accent rounded-lg text-text-white py-2 md:py-4 cursor-pointer transition-all duration-300"
    >
      <span className="font-bold text-sm md:text-base">{content}</span>
      <FaArrowRight
        aria-hidden="true"
        className="text-sm md:text-base transition-transform duration-300 group-hover:translate-x-1"
      />
    </button>
  );
}
