import * as Yup from "yup";

const createCategorySchema = Yup.object().shape({
  name: Yup.string(),
});

export default createCategorySchema;
