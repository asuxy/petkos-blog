import React from 'react';
import Link from "next/link"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { auth } from "@/auth"
import { SignOut } from "../sign-out"

export default async function Header() {
    const session = await auth();

    if (session?.user) {
        console.log(session.user.name) // etc
    }

    return (
        <header className="bg-background border-b shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-5xl">
                {/* Navigation Menu */}
                <NavigationMenu>
                    <NavigationMenuList className="gap-4">
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className="font-semibold text-base">
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/about" legacyBehavior passHref>
                                <NavigationMenuLink className="font-medium text-base">
                                    About
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/posts" legacyBehavior passHref>
                                <NavigationMenuLink className="font-medium text-base">
                                    Blog
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/contacts" legacyBehavior passHref>
                                <NavigationMenuLink className="font-medium text-base">
                                    Contacts
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {session?.user?.id ? (<SignOut />) : (
                    <Button size="lg" className="text-sm">
                        <Link href="/signin">
                            Sign In
                        </Link>
                    </Button>
                )}
            </div>
        </header>
    )
}
