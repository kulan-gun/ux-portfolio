interface DataTableProps {
    title?: string
    description?: string
    columns: string[]
    data: (string | number)[][]
    highlightedRows?: number[]
    caption?: string
  }
  
  export default function DataTable({
    title,
    description,
    columns,
    data,
    highlightedRows = [],
    caption,
  }: DataTableProps) {
    return (
      <div className="rounded-3xl bg-zinc-900/50 p-6 md:p-8 backdrop-blur-sm">
        {title && <h4 className="text-lg md:text-xl font-normal text-white mb-4">{title}</h4>}
        {description && <p className="text-gray-300 mb-6">{description}</p>}
  
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {caption && <caption className="sr-only">{caption}</caption>}
            <thead>
              <tr className="border-b border-gray-700">
                {columns.map((column, index) => (
                  <th key={index} className="text-left py-3 px-4 text-gray-300 font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b border-gray-800 ${highlightedRows.includes(rowIndex) ? "bg-green-900/20" : ""}`}
                >
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="py-3 px-4 text-gray-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  
  