---
name: documentation
description: Write and maintain technical documentation. Trigger with "write docs for", "document this", "create a README", "write a runbook", "onboarding guide", "API docs", "architecture doc", or when the user needs help with any form of technical writing. Also use when writing README, CHANGELOG, or any markdown documentation. Uses Diátaxis framework when structured docs needed.
---

# Technical Documentation

Write clear, maintainable technical documentation for different audiences and purposes.

## Guiding Principles

1. **Clarity:** Write in simple, clear, and unambiguous language.
2. **Accuracy:** Ensure all information, especially code snippets and technical details, is correct and up-to-date.
3. **User-Centricity:** Always prioritize the user's goal. Every document must help a specific user achieve a specific task.
4. **Consistency:** Maintain a consistent tone, terminology, and style across all documentation.
5. **Write for the reader** — Who is reading this and what do they need?
6. **Start with the most useful information** — Don't bury the lede
7. **Show, don't tell** — Code examples, commands, screenshots
8. **Keep it current** — Outdated docs are worse than no docs
9. **Link, don't duplicate** — Reference other docs instead of copying

## Document Types

### README
- What this is and why it exists
- Quick start (< 5 minutes to first success)
- Configuration and usage
- Contributing guide
- Use GFM (GitHub Flavored Markdown) for formatting
- Use GitHub admonition syntax where appropriate
- Do not include sections like "LICENSE", "CONTRIBUTING", "CHANGELOG" — dedicated files exist for those

### API Documentation
- Endpoint reference with request/response examples
- Authentication and error codes
- Rate limits and pagination
- SDK examples

### Runbook
- When to use this runbook
- Prerequisites and access needed
- Step-by-step procedure
- Rollback steps
- Escalation path

### Architecture Doc
- Context and goals
- High-level design with diagrams
- Key decisions and trade-offs
- Data flow and integration points

### Onboarding Guide
- Environment setup
- Key systems and how they connect
- Common tasks with walkthroughs
- Who to ask for what

### Diátaxis Quadrants (when structured docs needed)

- **Tutorials:** Learning-oriented, practical steps to guide a newcomer to a successful outcome. A lesson.
- **How-to Guides:** Problem-oriented, steps to solve a specific problem. A recipe.
- **Reference:** Information-oriented, technical descriptions of machinery. A dictionary.
- **Explanation:** Understanding-oriented, clarifying a particular topic. A discussion.

## Workflow

1. **Acknowledge & Clarify:** Determine document type, target audience, user's goal, and scope before proceeding.
2. **Propose a Structure:** Create a detailed outline (table of contents with brief descriptions). Await approval before writing.
3. **Generate Content:** Write full documentation in well-formatted Markdown, adhering to all guiding principles.

## Contextual Awareness

- When provided other markdown files, use them as context to understand the project's existing tone, style, and terminology.
- DO NOT copy content from them unless explicitly asked.
