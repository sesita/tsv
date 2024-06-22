import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer class="border-t border-gray dark:border-dark rounded-t-3xl pt-12 pb-8">
            <div class="container mx-auto">
                <div class="md:grid grid-cols-12 gap-12 mb-12 flex flex-col">
                    <div class="col-span-4">
                        <div class="logo mb-4">
                            <img src="/logo.png" alt="Logo" width="200" height="100" class="w-44" />
                        </div>
                        <p class="text-dark-gray mb-8 capitalize">
                            Meet your town specialists <br />
                            <span className="text-xs flex w-3/4 mt-1">Expanding from the Chicagoland area to a nationwide reach, we aim to simplify and enhance the way people find services and businesses in their local communities, fostering closer connections between businesses and residents.</span>
                        </p>
                        <ul class="text-sm text-dark-gray flex flex-col gap-2">
                            <li>
                                <span>E-mail: </span>
                                <a href="mailto:info@mytsv.com" class="font-normal hover:text-red-600 dark:hover:text-yellow transition-all">
                                    info@mytsv.com
                                </a>
                            </li>
                            <li>
                                <span>Number: </span>
                                <a href="tel:18479439634" class="font-normal hover:text-red-600 dark:hover:text-yellow transition-all">
                                    +1 847-943-9634
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-span-3">
                        <div class="mx-md-5">
                            <h1 class="text-xl font-semibold text-dark mb-6">Useful Links</h1>
                            <ul class="text-dark-gray  flex flex-col gap-6">
                                <li class="hover:text-red-600 transition-all">
                                    <a href="">FAQ</a>
                                </li>
                                <li class="hover:text-red-600 transition-all">
                                    <a href="">Registration</a>
                                </li>
                                <li class="hover:text-red-600 transition-all">
                                    <a href="">Video Upload</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-span-3">
                        <h1 class="text-xl font-semibold text-dark mb-6">Company</h1>
                        <ul class="text-dark-gray flex flex-col gap-6">
                            <li class="hover:text-red-600 transition-all">
                                <a href="">About us</a>
                            </li>
                            <li class="hover:text-red-600 transition-all">
                                <a href="">Contact</a>
                            </li>
                            <li class="hover:text-red-600 transition-all">
                                <a href="">Terms & Conditions</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-span-2">
                        <h1 class="text-xl font-medium text-dark mb-6">Follow Us</h1>
                        <div class="flex flex-wrap gap-4 text-4xl ">
                            <a href="https://www.facebook.com/meetyourtownspecialists" rel="noreferrer" target="_blank" aria-label="Facebook Page">
                                <FaFacebook />
                            </a>
                            <a href="https://www.youtube.com/@meet-your-town-specialists/" rel="noreferrer" target="_blank" aria-label="Instagram Page">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 mb-6 relative lg:flex flex-col">
                    <p class="text-center text-dark-gray">
                        <span>© MyTSV.com - Meet Your Town Specialists</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};
