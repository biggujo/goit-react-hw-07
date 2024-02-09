import React, { ReactElement } from 'react';
import { Subtitle } from './Section.styled';

interface Props {
  title: string,
  children: Array<ReactElement> | ReactElement,
}

export default function Section({
                                  title,
                                  children,
                                }: Props) {
  return (<>
      <Subtitle>{title}</Subtitle>
      {children}
    </>

  );
}
