import services from "./backend";
import actions from "./actions";
import isMobile from "./shared/isMobile";
import cms from "./content/cms";
import queryString from "query-string";

let sessionStorage = {};
let defaultLanguage = "";

if (global.window) {
	sessionStorage = global.sessionStorage;

	const parsed = queryString.parse(global.location.search);
	if (sessionStorage.language) {
		defaultLanguage = sessionStorage.language;
	} else if (parsed.language) {
		defaultLanguage = parsed.language;
	} else {
		defaultLanguage = global.navigator.language.split("-")[0];
	}
}

const getDirection = l => (["ar", "fa"].indexOf(l) > -1 ? "rtl" : "ltr");
const device = global.window ? (isMobile.Android() ? "Android" : isMobile.iOS ? "iPhone" : "") : "";

function changeDeviceType(state = device, action) {
	switch (action.type) {
		case actions.actionTypes.changeDeviceType:
			return action.payload;
		default:
			return state;
	}
}
function toggleServiceMap(state = !cms.siteConfig.hideServiceMap, action) {
	switch (action.type) {
		case actions.actionTypes.toggleServiceMap:
			return action.payload;
		default:
			return state;
	}
}
function changeOrganization(state = "irc", action) {
	switch (action.type) {
		case actions.actionTypes.changeOrganization:
			return action.payload;
		default:
			return state;
	}
}
function changeCountry(state = null, action) {
	switch (action.type) {
		case actions.actionTypes.changeCountry:
			return action.payload;
		default:
			return state;
	}
}

function changeCountrySlug(state = null, action) {
	switch (action.type) {
		case actions.actionTypes.changeCountry:
			return (action.payload && action.payload.fields.slug) || null;
		default:
			return state;
	}
}
function selectCategory(state = null, action) {
	switch (action.type) {
		case actions.actionTypes.selectCategory:
			return action.payload || null;
		default:
			return state;
	}
}
function selectArticle(state = null, action) {
	switch (action.type) {
		case actions.actionTypes.selectArticle:
			return action.payload || null;
		default:
			return state;
	}
}

function recordMatch(state = null, action) {
	switch (action.type) {
		case actions.actionTypes.recordMatch:
			return action.payload || null;
		default:
			return state;
	}
}

function selectCountryList(state = null, action) {
	switch (action.type) {
		case actions.actionTypes.selectCountryList:
			return action.payload || null;
		default:
			return state;
	}
}

function changeLanguage(state = defaultLanguage, action) {
	switch (action.type) {
		case actions.actionTypes.changeLanguage:
			sessionStorage.language = action.payload;

			if (global.window) {
				delete global.window.sessionStorage.country;
			}

			return action.payload || null;
		default:
			return state;
	}
}

function changeDirection(state = getDirection(defaultLanguage), action) {
	switch (action.type) {
		case actions.actionTypes.changeLanguage:
			return getDirection(action.payload);
		default:
			return state;
	}
}

function recordCoordinates(state = !sessionStorage.recordedCoordinates ? null : JSON.parse(sessionStorage.recordedCoordinates), action) {
	switch (action.type) {
		case actions.actionTypes.recordCoordinates:
			sessionStorage.recordedCoordinates = JSON.stringify(action.payload);

			return action.payload;
		default:
			return state;
	}
}
function toggleServiceGeolocation(state = sessionStorage.serviceGeolocation === "true", action) {
	switch (action.type) {
		case actions.actionTypes.toggleServiceGeolocation:
			sessionStorage.serviceGeolocation = action.payload;
			if (!action.payload) {
				delete sessionStorage.recordedCoordinates;
			}

			return action.payload;
		default:
			return state;
	}
}

// Configure Redux store & reducers
export default {
	match: recordMatch,
	currentCoordinates: recordCoordinates,

	deviceType: changeDeviceType,
	showServiceMap: toggleServiceMap,

	country: changeCountry,
	category: selectCategory,
	article: selectArticle,
	language: changeLanguage,
	direction: changeDirection,
	countryList: selectCountryList,
	countrySlug: changeCountrySlug,
	organization: changeOrganization,

	serviceGeolocation: toggleServiceGeolocation,

	articles: services.articles.reducer,
	countries: services.countries.reducer,
	categories: services.categories.reducer,
};
