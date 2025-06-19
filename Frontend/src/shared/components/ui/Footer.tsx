interface FooterProps {
  className?: string;
}

function Footer({ className = "" }: FooterProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-[var(--primary-color)] w-screen h-[106px] ${className}`}
    >
      <p className="text-white heading3">
        © {new Date().getFullYear()} Gaming Gear. Created with ❤️ by Nguyên, Thọ
        and Võ.
      </p>
      <p className="mt-2 text-white">
        Follow us on{" "}
        <a
          href="https://github.com/Tp2k4"
          className="text-pink-500 hover:text-[var(--secondary-hover)] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </p>
    </div>
  );
}
export default Footer;
