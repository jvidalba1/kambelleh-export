import { state } from "../../state.js";
import { KAMBELLEH_SHEETS_URL } from "../../../documentation/sheets-config.js";

export { KAMBELLEH_SHEETS_URL };

export function sheetsUrlWithToken() {
  const sep = state.sheetsUrl.includes("?") ? "&" : "?";
  return state.sheetsUrl + sep + "token=" + encodeURIComponent(state.sheetsToken);
}
