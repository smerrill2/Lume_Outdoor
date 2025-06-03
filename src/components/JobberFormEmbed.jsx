import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const JobberFormEmbed = ({ formId = 'homepage-jobber-form' }) => {
  const containerRef = useRef(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    // Only proceed if we haven't already loaded
    if (hasLoadedRef.current) return;
    
    // Add a unique div for this specific instance
    const formDiv = document.createElement('div');
    formDiv.id = '71b278a2-07ad-43e3-80c7-a57c292b1277';
    
    if (containerRef.current) {
      containerRef.current.appendChild(formDiv);
    }

    // Check if Jobber script already exists
    const existingScript = document.querySelector('script[src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js"]');
    
    if (!existingScript) {
      // Add the CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css';
      link.media = 'screen';
      document.head.appendChild(link);

      // Add the script
      const script = document.createElement('script');
      script.src = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js';
      script.setAttribute('clienthub_id', '71b278a2-07ad-43e3-80c7-a57c292b1277');
      script.setAttribute('form_url', 'https://clienthub.getjobber.com/client_hubs/71b278a2-07ad-43e3-80c7-a57c292b1277/public/work_request/embedded_work_request_form');
      script.async = true;
      
      document.body.appendChild(script);
    } else {
      // If script exists, trigger it to reload forms
      if (window.Jobber && window.Jobber.requestForms) {
        window.Jobber.requestForms.load();
      }
    }

    hasLoadedRef.current = true;

    // Animate container
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Cleanup - remove the form div when component unmounts
    return () => {
      if (formDiv && formDiv.parentNode) {
        formDiv.parentNode.removeChild(formDiv);
      }
    };
  }, [formId]);

  return (
    <div ref={containerRef} className="jobber-form-container">
      {/* Jobber form will be inserted here */}
    </div>
  );
};

export default JobberFormEmbed;