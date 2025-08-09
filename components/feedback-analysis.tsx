
import BarChart from "@/components/bar-chart"
import DataTable from "@/components/data-table"

export default function FeedbackAnalysis() {
  // Data for the NPS Demoter table
  const demoterTableColumns = ["Rank", "Category", "Occurrences"]
  const demoterTableData = [
    [1, "Communication issues", 230],
    [2, "Difficulty uploading", 178],
    [3, "Photo acceptance", 139],
    [4, "General frustration", 106],
    [5, "Phone lines general", 100],
    [6, "Fit note not received", 94],
    [7, "Payments", 89],
    [8, "File type", 70],
    [9, "Difficult to use", 65],
    [10, "Fit note acceptance", 56],
    [11, "Multiple fit note upload", 56],
    [12, "Other", 42],
    [13, "Digital literacy", 36],
    [14, "Guidance", 30],
    [15, "Photo orientation", 28],
    [16, "Fit note feedback", 24],
    [17, "Needs extra info", 21],
    [18, "Other channels", 21],
    [19, "Upload preview", 20],
    [20, "Fit note needed signing", 19],
  ]

  // Highlighted rows for feature requests (green in the original table)
  const highlightedRows = [10, 12, 13, 14, 16]

  // Update the chart data to focus on the top 7 categories
  // Modify the chartData object to include a title that indicates we're showing top 7
  const chartData = {
    labels: [
      "Communication issues",
      "Difficulty uploading",
      "Photo acceptance",
      "General frustration",
      "Phone lines general",
      "Fit note not received",
      "Payments",
    ],
    values: [230, 178, 139, 106, 100, 94, 89],
  }

  // Summary data for all satisfaction scores
  const satisfactionScoreData = [
    ["1", "Demoter", 919, 544],
    ["2", "Demoter", 877, 530],
    ["3", "Passive", 644, 331],
    ["4", "Promoter", 1324, 765],
    ["5", "Promoter", 3231, 2597],
    ["Total", "", 6995, 4767],
  ]

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-2xl font-normal text-white mb-6">Feedback Inbox Analysis</h3>
        <ul className="space-y-2 text-sm sm:text-base md:text-lg text-gray-300 list-disc pl-5">
          <li>Analysed 4,767 user comments from the feedback inbox exported as Excel rows.</li>
          <li>Grouped feedback by satisfaction score (SS) using Net Promoter Score (NPS) principles.</li>
          <li>Classified SS1 to 2 as service demoters, SS3 as passive, and SS4 to 5 as service promoters.</li>
        </ul>
      </div>

<div>
      <DataTable
          title="Satisfaction Score Distribution"
          columns={["Satisfaction Score (SS)", "NPS Category", "Rows", "Comments"]}
          data={satisfactionScoreData}
        />
        </div>

      <div>
        <h3 className="text-2xl font-normal text-white mb-6">NPS Demoter (SS1 & SS2)</h3>
        <p className="mb-8 max-w-3xl text-sm sm:text-base md:text-lg text-gray-300">
          We prioritised addressing the demoter levels, which had 1,074 comments. The table below shows the top 20 categories. Highlighted
          rows show specific feature requests from users.
        </p>

        <DataTable
          columns={demoterTableColumns}
          data={demoterTableData}
          highlightedRows={highlightedRows}
          caption="Top 20 categories for NPS Demoter (SS1 & SS2)"
        />
      </div>

      <div>
        <BarChart
          title="Top 7: Most Common Feedback Categories (SS1 & SS2)"
          description="Visual representation of the most frequent feedback categories from users with low satisfaction scores (1 and 2)."
          data={chartData}
          height={450}
          yAxisLabel="Occurrences"
          xAxisLabel="Categories"
        />
      </div>

    </div>
  )
}

