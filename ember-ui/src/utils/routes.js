import Databases from "../pages/Databases";
import Project from "../pages/Project";
import Projects from "../pages/Projects";
import Settings from "../pages/Settings";
import Setup from "../pages/Setup";

export const EMBER_ROUTES = [
    {
        routeKey: "ember-setup-page",
        routePath: "/setup",
        RouteComponent: Setup
    },
    {
        routeKey: "ember-projects-page",
        routePath: "/projects",
        RouteComponent: Projects
    },
    {
        routeKey: "ember-project-page",
        routePath: "/projects/:projectId",
        RouteComponent: Project
    },
    {
        routeKey: "ember-databases-page",
        routePath: "/databases",
        RouteComponent: Databases
    },
    {
        routeKey: "ember-settings-page",
        routePath: "/settings",
        RouteComponent: Settings
    }
];