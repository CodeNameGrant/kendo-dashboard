import React from 'react';
import { Label } from '@progress/kendo-react-labels';
import classes from './Field.module.css';

export default function Field({ label, look, inline = true, children, colon = true, width }) {

  const containerClasses = [classes.Container]
  if (!inline) {
    containerClasses.push(classes.Column)
  }

  label = label + (colon ? ':' : '');
  label = look === 'bold' ? <strong>{label}</strong> : label;

  return (
    <div className={containerClasses.join(' ')}>
      <Label style={{ width }}>{label}</Label>
      {children}
    </div>
  )
}