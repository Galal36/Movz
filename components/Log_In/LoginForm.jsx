import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../services/auth';

const LoginForm = ({ setIsAuthenticated }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoginError('');
        const isValid = await authenticateUser(values.email, values.password);

        if (isValid) {
          localStorage.setItem('isAuthenticated', 'true');
          setIsAuthenticated(true);
          navigate('/movies');
        } else {
          setLoginError('Invalid email or password');
        }
      } catch (error) {
        setLoginError('Authentication failed. Please try again.');
        console.error('Login error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {loginError && <div className="auth-error">{loginError}</div>}
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
            disabled={formik.isSubmitting}
            className={formik.touched.email && formik.errors.email ? 'error-input' : ''}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
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
              disabled={formik.isSubmitting}
              className={formik.touched.password && formik.errors.password ? 'error-input' : ''}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={formik.isSubmitting}
              className="show-password-btn"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="auth-switch">
        Don't have an account?{' '}
        <button
          onClick={() => navigate('/register')}
          disabled={formik.isSubmitting}
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;