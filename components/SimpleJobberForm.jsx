'use client';

import React, { useEffect, useRef } from 'react';

const SimpleJobberForm = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scriptSrc = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js';
    
    // Function to initialize the form
    const initializeForm = () => {
      if (containerRef.current && !containerRef.current.querySelector('iframe')) {
        // Load CSS if not already present
        if (!document.querySelector('link[href="https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css"]')) {
          const cssLink = document.createElement('link');
          cssLink.rel = 'stylesheet';
          cssLink.href = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css';
          cssLink.media = 'screen';
          document.head.appendChild(cssLink);
        }

        // Load the script
        const script = document.createElement('script');
        script.src = scriptSrc;
        script.setAttribute('clienthub_id', '71b278a2-07ad-43e3-80c7-a57c292b1277');
        script.setAttribute('form_url', 'https://clienthub.getjobber.com/client_hubs/71b278a2-07ad-43e3-80c7-a57c292b1277/public/work_request/embedded_work_request_form');
        containerRef.current.appendChild(script);
      }
    };

    // If the script is already loaded on the page, we might just need to re-init.
    // However, the Jobber script doesn't seem to have a public re-init function.
    // The most robust way is to ensure the script is only loaded once per page lifecycle.
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      initializeForm();
    }
    
  }, []);

  return (
    <div id="71b278a2-07ad-43e3-80c7-a57c292b1277" ref={containerRef}></div>
  );
};

export default SimpleJobberForm;