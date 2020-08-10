import { App } from "../../pulse";
import { AuthCreds } from "./account.interfaces";
import * as actions from "./account.actions";
import * as routes from "./account.routes";
// import * as helpers from "./account.helpers";

export interface AccountBody {
	id: number;
	username: string;
	email: string;
}
// Define an object of state instances with chained modifiers
export const AccountState = {
	LAST_ACCOUNT_ID: App.State<number>(0).persist(),
	CREDENTIALS: App.State<AuthCreds>({}).persist(),
};
// Define a Pulse Collection to store theoretical authenticated accounts
// Pass in AccountBody type as generic "DataType"
// All data items, groups and selectors within this collection will be given the AccountBody type
export const AccountCollection = App.Collection<AccountBody>()(Collection => ({
	groups: {
		AUTHED: Collection.Group().persist(), // a group for all authenticated accounts
	},
	selectors: {
		// NEW: Introducing Selectors for Collections
		CURRENT: Collection.Selector(), // cached refrence to the current account within this collection
	},
}));

// Define controller and pass in imports
const controller = App.Controller(
	{
		state: AccountState,
		collection: AccountCollection,
		routes,
	},
	actions
);

export const accounts = controller as typeof controller & typeof actions;
