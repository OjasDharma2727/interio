import { useState } from "react";

export default function ProductDetailsTabs() {
  const tabs = [
    "Specifications",
    "Additional information",
    "Materials",
    "Care instructions",
  ];
  const [activeTab, setActiveTab] = useState("Specifications");

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 mt-8 border-t pt-16">
      {/* Title */}
      <h2 className="text-4xl font-bold text-gray-900 mb-10">
        Product details
      </h2>

      {/* Tabs */}
      <div className="flex gap-3 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-md border font-medium transition-all 
                        ${
                          activeTab === tab
                            ? "bg-gray-100 border-gray-400 text-red-400 shadow-sm"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Specifications" && (
        <div className="mt-10 text-lg">
          <ul className="space-y-6 text-gray-700">
            <li className="flex justify-between border-b pb-3">
              <span className="font-medium">Dimensions W x H x D</span>
              <span>265 × 105 × 160 cm</span>
            </li>
            <li className="flex justify-between border-b pb-3">
              <span className="font-medium">Finish Color</span>
              <span>Olive Green</span>
            </li>
            <li className="flex justify-between border-b pb-3">
              <span className="font-medium">Weight</span>
              <span>65.50 kgs</span>
            </li>
            <li className="flex justify-between border-b pb-3">
              <span className="font-medium">Warranty</span>
              <span>1 Year Warranty</span>
            </li>
          </ul>
        </div>
      )}

      {/* Product reviews section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Product reviews
        </h2>

        <button className="px-6 py-3 bg-orange-400 text-white rounded-lg font-semibold shadow hover:opacity-90 transition">
          Write a review
        </button>
      </div>
    </section>
  );
}
