import { IconType } from "react-icons";

export type NavLinkItem = {
  label: string;
  href: string;
  icon: IconType;
};

export type AsideProps = {
  portalName: string;
  navLinks: NavLinkItem[];
};