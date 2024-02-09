import React from 'react';
import { Button } from './ContactItem.styled';

interface Props {
  id: string,
  fullName: string,
  phone: string,
  onDelete: (id: string) => void;
}

export default function ContactItem({
                                      id,
                                      fullName,
                                      phone,
                                      onDelete,
                                    }: Props) {
  return (<div>
    <p>{fullName}: {phone} <Button type="button"
                                   onClick={() => onDelete(id)}>Delete</Button>
    </p>

  </div>);
}
