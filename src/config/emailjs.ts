

// EmailJS configuration using environment variables
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_v7gthax',      
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_2qrj0l3',    
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'mSf2de92nJaxPCsRw',     
}

// Validate EmailJS configuration
export const validateEmailJSConfig = () => {
  const missing = [];
  
  if (!emailjsConfig.serviceId || emailjsConfig.serviceId.includes('your-')) {
    missing.push('VITE_EMAILJS_SERVICE_ID');
  }
  if (!emailjsConfig.templateId || emailjsConfig.templateId.includes('your-')) {
    missing.push('VITE_EMAILJS_TEMPLATE_ID');
  }
  if (!emailjsConfig.publicKey || emailjsConfig.publicKey.includes('your-')) {
    missing.push('VITE_EMAILJS_PUBLIC_KEY');
  }
  
  if (missing.length > 0) {
    console.warn('EmailJS configuration missing:', missing.join(', '));
    console.warn('Please check your .env.local file');
  }
  
  return missing.length === 0;
};


