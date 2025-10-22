import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Box } from '@mui/material';

interface HCaptchaWrapperProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (error: string) => void;
}

export interface HCaptchaHandle {
  resetCaptcha: () => void;
}

const HCaptchaWrapper = forwardRef<HCaptchaHandle, HCaptchaWrapperProps>(
  ({ onVerify, onExpire, onError }, ref) => {
    const captchaRef = useRef<HCaptcha>(null);
    const sitekey = import.meta.env.VITE_HCAPTCHA_SITEKEY;

    useImperativeHandle(ref, () => ({
      resetCaptcha: () => {
        captchaRef.current?.resetCaptcha();
      },
    }));

    const handleVerify = (token: string) => {
      onVerify(token);
    };

    const handleExpire = () => {
      if (onExpire) {
        onExpire();
      }
    };

    const handleError = (error: string) => {
      if (onError) {
        onError(error);
      }
    };

    if (!sitekey) {
      console.error('hCaptcha sitekey no está configurada en las variables de entorno');
      return null;
    }

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <HCaptcha
          ref={captchaRef}
          sitekey={sitekey}
          onVerify={handleVerify}
          onExpire={handleExpire}
          onError={handleError}
          theme="light"
          size="normal"
        />
      </Box>
    );
  }
);

HCaptchaWrapper.displayName = 'HCaptchaWrapper';

export default HCaptchaWrapper;
