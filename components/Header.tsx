import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <nav style={{ display: "flex", justifyContent: 'space-between'}}>
		<Link href="/">
				<a className="bold" data-active={isActive("/")}>
					Library
				</a>
			</Link>
			<Link href="/table">
				<a className="bold" data-active={isActive("/table")}>
					Table
				</a>
			</Link>
			<Link href="/drafts">
				<a className="bold" data-active={isActive("/drafts")}>
					Drafts
				</a>
			</Link>
    </nav>
  );
};

export default Header;
