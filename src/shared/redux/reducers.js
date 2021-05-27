import services from "../../backend";
import actions from "./actions";
import isMobile from "../isMobile";
import getSessionStorage from "../sessionStorage";
import getLocalStorage from "../localStorage";
import defaultLanguage from "../defaultLanguage";
import getDirection from "../getDirection";

const sessionStorage = getSessionStorage();
const localStorage = getLocalStorage();

const device = global.window ? (isMobile.Android() ? "Android" : isMobile.iOS ? "iPhone" : "") : "";

function storeRegions(state = [], action) {
	switch (action.type) {
		case actions.actionTypes.storeRegions:
			return action.payload;

		default:
			return state;
	}
}

function changeDeviceType(state = device, action) {
	switch (action.type) {
		case actions.actionTypes.changeDeviceType:
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

function changeDefaultLocation(state = null, action) {
	switch (action.type) {
		case actions.actionTypes.changeDefaultLocation:
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
			if (sessionStorage) {
				localStorage.language = action.payload;
				delete sessionStorage.country;
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

function loadingGeolocation(state = false, action) {
	switch (action.type) {
		case actions.actionTypes.loadingGeolocation:
			return action.payload;

		default:
			return state;
	}
}

function errorGeolocation(state = false, action) {
	switch (action.type) {
		case actions.actionTypes.errorGeolocation:
			return action.payload;

		default:
			return state;
	}
}
function errorMessage(state = false, action) {
	switch (action.type) {
		case actions.actionTypes.showErrorMessage:
			return action.payload;

		default:
			return state;
	}
}

// Configure Redux store & reducers
export default {
	match: recordMatch,
	currentCoordinates: recordCoordinates,
	loadingGeolocation: loadingGeolocation,
	errorGeolocation: errorGeolocation,
	errorMessage: errorMessage,

	deviceType: changeDeviceType,

	country: changeCountry,
	defaultLocation: changeDefaultLocation,
	category: selectCategory,
	article: selectArticle,
	language: changeLanguage,
	direction: changeDirection,
	countryList: selectCountryList,
	countrySlug: changeCountrySlug,
	organization: changeOrganization,

	serviceGeolocation: toggleServiceGeolocation,
	regions: storeRegions,

	articles: services.articles.reducer,
	countries: services.countries.reducer,
	categories: services.categories.reducer,
};
