import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { isEmailRegistered, registeredUsers } from '../../services/auth';

const RegisterForm = ({ setIsAuthenticated }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required')
      .test(
        'email-check',
        'Email already registered',
        async (value) => !(await isEmailRegistered(value))
      ),
    name: Yup.string().required('Required'),
    username: Yup.string()
      .required('Required')
      .matches(/^\S*$/, 'Username cannot contain spaces'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        if (await isEmailRegistered(values.email)) {
          setFieldError('email', 'Email already registered');
          return;
        }

        // Add new user to "database"
        registeredUsers.push({
          email: values.email,
          name: values.name,
          username: values.username,
          password: values.password
        });

        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        navigate('/movies');
      } catch (error) {
        console.error('Registration error:', error);
        setFieldError('email', 'Registration failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="auth-container">
      <h2>Register</h2>
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
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            disabled={formik.isSubmitting}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            disabled={formik.isSubmitting}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
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
              disabled={formik.isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={formik.isSubmitting}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            disabled={formik.isSubmitting}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="auth-switch">
        Already have an account?{' '}
        <button
          onClick={() => navigate('/')}
          disabled={formik.isSubmitting}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;