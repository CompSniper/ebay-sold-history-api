// Page through up to 3 years of eBay sold history with the CompSniper API (Node.js 18+).
// Usage: COMPSNIPER_API_KEY=cs_live_... node sold-history.mjs "nintendo switch oled" 2023-11-05 2026-11-04
// Docs: https://compsniper.com/docs/sold-history

const [keyword = "nintendo switch oled", startDate = "2023-11-05", endDate = "2026-11-04"] = process.argv.slice(2);
let page = 1;
const maxPages = 5;
while (page && page <= maxPages) {
  const params = new URLSearchParams({ keyword, startDate, endDate, sort: "lastSoldDescending", limit: "50", page: String(page) });
  const response = await fetch(`https://api.compsniper.com/v1/research/sold?${params}`, {
    headers: { Authorization: `Bearer ${process.env.COMPSNIPER_API_KEY}` },
  });
  if (!response.ok) throw new Error(`CompSniper API error ${response.status}: ${await response.text()}`);
  const data = await response.json();
  if (page === 1 && data.totals) console.log("total sold in range:", data.totals.totalSold);
  for (const row of data.results) console.log(row.lastSoldDate, row.soldUnits, row.averageSoldPrice.amount, row.title);
  page = data.hasNextPage ? data.nextPage : null;
}
