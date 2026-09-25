import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().nonempty("Name is Required").min(3, "Name must be atleast 3 characters").max(12, "Name must not exceed 12 characters"),
    username: z.string().nonempty("Username is Required").min(3, "Username must be atleast 3 characters").max(12, "Username must not exceed 12 characters"),
    email: z.email("Email must be a valid one").nonempty("Email is Required"),
    dateOfBirth: z.string().nonempty("Date of Birth is Required").refine((date) => {
        const currentYear = new Date().getFullYear()
        const birthYear = new Date(date).getFullYear()
        const age = currentYear - birthYear
        return age >= 18
    }, { error: "Age must be above 18" }),
    gender: z.string().nonempty("Gender is Required"),
    password: z.string().nonempty("Password is required").regex(/^.{8,}$/ , "Password must be at least 8 charecters"),
    rePassword: z.string().nonempty("Confirm password is Required")
}).refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    error: "RePassword must match with Password"
})


export const loginSchema = z.object({
    email: z.email("Email must be a valid one").nonempty("Email is Required"),
    password: z.string().nonempty("Password is required").regex(/^.{8,}$/ , "Password must be at least 8 charecters"),
})

export const changePasswordSchema = z.object({
    password: z.string().nonempty("Current password is required").regex(/^.{8,}$/, "Password must be at least 8 characters"),

    newPassword: z.string().nonempty("New password is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),

    rePassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    path: ["rePassword"],
    error: "New password must match with confirm password",
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>

export type LoginSchemaType = z.infer<typeof loginSchema>

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
