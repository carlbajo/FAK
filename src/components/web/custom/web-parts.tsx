import { UDDLOGO } from "./udd-logo";
import { CustomSignout } from "./custom-signout";
import { ToggleTheme } from "./theme";
import { SideLink } from "./custom-sidelink";

export function Header(){
    return(
        <header className="w-full mt-4 relative p-4">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <UDDLOGO className="w-10 h-10"/>
                        <span className="font-semibold">UNI DE DAGUPAN</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ToggleTheme />
                        <CustomSignout />
                    </div>
                </div>
            </div>
        </header>
    );
};

export function Sidebar(){
    return(
        <aside>
            <div>
                {Object.entries(SideItems).map(([path, {name}]) => (
                    <SideLink key={path} href={path}>
                        {name}
                    </SideLink>
                ))}
            </div>
        </aside>
    );
};

const SideItems = {
    "/": {
        name: "Home"
    },
    "/discover": {
        name: "Discover"
    },
    "/account": {
        name: "Account"
    }
};