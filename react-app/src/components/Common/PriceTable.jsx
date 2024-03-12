import React, { useEffect } from "react";

const StripePricingTable = ({ tableId }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.stripe.com/v3/pricing-table.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <>
            <stripe-pricing-table className="w-full" pricing-table-id={tableId} publishable-key="pk_live_51OtCKTB9uNXBCzh8AwSr5TwsJuWMptI0EqAomrX6ByBFrBixMB8NwLhnF8lJihD2MSEWdMzjIxXCYPyX5wFiNZC000doszgICW"></stripe-pricing-table>
        </>
    );
};

export default StripePricingTable;
