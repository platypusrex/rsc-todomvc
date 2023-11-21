'use client';

import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = ComponentPropsWithoutRef<'button'> & {
  children?: React.ReactNode;
};

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ children, ...rest }, ref) => {
    const { pending } = useFormStatus();
    return (
      <button {...rest} type="submit" disabled={pending} ref={ref}>
        {children}
      </button>
    );
  }
);

SubmitButton.displayName = 'SubmitButton';
