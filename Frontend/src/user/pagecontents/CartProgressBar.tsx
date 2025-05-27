import React from "react";

type Step = "cart" | "payment" | "done";

interface CartProgressBarProps {
  currentStep: Step;
}

const steps: { id: Step; label: string }[] = [
  { id: "cart", label: "Giỏ hàng" },
  { id: "payment", label: "Thanh toán" },
  { id: "done", label: "Hoàn tất" },
];

function CartProgressBar({ currentStep }: CartProgressBarProps) {
  const getStatus = (step: Step) => {
    const order = steps.map((s) => s.id);
    const currentIndex = order.indexOf(currentStep);
    const stepIndex = order.indexOf(step);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "upcoming";
  };

  return (
    <div className="w-full flex justify-center py-6 bg-[var(--secondary-color)] ">
      <div className="flex items-center min-w-xl">
        {steps.map((step, index) => {
          const status = getStatus(step.id);
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-[var(--small-gap)]">
                <div
                  className={`w-6 h-6 rounded-full ${
                    status === "completed"
                      ? "bg-[var(--original-price-color)]"
                      : status === "active"
                      ? "bg-[var(--primary-color)]"
                      : "bg-[var(--original-price-color)]"
                  }`}
                ></div>
                <div
                  className={`body-text ${
                    status === "active"
                      ? "text-[var(--primary-color)]"
                      : "text-black"
                  }`}
                >
                  {step.label}
                </div>
              </div>
              {index !== steps.length - 1 && (
                <div className="flex-1 mx-2 border-t-2 border-[var(--original-price-color)] border-dashed"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default CartProgressBar;
