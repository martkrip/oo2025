import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
const resources = {
  en: {
    translation: {
      "nav": {
        "brand-name": "Decathlon",
        "athletes": "Athletes",
        "results": "Results",
        "map": "Competition Map"
      },
      "home": {
        "welcome": "Welcome to the Decathlon App"
      },
      "form": {
        "add-athlete": "Add Athlete",
        "name": "Name",
        "age": "Age",
        "country": "Country"
      },
      "athletes": {
        "title": "Athletes",
        "add-new": "Add New Athlete",
        "add-button": "Add Athlete"
      },
      "table": {
        "name": "Name",
        "country": "Country",
        "age": "Age",
        "total-points": "Total Points",
        "results": "Results",
        "edit": "Edit"
      },
      "countries": {
        "all": "All",
        "estonia": "Estonia",
        "finland": "Finland",
        "usa": "USA",
        "belarus": "Belarus",
        "ukraine": "Ukraine",
        "sweden": "Sweden"
      },
      "pagination": {
        "first": "First",
        "prev": "Prev",
        "next": "Next",
        "last": "Last",
        "page": "Page",
        "of": "of"
        },
        "edit": {
            "title": "Edit Athlete",
            "save": "Save",
            "results": "Results",
            "success": "Athlete updated successfully!",
            "fail": "Error updating athlete",
            "error": "Error",
            "loading": "Loading athlete...",
            "not-found": "Athlete not found",
            "error-no-id": "No athlete ID provided",
            "error-fetch": "Failed to fetch athlete",
            "error-update": "Failed to update athlete",
        },
        "result-form": {
            "title": "Edit or Add Result",
            "select-event": "Select Event:",
            "placeholder-event": "-- Select Event --",
            "input-result": "Result:",
            "add-button": "Add Result",
            "update-button": "Update Result",
            "success": "Result saved!"
        },
        "events": {
        "100m": "100m",
        "400m": "400m",
        "110m hurdles": "110m hurdles",
        "1500m": "1500m",
        "Long jump": "Long jump",
        "Shot put": "Shot put",
        "High jump": "High jump",
        "Discus throw": "Discus throw",
        "Pole vault": "Pole vault",
        "Javelin throw": "Javelin throw"
        }
    }
  },
  et: {
    translation: {
      "nav": {
        "brand-name": "Kümnevõistlus",
        "athletes": "Võistlejad",
        "results": "Tulemused",
        "map": "Võistluskaart"
      },
      "home": {
        "welcome": "Tere tulemast kümnevõistluse rakendusse"
      },
      "form": {
        "add-athlete": "Lisa võistleja",
        "name": "Nimi",
        "age": "Vanus",
        "country": "Riik"
      },
      "athletes": {
        "title": "Võistlejad",
        "add-new": "Lisa uus võistleja",
        "add-button": "Lisa võistleja"
      },
      "table": {
        "name": "Nimi",
        "country": "Riik",
        "age": "Vanus",
        "total-points": "Kokku punkte",
        "results": "Tulemused",
        "edit": "Muuda"
      },
      "countries": {
        "all": "Kõik",
        "estonia": "Eesti",
        "finland": "Soome",
        "usa": "USA",
        "belarus": "Valgevene",
        "ukraine": "Ukraina",
        "sweden": "Rootsi"
      },
      "pagination": {
        "first": "Esimene",
        "prev": "Tagasi",
        "next": "Järgmine",
        "last": "Viimane",
        "page": "Leht",
        "of": "of"
        },
    "edit": {
        "title": "Muuda sportlast",
        "save": "Salvesta",
        "results": "Tulemused",
        "success": "Sportlane on edukalt uuendatud!",
        "fail": "Viga sportlase uuendamisel",
        "error": "Viga",
        "loading": "Sportlase andmete laadimine...",
        "not-found": "Sportlast ei leitud",
        "error-no-id": "Sportlase ID puudub",
        "error-fetch": "Sportlase andmete laadimine ebaõnnestus",
        "error-update": "Sportlase uuendamine ebaõnnestus"
  },
    "result-form": {
        "title": "Muuda või lisa tulemus",
        "select-event": "Vali ala:",
        "placeholder-event": "-- Vali ala --",
        "input-result": "Tulemus:",
        "add-button": "Lisa tulemus",
        "update-button": "Uuenda tulemust",
        "success": "Tulemus salvestatud!"
    },
    "events": {
        "100m": "100 m jooks",
        "400m": "400 m jooks",
        "110m hurdles": "110 m tõkkejooks",
        "1500m": "1500 m jooks",
        "Long jump": "Kaugushüpe",
        "Shot put": "Kuulitõuge",
        "High jump": "Kõrgushüpe",
        "Discus throw": "Kettaheide",
        "Pole vault": "Teivashüpe",
        "Javelin throw": "Odavise"
        }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "et", // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
