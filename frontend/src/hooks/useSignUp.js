import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
// import { useNavigate } from "react-router-dom"; // if you want redirects

const useSignUp = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const { mutate: signupMutation, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // navigate("/dashboard"); // optional: redirect after signup
    },
    onError: (err) => {
      console.error("Signup error:", err);
      // toast.error("Signup failed. Please try again."); // optional
    },
  });

  return { isPending, error, signupMutation };
};

export default useSignUp;
