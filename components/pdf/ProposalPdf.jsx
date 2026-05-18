import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

const BRAND_GREEN = '#1D4B26';
const LIGHT_GREEN = '#EBF2ED';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingBottom: 60,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#333',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: BRAND_GREEN,
  },
  logo: { width: 55, height: 55 },
  headerTextBlock: { marginLeft: 15 },
  title: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: BRAND_GREEN },
  headerSubtitle: { fontSize: 9, color: '#888', marginTop: 3 },

  /* Section titles */
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_GREEN,
    marginBottom: 10,
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  /* Customer info */
  infoRow: { flexDirection: 'row', marginBottom: 4 },
  infoLabel: { width: 80, color: '#888', fontSize: 10 },
  infoValue: { fontSize: 10, color: '#333' },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginTop: 15,
    marginBottom: 15,
  },

  /* Table header */
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: BRAND_GREEN,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 4,
  },
  tableHeaderText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* Table row */
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tableRowAlt: {
    backgroundColor: '#fafafa',
  },

  /* Column widths */
  colService: { width: '35%' },
  colDetails: { width: '25%' },
  colQty: { width: '10%', textAlign: 'center' },
  colPrice: { width: '15%', textAlign: 'right' },
  colTotal: { width: '15%', textAlign: 'right' },

  cellText: { fontSize: 10, color: '#333' },
  cellTextSmall: { fontSize: 9, color: '#666' },
  cellTextBold: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#333' },

  /* Grand total */
  grandTotalRow: {
    flexDirection: 'row',
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: LIGHT_GREEN,
    borderRadius: 6,
  },
  grandTotalLabel: {
    width: '70%',
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_GREEN,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  grandTotalValue: {
    width: '30%',
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: BRAND_GREEN,
    textAlign: 'right',
  },

  /* Notes */
  notesBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    padding: 10,
    marginTop: 5,
  },
  notesText: { fontSize: 10, color: '#555', lineHeight: 1.5 },

  /* Footer */
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: { fontSize: 8, color: '#aaa' },
});

const formatCurrency = (amount) =>
  `$${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function ProposalPdf({ customerInfo, lineItems, grandTotal, notes, date, logoBase64 }) {
  const activeLineItems = lineItems.filter((item) => item.quantity > 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {logoBase64 && <Image src={logoBase64} style={styles.logo} />}
          <View style={styles.headerTextBlock}>
            <Text style={styles.title}>Lighting Proposal</Text>
            <Text style={styles.headerSubtitle}>
              Lume Outdoor Lighting — {date}
            </Text>
          </View>
        </View>

        {/* Customer Info */}
        <Text style={styles.sectionTitle}>Prepared For</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{customerInfo.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{customerInfo.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{customerInfo.phone}</Text>
        </View>
        {customerInfo.address ? (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{customerInfo.address}</Text>
          </View>
        ) : null}

        <View style={styles.divider} />

        {/* Line Items Table */}
        <Text style={styles.sectionTitle}>Proposal Details</Text>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <View style={styles.colService}>
            <Text style={styles.tableHeaderText}>Service</Text>
          </View>
          <View style={styles.colDetails}>
            <Text style={styles.tableHeaderText}>Details</Text>
          </View>
          <View style={styles.colQty}>
            <Text style={[styles.tableHeaderText, { textAlign: 'center' }]}>Qty</Text>
          </View>
          <View style={styles.colPrice}>
            <Text style={[styles.tableHeaderText, { textAlign: 'right' }]}>Unit Price</Text>
          </View>
          <View style={styles.colTotal}>
            <Text style={[styles.tableHeaderText, { textAlign: 'right' }]}>Total</Text>
          </View>
        </View>

        {/* Table Rows */}
        {activeLineItems.map((item, index) => (
          <View
            key={index}
            style={[styles.tableRow, index % 2 === 1 ? styles.tableRowAlt : {}]}
          >
            <View style={styles.colService}>
              <Text style={styles.cellTextBold}>{item.serviceName}</Text>
            </View>
            <View style={styles.colDetails}>
              <Text style={styles.cellTextSmall}>{item.configSummary}</Text>
            </View>
            <View style={styles.colQty}>
              <Text style={[styles.cellText, { textAlign: 'center' }]}>{item.quantity}</Text>
            </View>
            <View style={styles.colPrice}>
              <Text style={[styles.cellText, { textAlign: 'right' }]}>
                {formatCurrency(item.pricePerUnit)}
              </Text>
            </View>
            <View style={styles.colTotal}>
              <Text style={[styles.cellTextBold, { textAlign: 'right' }]}>
                {formatCurrency(item.quantity * item.pricePerUnit)}
              </Text>
            </View>
          </View>
        ))}

        {/* Grand Total */}
        <View style={styles.grandTotalRow}>
          <Text style={styles.grandTotalLabel}>Grand Total</Text>
          <Text style={styles.grandTotalValue}>{formatCurrency(grandTotal)}</Text>
        </View>

        {/* Notes */}
        {notes ? (
          <View>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Notes</Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesText}>{notes}</Text>
            </View>
          </View>
        ) : null}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Lume Outdoor Lighting</Text>
          <Text style={styles.footerText}>Drake@lumeoutdoor.com</Text>
        </View>
      </Page>
    </Document>
  );
}
