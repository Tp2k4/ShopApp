interface FooterProps {
  className?: string;
}

function Footer({ className = "" }: FooterProps) {
  const phone = "0123456789";
  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
  };
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
          className="text-white hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </p>
      <p className="text-white">
        Contact Phone:{" "}
        <span
          className="cursor-pointer underline hover:text-[var(--secondary-color)]"
          onClick={handleCopyPhone}
          title="Nhấn để copy số điện thoại"
        >
          {phone}
        </span>
      </p>
    </div>
  );
}
export default Footer;
