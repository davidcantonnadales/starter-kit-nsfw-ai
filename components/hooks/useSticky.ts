import { useEffect, useState } from "react";

export default function useSticky(y: number = 100) {
  const [isSticky, setSticky] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scroll = () => {
        if (window.scrollY > y) {
          return setSticky(true);
        }
        setSticky(false);
      };

      window.addEventListener("scroll", scroll);

      return () => {
        window.removeEventListener("scroll", scroll);
      };
    }
  }, []);

  return isSticky;
}
