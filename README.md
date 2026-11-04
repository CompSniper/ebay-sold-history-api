# eBay Sold History API: 3 Years of Sold Prices (2026)

**Short answer:** eBay's sold search and the Marketplace Insights API stop at about 90 days, and `findCompletedItems`
was retired in February 2025. [CompSniper's](https://compsniper.com/docs/sold-history) `GET /v1/research/sold` returns
up to **3 years (1,095 days)** of eBay sold history by keyword, between any two dates, on all 8 eBay sites. It is on
every plan, including the free one (100 requests a month).

Use it for slow-moving items, seasonal trends, price history after a release, or a sale from last year.

## curl

```bash
curl -H "Authorization: Bearer $COMPSNIPER_API_KEY" \
  "https://api.compsniper.com/v1/research/sold?keyword=nintendo+switch+oled&startDate=2023-11-05&endDate=2026-11-04&sort=lastSoldDescending&limit=50"
```

## Python

```bash
python python/sold_history.py "nintendo switch oled" 2023-11-05 2026-11-04
```

## Node.js (18+)

```bash
node node/sold-history.mjs "nintendo switch oled" 2023-11-05 2026-11-04
```

Both scripts page through results (50 rows a page) and print the sale date, units sold and average sold price.

## Parameters

| Parameter | Values |
| --- | --- |
| `keyword` | 1 to 200 characters (required) |
| `startDate`, `endDate` | `YYYY-MM-DD`, up to 3 years back (required) |
| `ebaySite` | `ebay.com` (default), `ebay.co.uk`, `ebay.com.au`, `ebay.ca`, `ebay.de`, `ebay.fr`, `ebay.it`, `ebay.es` |
| `sort` | `lastSoldDescending` (newest first) or `quantityAscending` |
| `limit` | `10`, `20` or `50` rows per page |
| `page` | `1` to `200` |
| `singleUnitOnly` | `true` keeps only listings that sold exactly one unit |

Full reference: [3-year eBay sold history API docs](https://compsniper.com/docs/sold-history).

## Related

- [eBay sold listings API: Python and Node.js](https://github.com/CompSniper/ebay-sold-listings-api) (most recent sales with full listing fields)
- [eBay Best Offer accepted price API](https://github.com/CompSniper/ebay-best-offer-price-api)
- [eBay sold listings MCP server](https://github.com/CompSniper/ebay-sold-listings-mcp-server)
