import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbStep {
  label: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  steps: BreadcrumbStep[];
}

export default function Breadcrumbs({ steps }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 px-4 py-2.5 rounded-xl w-fit"
    >
      <ol className="inline-flex items-center flex-wrap gap-1.5 list-none m-0 p-0">
        <li className="inline-flex items-center">
          <button
            onClick={() => {
              const homeStep = steps[0];
              if (homeStep && homeStep.onClick) {
                homeStep.onClick();
              }
            }}
            className="flex items-center gap-1 text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-amber-500/40 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-md px-1 py-0.5"
            aria-label="Ir a Inicio"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inicio</span>
          </button>
        </li>

        {steps.slice(1).map((step, idx) => {
          const isLast = idx === steps.length - 2; // slice(1) shifts indices by 1
          
          return (
            <li key={idx} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700 shrink-0" aria-hidden="true" />
              {step.isCurrent || !step.onClick ? (
                <span 
                  className="text-slate-800 dark:text-slate-200 font-extrabold max-w-[140px] sm:max-w-none truncate"
                  aria-current="page"
                >
                  {step.label}
                </span>
              ) : (
                <button
                  onClick={step.onClick}
                  className="text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer font-medium outline-none focus:ring-2 focus:ring-amber-500/40 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-md px-1 py-0.5 max-w-[120px] sm:max-w-none truncate"
                >
                  {step.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
