import App from './App'

const install = (app) => {
    const store = app.store
    const routes = app.router.routes

    return [{
        path: "",
        component: App,
        children: routes
    }]
}

export default {
    name: "ctyun",
    install
}