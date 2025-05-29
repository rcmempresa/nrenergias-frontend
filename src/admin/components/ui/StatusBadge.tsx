import React from 'react';
import { Badge } from './Badge';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'paid' | 'shipped' | 'delivered';
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusConfig: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'default', label: string }> = {
    active: { variant: 'success', label: 'Active' },
    inactive: { variant: 'error', label: 'Inactive' },
    pending: { variant: 'warning', label: 'Pending' },
    paid: { variant: 'info', label: 'Paid' },
    shipped: { variant: 'info', label: 'Shipped' },
    delivered: { variant: 'success', label: 'Delivered' }
  };

  const config = statusConfig[status] || { variant: 'default', label: status };

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}