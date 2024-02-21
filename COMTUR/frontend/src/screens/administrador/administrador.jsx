import SideBarAdm from '../../components/sidebarAdm';
import NavBarAdm from '../../components/navbarAdm';

return (
    <div className="h-screen flex">
        <SidebarAdm />
        <div className="flex-2 container-fluid">
            <NavBarAdm />
            <div className="pl-8 pr-8 pt-[20px]">
            </div>
        </div>
    </div>
)