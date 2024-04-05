const z = require("zod");
const registerSchema = z.object({
  firstname: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "name must be atleast 3 charactres" })
    .max(200, { message: "name must be less that 200 characters" }),
  lastname: z
    .string({ required_message: "Last name required" })
    .trim()
    .min(3, { message: "it must less that 3 characters" })
    .max(200, { message: "it must be less that 200 words" }),
  username: z
    .string({ required_message: "user name required" })
    .trim()
    .min(3, { message: "it must less that 3 characters" })
    .max(200, { message: "it must be less that 200 words" }),
  contact: z
    .string({ required_message: "contact Number required" })
    .min(10,{message:"phone number must contain atlreast 10 characters."})
    .max(30, { message: "it must be less than 30 words" }),
  email: z
  .string({required_error:"Enter email"})
  .trim()
  .email({ message: "Must be an email or contain '@' " }).trim(),
  password: z
    .string({ required_error: "please enter or find new address" })
    .trim()
    .min(3, { message: "must contain at least at least 3 characters" })
    .max(200, { message: "must be less than 200 characters" }),
});

module.exports = registerSchema