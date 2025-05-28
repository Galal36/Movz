import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsAuthenticated }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
// In both files, update the onSubmit handler:
onSubmit: (values) => {
  console.log(values);
  setIsAuthenticated(true);
  navigate('/movies');
},
  });

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

       

        <div className="password-container">
  <label htmlFor="password">Password</label>
  <div className="password-input">
    <input
      id="password"
      name="password"
      type={showPassword ? 'text' : 'password'}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.password}
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? 'Hide' : 'Show'}
    </button>
  </div>
  {formik.touched.password && formik.errors.password ? (
    <div className="error">{formik.errors.password}</div>
  ) : null}
</div>

        <button type="submit" className="submit-btn">Login</button>
      </form>
      <p className="auth-switch">
        Don't have an account? <button onClick={() => navigate('/register')}>Register</button>
      </p>
    </div>
  );
};

export default LoginForm;