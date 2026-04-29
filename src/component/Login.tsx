import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useLocal from "../hooks/useLocal";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [allUsers] = useLocal("allUsers", []);
  const [, setCurrentUser] = useLocal("currentUser", null);
  const navigate = useNavigate();

  const formData = z.object({
    loginID: z.string().trim().min(3, "min 3 char require"),
    password: z
      .string()
      .trim()
      .min(8, "Password must contain at least 8 characters"),
  });
  type formSchema = z.infer<typeof formData>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formSchema>({
    resolver: zodResolver(formData),
  });
  const onSubmit = async (data: formSchema) => {
    try {
      if (allUsers?.length <= 0) {
        throw new Error("there are no users in the system");
      } else {
        const userData = allUsers?.find(
          (user) =>
            user.loginID === data.loginID && user.password === data.password
        );
        if (!userData) {
          throw new Error("Wrong Credintials");
        }
        await setCurrentUser(userData);
        if (["admin", "employee"].includes(userData.userType.toLowerCase())) {
          navigate(`/${userData.userType.toLowerCase()}`);
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      if (error?.message) {
        alert(error.message);
      }
      console.error(error);
    }
  };
  return (
    <div className="container">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            name="loginID"
            id="loginID"
            {...register("loginID")}
            className={`${errors?.loginID ? "input-error" : ""} input`}
          />

          {errors?.loginID && (
            <span className="error">{errors.loginID.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            name="password"
            id="password"
            {...register("password")}
            className={`${errors?.password ? "input-error" : ""} input`}
          />
          {errors?.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <input type="submit" value="submit" disabled={isSubmitting} />
      </form>
      <hr />
      <h3>Dont have login</h3>
      <Link to="/signup">Sign up</Link>
    </div>
  );
};
export default Login;
