"use client";

import Image from "next/image";
import Link from "next/link";

export default function NavigationOption() {
  return (
    <div className="others-options d-flex align-items-center">
      <ul className="option-item">
        <li className="join-coummuinity">
          <Link href="/">
            <i className="ri-discord-fill" />
            <span>Join our community</span>
          </Link>
        </li>
        <li className="search-area">
          <button
            className="btn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            <Image
              height={20}
              width={20}
              src="/assets/image/icons/search.svg"
              alt="search-icon"
            />
            <Image
              height={20}
              width={20}
              src="/assets/image/icons/search-hover.svg"
              alt="Search Hover Icon"
            />
          </button>
        </li>
        <li className="view-cart">
          <Link href="/cart" className="cart">
            <Image
              height={25}
              width={25}
              src="/assets/image/icons/cart.svg"
              alt="Cart"
            />
            <Image
              height={25}
              width={25}
              src="/assets/image/icons/cart-hover.svg"
              alt="Cart Hover"
            />
          </Link>
        </li>
        <li className="button-wrap">
          <Link href="/" className="custom-btn">
            free trial
          </Link>
        </li>
        <li className="side-menu-wrap">
          <button
            className="btn side-menu"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <Image
              height={30}
              width={30}
              src="/assets/image/icons/humberg-menu.svg"
              alt="Menu"
            />
            <Image
              height={30}
              width={30}
              src="/assets/image/icons/humberg-menu-hover.svg"
              alt="Menu Hover"
            />
          </button>
        </li>
      </ul>
    </div>
  );
}
