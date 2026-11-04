"""Page through up to 3 years of eBay sold history with the CompSniper API.

Usage: COMPSNIPER_API_KEY=cs_live_... python sold_history.py "nintendo switch oled" 2023-11-05 2026-11-04
Docs: https://compsniper.com/docs/sold-history
"""
import os
import sys

import requests

keyword, start, end = (sys.argv[1:4] + ["nintendo switch oled", "2023-11-05", "2026-11-04"][len(sys.argv[1:4]):])
page, max_pages = 1, 5
while page and page <= max_pages:
    response = requests.get(
        "https://api.compsniper.com/v1/research/sold",
        headers={"Authorization": f"Bearer {os.environ['COMPSNIPER_API_KEY']}"},
        params={"keyword": keyword, "startDate": start, "endDate": end,
                "sort": "lastSoldDescending", "limit": 50, "page": page},
        timeout=60,
    )
    response.raise_for_status()
    data = response.json()
    if page == 1 and data.get("totals"):
        print("total sold in range:", data["totals"].get("totalSold"))
    for row in data["results"]:
        print(row["lastSoldDate"], row["soldUnits"], row["averageSoldPrice"]["amount"], row["title"])
    page = data.get("nextPage") if data.get("hasNextPage") else None
