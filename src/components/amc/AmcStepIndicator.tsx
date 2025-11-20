import { CheckCircle2 } from 'lucide-react';

interface AmcStepIndicatorProps {
  currentStep: 1 | 2;
}

const steps = [
  { id: 1 as const, title: 'Privacy Notice', subtitle: 'ข้อกำหนดและเงื่อนไข' },
  { id: 2 as const, title: 'สมัครเข้าร่วมโครงการ', subtitle: 'กรอกข้อมูลผู้สมัคร' }
];

export default function AmcStepIndicator({ currentStep }: AmcStepIndicatorProps) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-6">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const statusColor = isActive || isCompleted ? 'text-sam-secondary' : 'text-gray-400';

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center flex-none">
                <div
                  className={`relative flex items-center justify-center w-16 h-16 rounded-full border-2 border-dashed ${
                    isActive || isCompleted ? 'border-sam-secondary/60' : 'border-gray-200'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold shadow-lg ${
                      isActive
                        ? 'bg-sam-secondary text-white'
                        : isCompleted
                        ? 'bg-emerald-50 text-sam-secondary border border-sam-secondary/40'
                        : 'bg-white text-gray-400 border border-gray-200'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : step.id}
                  </div>
                </div>
                <p className={`mt-3 text-sm font-semibold text-center ${statusColor}`}>{step.title}</p>
                <p className="text-xs text-gray-400 text-center">{step.subtitle}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="w-20 flex items-center justify-center mx-3 mb-10">
                  <span
                    className={`w-full h-1 rounded-full ${
                      currentStep > step.id ? 'bg-sam-secondary' : 'bg-gray-200'
                    }`}
                  ></span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

