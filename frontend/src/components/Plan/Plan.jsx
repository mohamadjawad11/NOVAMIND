import React, { useEffect, useState } from "react";
import "./Plan.css";
import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const drawer = document.querySelector('[data-testid="elements-wrapper"]');
      setIsDrawerOpen(!!drawer);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);


  return (
    <div className="plan-container">
      <div className="plan-header">
        <h1>Choose Your Plan</h1>
        <p>
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>

      <div className={`plan-wrapper ${isDrawerOpen ? "with-drawer" : ""}`}>
        <PricingTable
  appearance={{
    variables: {
      colorPrimary: '#443BF1FF', 
      colorTextPrimary: '#ffffff', 
       fontFamily: "'Poppins', sans-serif",
      fontSize: '16px',
    },
  }}
/>

      </div>
    </div>
  );
};

export default Plan;
