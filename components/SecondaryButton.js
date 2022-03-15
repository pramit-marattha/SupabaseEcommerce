import { useRouter } from "next/router";

function SecondaryButton({ text, link }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(link)}
      className="px-4 py-2 text-base sm:text-md font-primary font-medium text-palette-primary bg-palette-lighter rounded-md border border-palette-primary hover:bg-palette-light
      hover:border-palette-dark hover:text-palette-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-palette-primary w-32 sm:w-36"
    >
      {text}
    </button>
  );
}

export default SecondaryButton;
