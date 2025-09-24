import React, { useState } from 'react';
import { ParsedPart, MatchingStatus } from '../types/inquiry';

interface FuzzyMatchDialogProps {
  part: ParsedPart | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (part: ParsedPart, selectedMatch: string, notes?: string) => void;
}

const FuzzyMatchDialog: React.FC<FuzzyMatchDialogProps> = ({
  part,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [selectedMatch, setSelectedMatch] = useState<string>('');
  const [customMatch, setCustomMatch] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [useCustom, setUseCustom] = useState<boolean>(false);

  React.useEffect(() => {
    if (part) {
      setSelectedMatch(part.suggestedMatches?.[0] || '');
      setCustomMatch('');
      setNotes(part.notes || '');
      setUseCustom(false);
    }
  }, [part]);

  const handleConfirm = () => {
    if (!part) return;

    const finalMatch = useCustom ? customMatch : selectedMatch;
    if (!finalMatch.trim()) {
      alert('请选择或输入一个匹配项');
      return;
    }

    const updatedPart: ParsedPart = {
      ...part,
      partNumber: finalMatch.trim(),
      matchingStatus: MatchingStatus.Exact,
      isConfirmed: true,
      notes: notes.trim() || undefined
    };

    onConfirm(updatedPart, finalMatch.trim(), notes.trim() || undefined);
    onClose();
  };

  const handleSkip = () => {
    if (!part) return;

    const updatedPart: ParsedPart = {
      ...part,
      matchingStatus: MatchingStatus.NotFound,
      isConfirmed: false,
      notes: (notes.trim() || '') + ' [跳过确认]'
    };

    onConfirm(updatedPart, part.partNumber, updatedPart.notes);
    onClose();
  };

  if (!isOpen || !part) {
    return null;
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h3 style={{ margin: 0, color: '#333' }}>确认模糊匹配零件</h3>
          <button
            onClick={onClose}
            style={closeButtonStyle}
          >
            ×
          </button>
        </div>

        <div style={contentStyle}>
          <div style={sectionStyle}>
            <h4>原始信息：</h4>
            <div style={infoGridStyle}>
              <div><strong>零件号：</strong> {part.partNumber || '(空)'}</div>
              <div><strong>零件名称：</strong> {part.partName}</div>
              <div><strong>品牌：</strong> {part.brand}</div>
              <div><strong>数量：</strong> {part.quantity}</div>
              {part.description && <div><strong>描述：</strong> {part.description}</div>}
            </div>
          </div>

          <div style={sectionStyle}>
            <h4>建议匹配项：</h4>
            {part.suggestedMatches && part.suggestedMatches.length > 0 ? (
              <div>
                {part.suggestedMatches.map((match, index) => (
                  <label key={index} style={optionStyle}>
                    <input
                      type="radio"
                      name="suggestedMatch"
                      value={match}
                      checked={!useCustom && selectedMatch === match}
                      onChange={(e) => {
                        setSelectedMatch(e.target.value);
                        setUseCustom(false);
                      }}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>
                      {match}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div style={{ color: '#666', fontStyle: 'italic' }}>
                没有建议的匹配项
              </div>
            )}
          </div>

          <div style={sectionStyle}>
            <label style={optionStyle}>
              <input
                type="radio"
                name="matchType"
                checked={useCustom}
                onChange={(e) => setUseCustom(e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              <strong>自定义零件号：</strong>
            </label>
            <input
              type="text"
              value={customMatch}
              onChange={(e) => setCustomMatch(e.target.value)}
              onFocus={() => setUseCustom(true)}
              placeholder="输入正确的零件号"
              style={{
                ...inputStyle,
                marginTop: '8px',
                backgroundColor: useCustom ? 'white' : '#f5f5f5',
                border: useCustom ? '2px solid #2196f3' : '1px solid #ccc'
              }}
            />
          </div>

          <div style={sectionStyle}>
            <label><strong>备注：</strong></label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="添加备注信息（可选）"
              style={{
                ...inputStyle,
                marginTop: '8px',
                minHeight: '60px',
                resize: 'vertical'
              }}
            />
          </div>
        </div>

        <div style={footerStyle}>
          <button
            onClick={handleSkip}
            style={{
              ...buttonStyle,
              backgroundColor: '#757575',
              color: 'white',
              marginRight: '8px'
            }}
          >
            跳过此项
          </button>
          <button
            onClick={onClose}
            style={{
              ...buttonStyle,
              backgroundColor: 'white',
              color: '#333',
              border: '1px solid #ccc',
              marginRight: '8px'
            }}
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            style={{
              ...buttonStyle,
              backgroundColor: '#4caf50',
              color: 'white'
            }}
          >
            确认选择
          </button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '8px',
  width: '90%',
  maxWidth: '600px',
  maxHeight: '80vh',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  borderBottom: '1px solid #e0e0e0',
  backgroundColor: '#f8f9fa'
};

const closeButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#666',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%'
};

const contentStyle: React.CSSProperties = {
  padding: '20px',
  maxHeight: 'calc(80vh - 140px)',
  overflowY: 'auto'
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '24px'
};

const infoGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '8px',
  padding: '12px',
  backgroundColor: '#f8f9fa',
  borderRadius: '6px',
  fontSize: '14px'
};

const optionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0',
  cursor: 'pointer'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
  fontFamily: 'inherit'
};

const footerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '20px',
  borderTop: '1px solid #e0e0e0',
  backgroundColor: '#f8f9fa'
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold'
};

export default FuzzyMatchDialog;