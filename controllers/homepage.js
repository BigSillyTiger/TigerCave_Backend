const homePage = () => {
    return `
        <h1>Home page</h1>
        <p>Please 
            <a href="/register">Register</a>
            or
            <a href="/login">Login</a>
        </p>
    `
}

const loginPage = () => {
    return `
        <h1>Login page</h1>
        <form method="post" action="login">
            Enter Username: <br>
            <input type="text" name="username"><br>
            Enter Password: <br>
            <input type="password" name="password" required>
            <br><br>
            <input type="submit" value="Submit">
        </form>
    `
}

const registerPage = () => {
    return `
        <h1>Register page</h1>
        <form method="post" action="register">
            Enter Username: <br>
            <input type="text" name="username"><br>
            Enter Password: <br>
            <input type="password" name="password" required>
            <br><br>
            <input type="submit" value="Submit">
        </form>
    `
}

const protectedRouter = (flag) => {
    if(flag) {
        return `
            <h1>You are authenticated</h1>
            <p>
                <a href="/logout">Logout and reload</a>
            </p>
        `
    }
    return `
        <h1>You are not authenticated</h1>
        <p>
            <a href="/login">Login</a>
        </p>
    `
}

const loginS = () => {
    return `
        <p>
            You successfully logged in. => 
            <a href="/protected-router"> 
                Go to protected page
            </a>
        </p>
    `
}

const loginF = () => {
    return `You entered the wrong password or username.`
}

module.exports = {
    homePage,
    loginPage,
    registerPage,
    protectedRouter,
    loginS,
    loginF
}