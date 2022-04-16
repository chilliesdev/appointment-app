import { BsMoon, BsSun } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { switchTheme } from "../themeSlice";
import { useAppSelector } from "../../redux/hooks";

export default function ToogleTheme() {
  const theme = useAppSelector((state) => state.themeState.theme);
  const dispatch = useDispatch();

  return (
    <button
      className="text-2xl mr-1 dark:text-white"
      onClick={() => {
        dispatch(switchTheme());
      }}
    >
      {theme === "dark" ? <BsSun /> : <BsMoon />}
    </button>
  );
}
