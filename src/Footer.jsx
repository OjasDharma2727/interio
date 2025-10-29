import React from "react";

// --- Constants (Data for the Footer) ---
const FOOTER_DARK_COLOR = "#3c3c3c";
const FOOTER_MEDIUM_COLOR = "#3c3c3c"; // Used for separation line background
const FOOTER_LIGHT_COLOR = "#787878";
const TEXT_LIGHT_COLOR = "#ffffffcc";
const LOGO_RED = "#c9363d";
const BASE_TEXT_COLOR = "#333333";
const MAX_WIDTH = "1200px";
const HOVER_COLOR = "#ffffff"; // Brighter white for hover effects (conceptual)

const FOOTER_LINKS = {
  About: [
    "About us",
    "Design philosophy",
    "Blogs",
    "Sustainability",
    "Careers",
    "Interio in media",
    "Media Assets",
  ],
  Services: ["Modular kitchens", "After purchase services"],
  Help: [
    "FAQ's",
    "Delivery & shipment",
    "Warranty information",
    "Return & replacement",
    "Terms & conditions",
    "Shipping",
    "Payment",
  ],
  Contact: [
    "Contact us",
    "Request a call back",
    "Store locator",
    "Become a dealer",
    "Services",
  ],
};

const CATEGORIES_OF_LOVE = [
  {
    title: "Living room:",
    items: [
      "Sofa & loungers",
      "Chairs",
      "Tables",
      "Bean bags & pouffes",
      "Cabinets",
      "Soft furnishing",
    ],
  },
  {
    title: "Bedroom:",
    items: [
      "Almirahs & Wardrobes",
      "Beds",
      "Mattresses",
      "Tables",
      "Home lockers",
    ],
  },
  {
    title: "Dining room:",
    items: ["Dining sets", "Dining tables", "Dining chairs", "Dining benches"],
  },
  { title: "Office and study:", items: ["Chair", "Tables", "Cabinets"] },
  {
    title: "Kitchen:",
    items: ["Steel chef 2.0", "Willow Wok", "Flavors", "ARK"],
  },
];

const STORES_IN_CITY = [
  "Ahmedabad",
  "Bengaluru",
  "Bhopal",
  "Bhubaneswar",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Cuttack",
  "Delhi",
  "Gaya",
  "Gurgaon",
  "Guwahati",
  "Howrah",
  "Hyderabad",
  "Indore",
  "Jaipur",
  "Kolkata",
  "Lucknow",
  "Mumbai",
  "Nagpur",
  "Patna",
  "Pune",
  "Raipur",
  "Ranchi",
  "Shimla",
  "Thane",
  "Trivandrum",
  "Varanasi",
  "Visakhapatnam",
];

// --- Sub-Components ---

const FooterColumn = ({ title, links }) => (
  <div style={footerStyles.column}>
    <h4 style={footerStyles.columnTitle}>{title}</h4>
    {links.map((link, index) => (
      <a key={index} href="#" style={footerStyles.linkItem}>
        {link}
      </a>
    ))}
  </div>
);

const FooterLinkGrid = ({ title, data, isCityList }) => (
  <div style={footerStyles.gridSection}>
    <h3 style={footerStyles.gridTitle}>{title}</h3>
    <div style={footerStyles.gridContent}>
      {isCityList
        ? data.map((city, index) => (
            <span key={index} style={footerStyles.gridItem}>
              {/* City Link implemented */}
              <a
                href={`/stores/${city.toLowerCase().replace(/\s/g, "-")}`}
                style={footerStyles.gridLink}
              >
                {city}
              </a>
              {index < data.length - 1 ? " | " : ""}
            </span>
          ))
        : data.map((category, catIndex) => (
            <span key={catIndex} style={footerStyles.gridItem}>
              <span style={footerStyles.gridItemTitle}>{category.title}</span>
              {category.items.join(", ")}
            </span>
          ))}
    </div>
  </div>
);

// --- Main Footer Component ---

export default function Footer() {
  return (
    <footer style={footerStyles.footerContainer}>
      <div style={footerStyles.footerWrapper}>
        {/* --- TOP SECTION: Logo, Social, and Link Columns --- */}
        <div style={footerStyles.topSection}>
          {/* Left Side: Logo and Social Links */}
          <div style={footerStyles.logoSocialColumn}>
            <img
              src="/images/logo_final.webp" // Placeholder for a light-colored logo
              alt="interio by Godrej logo"
              style={footerStyles.logo}
            />
            <div style={footerStyles.logoText}>by Godrej</div>
            <p style={footerStyles.followUsText}>Follow us on</p>
            <div style={footerStyles.socialIcons}>
              {/* Placeholders for social icons */}
              {[
                "facebook",
                "instagram",
                "pinterest",
                "youtube",
                "linkedin",
              ].map((icon) => (
                <a key={icon} href={`#${icon}`} style={footerStyles.socialIcon}>
                  {/* Use a placeholder circle for styling */}
                  <span
                    style={{
                      ...footerStyles.socialCircle,
                      backgroundColor: TEXT_LIGHT_COLOR,
                    }}
                  ></span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Link Columns */}
          <div style={footerStyles.linksColumnWrapper}>
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <FooterColumn key={title} title={title} links={links} />
            ))}
          </div>
        </div>

        {/* --- MIDDLE SECTION: Categories and Stores --- */}
        <div style={footerStyles.middleSection}>
          <FooterLinkGrid
            title="Categories you love"
            data={CATEGORIES_OF_LOVE}
            isCityList={false}
          />
          <FooterLinkGrid
            title="Visit your nearest stores in your city"
            data={STORES_IN_CITY}
            isCityList={true}
          />
        </div>

        {/* --- BOTTOM SECTION: Copyright and Legal Links --- */}
        <div style={footerStyles.bottomSection}>
          <span style={footerStyles.copyrightText}>
            © interio by Godrej, A Godrej Enterprises Group 2025
          </span>
          <div style={footerStyles.legalLinks}>
            <a href="#" style={footerStyles.legalLink}>
              Privacy policy
            </a>
            <a href="#" style={footerStyles.legalLink}>
              Cookie policy
            </a>
            <a href="#" style={footerStyles.legalLink}>
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Footer Styles ---
const footerStyles = {
  footerContainer: {
    backgroundColor: FOOTER_DARK_COLOR,
    padding: "50px 0 20px 0",
    marginTop: "50px", // Pushes the footer down from the main content
  },
  footerWrapper: {
    maxWidth: MAX_WIDTH,
    margin: "0 auto",
    padding: "0 20px",
    color: TEXT_LIGHT_COLOR,
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "40px",
    borderBottom: `1px solid ${FOOTER_LIGHT_COLOR}`,
    marginBottom: "30px",
  },
  logoSocialColumn: {
    flex: 1,
    maxWidth: "200px",
    marginRight: "40px",
  },
  logo: {
    height: "30px",
    filter: "brightness(0) invert(1)", // Simulates a white/light logo
    width: "auto",
    display: "block",
  },
  logoText: {
    fontSize: "14px",
    color: TEXT_LIGHT_COLOR,
    marginBottom: "15px",
    marginLeft: "1px",
  },
  followUsText: {
    fontSize: "14px",
    fontWeight: 500,
    color: TEXT_LIGHT_COLOR,
    margin: "0 0 10px 0",
  },
  socialIcons: {
    display: "flex",
    gap: "10px",
  },
  socialIcon: {
    cursor: "pointer",
  },
  socialCircle: {
    display: "block",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  linksColumnWrapper: {
    flex: 3,
    display: "flex",
    justifyContent: "space-between",
    gap: "30px",
    marginLeft: "40px",
    flexWrap: "wrap", // Added for basic responsiveness
  },
  column: {
    display: "flex",
    flexDirection: "column",
    minWidth: "120px",
  },
  columnTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: "white",
    marginBottom: "15px",
    marginTop: 0,
  },
  linkItem: {
    color: TEXT_LIGHT_COLOR,
    fontSize: "14px",
    textDecoration: "none",
    marginBottom: "10px",
    fontWeight: 300,
    transition: "color 0.2s",
  },
  middleSection: {
    padding: "30px 0 30px 0",
    borderBottom: `1px solid ${FOOTER_LIGHT_COLOR}`,
    marginBottom: "20px",
  },
  gridSection: {
    marginBottom: "25px",
  },
  gridTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: "white",
    marginBottom: "15px",
    marginTop: 0,
  },
  gridContent: {
    fontSize: "13px",
    lineHeight: "24px",
    color: TEXT_LIGHT_COLOR,
    fontWeight: 300,
  },
  gridItem: {
    marginRight: "5px",
    whiteSpace: "nowrap",
  },
  gridItemTitle: {
    fontWeight: 600,
    marginRight: "5px",
    color: "white",
  },
  // Style for the newly added city links
  gridLink: {
    color: TEXT_LIGHT_COLOR,
    textDecoration: "none",
    fontWeight: 300,
    transition: "color 0.2s",
  },
  bottomSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
    fontSize: "13px",
    color: TEXT_LIGHT_COLOR,
    flexWrap: "wrap",
  },
  copyrightText: {
    fontWeight: 300,
  },
  legalLinks: {
    display: "flex",
    gap: "30px",
  },
  legalLink: {
    color: TEXT_LIGHT_COLOR,
    textDecoration: "none",
    fontWeight: 300,
    transition: "color 0.2s",
  },
};
