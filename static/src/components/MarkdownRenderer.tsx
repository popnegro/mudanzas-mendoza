import * as React from "react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split("\n");
  return (
    <div className="markdown-container">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;

        // Horizontal rule
        if (trimmed === "---") {
          return <hr key={idx} className="markdown-hr" />;
        }

        // H2
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={idx} className="markdown-h2">
              {trimmed.replace("## ", "")}
            </h2>
          );
        }

        // H3
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={idx} className="markdown-h3">
              {trimmed.replace("### ", "")}
            </h3>
          );
        }

        // Bullet list items
        if (trimmed.startsWith("* ")) {
          const text = trimmed.replace("* ", "");
          // Check for bold parts **...**
          const boldMatch = text.match(/^\*\*(.*?)\*\*(.*)$/);
          if (boldMatch) {
            return (
              <li key={idx} className="markdown-list-item">
                <span className="markdown-list-bullet">•</span>
                <span>
                  <strong className="markdown-inline-bold">
                    {boldMatch[1]}
                  </strong>
                  {boldMatch[2]}
                </span>
              </li>
            );
          }
          return (
            <li key={idx} className="markdown-list-item">
              <span className="markdown-list-bullet">•</span>
              <span>{text}</span>
            </li>
          );
        }

        // Default Paragraph
        // Parse simple inline bold **text**
        const parts: React.ReactNode[] = [];
        let currentText = line;
        let boldIndex = currentText.indexOf("**");
        let partKey = 0;

        while (boldIndex !== -1) {
          const nextBoldIndex = currentText.indexOf("**", boldIndex + 2);
          if (nextBoldIndex === -1) break;

          if (boldIndex > 0) {
            parts.push(currentText.substring(0, boldIndex));
          }
          parts.push(
            <strong key={partKey++} className="markdown-inline-bold">
              {currentText.substring(boldIndex + 2, nextBoldIndex)}
            </strong>,
          );
          currentText = currentText.substring(nextBoldIndex + 2);
          boldIndex = currentText.indexOf("**");
        }
        if (currentText) {
          parts.push(currentText);
        }

        return (
          /* Use markdown-paragraph for consistency */
          <p key={idx} className="markdown-paragraph">
            {parts.length > 0 ? parts : line}
          </p>
        );
      })}
    </div>
  );
}
