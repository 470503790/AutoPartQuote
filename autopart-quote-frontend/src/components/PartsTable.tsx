import React, { useState } from 'react';
import { ParsedPart, MatchingStatus } from '../types/inquiry';

interface PartsTableProps {
  parts: ParsedPart[];
  onPartUpdate: (updatedPart: ParsedPart) => void;
  onPartDelete: (rowIndex: number) => void;
  onShowFuzzyMatchDialog: (part: ParsedPart) => void;
}

const PartsTable: React.FC<PartsTableProps> = ({ 
  parts, 
  onPartUpdate, 
  onPartDelete, 
  onShowFuzzyMatchDialog 
}) => {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editingPart, setEditingPart] = useState<ParsedPart | null>(null);

  const handleEditStart = (part: ParsedPart) => {
    setEditingRow(part.rowIndex);
    setEditingPart({ ...part });
  };

  const handleEditSave = () => {
    if (editingPart) {
      onPartUpdate(editingPart);
      setEditingRow(null);
      setEditingPart(null);
    }
  };

  const handleEditCancel = () => {
    setEditingRow(null);
    setEditingPart(null);
  };

  const handleFieldChange = (field: keyof ParsedPart, value: any) => {
    if (editingPart) {
      setEditingPart({
        ...editingPart,
        [field]: value
      });
    }
  };

  const getMatchingStatusColor = (status: MatchingStatus) => {
    switch (status) {
      case MatchingStatus.Exact:
        return '#4caf50';
      case MatchingStatus.Fuzzy:
        return '#ff9800';
      case MatchingStatus.NotFound:
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const getMatchingStatusText = (status: MatchingStatus) => {
    switch (status) {
      case MatchingStatus.Exact:
        return '精确匹配';
      case MatchingStatus.Fuzzy:
        return '模糊匹配';
      case MatchingStatus.NotFound:
        return '未找到';
      default:
        return '未知';
    }
  };

  return (
    <div className="parts-table-container">
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>解析结果 ({parts.length} 项)</h3>
        <div style={{ fontSize: '14px', color: '#666' }}>
          <span style={{ color: '#4caf50' }}>● 精确匹配</span>
          <span style={{ color: '#ff9800', marginLeft: '16px' }}>● 模糊匹配</span>
          <span style={{ color: '#f44336', marginLeft: '16px' }}>● 未找到</span>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={headerCellStyle}>行号</th>
              <th style={headerCellStyle}>零件号</th>
              <th style={headerCellStyle}>零件名称</th>
              <th style={headerCellStyle}>品牌</th>
              <th style={headerCellStyle}>数量</th>
              <th style={headerCellStyle}>描述</th>
              <th style={headerCellStyle}>匹配状态</th>
              <th style={headerCellStyle}>操作</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part.rowIndex} style={{ 
                borderBottom: '1px solid #e0e0e0',
                backgroundColor: part.isConfirmed ? '#f8fff8' : 'white'
              }}>
                <td style={cellStyle}>{part.rowIndex}</td>
                
                {/* Part Number */}
                <td style={cellStyle}>
                  {editingRow === part.rowIndex ? (
                    <input
                      type="text"
                      value={editingPart?.partNumber || ''}
                      onChange={(e) => handleFieldChange('partNumber', e.target.value)}
                      style={inputStyle}
                    />
                  ) : (
                    <span style={{ fontFamily: 'monospace' }}>{part.partNumber}</span>
                  )}
                </td>

                {/* Part Name */}
                <td style={cellStyle}>
                  {editingRow === part.rowIndex ? (
                    <input
                      type="text"
                      value={editingPart?.partName || ''}
                      onChange={(e) => handleFieldChange('partName', e.target.value)}
                      style={inputStyle}
                    />
                  ) : (
                    part.partName
                  )}
                </td>

                {/* Brand */}
                <td style={cellStyle}>
                  {editingRow === part.rowIndex ? (
                    <input
                      type="text"
                      value={editingPart?.brand || ''}
                      onChange={(e) => handleFieldChange('brand', e.target.value)}
                      style={inputStyle}
                    />
                  ) : (
                    part.brand
                  )}
                </td>

                {/* Quantity */}
                <td style={cellStyle}>
                  {editingRow === part.rowIndex ? (
                    <input
                      type="number"
                      min="1"
                      value={editingPart?.quantity || 1}
                      onChange={(e) => handleFieldChange('quantity', parseInt(e.target.value) || 1)}
                      style={{ ...inputStyle, width: '80px' }}
                    />
                  ) : (
                    part.quantity
                  )}
                </td>

                {/* Description */}
                <td style={cellStyle}>
                  {editingRow === part.rowIndex ? (
                    <input
                      type="text"
                      value={editingPart?.description || ''}
                      onChange={(e) => handleFieldChange('description', e.target.value)}
                      style={inputStyle}
                    />
                  ) : (
                    part.description || '-'
                  )}
                </td>

                {/* Matching Status */}
                <td style={cellStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      color: getMatchingStatusColor(part.matchingStatus),
                      fontWeight: 'bold'
                    }}>
                      {getMatchingStatusText(part.matchingStatus)}
                    </span>
                    {part.matchingStatus === MatchingStatus.Fuzzy && (
                      <button
                        onClick={() => onShowFuzzyMatchDialog(part)}
                        style={{
                          ...buttonStyle,
                          backgroundColor: '#ff9800',
                          color: 'white',
                          fontSize: '12px',
                          padding: '4px 8px'
                        }}
                      >
                        选择匹配
                      </button>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td style={cellStyle}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {editingRow === part.rowIndex ? (
                      <>
                        <button
                          onClick={handleEditSave}
                          style={{ ...buttonStyle, backgroundColor: '#4caf50', color: 'white' }}
                        >
                          保存
                        </button>
                        <button
                          onClick={handleEditCancel}
                          style={{ ...buttonStyle, backgroundColor: '#757575', color: 'white' }}
                        >
                          取消
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditStart(part)}
                          style={{ ...buttonStyle, backgroundColor: '#2196f3', color: 'white' }}
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => onPartDelete(part.rowIndex)}
                          style={{ ...buttonStyle, backgroundColor: '#f44336', color: 'white' }}
                        >
                          删除
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {parts.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          暂无解析结果
        </div>
      )}
    </div>
  );
};

const headerCellStyle: React.CSSProperties = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
  borderBottom: '2px solid #e0e0e0',
  fontSize: '14px'
};

const cellStyle: React.CSSProperties = {
  padding: '12px',
  verticalAlign: 'top',
  fontSize: '14px'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px'
};

const buttonStyle: React.CSSProperties = {
  padding: '6px 12px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 'bold'
};

export default PartsTable;