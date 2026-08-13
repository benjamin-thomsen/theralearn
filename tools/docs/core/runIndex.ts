import { execFileSync } from "node:child_process";
import { writeFile } from "../filesystem/writeFile";
import { renderOutput } from "../output/renderOutput";

const INDEX_FILE = "INDHOLDSFORTEGNELSE.md";

interface IndexSection {
  title: string;
  files: string[];
}

function getTrackedFiles(): string[] {
  const output = execFileSync("git", ["ls-files"], {
    encoding: "utf8",
  });

  return output
    .split("\n")
    .map((file) => file.trim())
    .filter(Boolean)
    .filter((file) => file !== INDEX_FILE)
    .sort((a, b) => a.localeCompare(b));
}

function getTopLevelDirectory(file: string): string | null {
  const separatorIndex = file.indexOf("/");

  if (separatorIndex === -1) {
    return null;
  }

  return file.slice(0, separatorIndex);
}

function getFilesByPrefix(files: string[], prefix: string): string[] {
  return files.filter((file) => file.startsWith(prefix));
}

function getRootFiles(files: string[]): string[] {
  return files.filter((file) => !file.includes("/"));
}

function renderFileList(files: string[]): string {
  if (files.length === 0) {
    return "_Ingen filer._";
  }

  return files
    .map((file) => `- [\`${file}\`](./${file})`)
    .join("\n");
}

function renderSection(section: IndexSection): string {
  return `## ${section.title}

${renderFileList(section.files)}`;
}

function buildIndex(files: string[]): string {
  const authorityFiles = [
    INDEX_FILE,
    "PROJECT_HANDBOOK.md",
    "PROJECT_OVERVIEW.md",
    "PROJECT_CONTROL.md",
    "README.md",
    "AGENTS.md",
    "CLAUDE.md",
  ];

  const knownDirectorySections = [
    {
      title: "Dokumentation",
      directory: "docs",
    },
    {
      title: "Application",
      directory: "app",
    },
    {
      title: "Components",
      directory: "components",
    },
    {
      title: "Data",
      directory: "data",
    },
    {
      title: "Libraries og repositories",
      directory: "lib",
    },
    {
      title: "Database og Supabase",
      directory: "supabase",
    },
    {
      title: "Developer Toolkit",
      directory: "tools",
    },
    {
      title: "Scripts",
      directory: "scripts",
    },
    {
      title: "GitHub og CI",
      directory: ".github",
    },
    {
      title: "Types",
      directory: "types",
    },
    {
      title: "Public assets",
      directory: "public",
    },
  ];

  const knownDirectories = new Set(
    knownDirectorySections.map((section) => section.directory),
  );

  const discoveredDirectories = Array.from(
    new Set(
      files
        .map(getTopLevelDirectory)
        .filter((directory): directory is string => directory !== null),
    ),
  )
    .filter((directory) => !knownDirectories.has(directory))
    .sort((a, b) => a.localeCompare(b));

  const authorityRootFiles = authorityFiles.filter(
    (file) => file === INDEX_FILE || files.includes(file),
  );

  const otherRootFiles = getRootFiles(files).filter(
    (file) => !authorityFiles.includes(file),
  );

  const knownSections: IndexSection[] = knownDirectorySections.map(
    ({ title, directory }) => ({
      title,
      files: getFilesByPrefix(files, `${directory}/`),
    }),
  );

  const discoveredSections: IndexSection[] = discoveredDirectories.map(
    (directory) => ({
      title: `Øvrigt: ${directory}`,
      files: getFilesByPrefix(files, `${directory}/`),
    }),
  );

  const sections: IndexSection[] = [
    {
      title: "Projektstyring og autoritet",
      files: authorityRootFiles,
    },
    ...knownSections,
    ...discoveredSections,
    {
      title: "Root configuration og øvrige root-filer",
      files: otherRootFiles,
    },
  ];

  const renderedSections = sections
    .map(renderSection)
    .join("\n\n---\n\n");

  return `# Indholdsfortegnelse

> Automatisk genereret repository-index.
>
> Denne fil er et navigationskort og er ikke authority for indholdet i de filer, den linker til.
>
> Regenerér filen gennem Developer Toolkit, når repository-strukturen ændres.

---

## Start her

Læs disse authority-filer i denne rækkefølge:

1. \`PROJECT_HANDBOOK.md\` — governance og workflow.
2. \`PROJECT_OVERVIEW.md\` — stabil projektidentitet og principper.
3. \`PROJECT_CONTROL.md\` — aktuel verificeret status og næste tilladte handling.

De canonical repository-links findes én gang under **Projektstyring og autoritet** nedenfor.

---

${renderedSections}

---

_Genereret deterministisk fra Git-tracked repository-filer._
`;
}

export function runIndex(): boolean {
  try {
    const files = getTrackedFiles();
    const content = buildIndex(files);

    if (!writeFile(INDEX_FILE, content)) {
      renderOutput({
        title: "INDEX ERROR",
        status: "error",
        message: `Could not write ${INDEX_FILE}.`,
      });

      return false;
    }

    renderOutput({
      title: "INDEX READY",
      activeFile: INDEX_FILE,
      status: "success",
      message: `Repository index generated from ${files.length} tracked files.`,
    });

    return true;
  } catch {
    renderOutput({
      title: "INDEX ERROR",
      status: "error",
      message: "Could not read tracked repository files.",
    });

    return false;
  }
}