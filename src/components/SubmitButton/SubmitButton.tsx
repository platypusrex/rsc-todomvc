'use client';

import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = ComponentPropsWithoutRef<'button'> & {
  children?: React.ReactNode;
  loading?: React.ReactNode;
};

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ children, loading, ...rest }, ref) => {
    const { pending } = useFormStatus();

    return (
      <button {...rest} className={`group ${rest.className}`} type="submit" disabled={pending} ref={ref}>
        {pending && loading ? loading : children}
      </button>
    );
  }
);

SubmitButton.displayName = 'SubmitButton';
