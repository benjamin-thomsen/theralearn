/**
 * TheraLearn Documentation Tool
 * -----------------------------------------
 * Global configuration.
 *
 * This file is the single source of truth for
 * the documentation tool configuration.
 */

import { REQUIRED_DIRECTORIES } from "./required-directories";

export const documentationConfig = {
  tool: {
    name: "TheraLearn Documentation Tool",
    version: "0.1.0",
    status: "Foundation",
  },

  paths: {
    docs: "docs",
    templates: "docs/templates",
    requiredDirectories: REQUIRED_DIRECTORIES,
  },

  defaults: {
    status: "Draft",
    dateFormat: "YYYY-MM-DD",
  },

  supportedDocumentTypes: [
    "decision",
    "meeting",
    "changelog",
    "document",
  ] as const,
};