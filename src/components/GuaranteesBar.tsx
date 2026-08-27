import React from "react";
import { Package, Lock, RotateCcw, Globe } from "lucide-react";

export const GuaranteesBar = () => {
  const features = [
    {
      icon: Package,
      title: "PREMIUM QUALITY",
      subtitle: "Crafted with precision",
    },
    {
      icon: Lock,
      title: "SECURE PAYMENT",
      subtitle: "100% secure checkout",
    },
    {
      icon: RotateCcw,
      title: "EASY RETURNS",
      subtitle: "Hassle free returns",
    },
    {
      icon: Globe,
      title: "WORLDWIDE SHIPPING",
      subtitle: "Delivering globally",
    },
  ];

  return (
    <section className="bg-[#050505] border-b border-[#1A1A1A] py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-4 pl-2 border-l border-[#1A1A1A] first:border-l-0 md:first:border-l-0"
            >
              <Icon className="w-6 h-6 text-[#FFFFFF] flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="font-sans text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">
                  {item.title}
                </h4>
                <p className="font-sans text-[11px] text-[#A0A0A0] mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GuaranteesBar;
