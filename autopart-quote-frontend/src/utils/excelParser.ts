import * as XLSX from 'xlsx';
import { ParsedPart, MatchingStatus } from '../types/inquiry';

export interface ExcelParseResult {
  parts: ParsedPart[];
  errors: string[];
}

export class ExcelParser {
  static async parseFile(file: File): Promise<ExcelParseResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          if (!data) {
            reject(new Error('Failed to read file'));
            return;
          }

          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          if (!worksheet) {
            reject(new Error('No worksheet found in Excel file'));
            return;
          }

          const result = this.parseWorksheet(worksheet);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsBinaryString(file);
    });
  }

  private static parseWorksheet(worksheet: XLSX.WorkSheet): ExcelParseResult {
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    const parts: ParsedPart[] = [];
    const errors: string[] = [];

    if (jsonData.length === 0) {
      errors.push('Excel file is empty');
      return { parts, errors };
    }

    // Try to identify header row and column mappings
    const headerMappings = this.identifyHeaders(jsonData[0]);
    
    if (!headerMappings.partNumber && !headerMappings.partName) {
      errors.push('Could not identify part number or part name columns');
    }

    // Process data rows (skip header row)
    for (let i = 1; i < jsonData.length; i++) {
      const row = jsonData[i];
      if (!row || row.length === 0) continue;

      try {
        const part = this.parseRow(row, headerMappings, i + 1);
        if (part) {
          parts.push(part);
        }
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return { parts, errors };
  }

  private static identifyHeaders(headerRow: any[]): { [key: string]: number } {
    const mappings: { [key: string]: number } = {};
    
    headerRow.forEach((cell, index) => {
      if (!cell) return;
      
      const cellStr = cell.toString().toLowerCase().trim();
      
      // Part number variations
      if ((cellStr.includes('part') && cellStr.includes('number')) ||
          cellStr.includes('partnumber') ||
          cellStr.includes('part_number') ||
          cellStr.includes('part no') ||
          cellStr === 'pn') {
        mappings.partNumber = index;
      }
      
      // Part name variations
      else if ((cellStr.includes('part') && cellStr.includes('name')) ||
               cellStr.includes('partname') ||
               cellStr.includes('part_name') ||
               cellStr.includes('description') ||
               cellStr.includes('product')) {
        mappings.partName = index;
      }
      
      // Brand variations
      else if (cellStr.includes('brand') ||
               cellStr.includes('manufacturer') ||
               cellStr.includes('make')) {
        mappings.brand = index;
      }
      
      // Quantity variations
      else if (cellStr.includes('quantity') ||
               cellStr.includes('qty') ||
               cellStr.includes('amount') ||
               cellStr.includes('count')) {
        mappings.quantity = index;
      }
      
      // Description variations
      else if (cellStr.includes('desc') ||
               cellStr.includes('note') ||
               cellStr.includes('remark')) {
        mappings.description = index;
      }
    });

    return mappings;
  }

  private static parseRow(row: any[], mappings: { [key: string]: number }, rowIndex: number): ParsedPart | null {
    const partNumber = mappings.partNumber !== undefined ? (row[mappings.partNumber] || '').toString().trim() : '';
    const partName = mappings.partName !== undefined ? (row[mappings.partName] || '').toString().trim() : '';
    
    // Skip row if both part number and name are empty
    if (!partNumber && !partName) {
      return null;
    }

    const brand = mappings.brand !== undefined ? (row[mappings.brand] || '').toString().trim() : '';
    const quantityStr = mappings.quantity !== undefined ? (row[mappings.quantity] || '').toString().trim() : '1';
    const description = mappings.description !== undefined ? (row[mappings.description] || '').toString().trim() : '';

    // Parse quantity
    let quantity = 1;
    if (quantityStr) {
      const parsedQty = parseInt(quantityStr, 10);
      if (!isNaN(parsedQty) && parsedQty > 0) {
        quantity = parsedQty;
      }
    }

    // Determine matching status based on data quality
    let matchingStatus = MatchingStatus.Exact;
    if (!partNumber || partNumber.includes('?') || partNumber.includes('*')) {
      matchingStatus = MatchingStatus.Fuzzy;
    } else if (partNumber.length < 3) {
      matchingStatus = MatchingStatus.NotFound;
    }

    return {
      rowIndex: rowIndex,
      partNumber: partNumber,
      partName: partName,
      brand: brand,
      quantity: quantity,
      description: description || undefined,
      matchingStatus: matchingStatus,
      suggestedMatches: matchingStatus === MatchingStatus.Fuzzy ? this.generateSuggestions(partNumber) : undefined,
      isConfirmed: matchingStatus === MatchingStatus.Exact,
      notes: undefined
    };
  }

  private static generateSuggestions(partNumber: string): string[] {
    const suggestions: string[] = [];
    
    // Simple suggestion generation - in real app, this would query a database
    if (partNumber.includes('?')) {
      for (let i = 0; i <= 9; i++) {
        suggestions.push(partNumber.replace('?', i.toString()));
      }
    } else if (partNumber.includes('*')) {
      suggestions.push(partNumber.replace('*', 'A'));
      suggestions.push(partNumber.replace('*', 'B'));
      suggestions.push(partNumber.replace('*', 'C'));
    } else {
      // Generate similar part numbers
      suggestions.push(`${partNumber}-A`);
      suggestions.push(`${partNumber}-B`);
      suggestions.push(`${partNumber}-01`);
    }

    return suggestions.slice(0, 5); // Limit to 5 suggestions
  }
}

export default ExcelParser;