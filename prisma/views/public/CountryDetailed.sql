SELECT
  c.code,
  c.name,
  json_agg(DISTINCT cur.*) AS currencies,
  json_agg(DISTINCT l.*) AS languages
FROM
  (
    (
      (
        (
          "Country" c
          JOIN "CountryCurrency" cc ON ((c.code = cc."countryCode"))
        )
        JOIN "Currency" cur ON ((cur.code = cc."currencyCode"))
      )
      JOIN "CountryLanguage" cl ON ((c.code = cl."countryCode"))
    )
    JOIN "Language" l ON ((l.code = cl."languageCode"))
  )
GROUP BY
  c.code;