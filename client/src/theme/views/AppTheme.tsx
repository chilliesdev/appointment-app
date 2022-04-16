import { useEffect } from "react";

export default function AppTheme({ children }: { children: JSX.Element }) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      const addClass = (classValue: string) => {
        const body = document.body;

        let classArr = classValue.split(" ");

        classArr.map((classVal) => body.classList.add(classVal));
      };

      addClass(
        "bg-white dark:bg-gray-800 dark:text-white text-gray-800 font-poppins transition-all"
      );
    }
  }, []);

  return <>{children}</>;
}
