export class Route {
    public routes = (): DurandalRouteConfiguration[] => {
        return Array<DurandalRouteConfiguration>(
            {
                route: '',
                title: "Welcome",
                moduleId: "viewmodels/welcome",
                nav: true
            },
            {
                route: 'employee',
                title: 'Employees',
                moduleId: 'viewmodels/employees/show',
                nav: true
            },
            {
                route: 'employee/add',
                title: 'Create Employee',
                moduleId: 'viewmodels/employees/addOrDetail'
            },
            {
                route: 'employee/:id',
                title: 'Detail Employee',
                moduleId: 'viewmodels/employees/addOrDetail'
            },
            {
                route: 'position',
                title: 'Positions',
                moduleId: 'viewmodels/positions/show',
                nav: true
            },
            {
                route: 'position/add',
                title: 'Create Position',
                moduleId: 'viewmodels/positions/addOrDetail'
            },
            {
                route: 'position/:id',
                title: 'Detail Position',
                moduleId: 'viewmodels/positions/addOrDetail'
            },
        );
    }
}

export default new Route();