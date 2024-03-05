import { useDispatch as useDispatchRedux} from "react-redux";
import { AppThunkDispatch } from "../Core/types";

export const useDispatch = () => {
	const dispatch = useDispatchRedux<AppThunkDispatch>()
	return dispatch
}