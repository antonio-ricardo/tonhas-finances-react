interface InputHtml {
  style: {
    border: string;
  };
  name: string;
  value: string;
}

interface ValidateFormFieldsInput {
  inputsClass: string;
  fieldsQuantity: number;
  fieldsName: string[];
  optionalFieldsName?: string[];
}

interface ValidateFormFieldsOutput<T> {
  validatedFields: T;
  hasInvalidFields: boolean;
}

export const validateFormFields = <FieldsType>({
  inputsClass,
  fieldsQuantity,
  fieldsName,
  optionalFieldsName,
}: ValidateFormFieldsInput): ValidateFormFieldsOutput<FieldsType | null> => {
  const fields = document.getElementsByClassName(
    inputsClass
  ) as unknown as Array<InputHtml>;

  let validatedFields = {} as FieldsType;
  let hasInvalidFields = false;

  if (!fields || fields.length !== fieldsQuantity) {
    return { validatedFields: null, hasInvalidFields: true };
  }

  for (const field of fields) {
    if (fieldsName.includes(field.name)) {
      if (field.value && field.value !== "") {
        field.style.border = "";
        validatedFields = { ...validatedFields, [field.name]: field.value };
      } else {
        field.style.border = "1px solid red";
        hasInvalidFields = true;
      }
    }

    if (optionalFieldsName && optionalFieldsName.includes(field.name)) {
      validatedFields = { ...validatedFields, [field.name]: field.value };
    }
  }

  return { validatedFields, hasInvalidFields };
};
