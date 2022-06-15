const yup = require("yup");

const userschema = yup.object({
  userName: yup.string().max(10).matches(/^[A-Za-z ]*$/, 'Please enter valid name').required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  userType: yup.string().required(),
});

module.exports = userschema;
