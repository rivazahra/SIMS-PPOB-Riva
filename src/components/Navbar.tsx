import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { Wallet } from "../assets";

const Navbar = () => {
    const { pathname } = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const linkMenu = [
        { name: "Top Up", link: "/top-up" },
        { name: "Transaction", link: "/transaction" },
        { name: "Akun", link: "/account" },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav className="header sticky top-0 bg-white border-b border-gray-300 py-3 px-5 md:px-14 lg:px-20 z-50">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex gap-3 items-center">
                        <img className="object-cover h-8 w-8" src={Wallet} alt="SIMS PPOB" />
                        <h1 className="text-lg font-semibold">SIMS PPOB</h1>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex gap-10 text-sm">
                        {linkMenu.map((item) => (
                            <Link
                                key={item.link}
                                to={item.link}
                                className={`transition-colors hover:text-red-600 ${
                                    item.link === pathname
                                        ? "text-red-600 font-semibold"
                                        : "text-black"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
            </nav>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Side Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button
                        onClick={closeMobileMenu}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="h-6 w-6 text-gray-700" />
                    </button>
                </div>

                {/* Drawer Menu */}
                <ul className="flex flex-col py-4">
                    {linkMenu.map((item) => (
                        <Link
                            key={item.link}
                            to={item.link}
                            onClick={closeMobileMenu}
                            className={`px-5 py-4 transition-colors hover:bg-gray-50 border-l-4 ${
                                item.link === pathname
                                    ? "text-red-600 font-semibold bg-red-50 border-red-600"
                                    : "text-gray-700 border-transparent"
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Navbar;