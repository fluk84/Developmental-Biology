import React from 'react';
import { GLOSSARY_ITEMS, TERM_ALIAS_MAP } from '../data/glossaryData';
import { GlossaryPopover } from './GlossaryPopover';

interface GlossaryTextProps {
  text: string;
  onOpenChatWithTopic?: (topic: string) => void;
  onOpenFullGlossary?: (termId?: string) => void;
  className?: string;
  maxHighlightsPerTerm?: number;
}

// Build list of terms sorted by string length descending so longer terms match before substrings
const SORTED_TERMS: Array<{ regex: RegExp; termId: string }> = [];

// Prepare terms once
const allLookupEntries: Array<{ pattern: string; termId: string }> = [];

GLOSSARY_ITEMS.forEach((item) => {
  allLookupEntries.push({ pattern: item.term, termId: item.id });
  if (item.aliases) {
    item.aliases.forEach((alias) => {
      // only aliases with length >= 3 to avoid matching tiny noise
      if (alias.length >= 3) {
        allLookupEntries.push({ pattern: alias, termId: item.id });
      }
    });
  }
});

// Sort by length descending
allLookupEntries.sort((a, b) => b.pattern.length - a.pattern.length);

// Build regular expressions for whole-word / token boundaries
allLookupEntries.forEach(({ pattern, termId }) => {
  // Escape special regex characters
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Use boundary or spacing matching
  const regex = new RegExp(`\\b(${escaped})\\b`, 'i');
  SORTED_TERMS.push({ regex, termId });
});

export const GlossaryText: React.FC<GlossaryTextProps> = ({
  text,
  onOpenChatWithTopic,
  onOpenFullGlossary,
  className = '',
  maxHighlightsPerTerm = 2,
}) => {
  if (!text) return null;

  // Split text by lines to preserve paragraphs
  const paragraphs = text.split('\n');

  return (
    <span className={className}>
      {paragraphs.map((para, pIdx) => {
        if (!para.trim()) {
          return <br key={pIdx} />;
        }

        // Track how many times a term has been highlighted in this paragraph
        const termCounts: Record<string, number> = {};

        // Find all matches in this paragraph
        interface MatchToken {
          start: number;
          end: number;
          text: string;
          termId: string;
        }

        const matches: MatchToken[] = [];

        SORTED_TERMS.forEach(({ regex, termId }) => {
          if ((termCounts[termId] || 0) >= maxHighlightsPerTerm) return;

          let match: RegExpExecArray | null;
          const globalRegex = new RegExp(regex.source, 'gi');

          while ((match = globalRegex.exec(para)) !== null) {
            const start = match.index;
            const end = start + match[0].length;

            // Check if this overlaps with an already found longer match
            const overlaps = matches.some(
              (m) => (start >= m.start && start < m.end) || (end > m.start && end <= m.end)
            );

            if (!overlaps) {
              matches.push({
                start,
                end,
                text: match[0],
                termId,
              });
              termCounts[termId] = (termCounts[termId] || 0) + 1;
              if (termCounts[termId] >= maxHighlightsPerTerm) break;
            }
          }
        });

        // Sort matches by start position
        matches.sort((a, b) => a.start - b.start);

        // Build rendered segments
        const segments: React.ReactNode[] = [];
        let currentIndex = 0;

        matches.forEach((m, mIdx) => {
          // Add plain text before match
          if (m.start > currentIndex) {
            segments.push(para.slice(currentIndex, m.start));
          }

          // Add popover element
          segments.push(
            <GlossaryPopover
              key={`match-${pIdx}-${mIdx}-${m.termId}`}
              term={m.termId}
              onOpenChatWithTopic={onOpenChatWithTopic}
              onOpenFullGlossary={onOpenFullGlossary}
            >
              {m.text}
            </GlossaryPopover>
          );

          currentIndex = m.end;
        });

        // Add remaining text
        if (currentIndex < para.length) {
          segments.push(para.slice(currentIndex));
        }

        return (
          <React.Fragment key={pIdx}>
            {segments}
            {pIdx < paragraphs.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </span>
  );
};

// Convenience component for direct manual term markup in custom layouts
export const GlossaryTerm: React.FC<{
  term: string;
  children?: React.ReactNode;
  onOpenChatWithTopic?: (topic: string) => void;
  onOpenFullGlossary?: (termId?: string) => void;
  className?: string;
}> = (props) => <GlossaryPopover {...props} />;
