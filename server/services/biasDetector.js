// Bias detection keywords and patterns
const BIAS_PATTERNS = {
  gender: {
    high: [
      { term: "dominant", suggestion: "influential" },
      { term: "aggressive", suggestion: "proactive" },
      { term: "ninja", suggestion: "expert" },
      { term: "rock star", suggestion: "skilled professional" },
      { term: "guru", suggestion: "expert" },
      { term: "manpower", suggestion: "workforce" },
      { term: "chairman", suggestion: "chairperson" },
      { term: "spokesman", suggestion: "spokesperson" },
      { term: "salesman", suggestion: "salesperson" },
    ],
    medium: [
      { term: "competitive", suggestion: "goal-oriented" },
      { term: "assertive", suggestion: "confident" },
      { term: "driven", suggestion: "motivated" },
      { term: "ambitious", suggestion: "goal-focused" },
      { term: "strong", suggestion: "effective" },
    ],
    low: [
      { term: "guys", suggestion: "team" },
      { term: "he/she", suggestion: "they" },
      { term: "his/her", suggestion: "their" },
    ],
  },
  age: {
    high: [
      { term: "young", suggestion: "energetic" },
      { term: "mature", suggestion: "experienced" },
      { term: "senior", suggestion: "experienced" },
      { term: "junior", suggestion: "entry-level" },
      { term: "fresh graduate", suggestion: "recent graduate" },
      { term: "digital native", suggestion: "tech-savvy" },
    ],
    medium: [
      { term: "energetic", suggestion: "enthusiastic" },
      { term: "dynamic", suggestion: "adaptable" },
      { term: "tech-savvy", suggestion: "technically skilled" },
      { term: "recent graduate", suggestion: "new professional" },
    ],
    low: [
      { term: "new", suggestion: "emerging" },
      { term: "experienced", suggestion: "skilled" },
    ],
  },
  racial: {
    high: [
      { term: "articulate", suggestion: "well-spoken" },
      { term: "urban", suggestion: "metropolitan" },
      { term: "diverse background", suggestion: "varied experience" },
      { term: "cultural fit", suggestion: "team alignment" },
      { term: "native speaker", suggestion: "fluent speaker" },
    ],
    medium: [
      { term: "exotic", suggestion: "unique" },
      { term: "traditional", suggestion: "established" },
      { term: "mainstream", suggestion: "conventional" },
    ],
    low: [
      { term: "foreign", suggestion: "international" },
      { term: "ethnic", suggestion: "cultural" },
    ],
  },
};

export function detectBias(text) {
  const biasItems = [];
  const lowerText = text.toLowerCase();

  // Check each category and severity level
  Object.entries(BIAS_PATTERNS).forEach(([category, severityLevels]) => {
    Object.entries(severityLevels).forEach(([severity, patterns]) => {
      patterns.forEach(({ term, suggestion }) => {
        const regex = new RegExp(`\\b${term.toLowerCase()}\\b`, "gi");
        let match;

        while ((match = regex.exec(lowerText)) !== null) {
          const start = match.index;
          const end = start + term.length;

          biasItems.push({
            term: text.substring(start, end), // Preserve original case
            category,
            severity,
            suggestion,
            position: { start, end },
          });
        }
      });
    });
  });

  return biasItems;
}

export function calculateDiversityScore(biasItems, textLength) {
  if (textLength === 0) return 100;

  let totalPenalty = 0;
  const penalties = { high: 15, medium: 8, low: 3 };

  biasItems.forEach((item) => {
    totalPenalty += penalties[item.severity] || 0;
  });

  // Calculate score based on bias density
  const biasRatio = totalPenalty / (textLength / 100); // Penalty per 100 characters
  const score = Math.max(0, Math.min(100, 100 - biasRatio * 2));

  return Math.round(score);
}

export function generateInclusiveRewrite(text, biasItems) {
  let rewrittenText = text;

  // Sort bias items by position (end to start) to avoid index shifting
  const sortedItems = [...biasItems].sort(
    (a, b) => b.position.end - a.position.end,
  );

  sortedItems.forEach((item) => {
    const { term, suggestion, position } = item;
    const before = rewrittenText.substring(0, position.start);
    const after = rewrittenText.substring(position.end);
    rewrittenText = before + suggestion + after;
  });

  return rewrittenText;
}

// Additional inclusive writing suggestions
export function getInclusiveSuggestions() {
  return [
    "Use gender-neutral language (they/them instead of he/she)",
    "Focus on skills and qualifications rather than personality traits",
    "Avoid age-related terms that might exclude candidates",
    "Use inclusive terminology that welcomes all backgrounds",
    "Emphasize required skills over cultural 'fit'",
    "Replace jargon with clear, professional language",
  ];
}
