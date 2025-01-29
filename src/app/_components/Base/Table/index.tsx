import type { FC, ReactNode } from 'react'

import classNames from 'classnames'

import styles from './style.module.css'

export type TableProps = {
  children: ReactNode
  stickyColumn?: boolean
}

const Table = ({ children, stickyColumn }: TableProps) => {
  return (
    <table
      className={classNames(
        styles.table,
        stickyColumn === true ? styles._sticky : undefined,
      )}
    >
      {children}
    </table>
  )
}

export type TableHeaderProps = {
  children: ReactNode
}

const TableHeader: FC<TableHeaderProps> = ({ children }) => {
  return <thead className={styles.tableHeader}>{children}</thead>
}

export type TableBodyProps = {
  children: ReactNode
}

const TableBody: FC<TableBodyProps> = ({ children }) => {
  return <tbody className={styles.tableBody}>{children}</tbody>
}

export type TableRowProps = {
  children: ReactNode
  className?: string
}

const TableRow: FC<TableRowProps> = ({ children, className }) => {
  return <tr className={classNames(styles.tableRow, className)}>{children}</tr>
}

export type TableCellProps = {
  children: ReactNode
  expanded?: boolean
  width?: number
}

const TableCell: FC<TableCellProps> = ({ children, expanded, width }) => {
  return (
    <td
      className={styles.tableCell}
      data-expand={expanded === true ? 'true' : 'false'}
      style={{
        minWidth: width,
      }}
    >
      {children}
    </td>
  )
}

Table.Header = TableHeader
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell

export default Table
