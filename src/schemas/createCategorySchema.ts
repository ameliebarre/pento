import * as Yup from "yup";

const createCategorySchema = Yup.object().shape({
  name: Yup.string().required(),
});

export default createCategorySchema;
