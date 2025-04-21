import React from "react";
import { Link } from "react-router-dom";

function Footer({ allCategories }) {
  return (
    <footer className="w-full mt-auto" id="footer">
      <section className="relative mb-0 border-[1px] border-gray-300 sm:px-2 px-5 mt-10 w-full py-4">
        <div className="grid sm:grid-cols-3 grid-cols-1 font-primary text-[11px]  sm:justify-items-center">
          <div className="flex flex-col gap-1">
            <h2 className="mb-3 text-[16px] font-bold">Best Categories </h2>
            {allCategories &&
              allCategories.map(
                (category, index) =>
                  category.isPopular && (
                    <Link
                      to={`/category/${
                        category._id
                      }?categoryName=${encodeURIComponent(category.name)}`}
                      key={index}
                      className="hover:underline"
                    >
                      {category.name}
                    </Link>
                  )
              )}
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="mb-3 text-[16px] font-bold">Our Pages</h2>
            <Link className="hover:underline">About us</Link>
            <Link to="/terms-conditon" className="hover:underline">
              Terms and conditions
            </Link>
            <Link className="hover:underline">Privacy policy</Link>
            <Link className="hover:underline">Return policy</Link>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="mb-3 text-[16px] font-bold">Contact Us </h2>
            <Link className="hover:underline">space-x new site</Link>
            <Link className="hover:underline">
              Address: Ariful computer, House#17,
              <br />
              Puraton Hatkhola, Jhenaidah sadar.{" "}
            </Link>
            <Link className="hover:underline">
              Email us: nid42202@gmail.com
            </Link>
            <Link className="hover:underline">Call us: 01798395259</Link>
          </div>

        </div>
      </section>
        <div className="bg-primaryColor w-full text-center relative bottom-0 p-2">
          © 2025. All rights reserved by MR Tech.
        </div>
    </footer>
  );
}

export default Footer;
