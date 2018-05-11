import router = require("plugins/router");
import config from "configs/routes";

class Shell {
    public router: DurandalRootRouter;

    constructor() {
        this.router = router;
    }

    public activate = (): DurandalPromise<any> => {
        router.map(config.routes()).buildNavigationModel();

        return router.activate();
    }
}

export = new Shell();