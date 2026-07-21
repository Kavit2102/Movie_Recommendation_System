
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "../ui/input"

export function DropdownMenuBasic() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Input type="search" placeholder="Search..." />} />
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
