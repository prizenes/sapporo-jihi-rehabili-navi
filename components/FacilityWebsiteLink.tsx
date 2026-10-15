"use client";

type Props = {
  href: string;
  facilityId: string;
  placement: "facility_list" | "facility_detail";
  className: string;
  children: React.ReactNode;
};

export default function FacilityWebsiteLink({
  href,
  facilityId,
  placement,
  className,
  children,
}: Props) {
  const trackClick = () => {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void })
      .gtag;
    if (!gtag) return;
    const url = new URL(href);
    // Only public facility information is sent; omit query strings and fragments.
    gtag("event", "facility_website_click", {
      facility_id: facilityId,
      link_domain: url.hostname,
      link_url: `${url.origin}${url.pathname}`,
      link_location: placement,
      transport_type: "beacon",
    });
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackClick}
      className={className}
      data-facility-id={facilityId}
      data-link-location={placement}
    >
      {children}
    </a>
  );
}
