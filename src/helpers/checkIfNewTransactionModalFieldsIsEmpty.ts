interface Fields {
  [k: string]: FormDataEntryValue;
}

export const checkIfNewTransactionModalFieldsIsEmpty = (fields: Fields) => {
  let hasEmptyFields = false;

  const titleField = document.getElementById("formTitleInput") as HTMLElement;

  const valueField = document.getElementById("formValueInput") as HTMLElement;

  const categoryField = document.getElementById(
    "formCategoryInput"
  ) as HTMLElement;

  if (!fields.title || fields.title === "") {
    titleField.style.border = "1px solid red";
    hasEmptyFields = true;
  } else {
    titleField.style.border = "";
  }

  if (!fields.value || fields.value === "") {
    valueField.style.border = "1px solid red";
    hasEmptyFields = true;
  } else {
    valueField.style.border = "";
  }

  if (!fields.category || fields.category === "") {
    categoryField.style.border = "1px solid red";
    hasEmptyFields = true;
  } else {
    categoryField.style.border = "";
  }

  return hasEmptyFields;
};
