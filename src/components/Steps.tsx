import React from "react";

interface StepProps {
  stepName: string[];
  stepsContent: React.ReactNode[];
  activeStep: number;
}

function StepsPage({ stepName, stepsContent, activeStep }: StepProps) {
  return (
    <div>
      <div className="flex justify-between w-[80vw] m-auto">
        {stepName.map((stepN, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col gap-2 ${
                index !== stepN.length - 1 && "w-full"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`h-6 w-6 flex justify-center items-center rounded-full ${
                    activeStep >= index
                      ? "bg-primary-btn text-primary-txt"
                      : "bg-blue-100 text-gray-300"
                  }`}
                >
                  {index + 1}
                </div>

                {activeStep > index && index !== stepN.length - 1 && (
                  <div className="h-1 w-full bg-primary-btn"></div>
                )}

                {activeStep <= index && index !== stepN.length - 1 && (
                  <div className="h-1 w-full"></div>
                )}
              </div>

              <h1 className="text-sm">{stepN}</h1>
            </div>
          );
        })}
      </div>

      <div className="mt-5">{stepsContent[activeStep]}</div>
    </div>
  );
}
export default StepsPage;
