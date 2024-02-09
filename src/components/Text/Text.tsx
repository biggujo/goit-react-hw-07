import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode,
}

export default function Text({ children }: Props) {
  return (<p>{children}</p>);
}
