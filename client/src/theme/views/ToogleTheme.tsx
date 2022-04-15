import { BsMoon, BsSun } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { switchTheme } from "../themeSlice";
import { useAppSelector } from "../../redux/hooks";

export default function ToogleTheme() {
  const theme = useAppSelector((state) => state.themeState.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(switchTheme());
      }}
    >
      {theme === "dark" ? (
        <BsSun className="text-2xl mr-1" />
      ) : (
        <BsMoon className="text-2xl mr-1" />
      )}
    </button>
  );
}
