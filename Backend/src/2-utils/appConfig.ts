class AppConfig {

    public port = 4023;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "manchesterdatabase";
    public vacationImagesAddress = `http://localhost:${this.port}/api/vacations/images/`;

}

const appConfig = new AppConfig()

export default appConfig;