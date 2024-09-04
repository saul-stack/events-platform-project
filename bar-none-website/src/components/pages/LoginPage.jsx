function LoginPage() {
  return (
    <div>
      <h1>LoginPage</h1>
      <p>
        (This page will be rendered when the user attempts to access restricted
        content without passing valid credentials. DO NOT ENTER REAL
        CREDENTIALS. Data is not currently secured.)
      </p>
      <h1>You are not logged in.</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default LoginPage;
