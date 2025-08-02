import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signUpNewUser } = useAuth();
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const email = formData.get("email");
      const password = formData.get("password");

      const {
        success,
        data,
        error: signUpError,
      } = await signUpNewUser(email, password);

      if (signUpError) {
        return new Error(signUpError);
      }
      if (success && data?.session) {
        navigate("/dashboard");
        return null;
      }
      return null;
    },
    null
  );

  return (
    <>
      <h1 className="landing-header">Paper Like A Boss</h1>
      <div className="sign-form-container">
        <form
          action={submitAction}
          aria-label="Sign up form"
          aria-describedby="form-description"
        >
          <div id="form-description" className="sr-only">
            Use this form to create a new account. Enter your email and
            password.
          </div>

          <h2 className="form-title">Sign up today!</h2>
          <p>
            Already have an account?{" "}
            <Link className="form-link" to="/">
              Sign in
            </Link>
          </p>

          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "signup-error" : undefined}
            disabled={isPending}
          />

          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "signup-error" : undefined}
            disabled={isPending}
          />

          <button
            type="submit"
            className="form-button"
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </button>

          {error && (
            <div
              id="signup-error"
              role="alert"
              className="sign-form-error-message"
            >
              {error.message}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Signup;
