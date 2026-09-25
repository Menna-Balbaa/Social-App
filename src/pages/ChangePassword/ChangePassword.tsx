import {Alert, Button, FieldError, Input, Spinner, TextField,} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, ShieldCheck } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {changePasswordSchema,type ChangePasswordSchemaType} from "../../lib/schema/auth.schema";
import { changeUserPassword } from "../../services/auth.services";
import { authContext } from "../../components/context/AuthContext";

export default function ChangePassword() {

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { setToken } = useContext(authContext)!;
  const navigate = useNavigate();

  const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    mode: "all",
    defaultValues: {
      password: "",
      newPassword: "",
      rePassword: "",
    },
  });

  async function sendData(formData: ChangePasswordSchemaType) {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await changeUserPassword({
        password: formData.password,
        newPassword: formData.newPassword,
      });

      console.log(response);
      setSuccessMsg("Password updated successfully");
      toast.success("Updated ✅");

      setTimeout(() => {
        localStorage.removeItem("userToken");
        setToken("");
        navigate("/auth/login");
      }, 1500);
    } catch (error: any) {

      setErrorMsg("Current password is incorrect");
      toast.error("Incorrect");

      console.log(error);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="mb-8 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm">
            <KeyRound className="h-8 w-8" />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Change Password
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Keep your account secure by using a strong password.
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(sendData)}
        >
          {/* Current Password */}
          <TextField
            aria-label="Current password"
            isInvalid={Boolean(errors.password)}
            className="w-full"
          >
            <Input
              {...register("password")}
              aria-label="Current password"
              type="password"
              className="w-full"
              placeholder="Enter current password"
            />

            <FieldError>
              {errors.password?.message}
            </FieldError>
          </TextField>

          {/* New Password */}
          <TextField
            aria-label="New password"
            isInvalid={Boolean(errors.newPassword)}
            className="w-full"
          >
            <Input
              {...register("newPassword")}
              aria-label="New password"
              type="password"
              className="w-full"
              placeholder="Enter new password"
            />

            <FieldError>
              {errors.newPassword?.message}
            </FieldError>
          </TextField>

          <p className="-mt-1 text-xs text-slate-500">
            At least 8 characters with uppercase, lowercase, number,
            and special character.
          </p>

          {/* Confirm Password */}
          <TextField
            aria-label="Confirm password"
            isInvalid={Boolean(errors.rePassword)}
            className="w-full"
          >
            <Input
              {...register("rePassword")}
              aria-label="Confirm password"
              type="password"
              className="w-full"
              placeholder="Re-enter new password"
            />

            <FieldError>
              {errors.rePassword?.message}
            </FieldError>
          </TextField>

          <Button
            type="submit"
            className="w-full rounded-xl bg-blue-500 py-6 text-base font-bold text-white shadow-md transition enabled:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            isDisabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner className="text-white" />
                Updating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Update password
              </span>
            )}
          </Button>

          {errorMsg && (
            <Alert className="bg-red-100" status="danger">
              <Alert.Indicator />

              <Alert.Content>
                <Alert.Title>{errorMsg}</Alert.Title>
              </Alert.Content>
            </Alert>
          )}

          {successMsg && (
            <Alert className="bg-green-100" status="success">
              <Alert.Indicator />

              <Alert.Content>
                <Alert.Title>{successMsg}</Alert.Title>
              </Alert.Content>
            </Alert>
          )}
        </form>
      </div>
    </main>
  );
}