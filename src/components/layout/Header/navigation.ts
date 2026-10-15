import { clubLinks, projectLinks } from "@/lib/wireframe-content";

export type NavigationLink = { label: string; href: string };
export type NavigationItem = {
  label: string;
  href?: string;
  children?: NavigationLink[];
};

export function buildHeaderNavigation({
  projects = projectLinks.filter((link) => link.href !== "/projekte"),
  legacyNavigation = clubLinks,
  headerNavigation,
}: {
  projects?: NavigationLink[];
  legacyNavigation?: NavigationLink[];
  headerNavigation?: NavigationItem[];
} = {}): NavigationItem[] {
  if (headerNavigation?.length) return headerNavigation;
  const rank = (href: string) =>
    href.endsWith("/anahita") ? 0 : href.endsWith("/dalia") ? 1 : 2;
  const sortedProjects = [...projects].sort(
    (a, b) => rank(a.href) - rank(b.href),
  );
  const aboutLinks = legacyNavigation.map((link) =>
    link.href === "/ueber-uns" ? { ...link, label: "Verein" } : link,
  );
  return [
    {
      label: "Projekte",
      children: [
        ...sortedProjects,
        { label: "Alle Projekte", href: "/projekte" },
      ],
    },
    { label: "Über uns", children: aboutLinks },
    { label: "News", href: "/news" },
  ];
}
