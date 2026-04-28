import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useLocal from "../hooks/useLocal";
import { Link, useNavigate } from "react-router-dom";

const userTypeList = ["admin", "employee", "other"];

const Signup = () => {
  const navigate = useNavigate();

  const formData = z.object({
    loginID: z.string("Please enter").min(3, "min 3 char require"),
    password: z
      .string("Please dont enter")
      .min(8, "not meeting the password Standard"),
    userType: z.enum(userTypeList),
  });
  type formSchema = z.infer<typeof formData>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formSchema>({
    resolver: zodResolver(formData),
  });
  const [allUsers, setAllUsers] = useLocal("allUsers", []);
  const onSubmit = async (data: formSchema) => {
    try {
      const newData = [...allUsers, data];
      console.log(data, newData);
      await setAllUsers(newData);
      // alert("Sign up successfully go to login");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      Signup Page
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="loginID"
          id="loginID"
          {...register("loginID")}
        />
        {errors?.loginID && <>{errors.loginID.message}</>}
        <input
          type="text"
          name="password"
          id="password"
          {...register("password")}
        />
        {errors?.password && <>{errors.password.message}</>}

        <select name="userType" id="userType" {...register("userType")}>
          {userTypeList &&
            userTypeList.map((uType, i) => (
              <option key={i} value={uType}>
                {uType.toUpperCase()}
              </option>
            ))}
        </select>
        <input type="submit" value="submit" disabled={isSubmitting} />
      </form>
      <hr />
      <h3>Ohh have a Login</h3>
      <Link to="/">Login</Link>
    </>
  );
};
export default Signup;
