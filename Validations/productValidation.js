const yup = require("yup");

const productSchema = yup.object({
    titulo: yup.string().max(10).required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    precio: yup.string().max(7).required(),
    descripcion:yup.string().min(6).max(20).required(),
    codigo: yup.string().min(6).max(7).required(),
});

module.exports = productSchema;
