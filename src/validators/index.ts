import { ValidationModelBuilder } from "~/classes/modelBuilder/ValidationModelBuilder";
import { models } from "~/models";
import { FieldValidator } from "~/types";
import { Field } from "~/types/models";

export const validators = Object.entries(models.validation).reduce(
  (prevValue, [fieldName, model]) => {
    prevValue[fieldName as Field] = ValidationModelBuilder.compiler(model);
    return prevValue;
  },
  {} as { [key in Field]: FieldValidator }
);
