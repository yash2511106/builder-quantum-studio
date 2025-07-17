import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatScore(score) {
  return Math.round(score);
}

export function getBiasTypeColor(category) {
  switch (category) {
    case "gender":
      return "blue";
    case "age":
      return "orange";
    case "racial":
      return "red";
    default:
      return "gray";
  }
}

export function getSeverityColor(severity) {
  switch (severity) {
    case "high":
      return "red";
    case "medium":
      return "yellow";
    case "low":
      return "gray";
    default:
      return "gray";
  }
}

export function downloadTextFile(content, filename) {
  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

export function getScoreGrade(score) {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}
