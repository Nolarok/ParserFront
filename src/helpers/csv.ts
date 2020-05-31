export function loadAsCSV(content: string[][], headers: string[] = []) {
  const strData = [...[headers], ...content].map((row: string[]) => {
    return row.join(', ')
  }).join("\n")

  // http://jsfiddle.net/W432s/
  const csvContent = "data:application/csv;charset=uft-8,%EF%BB%BF" + encodeURI(strData)

  const link = document.createElement("a")
  link.setAttribute("href", csvContent)
  link.setAttribute("download", "my_data.csv")
  document.body.appendChild(link) // Required for FF
  link.click()
}
