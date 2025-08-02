import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <h1 className="landing-header">Harmonic</h1>
      <div className="sign-form-container">
        <form
          // action={}
          aria-label="Sign up form"
          aria-describedby="form-description"
        >
          <div id="form-description" className="sr-only">
            Use this form to create a new account. Enter your email and
            password.
          </div>

          <h2 className="form-title">Sign up today!</h2>
          <p>
            Already have an account? {" "}
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
            //aria-invalid=
            //aria-describedby=
            //disabled=
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
            //aria-invalid=
            //aria-describedby=
            //disabled=
          />

          <button
            type="submit"
            className="form-button"
            //disabled=
            //aria-busy=
          >
            Sign Up
            {/*'Signing up...' when pending*/}
          </button>

          {/* Error message */}
        </form>
      </div>
    </>
  );
};

export default Signup;
