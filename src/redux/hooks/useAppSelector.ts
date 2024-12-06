import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

export const useAppSelector = useSelector.withTypes<RootState>();
