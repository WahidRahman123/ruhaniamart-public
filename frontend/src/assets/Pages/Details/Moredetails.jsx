import React, { useState } from "react";
import { Link } from "react-router-dom";
import Review from "./Review";
import ProductDescription from "./ProductDescription";



function Moredetails({ product, triggerUseEffect, setTriggerUseEffect }) {
  const tabs = [
    { id: 1, label: "Reviews", content: <Review product={product} setTriggerUseEffect={setTriggerUseEffect} triggerUseEffect={triggerUseEffect}/> },
    { id: 2, label: "More Details", content: <ProductDescription productDescription={product.description}/> },
  ];
  
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="border border-[#2E8B57] m-7 mt-10 pt-2">
      <div className="button mx-10 flex gap-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`border-primaryColor border-1 p-2 cursor-pointer font-bold hover:scale-105 text-[16px]  
              ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-500 "
                  : "border-transparent text-gray-700 hover:text-blue-500"
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        
      </div>
      {/* Content */}
      {tabs.find((tab) => tab.id === activeTab)?.content}
    </div>
  );
}

export default Moredetails;
