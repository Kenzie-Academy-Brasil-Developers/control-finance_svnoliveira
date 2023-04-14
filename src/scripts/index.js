import { insertedValues } from "./valuesData.js";
import { handleModal } from "./modal.js";
import { renderEntries } from "./render.js";
import { updateSum, numberDotToComma, handleFilters, handleForm, handleCategory } from "./engine.js";

handleModal();
renderEntries(insertedValues);
updateSum();
handleFilters();
handleForm();