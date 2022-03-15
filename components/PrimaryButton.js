import { useRouter } from "next/router";

function PrimaryButton({ text, link }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(link)}
      className="px-4 py-2 text-base sm:text-lg font-primary font-medium text-white bg-palette-primary rounded-md hover:border-palette-dark 
    hover:bg-palette-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-palette-primary w-32 sm:w-36"
    >
      {text}
    </button>
  );
}

export default PrimaryButton;
