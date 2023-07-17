"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
    const isUserLoggedIn = true;
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(() => {
        const setProvidersValue = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        setProvidersValue();
    }, []);
    return (
        <nav className="flex-between pt-3 w-full mb-16 ">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src={ "/assets/images/logo.svg"}
                    width={50}
                    height={50}
                    alt="promtopia logo"
                    className="object-contain"
                />
                <p className="logo_text">Promtopia</p>
            </Link>
            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button type="button" onClick={signOut} className="outline_btn">
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image
                                src={session?.user ? session?.user.image : "/assets/images/logo.svg"}
                                width={37}
                                height={37}
                                alt="profile icon"
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    className="black_btn"
                                    onClick={() => signIn(provider.id)}
                                >
                                    Sing In
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user ? session?.user.image : "/assets/images/logo.svg"}
                            width={37}
                            height={37}
                            alt="profile icon"
                            className="rounded-full"
                            onClick={() => {
                                setToggleDropdown((prev) => !prev);
                            }}
                        />
                        {toggleDropdown && (
                            <div className="dropdown" style={{alignItems:"center"}}>
                                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                    My Profile
                                </Link>
                                <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                    Create Prompt
                                </Link>
                                <button type="button" className="mt-5 black_btn w-full" onClick={() => {
                                    setToggleDropdown(false)
                                    signOut()
                                }}>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    className="black_btn"
                                    onClick={() => signIn(provider.id)}
                                >
                                    Sing In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
