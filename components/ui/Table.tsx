interface TableProps {
  headers: string[];
  rows: string[][];
  className?: string;
}

export function Table({ headers, rows, className = '' }: TableProps) {
  return (
    <div className={`border border-border bg-bg-surface overflow-x-auto ${className}`}>
      <table className="w-full font-sans text-text-body">
        <thead>
          <tr className="border-b border-border">
            {headers.map((header, i) => (
              <th key={i} className="text-left p-4 border-r border-border last:border-r-0 text-text-title">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-b-0 hover:bg-border/20">
              {row.map((cell, j) => (
                <td key={j} className="p-4 border-r border-border last:border-r-0">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
