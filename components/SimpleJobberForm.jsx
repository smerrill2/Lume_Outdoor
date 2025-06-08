'use client';

import React, { useEffect } from 'react';

const SimpleJobberForm = () => {
  useEffect(() => {
    // Check if CSS already exists
    let link = document.querySelector('link[href="https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css';
      link.media = 'screen';
      document.head.appendChild(link);
    }

    // Check if script already exists
    let script = document.querySelector('script[src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js';
      script.setAttribute('clienthub_id', '71b278a2-07ad-43e3-80c7-a57c292b1277');
      script.setAttribute('form_url', 'https://clienthub.getjobber.com/client_hubs/71b278a2-07ad-43e3-80c7-a57c292b1277/public/work_request/embedded_work_request_form');
      
      // Add script to body
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div id="71b278a2-07ad-43e3-80c7-a57c292b1277"></div>
  );
};

export default SimpleJobberForm;