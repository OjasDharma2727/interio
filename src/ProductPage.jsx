import React, { useState, useMemo } from "react";

// -------------------------------------------------------------
// --- ⚙️ CORE CONFIG & DATA SETUP ⚙️ ---
// -------------------------------------------------------------

// --- Product Images (The list that was likely copied from an asset folder) ---
const PRODUCT_ASSETS = [
  "/images/56101502sd04296_01_1920x1080.webp",
  "/images/56101502sd04296_02_960x1080.webp",
  "/images/56101502sd04296_03_960x1080.webp",
  "/images/56101502sd04296_04_1920x1080.webp",
  "/images/56101502sd04296_05_960x1080.webp",
  "/images/56101502sd04296_06_960x1080.webp",
  // This is the marketing shot, kept separate for easy access
  "/images/missouri_recliner_a2_v1_1920_1080.webp",
];

const getProductImageUrl = (index) => PRODUCT_ASSETS[index];

// --- Pricing Base Data ---
const BASE_PRICE = 189590;
const BASE_MRP = 224397;
const BASE_MONTHLY_EMI = 15195;

// --- Color Palette and Style Helpers (The 'Design System' we never wrote down) ---
const BRAND_RED = "#c9363d";
const CTA_VIBRANT_RED = "#f86754";
const MAIN_TEXT_COLOR = "#333333";
const PAGE_BACKGROUND = "#f7f4ed"; // Creamy beige background
const OFFER_BOX_BG = "#fff9f3"; // Lighter for the offer box
const BORDER_LIGHT_GRAY = "#dddddd";
const MARKETING_ACCENT = "#e54854";
const INFO_PANEL_FIXED_WIDTH = "400px";

// --- Configuration Options ---
const UPHOLSTERY_OPTIONS = [
  { name: "Leather", value: "leather", priceDiff: 0, mrpDiff: 0, emiDiff: 0 },
  {
    name: "Fabric",
    value: "fabric",
    priceDiff: -50000, // Fabric is cheaper
    mrpDiff: -60000,
    emiDiff: -4000,
  },
];

const PRODUCT_COLORS = [
  { name: "Olive Green", value: "Olive Green", code: "#4d574b" },
  { name: "Ash Grey", value: "Ash Grey", code: "#a1a19b" },
];

// -------------------------------------------------------------
// --- ⚛️ PRESENTATIONAL COMPONENTS ⚛️ ---
// -------------------------------------------------------------

// 🌟 Custom SVG Icon Component (Handles all standard site icons) 🌟
const SvgIcon = ({ name, size = 22, color = MAIN_TEXT_COLOR }) => {
  let path = "";
  let strokeWidth = "1.5";
  let fill = "none";

  switch (name) {
    case "Search":
      path =
        "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19.5l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z";
      break;
    case "Person":
      path =
        "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z";
      break;
    case "Heart":
      // FIX: Changed from outlined to filled heart for the wishlist icon look
      path =
        "M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z";
      fill = color;
      strokeWidth = "0";
      break;
    case "Cart":
      path =
        "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8-2h10l-2.19-9H6.83L5.68 4H3v2h2l3.6 7.59L7 16h11v-2H7l1-2z";
      break;
    case "RightChevron":
      path = "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
      color = "#555"; // Specific color for offer link
      size = 18;
      strokeWidth = "2";
      break;
    default:
      return null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      fill={fill}
      stroke={fill === "none" ? color : "none"} // Outline only if not filled
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <path d={path} />
    </svg>
  );
};

const OptionSelector = ({ title, options, selectedValue, onSelect }) => (
  <div style={localStyles.optionSelectorContainer}>
    <div style={localStyles.optionSelectorTitle}>{title}:</div>
    <div style={localStyles.optionSelectorOptions}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          style={{
            ...localStyles.optionButton,
            border:
              opt.value === selectedValue
                ? `2px solid ${BRAND_RED}`
                : "1px solid #ccc",
          }}
        >
          {title === "Color" && (
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: opt.code,
                marginRight: "8px",
                border: `1px solid ${
                  opt.value === selectedValue ? BRAND_RED : "#ccc"
                }`,
              }}
            ></span>
          )}
          {opt.name}
        </button>
      ))}
    </div>
  </div>
);

const WhyChooseTextSection = () => (
  <p style={localStyles.whyChooseText}>
    Missouri brings{" "}
    <span style={localStyles.boldRedText}>luxury into motion</span>. With{" "}
    <span style={localStyles.boldRedText}>genuine leather</span> where it
    matters, <span style={localStyles.boldRedText}>dual comfort zones</span>,
    and{" "}
    <span style={localStyles.boldRedText}>
      touch-controlled recline with USB port
    </span>
    , it's a home upgrade that feels like first class.
  </p>
);

// -------------------------------------------------------------
// --- 🏠 MAIN PRODUCT PAGE COMPONENT 🏠 ---
// -------------------------------------------------------------

export default function ProductPage() {
  // State for tabs, quantity, and product options
  const [activeTab, setActiveTab] = useState("Why this Product");
  const [qty, setQty] = useState(1);
  const [selectedUpholstery, setSelectedUpholstery] = useState(
    UPHOLSTERY_OPTIONS[0].value
  );
  const [selectedColor, setSelectedColor] = useState(PRODUCT_COLORS[0].value);

  // Pincode and Callback states
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null); // null, 'available', 'unavailable'
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackStatus, setCallbackStatus] = useState(null); // null, 'success', 'error'

  // --- Handlers ---
  const handlePincodeCheck = () => {
    // Simple mock logic for delivery
    if (pincode === "110001") {
      setTimeout(() => setPincodeStatus("available"), 500);
    } else if (pincode && pincode.length === 6) {
      setTimeout(() => setPincodeStatus("unavailable"), 500);
    } else {
      setPincodeStatus(null);
    }
  };

  const handleCallbackRequest = () => {
    if (callbackPhone.length === 10) {
      setCallbackStatus("success");
      setCallbackPhone("");
      setTimeout(() => setCallbackStatus(null), 4000); // Clear message after 4s
    } else {
      setCallbackStatus("error");
    }
  };

  // --- Price Calculation Memo ---
  const calculatedPrices = useMemo(() => {
    const upholsteryOpt = UPHOLSTERY_OPTIONS.find(
      (opt) => opt.value === selectedUpholstery
    );

    const fixedPrice = BASE_PRICE + upholsteryOpt.priceDiff;
    const actualMrp = BASE_MRP + upholsteryOpt.mrpDiff;

    const TOTAL_FIXED_PRICE = fixedPrice * qty;
    const TOTAL_ACTUAL_MRP = actualMrp * qty;
    const EMI_AMOUNT = BASE_MONTHLY_EMI + upholsteryOpt.emiDiff;

    const DISCOUNT_PERCENTAGE = Math.round(
      ((TOTAL_ACTUAL_MRP - TOTAL_FIXED_PRICE) / TOTAL_ACTUAL_MRP) * 100
    );

    const formattedPrice = TOTAL_FIXED_PRICE.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    });
    const formattedMrp = TOTAL_ACTUAL_MRP.toLocaleString("en-IN");
    const formattedEmi = EMI_AMOUNT.toLocaleString("en-IN");

    return {
      formattedPrice,
      formattedMrp,
      formattedEmi,
      DISCOUNT_PERCENTAGE,
      productDescription: `1-Year Warranty, ${selectedColor} (${upholsteryOpt.name})`,
      fixedPrice,
      actualMrp,
    };
  }, [selectedUpholstery, selectedColor, qty]);

  const {
    formattedPrice,
    formattedMrp,
    formattedEmi,
    DISCOUNT_PERCENTAGE,
    productDescription,
  } = calculatedPrices;

  // --- Tab Content Renderer ---
  const renderTabContent = () => {
    if (activeTab === "Why this Product") {
      return (
        <div style={localStyles.whyChooseDetails}>
          <h2 style={localStyles.whyChooseTitle}>Why choose this product</h2>
          <WhyChooseTextSection />
          <img
            src={getProductImageUrl(6)}
            alt="Sofa Recline Detail"
            style={localStyles.whyChooseImage}
          />
        </div>
      );
    }
    if (activeTab === "Product Details") {
      return (
        <div style={localStyles.tabContentPlaceholder}>
          Detailed product specifications and dimensions go here. Current
          Configuration: **{selectedUpholstery}** in **{selectedColor}**.
        </div>
      );
    }
    if (activeTab === "Reviews") {
      return (
        <div style={localStyles.tabContentPlaceholder}>
          Customer reviews and ratings go here.
        </div>
      );
    }
    return null;
  };

  return (
    <div style={localStyles.mainBg}>
      {/* Top Service Bar (The black strip) */}
      <div style={localStyles.topBlackBar}>
        <div style={localStyles.topBlackBarContent}>
          <div style={{ flexGrow: 1 }}></div>
          {["Become a dealer", "Store locator", "Contact us", "Services"].map(
            (item) => (
              <span key={item} style={localStyles.topBlackBarItem}>
                {item}
              </span>
            )
          )}
        </div>
      </div>

      {/* Main Content Wrapper (Used for centering and max-width) */}
      <div style={localStyles.contentWrapper}>
        {/* --- HEADER/NAV AREA --- */}
        <div style={localStyles.headerAreaContainer}>
          <div style={localStyles.mainNavTabsWrapper}>
            <nav style={localStyles.mainNavTabs}>
              <span style={localStyles.tabActive}>For Homes</span>
              <span style={localStyles.tabInactive}>For Businesses</span>
            </nav>
          </div>

          {/* Logo and Icons Row */}
          <header style={localStyles.mainHeader}>
            <div style={localStyles.headerLeftIcons}>
              <span style={localStyles.navIcon}>
                <SvgIcon name="Search" />
              </span>
            </div>
            <div style={localStyles.headerBrandingArea}>
              <img
                src="/images/logo_final.webp"
                alt="interio by Godrej logo"
                style={localStyles.logoImage}
              />
            </div>
            <nav style={localStyles.headerNav}>
              <span style={localStyles.navIcon}>
                <SvgIcon name="Person" />
              </span>
              <span style={localStyles.navIcon}>
                <SvgIcon name="Heart" />
              </span>
              <span style={localStyles.navIcon}>
                <SvgIcon name="Cart" />
              </span>
            </nav>
          </header>
        </div>

        {/* Category Nav Bar */}
        <nav style={localStyles.mainNavBar}>
          {[
            "Living room",
            "Bedroom",
            "Dining room",
            "Office and Study",
            "Modular Kitchens",
            "All Products",
            "Offers",
          ].map((item) => (
            <span key={item} style={localStyles.navBarItem}>
              {item}
            </span>
          ))}
        </nav>

        {/* Breadcrumb */}
        <div style={localStyles.breadcrumb}>
          Home / Recliner Sofas /{" "}
          <span style={localStyles.breadcrumbActive}>
            Missouri L-Shape Leather Motorised Recliner Sofa
          </span>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* --- PRODUCT MAIN ROW (Images & Info) --- */}
      {/* ----------------------------------------------------------------- */}
      <div style={localStyles.productMainRow}>
        {/* IMAGE PANEL (Left) */}
        <div style={localStyles.productImagePanel}>
          {PRODUCT_ASSETS.slice(0, 5).map((path, index) => (
            <img
              key={index}
              src={path}
              alt={`Product View ${index + 1}`}
              style={localStyles.stackedImage}
            />
          ))}
        </div>

        {/* INFO PANEL (Right) */}
        <div style={localStyles.productInfoPanel}>
          <div style={localStyles.shareAndWishlist}>
            <span style={localStyles.navIcon}>
              <SvgIcon name="Heart" size={20} />
            </span>
            <span style={localStyles.navIcon}>&#x25B6;</span>{" "}
            {/* Share icon placeholder */}
          </div>

          <h1 style={localStyles.productTitle}>
            Missouri L-Shape Leather Motorised Recliner Sofa
          </h1>
          <div style={localStyles.productDesc}>{productDescription}</div>

          {/* Pricing */}
          <div style={localStyles.priceSection}>
            <span style={localStyles.productPrice}>{formattedPrice}</span>
            <span style={localStyles.productMrp}>MRP ₹{formattedMrp}</span>
            <span style={localStyles.productOff}>
              {DISCOUNT_PERCENTAGE}% Off
            </span>
          </div>
          <div style={localStyles.productEmi}>
            Or Pay **₹{formattedEmi}** Monthly EMI with 0% interest
          </div>

          {/* Product Offers Box */}
          <div
            style={{
              ...localStyles.productOfferBox,
              backgroundColor: OFFER_BOX_BG,
              border: `1px solid #e0d9cf`,
            }}
          >
            <div style={localStyles.offerTitle}>Product Offers</div>
            <div style={localStyles.offerDetail}>
              Save upto Rs 7,500 using HDFC Bank Credit Cards and EasyEMI. Use
              coupon code **FESTIVE25** at checkout for additional discount
              <span style={localStyles.offerLink}>
                Explore More Offers
                <SvgIcon name="RightChevron" color="#555" size={18} />
              </span>
            </div>
          </div>

          {/* Delivery Check */}
          <div style={localStyles.checkDeliveryRow}>
            <span style={localStyles.checkDeliveryText}>
              Check delivery & assembly
            </span>
            <div style={localStyles.pincodeGroup}>
              <input
                style={localStyles.pincodeInput}
                placeholder="Enter pincode"
                maxLength={6}
                value={pincode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setPincode(value);
                  setPincodeStatus(null);
                }}
              />
              <button
                style={localStyles.checkBtn}
                onClick={handlePincodeCheck}
                disabled={pincode.length !== 6}
              >
                Check
              </button>
            </div>
          </div>

          {/* Pincode Status */}
          {pincodeStatus === "available" && (
            <div style={localStyles.pincodeMessage.available}>
              🎉 **Delivery available!** Assembly & Installation in 3-5 days.
            </div>
          )}
          {pincodeStatus === "unavailable" && (
            <div style={localStyles.pincodeMessage.unavailable}>
              😔 Delivery is currently **not supported** in this area.
            </div>
          )}

          <div style={localStyles.applyExchange}>Apply furniture exchange</div>

          {/* Need Help/Callback Section */}
          <div style={localStyles.needHelpRow}>
            <div style={localStyles.needHelpTextContainer}>
              <p style={localStyles.needHelpText}>
                Need help deciding? Get expert assistance
              </p>
              <p style={localStyles.needHelpSubText}>
                Speak with our in-store executives for personalised guidance on
                choosing the perfect products for your home.
              </p>
            </div>

            <div style={localStyles.callbackInputGroup}>
              <input
                style={localStyles.callbackInput}
                type="tel"
                placeholder="Enter 10 digit number"
                maxLength={10}
                value={callbackPhone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setCallbackPhone(value);
                  setCallbackStatus(null);
                }}
              />
              <button
                style={localStyles.callMeBackBtn}
                onClick={handleCallbackRequest}
                disabled={callbackPhone.length !== 10}
              >
                Call me back
              </button>
            </div>

            {/* Callback Status Message */}
            {callbackStatus === "success" && (
              <div style={localStyles.callbackStatus.success}>
                ✅ Request submitted! We will call you shortly.
              </div>
            )}
            {callbackStatus === "error" && (
              <div style={localStyles.callbackStatus.error}>
                ❌ Please enter a valid 10-digit number.
              </div>
            )}
          </div>

          {/* Product Configuration */}
          <div style={localStyles.configuratorPanel}>
            <div style={localStyles.configuratorTitle}>Configuration:</div>
            <OptionSelector
              title="Upholstery"
              options={UPHOLSTERY_OPTIONS}
              selectedValue={selectedUpholstery}
              onSelect={setSelectedUpholstery}
            />
            <OptionSelector
              title="Color"
              options={PRODUCT_COLORS}
              selectedValue={selectedColor}
              onSelect={setSelectedColor}
            />
          </div>
        </div>
      </div>
      {/* ----------------------------------------------------------------- */}
      {/* --- END PRODUCT MAIN ROW --- */}
      {/* ----------------------------------------------------------------- */}

      {/* --- BOTTOM TABS & CONTENT --- */}
      <div style={localStyles.contentWrapper}>
        <div style={localStyles.whyChooseTabsContainer}>
          <div style={localStyles.whyChooseTabs}>
            {["Why this Product", "Product Details", "Reviews"].map((tab) => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={
                  tab === activeTab
                    ? localStyles.whyChooseTabActive
                    : localStyles.whyChooseTabInactive
                }
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {renderTabContent()}

        <div style={{ height: "100px" }}></div>
      </div>

      {/* --- STICKY ADD TO CART BAR --- */}
      <div style={localStyles.bottomStickyBar}>
        <div style={localStyles.pageContentWrapperBottom}>
          <div style={localStyles.stickyPriceBlock}>
            <span style={localStyles.stickyPrice}>{formattedPrice}</span>
            <span style={localStyles.stickyMrp}>MRP ₹{formattedMrp}</span>
            <span style={localStyles.stickyOff}>
              {DISCOUNT_PERCENTAGE}% Off
            </span>
          </div>

          <div style={localStyles.stickyCtaBar}>
            <div style={localStyles.qtyControls}>
              <button
                style={localStyles.qtyBtn}
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                -
              </button>
              <span style={localStyles.qtyNum}>{qty}</span>
              <button
                style={localStyles.qtyBtn}
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>

            <button style={localStyles.addCartBtn}>
              Add to Cart <span style={localStyles.cartIcon}>🛒</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// --- 🎨 STYLE OBJECTS (Looks like a working style sheet) 🎨 ---
// -------------------------------------------------------------
const localStyles = {
  mainBg: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: PAGE_BACKGROUND,
    minHeight: "100vh",
  },
  contentWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },
  pageContentWrapperBottom: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    boxSizing: "border-box",
  },
  tabContentPlaceholder: {
    padding: "50px 20px",
    minHeight: "300px",
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
  },
  // --- Header/Nav Styles ---
  topBlackBar: {
    backgroundColor: "#212121",
    padding: "6px 0",
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "12px",
    color: "#ffffffcc",
    lineHeight: "16px",
  },
  topBlackBarContent: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "flex-end",
    gap: "25px",
    padding: "0 20px",
    boxSizing: "border-box",
  },
  topBlackBarItem: {
    color: "#ffffffcc",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 400,
  },
  headerAreaContainer: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    borderBottom: "1px solid #eee",
  },
  mainHeader: {
    display: "flex",
    alignItems: "center",
    height: "70px",
    boxSizing: "border-box",
    width: "100%",
    backgroundColor: PAGE_BACKGROUND,
    justifyContent: "space-between",
  },
  headerLeftIcons: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    maxWidth: "33%",
    gap: "25px",
  },
  logoImage: {
    height: "55px",
    width: "auto",
    objectFit: "contain",
    display: "block",
  },
  headerNav: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    gap: "25px",
    maxWidth: "33%",
  },
  navIcon: {
    color: MAIN_TEXT_COLOR,
    cursor: "pointer",
    lineHeight: 1,
    height: "24px",
    width: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainNavTabsWrapper: {
    borderBottom: "1px solid #ddd",
  },
  mainNavTabs: {
    display: "flex",
    fontSize: "14px",
    marginTop: "5px",
  },
  tabActive: {
    padding: "8px 18px",
    backgroundColor: BRAND_RED,
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "14px",
    border: `1px solid ${BRAND_RED}`,
    borderBottom: "1px solid #f5f5f5",
    position: "relative",
    zIndex: 2,
  },
  tabInactive: {
    padding: "8px 18px",
    backgroundColor: PAGE_BACKGROUND,
    color: MAIN_TEXT_COLOR,
    border: "1px solid #ddd",
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #f5f5f5",
    cursor: "pointer",
    fontSize: "14px",
    borderLeft: "none",
    borderRight: "none",
    position: "relative",
    zIndex: 1,
  },
  mainNavBar: {
    padding: "10px 0",
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    fontSize: "14px",
    borderBottom: "1px solid #eee",
    marginBottom: "20px",
    backgroundColor: PAGE_BACKGROUND,
  },
  navBarItem: {
    color: MAIN_TEXT_COLOR,
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
  },
  breadcrumb: {
    fontSize: "13px",
    color: "#999",
    marginBottom: "15px",
  },
  breadcrumbActive: { color: MAIN_TEXT_COLOR, fontWeight: 600 },

  // --- Product Row Styles ---
  productMainRow: {
    display: "flex",
    gap: "40px",
    marginBottom: "30px",
    flexWrap: "nowrap",
    width: "100%",
    boxSizing: "border-box",
    padding: "0 20px",
    maxWidth: "1200px",
    margin: "0 auto 30px auto",
  },
  productImagePanel: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
  },
  stackedImage: {
    maxWidth: "800px",
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "4px",
    border: "1px solid #eee",
  },
  productInfoPanel: {
    flex: `0 0 ${INFO_PANEL_FIXED_WIDTH}`,
    maxWidth: INFO_PANEL_FIXED_WIDTH,
    position: "relative",
    paddingRight: "20px",
  },
  shareAndWishlist: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
    position: "absolute",
    top: "0",
    right: "0",
  },
  productTitle: {
    fontSize: "24px",
    fontWeight: 600,
    color: MAIN_TEXT_COLOR,
    marginBottom: "10px",
    lineHeight: 1.3,
    paddingRight: "40px",
  },
  productDesc: {
    fontSize: "15px",
    color: "#666",
    marginBottom: "20px",
  },
  // --- Price Styles ---
  priceSection: {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
    marginBottom: "5px",
  },
  productPrice: {
    fontSize: "28px",
    fontWeight: 700,
    color: BRAND_RED,
  },
  productMrp: {
    fontSize: "16px",
    color: "#999",
    textDecoration: "line-through",
  },
  productOff: {
    fontSize: "16px",
    color: MARKETING_ACCENT,
    fontWeight: 700,
  },
  productEmi: {
    fontSize: "13px",
    color: MAIN_TEXT_COLOR,
    fontWeight: 400,
    marginBottom: "20px",
  },
  // --- Offers Box Styles ---
  productOfferBox: {
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px",
  },
  offerTitle: {
    fontWeight: 600,
    marginBottom: "8px",
    fontSize: "13px",
    color: BRAND_RED,
    textTransform: "uppercase",
  },
  offerDetail: {
    fontSize: "13px",
    lineHeight: 1.5,
    color: "#555",
  },
  offerLink: {
    color: "#555",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginTop: "8px",
    marginLeft: 0,
  },
  // --- Delivery Check Styles ---
  checkDeliveryRow: {
    borderTop: `1px solid ${BORDER_LIGHT_GRAY}`,
    borderBottom: `1px solid ${BORDER_LIGHT_GRAY}`,
    padding: "15px 0",
    marginBottom: "20px",
  },
  checkDeliveryText: {
    fontSize: "15px",
    color: MAIN_TEXT_COLOR,
    fontWeight: 600,
    display: "block",
    marginBottom: "10px",
  },
  pincodeGroup: {
    display: "flex",
    gap: "10px",
  },
  pincodeInput: {
    padding: "10px",
    border: `1px solid ${BORDER_LIGHT_GRAY}`,
    borderRadius: "4px",
    flexGrow: 1,
    fontSize: "15px",
    outlineColor: BRAND_RED,
  },
  checkBtn: {
    backgroundColor: MAIN_TEXT_COLOR,
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 600,
    transition: "background-color 0.2s",
  },
  pincodeMessage: {
    available: {
      fontSize: "14px",
      padding: "10px",
      marginTop: "10px",
      borderRadius: "4px",
      backgroundColor: "#e6ffe6",
      color: "#006400",
    },
    unavailable: {
      fontSize: "14px",
      padding: "10px",
      marginTop: "10px",
      borderRadius: "4px",
      backgroundColor: "#ffe6e6",
      color: "#8b0000",
    },
  },
  applyExchange: {
    fontSize: "15px",
    color: BRAND_RED,
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: "20px",
    textDecoration: "underline",
  },
  // --- Need Help/Callback Styles ---
  needHelpRow: {
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "25px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f6f1e8",
    border: "1px solid #e0d9cf",
  },
  needHelpTextContainer: {
    marginBottom: "15px",
    textAlign: "center",
  },
  needHelpText: {
    margin: "0 0 5px 0",
    fontSize: "16px",
    fontWeight: 700,
    color: MAIN_TEXT_COLOR,
  },
  needHelpSubText: {
    margin: 0,
    fontSize: "13px",
    color: "#666",
    lineHeight: 1.4,
  },
  callbackInputGroup: {
    display: "flex",
    width: "100%",
    gap: "10px",
  },
  callbackInput: {
    padding: "10px",
    border: `1px solid ${BORDER_LIGHT_GRAY}`,
    borderRadius: "4px",
    flexGrow: 1,
    fontSize: "15px",
    outlineColor: BRAND_RED,
    textAlign: "center",
  },
  callMeBackBtn: {
    backgroundColor: CTA_VIBRANT_RED,
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 600,
    transition: "background-color 0.2s",
  },
  callbackStatus: {
    success: {
      fontSize: "14px",
      padding: "10px",
      marginTop: "10px",
      width: "100%",
      boxSizing: "border-box",
      borderRadius: "4px",
      textAlign: "center",
      fontWeight: 600,
      backgroundColor: "#e6ffe6",
      color: "#006400",
    },
    error: {
      fontSize: "14px",
      padding: "10px",
      marginTop: "10px",
      width: "100%",
      boxSizing: "border-box",
      borderRadius: "4px",
      textAlign: "center",
      fontWeight: 600,
      backgroundColor: "#ffe6e6",
      color: "#8b0000",
    },
  },
  // --- Configurator Styles ---
  configuratorPanel: {
    paddingTop: "25px",
    borderTop: `1px solid ${BORDER_LIGHT_GRAY}`,
    marginBottom: "20px",
  },
  configuratorTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: MAIN_TEXT_COLOR,
    marginBottom: "15px",
  },
  optionSelectorContainer: {
    marginBottom: "20px",
  },
  optionSelectorTitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "8px",
  },
  optionSelectorOptions: {
    display: "flex",
    gap: "10px",
  },
  optionButton: {
    backgroundColor: "white",
    color: MAIN_TEXT_COLOR,
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    transition: "border 0.2s",
  },
  // --- Content Tab Styles ---
  whyChooseTabsContainer: {
    borderBottom: `1px solid ${BORDER_LIGHT_GRAY}`,
    marginBottom: "30px",
  },
  whyChooseTabs: {
    display: "flex",
    gap: "20px",
  },
  whyChooseTabActive: {
    fontSize: "16px",
    fontWeight: 700,
    color: BRAND_RED,
    padding: "10px 0",
    cursor: "pointer",
    borderBottom: `3px solid ${BRAND_RED}`,
  },
  whyChooseTabInactive: {
    fontSize: "16px",
    color: MAIN_TEXT_COLOR,
    padding: "10px 0",
    cursor: "pointer",
    borderBottom: "3px solid transparent",
  },
  whyChooseDetails: {
    padding: "0 0 30px 0",
  },
  whyChooseTitle: {
    fontSize: "20px",
    fontWeight: 600,
    color: MAIN_TEXT_COLOR,
    marginBottom: "15px",
  },
  whyChooseText: {
    fontSize: "16px",
    lineHeight: 1.6,
    color: MAIN_TEXT_COLOR,
    marginBottom: "30px",
    maxWidth: "800px",
  },
  boldRedText: {
    color: MARKETING_ACCENT,
    fontWeight: 700,
  },
  whyChooseImage: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "4px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  // --- Sticky Bar Styles ---
  bottomStickyBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "white",
    borderTop: `1px solid ${BORDER_LIGHT_GRAY}`,
    boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
    padding: "15px 0",
    zIndex: 100,
    display: "flex",
    justifyContent: "center",
  },
  stickyPriceBlock: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  stickyPrice: {
    fontSize: "24px",
    fontWeight: 700,
    color: BRAND_RED,
  },
  stickyMrp: {
    fontSize: "14px",
    color: "#999",
    textDecoration: "line-through",
  },
  stickyOff: {
    fontSize: "14px",
    color: MARKETING_ACCENT,
    fontWeight: 700,
  },
  stickyCtaBar: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  qtyControls: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${BORDER_LIGHT_GRAY}`,
    borderRadius: "4px",
    overflow: "hidden",
  },
  qtyBtn: {
    backgroundColor: "#f9f7f4",
    color: MAIN_TEXT_COLOR,
    border: "none",
    padding: "8px 15px",
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: 600,
    lineHeight: 1,
    transition: "background-color 0.2s",
  },
  qtyNum: {
    padding: "8px 15px",
    fontSize: "16px",
    fontWeight: 500,
    borderLeft: `1px solid ${BORDER_LIGHT_GRAY}`,
    borderRight: `1px solid ${BORDER_LIGHT_GRAY}`,
    backgroundColor: "white",
  },
  addCartBtn: {
    backgroundColor: CTA_VIBRANT_RED,
    color: "white",
    padding: "12px 30px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "background-color 0.2s",
  },
  cartIcon: {
    fontSize: "20px",
  },
};
