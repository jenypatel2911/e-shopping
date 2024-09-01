import React from "react";
import { Link } from "react-router-dom";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { IoLogoYoutube } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="py-4 md:py-2 grid grid-cols-1 md:grid-cols-2 bg-slate-900">
        {/* Newsletter Section */}
        <div className="flex justify-center md:justify-start items-center m-4">
          <img src="images/newsletter.png" className="h-6 mt-2 mr-2" alt="newsletter" />
          <h2 className="text-2xl text-white">Sign Up For Newsletter</h2>
        </div>
        {/* Search Section */}
        <div className="flex justify-center md:justify-end items-center m-4">
          <input
            type="text"
            className="w-full md:w-80 bg-white-800 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-slate-500"
            placeholder="Search Product Here..."
            aria-label="Search Product Here..."
          />
          <button
            type="button"
            className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg ml-2 focus:outline-none"
          >
            Subscribe
          </button>
        </div>
      </footer>

      <footer className="bg-slate-900 text-slate-200 py-4 border-t border-slate-700">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-white">
          <div className="m-4">
            <h4 className="text-xl mb-4">Contact Us</h4>
            <div className="grid gap-2">
              <p>Silver Oak University, GOTA GAM,</p>
              <p>Ahmedabad, Gujarat, India, 382481.</p>
              <a href="tel:+917046676078">+91 7046676078</a>
              <a href="mailto:jenishapatel422@gmail.com">jenishapatel422@gmail.com</a>
              <div className="grid grid-cols-4 gap-2 text-2xl mt-2">
                <Link to={"/"}>
                  <TiSocialTwitterCircular />
                </Link>
                <Link to={"/"}>
                  <IoLogoYoutube />
                </Link>
                <Link to={"https://www.instagram.com/"}>
                  <RiInstagramFill />
                </Link>
                <Link to={"/"}>
                  <FaFacebook />
                </Link>
              </div>
            </div>
          </div>
          {/* Information Section */}
          <div className="m-4">
            <h4 className="text-xl mb-4">Information</h4>
            <div className="grid gap-2">
              <Link to={"/privacy-policy"}>Privacy Policy</Link>
              <Link to={"/refund-policy"}>Refund Policy</Link>
              <Link to={"/shiping-policy"}>Shipping Policy</Link>
              <Link to={"/terms-and-condition"}>Terms & Conditions</Link>
              <Link to={"/blog"}>Blogs</Link>
            </div>
          </div>
          {/* Accounts Section */}
          <div className="m-4">
            <h4 className="text-xl mb-4">Accounts</h4>
            <div className="grid gap-2">
              <Link to={"/"}>About Us</Link>
              <Link to={"/"}>FAQ</Link>
              <Link to={"/contact"}>Contact</Link>
            </div>
          </div>
          {/* Quick Links Section */}
          <div className="m-4">
            <h4 className="text-xl mb-4">Quick Links</h4>
            <div className="grid gap-2">
              <Link to={"/"}>Laptops</Link>
              <Link to={"/"}>Headphones</Link>
              <Link to={"/"}>Tablets</Link>
              <Link to={"/"}>Watches</Link>
            </div>
          </div>
        </div>
        {/* Footer Bottom Section */}
        <div className="text-center py-2">
          <p>&copy; {new Date().getFullYear()} E-shop. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
