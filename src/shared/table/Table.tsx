import { ReactNode } from "react";
import "./Table.scss";

export interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  clickeable?: boolean;
  onCellClick?: (row: T) => void;
  tdTitle?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
}

export const Table = <T,>({ data, columns, keyExtractor }: TableProps<T>) => {
  return (
    <div className="tableWrapper">
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={keyExtractor(row)}>
                {columns.map((col, index) => (
                  <td
                    key={index}
                    className={col.clickeable ? "clickeable" : undefined}
                    onClick={() => col.onCellClick?.(row)}
                    title={col.tdTitle}
                  >
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="emptyRow">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};