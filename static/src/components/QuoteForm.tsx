import { motion, AnimatePresence } from "framer-motion"; // Corrected import path for framer-motion
import {
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  ChevronRight,
  ChevronLeft,
  Check,
  Locate,
  Loader2,
  MessageSquare,
  ChevronDown,
  Truck,
} from "lucide-react";
import * as React from "react";

import { QuoteRequest } from "../types";

interface QuoteFormProps {
  initialService?: string;
  destinationName?: string;
}

export default function QuoteForm({
  initialService = "",
  destinationName = "",
}: QuoteFormProps) {
  // Helper component for input fields to reduce repetition
  interface InputFieldProps {
    id: string;
    name: string;
    label: string;
    type: string; // Changed to allow undefined
    value: string | undefined;
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => void;
    placeholder: string;
    icon: React.ElementType;
    error?: string;
    readOnly?: boolean;
    disabled?: boolean;
    className?: string;
    inputClassName?: string;
    wrapperClassName?: string;
    iconClassName?: string;
    children?: React.ReactNode; // For select options or additional buttons
  }

  const InputField: React.FC<InputFieldProps> = ({
    id,
    name,
    label,
    type,
    value,
    onChange,
    placeholder,
    icon: Icon,
    error,
    readOnly = false,
    disabled = false,
    className = "",
    inputClassName = "",
    wrapperClassName = "",
    iconClassName = "",
    children,
  }: InputFieldProps) => (
    // Explicitly type the destructured props here
    <div className={className}>
      <label htmlFor={id} className="quote-input-label">
        {label}
      </label>
      <div className={`quote-input-wrapper ${wrapperClassName}`}>
        <div className={`quote-input-icon ${iconClassName}`}>
          <Icon className="w-5 h-5" />
        </div>
        {type === "textarea" ? (
          <textarea
            id={id}
            name={name}
            rows={2}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`quote-input-field-textarea ${inputClassName} ${error ? "border-red-500 bg-red-500/5" : "border-slate-200"}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            readOnly={readOnly}
            disabled={disabled}
          />
        ) : type === "select" ? ( // Ensure value is always a string for native elements
          <select
            id={id}
            name={name}
            value={value || ""}
            onChange={onChange}
            className={`quote-input-field-select ${inputClassName} ${error ? "border-red-500 bg-red-500/5" : "border-slate-200"}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            disabled={disabled}
          >
            {children}
          </select>
        ) : (
          // Ensure value is always a string for native elements
          <input
            type={type}
            id={id}
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            className={`quote-input-field ${inputClassName} ${error ? "border-red-500 bg-red-500/5" : "border-slate-200"}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            readOnly={readOnly}
            disabled={disabled}
          />
        )}
        {children && type !== "select" && children}
      </div>
      {error && (
        <p id={`${id}-error`} className="quote-error-message">
          {error}
        </p>
      )}
    </div>
  );

  const [step, setStep] = React.useState(1);
  const [isLocating, setIsLocating] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  // Form State
  const [formData, setFormData] = React.useState<QuoteRequest>({
    origin: "",
    destination: destinationName ? `Ciudad de Mendoza` : "",
    movingDate: "",
    serviceType: initialService || "",
    name: "",
    phone: "",
    email: "",
    comments: "",
  });

  // Validation State
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Geolocalizar Origen
  const handleGeolocate = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Utilizar reverse geocoding o simularlo en el área metropolitana de Mendoza
          setTimeout(() => {
            setFormData((prev) => ({
              ...prev,
              origin: `Ubicación actual (Cerca de Ciudad de Mendoza, AR)`,
            }));
            setIsLocating(false);
          }, 1200);
        },
        () => {
          // Fallback elegante
          setTimeout(() => {
            setFormData((prev) => ({
              ...prev,
              origin: "Av. San Martín, Mendoza",
            }));
            setIsLocating(false);
          }, 1000);
        },
      );
    } else {
      setIsLocating(false);
      setErrors((prev) => ({
        ...prev,
        origin: "Geolocalización no soportada por el navegador.",
      }));
    }
  };

  // Validar Pasos
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.origin.trim())
        newErrors.origin = "La dirección de origen es requerida.";
      if (!formData.destination.trim())
        newErrors.destination = "La dirección de destino es requerida.";
    } else if (currentStep === 2) {
      if (!formData.movingDate) {
        newErrors.movingDate = "La fecha de mudanza es requerida.";
      } else {
        const selectedDate = new Date(formData.movingDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          newErrors.movingDate = "La fecha de mudanza debe ser futura.";
        }
      }
      if (!formData.serviceType)
        newErrors.serviceType = "Debe seleccionar un tipo de servicio.";
    } else if (currentStep === 3) {
      if (!formData.name.trim())
        newErrors.name = "Tu nombre completo es requerido.";
      if (!formData.phone.trim()) {
        newErrors.phone = "Tu número de teléfono es requerido.";
      } else if (
        !/^\+?[0-9\s-]{8,15}$/.test(formData.phone.replace(/\s+/g, ""))
      ) {
        newErrors.phone = "Formato de teléfono no válido (ej: 261 1234567).";
      }
      if (!formData.email.trim()) {
        newErrors.email = "El correo electrónico es requerido.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Correo electrónico inválido.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      setIsSubmitting(true);
      // Simular submit de lead a base de datos de fletes
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  // WhatsApp click handler con mensaje estructurado pre-relleno
  const handleWhatsAppRedirect = () => {
    const phone = "5492615130910"; // Número oficial de Mudanzas Miranda
    const text = encodeURIComponent(
      `¡Hola Mudanzas Miranda! Quisiera cotizar una mudanza:\n\n` +
        `📦 *Servicio:* ${formData.serviceType === "residencial" ? "Mudanza Residencial 🏠" : formData.serviceType === "oficina" ? "Mudanza de Oficina 🏢" : formData.serviceType === "combinada" ? "Mudanza Combinada 🚚" : formData.serviceType === "embalaje" ? "Embalaje Profesional 📦" : formData.serviceType === "guardamuebles" ? "Guardamuebles 🔑" : "Logística / Flete 🚛"}\n` +
        `📍 *Origen:* ${formData.origin}\n` +
        `🏁 *Destino:* ${formData.destination}\n` +
        `📅 *Fecha Estimada:* ${formData.movingDate}\n\n` +
        `👤 *Cliente:* ${formData.name}\n` +
        `📞 *Contacto:* ${formData.phone}\n` +
        `✉️ *Email:* ${formData.email}\n` +
        `📝 *Notas:* ${formData.comments || "Ninguna"}\n\n` +
        `Solicitado a través de mudanzasmiranda.com.ar`,
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const stepsConfig = [
    { number: 1, label: "Ruta" },
    { number: 2, label: "Fecha" },
    { number: 3, label: "Contacto" },
  ];

  return (
    <div id="quote-form-container" className="quote-form-container">
      {/* Progress Indicator */}
      {!isSuccess && (
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="quote-progress-bar-track">
              <div
                className="quote-progress-bar-fill"
                style={{
                  width: `${((step - 1) / (stepsConfig.length - 1)) * 100}%`,
                }}
              />
            </div>{" "}
            {/* No change needed */}
            {stepsConfig.map((s, index) => (
              // No change needed
              <div key={s.number} className="quote-step-indicator-wrapper">
                <div
                  className={`quote-step-circle ${
                    step > s.number
                      ? "bg-amber-500 text-white"
                      : step === s.number
                        ? "bg-amber-500 text-white ring-4 ring-amber-500/10"
                        : "bg-white text-slate-400 border border-slate-200"
                  }`}
                >
                  {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${step === s.number ? "text-slate-800 font-semibold" : "text-slate-400"}`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h3 className="quote-step-title">Definí las direcciones</h3>
                  <p className="quote-step-description">
                    Indicanos desde dónde partimos y a dónde llevamos tus cosas.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Origen */}
                  <InputField
                    id="origin"
                    name="origin"
                    label="Dirección de Origen"
                    type="text"
                    value={formData.origin}
                    onChange={handleInputChange}
                    placeholder="Ej: Av. Colón 450, Ciudad de Mendoza"
                    icon={MapPin}
                    error={errors.origin}
                  >
                    <button
                      type="button"
                      onClick={handleGeolocate}
                      className="quote-geolocate-button"
                      aria-label="Usar mi ubicación actual"
                    >
                      {isLocating ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Locate className="w-5 h-5" />
                      )}
                    </button>
                  </InputField>

                  {/* Destino */}
                  <InputField
                    id="destination"
                    name="destination"
                    label="Dirección de Destino"
                    type="text"
                    value={formData.destination}
                    onChange={handleInputChange} // formData.destination is always string per QuoteRequest
                    placeholder="Ej: Paso de los Andes 1500, Godoy Cruz"
                    icon={MapPin}
                    error={errors.destination}
                    iconClassName="text-brand-green-600" // Updated to brand-green
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md active:scale-[0.98] transition-all cursor-pointer" // No change needed
                  >
                    Siguiente
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h3 className="quote-step-title">Fecha y Tipo de Servicio</h3>
                  <p className="quote-step-description">
                    ¿Cuándo querés mudarte y qué tipo de servicio necesitás?
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Fecha de Mudanza */}
                  <InputField
                    id="movingDate"
                    name="movingDate"
                    label="Fecha Estimada"
                    type="date"
                    value={formData.movingDate}
                    onChange={handleInputChange}
                    placeholder=""
                    icon={Calendar}
                    error={errors.movingDate}
                  />

                  {/* Tipo de Servicio */}
                  <InputField
                    id="serviceType"
                    name="serviceType"
                    label="Tipo de Servicio"
                    type="select" // Ensure value is always a string for native elements
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    placeholder="Selecciona una opción..."
                    icon={Truck}
                    error={errors.serviceType}
                    inputClassName="pl-4" // Override default pl-11 for select
                    wrapperClassName="items-center" // Align icon better with select
                    iconClassName="left-auto right-3 top-1/2 -translate-y-1/2 pointer-events-none" // Position ChevronDown
                  >
                    <option value="" className="bg-white text-slate-800">
                      Selecciona una opción...
                    </option>
                    <option
                      value="residencial"
                      className="bg-white text-slate-800"
                    >
                      Mudanza Residencial 🏠
                    </option>
                    <option value="oficina" className="bg-white text-slate-800">
                      Mudanza de Oficina 🏢
                    </option>
                    <option
                      value="combinada"
                      className="bg-white text-slate-800"
                    >
                      Mudanza Combinada / Flete Compartido 🚚
                    </option>
                    <option
                      value="embalaje"
                      className="bg-white text-slate-800"
                    >
                      Embalaje Profesional 📦
                    </option>
                    <option
                      value="guardamuebles"
                      className="bg-white text-slate-800"
                    >
                      Servicio de Guardamuebles 🔑
                    </option>
                    <option
                      value="logistica"
                      className="bg-white text-slate-800"
                    >
                      Logística y Fletes 🚛
                    </option>
                    <ChevronDown className="w-5 h-5" />{" "}
                    {/* Lucide icon for dropdown */}
                  </InputField>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrev} // Use handlePrev
                    className="quote-nav-button-secondary"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="quote-nav-button-primary bg-brand-green-500 hover:bg-brand-green-600" // No change needed
                  >
                    Siguiente
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h3 className="quote-step-title">Información de Contacto</h3>
                  <p className="quote-step-description">
                    Dejanos tus datos para coordinar el presupuesto formal.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Nombre */}
                  <InputField
                    id="name"
                    name="name"
                    label="Nombre Completo"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej: Sofía Martínez"
                    icon={User}
                    error={errors.name}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Teléfono */}
                    <InputField
                      id="phone"
                      name="phone"
                      label="Teléfono / Celular (WhatsApp)"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ej: 261 5123456"
                      icon={Phone}
                      error={errors.phone}
                    />

                    {/* Email */}
                    <InputField
                      id="email"
                      name="email"
                      label="Correo Electrónico"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Ej: sofia@gmail.com"
                      icon={Mail}
                      error={errors.email}
                    />
                  </div>

                  {/* Comentarios */}
                  <InputField
                    id="comments"
                    name="comments"
                    label="Comentarios Adicionales (Opcional)"
                    type="textarea"
                    value={formData.comments}
                    onChange={handleInputChange} // comments can be undefined
                    placeholder="Ej: Se requiere bajar sillón de 3 cuerpos por balcón, departamento segundo piso..."
                    icon={MessageSquare} // Using MessageSquare for comments
                    inputClassName="pl-4" // Override default pl-11 for textarea
                    wrapperClassName="items-start" // Align icon better with textarea
                    iconClassName="top-3.5" // Position icon at the top
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={isSubmitting} // No change needed
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 font-semibold py-3 px-5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting} // No change needed
                    className="quote-submit-button"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        Solicitar Cotización
                        <Check className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        ) : (
          /* Success Screen - CRO Optimization Peak */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="quote-success-container"
          >
            <div className="quote-success-icon-wrapper">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="quote-success-title">
              ¡Solicitud recibida con éxito!
            </h3>
            <p className="quote-success-description">
              Hola{" "}
              <span className="font-semibold text-slate-800">
                {formData.name}
              </span>
              , hemos registrado tu solicitud para el{" "}
              <span className="font-semibold text-brand-green-600">
                {formData.movingDate}
              </span>
              . Un asesor técnico está evaluando las direcciones.
            </p>

            <div className="quote-summary-card">
              <h4 className="quote-summary-title">Resumen de tu Ruta</h4>
              <div className="space-y-2 text-sm text-slate-600">
                {" "}
                {/* Text size remains */}
                <p className="quote-summary-item">
                  <span className="quote-summary-label">Origen:</span>
                  <span>{formData.origin}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-brand-green-600 min-w-[60px]">
                    Destino:
                  </span>
                  <span>{formData.destination}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-brand-green-600 min-w-[60px]">
                    Servicio:
                  </span>{" "}
                  {/* Updated to brand-green */}
                  <span className="capitalize">{formData.serviceType}</span>
                </p>
              </div>
            </div>

            <div className="quote-whatsapp-cta-container">
              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="quote-whatsapp-button"
              >
                <MessageSquare className="w-6 h-6 fill-white" />
                Enviar por WhatsApp para Presupuesto Instantáneo
              </button>
              <p className="quote-whatsapp-note">
                Al hacer clic, se abrirá WhatsApp con el mensaje estructurado
                para que uno de nuestros choferes te cotice al instante.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
