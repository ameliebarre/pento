import * as Yup from "yup";

const createProductSchema = Yup.object()
  .shape({
    title: Yup.string().required("The title is required"),
    description: Yup.string().required("The description is required"),
    price: Yup.number()
      .test("", "Price must be greather than 1$", (value) =>
        value ? value > 1 : false,
      )
      .required("The price is required"),
    previousPrice: Yup.number(),
    color: Yup.string(),
    brand: Yup.string(),
    stock: Yup.number().required("The stock is required"),
    shipping: Yup.boolean(),
    category: Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    }),
  })
  .required("The category is required");

export default createProductSchema;
