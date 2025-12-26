'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...props }, ref) => (
    <div className="w-full overflow-x-auto border border-gray-200 rounded-lg">
      <table
        ref={ref}
        className={cn('w-full border-collapse text-sm', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);

Table.displayName = 'Table';

interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, children, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn('bg-gray-50 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </thead>
  )
);

TableHead.displayName = 'TableHead';

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => (
    <tbody ref={ref} className={cn('divide-y divide-gray-200', className)} {...props}>
      {children}
    </tbody>
  )
);

TableBody.displayName = 'TableBody';

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  isHoverable?: boolean;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, isHoverable = true, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        isHoverable && 'hover:bg-gray-50 transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  )
);

TableRow.displayName = 'TableRow';

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  isHeader?: boolean;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, isHeader = false, ...props }, ref) => {
    const Element = isHeader ? 'th' : 'td';
    return (
      <Element
        ref={ref as any}
        className={cn(
          'px-6 py-3 text-left',
          isHeader
            ? 'font-semibold text-gray-700 text-xs uppercase tracking-wider'
            : 'text-gray-900',
          className
        )}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

TableCell.displayName = 'TableCell';

interface SortHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  onSort?: () => void;
  sortDirection?: 'asc' | 'desc' | null;
  children: React.ReactNode;
}

const SortHeader = React.forwardRef<HTMLTableCellElement, SortHeaderProps>(
  ({ onSort, sortDirection, children, className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'px-6 py-3 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider',
        onSort && 'cursor-pointer hover:bg-gray-100 transition-colors',
        className
      )}
      onClick={onSort}
      {...props}
    >
      <div className="flex items-center gap-2">
        {children}
        {onSort && sortDirection && (
          sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
        )}
      </div>
    </th>
  )
);

SortHeader.displayName = 'SortHeader';

export { Table, TableHead, TableBody, TableRow, TableCell, SortHeader };
