import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import path from "path";

const NAVY = "#0B1E33";
const TEAL = "#1FAE9F";
const TEAL_LIGHT = "#EAF6F4";
const GRAY_BG = "#F7F9FA";
const GRAY_TEXT = "#6B7280";
const BORDER = "#E5E7EB";
const ORANGE = "#D97706";
const ORANGE_LIGHT = "#FEF3E2";
const GREEN = "#178F82";

const styles = StyleSheet.create({
  page: {
    paddingTop: 0,
    paddingBottom: 56,
    paddingHorizontal: 0,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: NAVY,
  },
  content: { paddingHorizontal: 40 },

  headerBand: {
    backgroundColor: NAVY,
    paddingHorizontal: 40,
    paddingTop: 28,
    paddingBottom: 24,
    marginBottom: 22,
  },
  headerTop: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  logoImage: {
    height: 26,
    marginRight: 0,
    objectFit: "contain",
  },
  brandText: { fontSize: 13, fontWeight: 700, color: "#FFFFFF" },
  brandTM: { fontSize: 7, color: "#FFFFFF", marginLeft: 2 },
  title: { fontSize: 19, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 },
  address: { fontSize: 10.5, color: "#B9C4D0" },

  sectionLabel: {
    fontSize: 8.5,
    fontWeight: 700,
    color: GRAY_TEXT,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },

  card: {
    backgroundColor: GRAY_BG,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 16,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  bigValue: { fontSize: 24, fontWeight: 700, color: NAVY },
  rangeText: { fontSize: 9, color: GRAY_TEXT, marginTop: 4 },
  rangeStrong: { color: NAVY, fontWeight: 700 },
  confidenceBadge: {
    alignSelf: "flex-start",
    backgroundColor: TEAL_LIGHT,
    color: GREEN,
    fontSize: 8.5,
    fontWeight: 700,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  trendBadge: {
    backgroundColor: TEAL_LIGHT,
    color: GREEN,
    fontSize: 8,
    fontWeight: 700,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 9,
  },

  scoreRow: { flexDirection: "row", alignItems: "baseline" },
  scoreValue: { fontSize: 26, fontWeight: 700, color: TEAL },
  scoreOutOf: { fontSize: 11, color: "#9CA3AF", marginLeft: 4 },
  tierBadge: {
    alignSelf: "flex-start",
    fontSize: 9,
    fontWeight: 700,
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: 10,
    marginTop: 8,
  },

  detailsGrid: { flexDirection: "row", gap: 8 },
  detailBox: {
    flex: 1,
    backgroundColor: GRAY_BG,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 10,
  },
  detailValue: { fontSize: 15, fontWeight: 700, color: NAVY },
  detailLabel: {
    fontSize: 7,
    color: GRAY_TEXT,
    marginTop: 2,
    textTransform: "uppercase",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: NAVY,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  tableHeaderText: {
    fontSize: 7,
    fontWeight: 700,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  tableRowAlt: { backgroundColor: "#FAFBFC" },
  tableCellText: { fontSize: 8, color: NAVY, lineHeight: 1.35 },
  tableCellSub: { fontSize: 7.5, color: GRAY_TEXT, lineHeight: 1.35 },

  colAddress: { width: "34%", paddingRight: 6 },
  colDist: { width: "11%" },
  colBeds: { width: "13%" },
  colSqft: { width: "12%" },
  colPrice: { width: "15%" },
  colDate: { width: "15%" },

  neighborhoodGrid: { flexDirection: "row", gap: 10, marginTop: 10 },
  neighborhoodBox: {
    flex: 1,
    backgroundColor: TEAL_LIGHT,
    borderRadius: 8,
    padding: 12,
  },
  neighborhoodValue: { fontSize: 15, fontWeight: 700, color: GREEN },
  neighborhoodLabel: {
    fontSize: 7,
    color: GREEN,
    marginTop: 2,
    textTransform: "uppercase",
  },

  footer: {
    position: "absolute",
    bottom: 22,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 10,
    backgroundColor: "#FFFFFF",
  },
  footerText: {
    fontSize: 7.5,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 1.5,
  },
});

const LOGO_PATH = path.join(process.cwd(), "public", "logo.png");

function tierColors(label: string): { bg: string; text: string } {
  if (label === "Strong Signal") return { bg: TEAL_LIGHT, text: GREEN };
  if (label === "Steady Signal") return { bg: "#EAF2FE", text: "#1D4ED8" };
  return { bg: ORANGE_LIGHT, text: ORANGE };
}

interface ComparableRow {
  formattedAddress?: string;
  distance?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  price?: number;
  listedDate?: string;
  removedDate?: string | null;
  lastSeenDate?: string;
}

export interface FullReportPdfProps {
  address: string;
  estimatedValue: string;
  rangeLow: string;
  rangeHigh: string;
  confidenceLabel: string;
  signalScore: number;
  signalLabel: string;
  bedrooms: number | string;
  bathrooms: number | string;
  squareFootage: string;
  yearBuilt: number | string;
  comparables: ComparableRow[];
  medianPrice: number | null;
  medianPricePerSqft: number | null;
  medianDaysOnMarket: number | null;
}

function fmtMoney(value?: number | null): string {
  if (value == null) return "-";
  return `$${Math.round(value).toLocaleString()}`;
}

function fmtSaleDate(comp: ComparableRow): string {
  const dateStr = comp.removedDate ?? comp.lastSeenDate ?? comp.listedDate;
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Comps are split into pages of this size so the table never collides with
// the fixed footer — each chunk gets its own page instead of one long table
// that can overflow past the footer and leave a blank trailing page.
const COMPS_PER_PAGE = 9;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function FullReportPdf({
  address,
  estimatedValue,
  rangeLow,
  rangeHigh,
  confidenceLabel,
  signalScore,
  signalLabel,
  bedrooms,
  bathrooms,
  squareFootage,
  yearBuilt,
  comparables,
  medianPrice,
  medianPricePerSqft,
  medianDaysOnMarket,
}: FullReportPdfProps) {
  const tierStyle = tierColors(signalLabel);
  const compPages = chunk(comparables.slice(0, 27), COMPS_PER_PAGE);

  return (
    <Document>
      {/* Page 1 — summary + property details + first batch of comps */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand}>
          <View style={styles.headerTop}>
            <Image src={LOGO_PATH} style={styles.logoImage} />
          </View>
          <Text style={styles.title}>Your Full Listing Signal™ Report</Text>
          <Text style={styles.address}>{address}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.sectionLabel}>Estimated Home Value</Text>
              <Text style={styles.trendBadge}>Today's Market</Text>
            </View>
            <Text style={styles.bigValue}>{estimatedValue}</Text>
            <Text style={styles.rangeText}>
              Value range:{" "}
              <Text style={styles.rangeStrong}>
                {rangeLow} - {rangeHigh}
              </Text>
            </Text>
            <Text style={styles.confidenceBadge}>
              Confidence: {confidenceLabel}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Signal to Sell™</Text>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreValue}>{signalScore}</Text>
              <Text style={styles.scoreOutOf}>/ 100</Text>
            </View>
            <Text
              style={[
                styles.tierBadge,
                { backgroundColor: tierStyle.bg, color: tierStyle.text },
              ]}
            >
              {signalLabel}
            </Text>
          </View>

          <Text style={styles.sectionLabel}>Property Details</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailBox}>
              <Text style={styles.detailValue}>{bedrooms}</Text>
              <Text style={styles.detailLabel}>Bedrooms</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailValue}>{bathrooms}</Text>
              <Text style={styles.detailLabel}>Bathrooms</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailValue}>{squareFootage}</Text>
              <Text style={styles.detailLabel}>Sq Ft</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.detailValue}>{yearBuilt}</Text>
              <Text style={styles.detailLabel}>Year Built</Text>
            </View>
          </View>

          {compPages[0] && compPages[0].length > 0 && (
            <>
              <Text style={[styles.sectionLabel, { marginTop: 16 }]}>
                Comparable Sales ({comparables.length})
              </Text>
              <View style={styles.tableHeader}>
                <View style={styles.colAddress}>
                  <Text style={styles.tableHeaderText}>Address</Text>
                </View>
                <View style={styles.colDist}>
                  <Text style={styles.tableHeaderText}>Dist.</Text>
                </View>
                <View style={styles.colBeds}>
                  <Text style={styles.tableHeaderText}>Bed/Bath</Text>
                </View>
                <View style={styles.colSqft}>
                  <Text style={styles.tableHeaderText}>Sq Ft</Text>
                </View>
                <View style={styles.colPrice}>
                  <Text style={styles.tableHeaderText}>Price</Text>
                </View>
                <View style={styles.colDate}>
                  <Text style={styles.tableHeaderText}>Sale Date</Text>
                </View>
              </View>
              {compPages[0].map((c, i) => (
                <View
                  key={i}
                  wrap={false}
                  style={[
                    styles.tableRow,
                    i % 2 === 1 ? styles.tableRowAlt : {},
                  ]}
                >
                  <View style={styles.colAddress}>
                    <Text style={styles.tableCellText}>
                      {c.formattedAddress ?? "-"}
                    </Text>
                  </View>
                  <View style={styles.colDist}>
                    <Text style={styles.tableCellSub}>
                      {c.distance != null ? `${c.distance.toFixed(2)} mi` : "-"}
                    </Text>
                  </View>
                  <View style={styles.colBeds}>
                    <Text style={styles.tableCellSub}>
                      {c.bedrooms ?? "-"}/{c.bathrooms ?? "-"}
                    </Text>
                  </View>
                  <View style={styles.colSqft}>
                    <Text style={styles.tableCellSub}>
                      {c.squareFootage != null
                        ? c.squareFootage.toLocaleString()
                        : "-"}
                    </Text>
                  </View>
                  <View style={styles.colPrice}>
                    <Text style={styles.tableCellText}>
                      {fmtMoney(c.price)}
                    </Text>
                  </View>
                  <View style={styles.colDate}>
                    <Text style={styles.tableCellSub}>{fmtSaleDate(c)}</Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            This automated report is for informational purposes only and is not
            a formal appraisal.{"\n"}© {new Date().getFullYear()} Listing
            Signal™
          </Text>
        </View>
      </Page>

      {/* Additional comp pages, only rendered if there are more comps than fit on page 1 */}
      {compPages.slice(1).map((pageComps, pageIdx) => (
        <Page key={pageIdx} size="A4" style={styles.page}>
          <View style={styles.headerBand}>
            <View style={styles.headerTop}>
              <Image src={LOGO_PATH} style={styles.logoImage} />
            </View>
            <Text style={styles.title}>Comparable Sales (continued)</Text>
            <Text style={styles.address}>{address}</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.tableHeader}>
              <View style={styles.colAddress}>
                <Text style={styles.tableHeaderText}>Address</Text>
              </View>
              <View style={styles.colDist}>
                <Text style={styles.tableHeaderText}>Dist.</Text>
              </View>
              <View style={styles.colBeds}>
                <Text style={styles.tableHeaderText}>Bed/Bath</Text>
              </View>
              <View style={styles.colSqft}>
                <Text style={styles.tableHeaderText}>Sq Ft</Text>
              </View>
              <View style={styles.colPrice}>
                <Text style={styles.tableHeaderText}>Price</Text>
              </View>
              <View style={styles.colDate}>
                <Text style={styles.tableHeaderText}>Sale Date</Text>
              </View>
            </View>
            {pageComps.map((c, i) => (
              <View
                key={i}
                wrap={false}
                style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}
              >
                <View style={styles.colAddress}>
                  <Text style={styles.tableCellText}>
                    {c.formattedAddress ?? "-"}
                  </Text>
                </View>
                <View style={styles.colDist}>
                  <Text style={styles.tableCellSub}>
                    {c.distance != null ? `${c.distance.toFixed(2)} mi` : "-"}
                  </Text>
                </View>
                <View style={styles.colBeds}>
                  <Text style={styles.tableCellSub}>
                    {c.bedrooms ?? "-"}/{c.bathrooms ?? "-"}
                  </Text>
                </View>
                <View style={styles.colSqft}>
                  <Text style={styles.tableCellSub}>
                    {c.squareFootage != null
                      ? c.squareFootage.toLocaleString()
                      : "-"}
                  </Text>
                </View>
                <View style={styles.colPrice}>
                  <Text style={styles.tableCellText}>{fmtMoney(c.price)}</Text>
                </View>
                <View style={styles.colDate}>
                  <Text style={styles.tableCellSub}>{fmtSaleDate(c)}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.footer} fixed>
            <Text style={styles.footerText}>
              This automated report is for informational purposes only and is
              not a formal appraisal.{"\n"}© {new Date().getFullYear()} Listing
              Signal™
            </Text>
          </View>
        </Page>
      ))}

      {/* Final page — neighborhood summary, always starts fresh so it never
          collides with the comps table or the fixed footer. */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBand}>
          <View style={styles.headerTop}>
            <Image src={LOGO_PATH} style={styles.logoImage} />
          </View>
          <Text style={styles.title}>Neighborhood Market Summary</Text>
          <Text style={styles.address}>{address}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.neighborhoodGrid}>
            <View style={styles.neighborhoodBox}>
              <Text style={styles.neighborhoodValue}>
                {fmtMoney(medianPrice)}
              </Text>
              <Text style={styles.neighborhoodLabel}>Median Sale Price</Text>
            </View>
            <View style={styles.neighborhoodBox}>
              <Text style={styles.neighborhoodValue}>
                {medianPricePerSqft
                  ? `$${Math.round(medianPricePerSqft)}`
                  : "-"}
              </Text>
              <Text style={styles.neighborhoodLabel}>Median $/SqFt</Text>
            </View>
            <View style={styles.neighborhoodBox}>
              <Text style={styles.neighborhoodValue}>
                {medianDaysOnMarket != null
                  ? `${medianDaysOnMarket} days`
                  : "-"}
              </Text>
              <Text style={styles.neighborhoodLabel}>
                Median Days on Market
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            This automated report is for informational purposes only and is not
            a formal appraisal.{"\n"}© {new Date().getFullYear()} Listing
            Signal™
          </Text>
        </View>
      </Page>
    </Document>
  );
}